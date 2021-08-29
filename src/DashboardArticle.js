import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import DeleteRoundedIcon from '@material-ui/icons/Delete';
import CloseRoundedIcon from '@material-ui/icons/Close';

export default function DashboardArticle(params) {
  let { data } = params;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [publicized, setPublicized] = useState(false);

  function changeDelete() {
    if (confirmDelete) {
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  }

  function deleteArticle() {
    fetch(`https://www.niconap.ga/blog/posts/${data._id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.message) {
          setDeleted(true);
        }
      })
      .catch((error) => console.log(error));
  }

  function publicizeArticle() {
    fetch(`https://www.niconap.ga/blog/posts/${data._id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        public: true,
      }),
    })
      .then((response) => response.json())
      .then((results) => setPublicized(true))
      .catch((error) => console.log(error));
  }

  if (!deleted) {
    return (
      <li className="article" key={data._id}>
        <Link to={'/article/' + data._id}>
          <h4>{data.title}</h4>
        </Link>
        <p>
          {DateTime.fromISO(data.timestamp).toLocaleString({
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
          })}
        </p>
        {!data.public && !publicized ? (
          <button onClick={publicizeArticle}>Publicize</button>
        ) : (
          ''
        )}
        <button onClick={changeDelete}>
          {confirmDelete ? <CloseRoundedIcon /> : <DeleteRoundedIcon />}
        </button>
        {confirmDelete ? <p>Are you sure?</p> : ''}
        {confirmDelete ? <button onClick={deleteArticle}>Confirm</button> : ''}
      </li>
    );
  } else {
    return <h4 id="deletemessage">"{data.title}" has been deleted!</h4>;
  }
}
