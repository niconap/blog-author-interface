import React, { useState } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/Delete';
import CloseRoundedIcon from '@material-ui/icons/Close';
import { DateTime } from 'luxon';

export default function Comment(params) {
  const [commentDelete, setCommentDelete] = useState(false);
  const [message, setMessage] = useState('');
  var { data } = params;

  function changeCommentDelete() {
    commentDelete ? setCommentDelete(false) : setCommentDelete(true);
  }

  function deleteComment() {
    fetch(
      `https://www.niconap.ga/blog/posts/${params.articleId}/comments/${data._id}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    )
      .then((response) => response.json())
      .then((results) => {
        if (results.message) {
          setMessage(results.message);
        }
      })
      .catch((error) => console.log(error));
  }

  if (message === '') {
    return (
      <div key={data._id} className="comment">
        <h4>{data.name}</h4>
        <p>{data.content}</p>
        <p id="commenttimestamp">
          {DateTime.fromISO(data.timestamp).toLocaleString({
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
          })}
        </p>
        <button onClick={changeCommentDelete}>
          {commentDelete ? <CloseRoundedIcon /> : <DeleteRoundedIcon />}
        </button>
        {commentDelete ? <button onClick={deleteComment}>Confirm</button> : ''}
      </div>
    );
  } else {
    return <h4>{message}</h4>;
  }
}
