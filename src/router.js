import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ArticleDetail from './ArticleDetail';
import SignUp from './SignUp';

export default function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/author-frontend/dashboard">
          <h1 className="pagetitle">Nico's Blog (author)</h1>
        </Link>
      </nav>
      <Switch>
        <Route path="/author-frontend" exact>
          {loggedIn || localStorage.getItem('token') ? (
            <Redirect to="/author-frontend/dashboard" />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
        <Route path="/author-frontend/signup" exact>
          {loggedIn || localStorage.getItem('token') ? (
            <Redirect to="/author-frontend/dashboard" />
          ) : (
            <SignUp signal={setLoggedIn} />
          )}
        </Route>
        <Route path="/author-frontend/dashboard" exact>
          {loggedIn || localStorage.getItem('token') ? (
            <Dashboard />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
        <Route path="/author-frontend/article/:id">
          {loggedIn || localStorage.getItem('token') ? (
            <ArticleDetail />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
