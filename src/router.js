import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Routes() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <h1>Nico's Blog (author)</h1>
        </Link>
      </nav>
      <Switch>
        <Route path="/"></Route>
      </Switch>
    </Router>
  );
}
