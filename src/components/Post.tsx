import React from 'react';
import { Link } from 'react-router-dom';

interface PostType {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  user: string;
  id: string;
}

interface PropsType {
  key: string;
  post: PostType;
}

function Post({ post }: PropsType) {
  console.log(post);
  return (
    <div key={post.id} className="post__box">
      <Link to={`/posts/${post.id}`}>
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__auth-name">{post.user}</div>
          <div className="post__date">{post.createdAt}</div>
        </div>
        <div className="post__title">{post.title}</div>
        <div className="post__text">{post.title}</div>
        <div className="post__util-box">
          <div className="post__delete">delete</div>
          <div className="post__edit">edit</div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
