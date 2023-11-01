import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from 'firebaseApp';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      } else if (value.length >= 0 && confirmPassword !== value) {
        setError('비밀번호와 비밀번호 확인 값이 서로 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setConfirmPassword(value);
      if (value.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (value !== password) {
        setError('비밀번호와 비밀번호 확인 값이 서로 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const auth = getAuth(app);

      const info = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('회원가입이 완료되었습니다🎉', {
        position: 'top-right',
        autoClose: 1300,
        theme: 'light',
      });
      navigate('/signin');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('이미 회원가입 된 사용자가 있습니다.');
        }
      } else console.error(error);
    }
  };
  return (
    <form onSubmit={onSubmit} action="/post" method="POST" className="form from-lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">아이디</label>
        <input type="text" name="email" id="email" required onChange={onChangeValue} />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required onChange={onChangeValue} />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChangeValue}
        />
      </div>
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/signin" className="form__link">
          로그인하기
        </Link>
      </div>
      {error && error?.length && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn-submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
}

export default SignUpForm;
