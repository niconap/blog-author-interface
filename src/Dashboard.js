import React, { useState, useEffect } from 'react';
import DashboardArticle from './DashboardArticle';
import ArticleForm from './ArticleForm';
import AddRoundedIcon from '@material-ui/icons/Add';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

export default function Dashboard(params) {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('/blog/currentuser', {
      mode: 'cors',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      signal,
    })
      .then((response) => response.json())
      .then((results) => {
        setUser(results);
        controller.abort();
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
        controller.abort();
      });
    fetch('/blog/posts/private', {
      mode: 'cors',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setArticles(results);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, []);

  function pushArticle(article) {
    setArticles([...articles, article]);
  }

  function switchNewArticle() {
    newArticle ? setNewArticle(false) : setNewArticle(true);
  }

  function logOut() {
    localStorage.removeItem('token');
    window.location.href = '/author-frontend';
  }

  if (!loaded) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return (
      <div>
        <h2>Oops! An error occured!</h2>
        <p>{error}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Welcome {user.authData.firstname}!</h2>
        <button id="logout" onClick={logOut}>
          <ExitToAppRoundedIcon />
        </button>
        <h3>Currently these are all of your articles:</h3>
        <button onClick={switchNewArticle} name="new" id="new">
          {newArticle ? <CloseRoundedIcon /> : <AddRoundedIcon />}
        </button>
        {newArticle ? <ArticleForm push={pushArticle} /> : ''}
        <ul id="articles">
          {articles.map((article) => {
            return <DashboardArticle key={article._id} data={article} />;
          })}
        </ul>
      </div>
    );
  }
}
