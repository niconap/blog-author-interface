import React, { useState } from 'react';
import uniqid from 'uniqid';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export default function SignUp(params) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [messages, setMessages] = useState([]);
  const [logIn, setLogIn] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  function logInCall() {
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
        console.log(results);
        if (!results.user) {
        } else if (results.user) {
          localStorage.setItem('token', `Bearer ${results.token}`);
          setLogIn(true);
          params.signal(true);
        }
      })
      .catch((error) => setError(error));
  }

  function signupCall(e) {
    e.preventDefault();
    fetch('http://localhost:3000/blog/authors/', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((results) => {
        if (!results.author) {
          setMessages(results.errors);
        } else if (results.author) {
          logInCall();
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

  function handleFirstnameChange(e) {
    setFirstname(e.target.value);
  }

  function handleLastnameChange(e) {
    setLastname(e.target.value);
  }

  if (!logIn) {
    return (
      <div id="loginform">
        <h2>Let's sign you up!</h2>
        <form onSubmit={signupCall}>
          <input
            type="text"
            name="firstname"
            placeholder="First name..."
            value={firstname}
            onChange={handleFirstnameChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name..."
            value={lastname}
            onChange={handleLastnameChange}
          />
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
          <ul>
            {messages
              ? messages.map((error) => {
                  return <li key={uniqid}>{error.msg}</li>;
                })
              : ''}
          </ul>
          <p>
            Already have an account? Log in <a href="/author-frontend/">here</a>
            !
          </p>
        </form>
      </div>
    );
  } else if (error) {
    return <p>Something went wrong! {error}</p>;
  } else {
    return <p>Signup complete!</p>;
  }
}
