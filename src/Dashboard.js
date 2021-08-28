import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(params) {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState([]);

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
        <h3>Currently these are all of your articles:</h3>
        <ul>
          {articles.map((article) => {
            return (
              <li className="article" key={article._id}>
                <Link to={'/article/' + article._id}>
                  <h4>{article.title}</h4>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
