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

export default function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/dashboard">
          <h1>Nico's Blog (author)</h1>
        </Link>
      </nav>
      <Switch>
        <Route path="/" exact>
          {loggedIn || localStorage.getItem('token') ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
        <Route path="/dashboard" exact>
          {loggedIn || localStorage.getItem('token') ? (
            <Dashboard />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
