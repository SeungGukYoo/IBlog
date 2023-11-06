import React, { useState } from 'react';
const MOCK_COMMENT = [
  { id: 1, email: 'test1@email.com', createdAt: '2023-07-13', content: '안녕하세요1' },
  { id: 2, email: 'test2@email.com', createdAt: '2023-07-14', content: '안녕하세요2' },
  { id: 3, email: 'test3@email.com', createdAt: '2023-07-15', content: '안녕하세요3' },
  { id: 4, email: 'test4@email.com', createdAt: '2023-07-16', content: '안녕하세요4' },
  { id: 5, email: 'test5@email.com', createdAt: '2023-07-17', content: '안녕하세요5' },
  { id: 6, email: 'test6@email.com', createdAt: '2023-07-18', content: '안녕하세요6' },
  { id: 7, email: 'test7email.com', createdAt: '2023-07-19', content: '안녕하세요7' },
  { id: 8, email: 'test8@email.com', createdAt: '2023-07-12', content: '안녕하세요8' },
  { id: 9, email: 'test9@email.com', createdAt: '2023-07-11', content: '안녕하세요9' },
  { id: 10, email: 'test10@email.com', createdAt: '2023-07-10', content: '안녕하세요10' },
];
function Comments() {
  const [comments, setComments] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'comments') {
      setComments(value);
    }
  };
  return (
    <div className="comments">
      <form action="post" className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea name="comments" id="comment" required value={comments} onChange={onChange} />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn--submit" />
        </div>
      </form>
      <div className="comments__list">
        {MOCK_COMMENT.map(comment => {
          return (
            <div key={comment.id} className="comments__box">
              <div className="comments__profile-box">
                <div className="comments__author-email">{comment.email}</div>
                <div className="comments__date">{comment.createdAt}</div>
                <div className="comments__delete-btn">삭제</div>
              </div>
              <div className="comments__text">{comment.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
