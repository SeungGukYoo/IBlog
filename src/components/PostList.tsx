import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  hasNavigation?: boolean;
}
type TabType = 'all' | 'my';
function PostList({ hasNavigation = true }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation-active' : ''}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation-active' : ''}
          >
            나의 글
          </div>
        </div>
      )}

      <div className="post__list">
        {[...Array(10)].map((_, idx) => {
          return (
            <div key={idx} className="post__box">
              <Link to={`/posts/${idx}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__auth-name">hello</div>
                  <div className="post__date">2023.10.30 mon</div>
                </div>
                <div className="post__title">title {idx + 1}</div>
                <div className="post__text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae cum cumque
                  doloremque debitis iure hic placeat, atque sequi incidunt accusantium explicabo
                  minima aut minus mollitia autem vel qui quis laudantium dignissimos deleniti
                  doloribus voluptates similique soluta! Praesentium at impedit dignissimos. Dolore
                  quam vero sed magni exercitationem nam enim velit facere iusto debitis. Illum
                  recusandae magni dolore itaque officiis necessitatibus eius est? Atque, dolor
                  omnis. Fugit vel, iste dolorem aliquam distinctio quo placeat nihil itaque
                  expedita, perspiciatis reprehenderit quos quaerat quia, iusto esse nemo quas nisi
                  corporis. Quis sunt, ratione neque aperiam voluptates vero illum esse omnis error
                  deleniti molestias deserunt!
                </div>
                <div className="post__util-box">
                  <div className="post__delete">delete</div>
                  <div className="post__edit">edit</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PostList;
