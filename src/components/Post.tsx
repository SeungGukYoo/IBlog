import PostsContext from 'context/PostsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostType {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  user: string;
  id: string;
}

interface PropsType {
  key: string;
  post: PostType;
  getPosts: () => Promise<void>;
}

function Post({ post, getPosts }: PropsType) {
  const { firebaseClient } = useContext(PostsContext);

  const handleDelete = async () => {
    try {
      if (confirm('삭제하시겠습니까?')) {
        await firebaseClient?.deleteData(post.id);
        toast.success('성공적으로 삭제하였습니다.', { autoClose: 1000, pauseOnHover: false });
        getPosts();
      }
    } catch (error) {
      toast.error('에러가 발생하였습니다.', { autoClose: 1000, pauseOnHover: false });
      console.error(error);
    }
  };
  return (
    <div key={post.id} className="post__box">
      <Link to={`/posts/${post.id}`}>
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__auth-name">{post.user}</div>
          <div className="post__date">{post.createdAt}</div>
        </div>
        <div className="post__title">{post.title}</div>
        <div className="post__text">{post.summary}</div>
      </Link>
      <div className="post__util-box">
        <div className="post__delete" onClick={handleDelete}>
          delete
        </div>
        <div className="post__edit">
          <Link to={`/posts/edit/${post.id}`}>edit</Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
