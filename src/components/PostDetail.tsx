import PostsContext from 'context/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { PostType } from './PostList';

function PostDetail() {
  const { firebaseClient } = useContext(PostsContext);
  const [init, setInit] = useState(false);
  const [post, setPost] = useState<null | PostType>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const data = await firebaseClient?.getPosts(id);
        setPost({ ...(data as PostType) });
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
      {init ? (
        <div className="post__detail">
          <div className="post__box">
            <div className="post__title">{post?.title}</div>

            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__auth-name">{post?.user}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>

            <div className="post__util-box">
              <div className="post__delete">delete</div>
              <div className="post__edit">
                <Link to={`/posts/edit/${id}`}>edit</Link>
              </div>
            </div>
            <div className="post__text post__text-pre-wrap">{post?.content}</div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PostDetail;
