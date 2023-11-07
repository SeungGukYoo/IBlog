import AuthContext from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CommentsType, PostType } from './PostList';

interface CommentsProps {
  post: PostType;
  getData: (id: string) => Promise<void>;
}
function Comments({ post, getData }: CommentsProps) {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'comments') {
      setComments(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (post && post.id) {
        const postRef = doc(db, 'posts', post.id);
        if (user?.uid) {
          const commentObj = {
            comments,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
        }
        toast.success('성공적으로 댓글을 달았습니다 ✓');
        getData(post.id);
        setComments('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (comment: CommentsType) => {
    try {
      if (confirm('댓글을 삭제하시겠습니까?') && post.id) {
        const docRef = doc(db, 'posts', post.id);
        await updateDoc(docRef, {
          comments: arrayRemove(comment),
        });
        await getData(post.id);
        toast.success('댓글을 삭제하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="comments">
      <form onSubmit={onSubmit} action="post" className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea name="comments" id="comment" required value={comments} onChange={onChange} />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn--submit" />
        </div>
      </form>
      <div className="comments__list">
        {post.comments.map(comment => {
          return (
            <div key={comment.createdAt} className="comments__box">
              <div className="comments__profile-box">
                <div className="comments__author-email">{comment.email}</div>
                <div className="comments__date">{comment.createdAt}</div>
                {user?.uid && (
                  <div className="comments__delete-btn" onClick={() => onDelete(comment)}>
                    삭제
                  </div>
                )}
              </div>
              <div className="comments__text">{comment.comments}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
