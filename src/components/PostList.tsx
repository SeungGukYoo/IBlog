import React, { useCallback, useContext, useEffect, useState } from 'react';

import PostsContext from 'context/PostsContext';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
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
  const { firebaseClient } = useContext(PostsContext);
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = useCallback(async () => {
    const datas = await firebaseClient?.getPosts();
    setPosts([]);
    datas?.forEach((doc: DocumentSnapshot<DocumentData, DocumentData>) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts(prev => [...prev, dataObj as PostType]);
    });
  }, [firebaseClient]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
          posts?.map(post => <Post post={post} key={post.id} getPosts={getPosts} />)
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default PostList;
