import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <Link to="/posts/new">글 쓰기</Link>
      <Link to="/posts">목록</Link>
      <Link to="/profile">프로필</Link>
    </footer>
  );
}

export default Footer;
