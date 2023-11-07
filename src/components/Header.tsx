import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/" className="header__logo">
        IBlog
      </Link>
      <div>
        <Link to="/posts/new">글 쓰기</Link>
        <Link to="/posts">목록</Link>
        <Link to="/profile">프로필</Link>
      </div>
    </header>
  );
}

export default Header;
