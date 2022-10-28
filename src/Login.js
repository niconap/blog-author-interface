import React, { useState } from 'react';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export default function Login(params) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logIn, setLogIn] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function logInCall(e) {
    e.preventDefault();
    fetch('http://localhost:3000/auth/login', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((results) => {
        if (!results.user) {
          setMessage(results.info.message);
        } else if (results.user) {
          localStorage.setItem('token', `Bearer ${results.token}`);
          setLogIn(true);
          params.signal(true);
        }
      })
      .catch((error) => setError(error));
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (!logIn) {
    return (
      <div id="loginform">
        <h3>Welcome back! Log in</h3>
        <form onSubmit={logInCall}>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={handlePasswordChange}
          />
          <div id="loginbuttons">
            <button id="login">
              <CheckRoundedIcon />
            </button>
          </div>
          <p id="message">{message}</p>
        </form>
        <p>
          Don't have an account? Sign up{' '}
          <a href="/author-frontend/signup">here</a>!
        </p>
      </div>
    );
  } else if (error) {
    return <p>Oops an error occured! {error}</p>;
  } else {
    return <p>Log in successful!</p>;
  }
}
