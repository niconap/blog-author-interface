import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './Login';

export default function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/">
          <h1>Nico's Blog (author)</h1>
        </Link>
      </nav>
      <Switch>
        <Route path="/">
          {loggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login signal={setLoggedIn} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
