import PostsContext from 'context/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Comments from './Comments';
import Loader from './Loader';
import { PostType } from './PostList';

function PostDetail() {
  const { firebaseClient } = useContext(PostsContext);
  const [init, setInit] = useState(false);
  const [post, setPost] = useState<null | PostType>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (confirm('삭제하시겠습니까?') && post) {
        await firebaseClient?.deleteData(post.id);
        toast.success('성공적으로 삭제하였습니다.', { autoClose: 1000, pauseOnHover: false });
        navigate('/');
      }
    } catch (error) {
      toast.error('에러가 발생하였습니다.', { autoClose: 1000, pauseOnHover: false });
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const docSnap = await firebaseClient?.getPost(id);
        setPost({ ...(docSnap?.data() as PostType), id });
        setInit(true);
      };
      getData();
    } else {
      toast.error('잘못된 경로로 접근하였습니다 ❌', { autoClose: 1000, pauseOnHover: false });
      navigate('/');
    }
  }, [firebaseClient, id, navigate]);

  return (
    <>
      <div className="post__detail">
        {init ? (
          <>
            <div className="post__box">
              <div className="post__title">{post?.title}</div>

              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__auth-name">{post?.user}</div>
                <div className="post__date">{post?.createdAt}</div>
                <div className="post__delete">삭제</div>
              </div>

              <div className="post__util-box">
                {post?.category && <div className="post__category">{post?.category}</div>}
                <div className="post__delete" onClick={handleDelete}>
                  delete
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${id}`}>edit</Link>
                </div>
              </div>
              <div className="post__text post__text-pre-wrap">{post?.content}</div>
            </div>
            <Comments />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default PostDetail;
