import { PostType } from 'components/PostList';
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
  const [post, setPost] = useState<null | PostType>(null);
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
      if (post && post.id) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString(),
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
          uid: user?.uid,
          createdAt: new Date()?.toLocaleDateString(),
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
      console.log(post);
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

  return {
    title,
    summary,
    content,
    onChange,
    setPost,
    onSubmit,
  };
}

export default useForm;
