import { CategoryType, PostType } from 'components/PostList';
import AuthContext from 'context/AuthContext';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useForm() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType | string>('');
  const [post, setPost] = useState<null | PostType>(null);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
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
    if (name === 'category') {
      setCategory(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (post && post.id) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          category,
          updatedAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });
        toast.success('게시글이 성공적으로 수정되었습니다 👏', {
          autoClose: 1000,
          pauseOnHover: false,
        });
        navigate(`/posts/${post.id}`);
      } else {
        const docRef = await addDoc(collection(db, 'posts'), {
          user: user?.email,
          title,
          summary,
          content,
          category,
          uid: user?.uid,
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });

        toast.success('게시글이 성공적으로 저장되었습니다 👏', {
          autoClose: 1000,
          pauseOnHover: false,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('예기치 않은 오류가 발생하였습니다❗️', { autoClose: 1000, pauseOnHover: false });
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category);
    }
  }, [post]);

  return {
    title,
    summary,
    content,
    category,
    onChange,
    setPost,
    onSubmit,
  };
}

export default useForm;
