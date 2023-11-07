import ThemeContext from 'context/ThemeContext';
import { useContext } from 'react';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
  const { theme, toggleMode } = useContext(ThemeContext);
  return (
    <footer>
      <Link to="/posts/new">글 쓰기</Link>
      <Link to="/posts">목록</Link>
      <Link to="/profile">프로필</Link>
      <div className="footer__theme-btn">
        {theme === 'light' ? <BsMoonFill onClick={toggleMode} /> : <BsSun onClick={toggleMode} />}
      </div>
    </footer>
  );
}

export default Footer;
