import React, { useState } from 'react';

export default function Login(params) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logIn, setLogIn] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function logInCall(e) {
    e.preventDefault();
    fetch('https://www.niconap.ga/auth/login', {
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
        <h3>Log in</h3>
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
          <button>Log in</button>
          <p id="message">{message}</p>
        </form>
      </div>
    );
  } else if (error) {
    return <p>Oops an error occured! {error}</p>;
  } else {
    return <p>Log in successful!</p>;
  }
}
