import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'summary') {
      setSummary(value);
    }
    if (name === 'content') {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, 'posts'), {
        user: user?.email,
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
      });
      console.log(docRef);
      toast.success('게시글이 성공적으로 저장되었습니다 👏', {
        autoClose: 1000,
        pauseOnHover: false,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('예기치 않은 오류가 발생하였습니다❗️', { autoClose: 1000, pauseOnHover: false });
    }
  };

  return (
    <form onSubmit={onSubmit} action="/post" method="POST" className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input onChange={onChange} type="text" name="title" required id="title" />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input onChange={onChange} type="text" name="summary" required id="summary" />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea onChange={onChange} name="content" id="content" required />
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn-submit" />
      </div>
    </form>
  );
}

export default PostForm;
