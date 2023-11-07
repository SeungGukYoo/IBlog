import { useCallback, useContext, useEffect, useState } from 'react';

import AuthContext from 'context/AuthContext';
import PostsContext from 'context/PostsContext';
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import Post from './Post';

interface Props {
  hasNavigation?: boolean;
  defaultTab?: 'all' | 'my' | CategoryType;
}
export interface CommentsType {
  uid: string;
  createdAt: string;
  email: string;
  comments: string;
}
export interface PostType {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  user: string;
  id: string;
  category: CategoryType;
  comments: CommentsType[];
}

type TabType = 'all' | 'my' | CategoryType;
export type CategoryType = 'Frotend' | 'Backend' | 'ios' | 'Andoroid';
export const CATEGORYS: CategoryType[] = ['Frotend', 'Backend', 'ios', 'Andoroid'];
function PostList({ hasNavigation = true, defaultTab = 'all' }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const { firebaseClient } = useContext(PostsContext);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostType[]>([]);
  const getPosts = useCallback(async () => {
    setPosts([]);
    const postRef = collection(db, 'posts');
    let postsQuery;
    if (activeTab === 'my') {
      postsQuery = query(postRef, where('uid', '==', user?.uid), orderBy('createdAt', 'asc'));
    } else if (activeTab === 'all') {
      postsQuery = query(postRef, orderBy('createdAt', 'asc'));
    } else {
      postsQuery = query(postRef, where('category', '==', activeTab), orderBy('createdAt', 'asc'));
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc: DocumentSnapshot<DocumentData, DocumentData>) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts(prev => [...prev, dataObj as PostType]);
    });
  }, [activeTab, user?.uid]);
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
          {CATEGORYS?.map(category => {
            return (
              <div
                key={category}
                role="presentation"
                onClick={() => setActiveTab(category)}
                className={activeTab === category ? 'post__navigation-active' : ''}
              >
                {category}
              </div>
            );
          })}
        </div>
      )}

      <div className="post__list">
        {posts && posts.length > 0 ? (
          posts?.map(post => {
            console.log(post);
            return <Post post={post} key={post.id} getPosts={getPosts} />;
          })
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default PostList;
