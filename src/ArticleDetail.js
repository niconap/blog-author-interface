import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Comment from './Comment';
import EditIcon from '@mui/icons-material/Edit';
import ArticleForm from './ArticleForm';

function ArticleDetail() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blog/posts/${id}`, {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        let { post } = result;
        setTitle(post.title);
        setAuthor(`${post.author.firstname} ${post.author.lastname}`);
        setTimestamp(
          DateTime.fromISO(post.timestamp).toLocaleString({
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
          })
        );
        setContent(post.content);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        setIsLoaded(true);
      });
    fetch(`http://localhost:3000/blog/posts/${id}/comments`, {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.error) {
          return;
        } else {
          setComments(results);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [id]);

  if (error) {
    return (
      <div id="error">
        <h1>An error occured!</h1>
        <p>Try reloading the page.</p>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div id="loading">
        <h1>Loading content...</h1>
      </div>
    );
  } else if (!edit) {
    return (
      <div id="container">
        <div id="content">
          <h1>{title}</h1>
          <button onClick={() => setEdit(!edit)} id="editbutton">
            <EditIcon /> Edit
          </button>
          <h2>{author}</h2>
          <h4>Posted on {timestamp}</h4>
          <p id="articletext">{content}</p>
        </div>
        <div id="comments">
          <h2>Comments</h2>
          {comments.length > 0
            ? comments.map((comment) => {
                return (
                  <Comment key={comment._id} articleId={id} data={comment} />
                );
              })
            : 'Currently there are no comments'}
        </div>
      </div>
    );
  } else {
    return (
      <div id="container">
        <div id="content">
          <h1>You're currently editing "{title}"</h1>
          <button onClick={() => setEdit(!edit)} id="editbutton">
            <EditIcon /> Cancel edit
          </button>
          <ArticleForm
            title={title}
            setEdit={setEdit}
            setTitle={setTitle}
            setContent={setContent}
            edit={true}
            id={id}
            content={content}
          />
        </div>
      </div>
    );
  }
}

export default ArticleDetail;
