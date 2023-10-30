import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header>
        <div>
          <Link to="/posts/new">글 쓰기</Link>
          <Link to="/posts">목록</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </header>
      <div className="post-list">post list</div>
      <footer>
        <div>menu 1</div>
        <div>menu 2</div>
        <div>menu 3</div>
      </footer>
    </div>
  );
}

export default Home;
