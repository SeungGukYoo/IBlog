import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { PostType } from './PostList';

function PostDetail() {
  const [init, setInit] = useState(false);
  const [post, setPost] = useState<null | PostType>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const getData = async () => {
        const docSnap = await getDoc(docRef);
        setPost({ ...(docSnap.data() as PostType) });
        setInit(true);
      };
      getData();
    } else {
      toast.error('잘못된 경로로 접근하였습니다 ❌', { autoClose: 1000, pauseOnHover: false });
      navigate('/');
    }
  }, [id, navigate]);

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
                <Link to={`/posts/edit/:${post?.id}`}>edit</Link>
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
