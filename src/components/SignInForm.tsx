import React from 'react';
import { Link } from 'react-router-dom';

function SignInForm() {
  return (
    <form action="/post" method="POST" className="form from-lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">아이디</label>
        <input type="text" name="email" id="email" />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="form__block">
        아직 회원이 아니신가요?{' '}
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn-submit" />
      </div>
    </form>
  );
}

export default SignInForm;
