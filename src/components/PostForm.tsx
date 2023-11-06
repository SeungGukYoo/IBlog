import PostsContext from 'context/PostsContext';
import useForm from 'hooks/useForm';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { PostType } from './PostList';

function PostForm() {
  const { firebaseClient } = useContext(PostsContext);
  const { id } = useParams();
  const { title, summary, content, onChange, setPost, onSubmit } = useForm();

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const docSnap = await firebaseClient?.getPost(id);
        setPost({ ...(docSnap?.data() as PostType), id });
      };
      getData();
    }
  }, [firebaseClient, id, setPost]);

  return (
    <form onSubmit={onSubmit} action="/post" method="POST" className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input onChange={onChange} type="text" name="title" required id="title" value={title} />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          onChange={onChange}
          type="text"
          name="summary"
          required
          id="summary"
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea onChange={onChange} name="content" id="content" required value={content} />
      </div>
      <div className="form__block">
        <input type="submit" value={id ? '수정' : '제출'} className="form__btn-submit" />
      </div>
    </form>
  );
}

export default PostForm;
