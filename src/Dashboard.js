import React, { useState, useEffect } from 'react';
import DashboardArticle from './DashboardArticle';
import ArticleForm from './ArticleForm';

export default function Dashboard(params) {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState(false);

  useEffect(() => {
    fetch('https://www.niconap.ga/blog/currentuser', {
      mode: 'cors',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setUser(results);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
    fetch('https://www.niconap.ga/blog/posts/private', {
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
        <label htmlFor="new">{newArticle ? 'Cancel' : 'New article'}</label>
        <button onClick={switchNewArticle} name="new" id="new">
          {newArticle ? '-' : '+'}
        </button>
        {newArticle ? <ArticleForm push={pushArticle} /> : ''}
        <h3>Currently these are all of your articles:</h3>
        <ul>
          {articles.map((article) => {
            return <DashboardArticle key={article._id} data={article} />;
          })}
        </ul>
      </div>
    );
  }
}
