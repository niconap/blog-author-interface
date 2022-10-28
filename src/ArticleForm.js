import React, { useState } from 'react';
import uniqid from 'uniqid';

export default function ArticleForm(params) {
  const [title, setTitle] = useState(params.title ? params.title : '');
  const [content, setContent] = useState(params.content ? params.content : '');
  const [privatePost, setPrivatePost] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  function submitForm(e) {
    e.preventDefault();
    if (!params.edit) {
      fetch('http://localhost:3000/blog/posts', {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          public: !privatePost,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          if (results.errors) {
            setErrors(results.errors);
          } else {
            setSuccess(results.message);
            params.push(results.post);
            setTitle('');
            setContent('');
            setPrivatePost(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://localhost:3000/blog/posts/${params.id}`, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          public: !privatePost,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          if (results.errors) {
            setErrors(results.errors);
          } else {
            setSuccess(results.message);
            params.setTitle(title);
            params.setContent(content);
            setTitle('');
            setContent('');
            setPrivatePost(false);
            params.setEdit(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handlePrivateChange(e) {
    setPrivatePost(e.target.checked);
  }

  return (
    <form id="articleform" onSubmit={submitForm}>
      <input
        type="text"
        name="title"
        placeholder="Title..."
        onChange={handleTitleChange}
        value={title}
      />
      <textarea
        name="content"
        placeholder="Content..."
        onChange={handleContentChange}
        value={content}
      ></textarea>
      <label htmlFor="public">Is this post private?</label>
      <input
        type="checkbox"
        name="public"
        value={privatePost}
        onChange={handlePrivateChange}
      />
      <button>Post</button>
      <ul>
        {errors.map((error) => {
          return <li key={uniqid()}>{error.msg}</li>;
        })}
      </ul>
      {success}
    </form>
  );
}
