import AuthContext from 'context/AuthContext';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignInForm() {
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      const validationEmailRegex = /^[a-zA-Z0-9]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!email.match(validationEmailRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (value.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!auth) return;
      const info = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`${info.user.email}님 환영합니다🎉`, {
        autoClose: 1300,
        theme: 'light',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-login-credentials') {
          setError('아이디 혹은 비밀번호를 다시 확인 해주시길 바랍니다.');
        }
      }
    }
  };
  return (
    <form onSubmit={onSubmit} action="/post" method="POST" className="form from-lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">아이디</label>
        <input type="text" name="email" id="email" onChange={onChageValue} />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" onChange={onChageValue} />
      </div>
      <div className="form__block">
        아직 회원이 아니신가요?{' '}
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn-submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
}

export default SignInForm;
