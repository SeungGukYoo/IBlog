import React, { useContext, useState } from 'react';

import PostsContext from 'context/PostsContext';
import Post from './Post';

interface Props {
  hasNavigation?: boolean;
}
export interface PostType {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  user: string;
  id: string;
}

type TabType = 'all' | 'my';
function PostList({ hasNavigation = true }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { posts } = useContext(PostsContext);

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
        {posts && posts.length > 0 ? (
          posts?.map(post => <Post post={post} key={post.id} />)
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default PostList;
