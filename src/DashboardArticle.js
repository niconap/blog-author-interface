import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function DashboardArticle(params) {
  let { data } = params;

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
    </li>
  );
}
