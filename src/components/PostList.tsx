import { constants } from 'buffer';
import { collection, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

interface Props {
  hasNavigation?: boolean;
}
interface PostType {
  content: string;
  createdAt: string;
  summary: string;
  title: string;
  user: string;
  id: string;
}
type PostsType = Array<PostType>;
type TabType = 'all' | 'my';
function PostList({ hasNavigation = true }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [posts, setPosts] = useState<PostsType>([]);
  useEffect(() => {
    const getPosts = async () => {
      const querySnapShot = await getDocs(collection(db, 'posts'));
      const arr: PostsType = [];
      querySnapShot.forEach(doc => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        } as PostType;
        arr.push(obj);
      });
      setPosts(prev => {
        return [...prev, ...arr];
      });
    };

    getPosts();
  }, []);

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
        {posts.length > 0 ? posts.map(post => <Post post={post} key={post.id} />) : <>helo</>}
      </div>
    </>
  );
}

export default PostList;
