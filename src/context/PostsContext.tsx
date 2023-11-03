import { PostType } from 'components/PostList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { createContext, useEffect, useState } from 'react';
import { FirebaseClient } from 'util/firebaseClient';
import { ContextProps } from './AuthContext';

type PostsType = Array<PostType>;

const PostsContext = createContext({
  posts: null as null | Array<PostType>,
  firebaseClient: null as null | FirebaseClient,
});

export const PostsProviderContext = ({ children }: ContextProps) => {
  const [posts, setPosts] = useState<PostsType>([]);
  const firebaseClient = new FirebaseClient();
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
    <PostsContext.Provider value={{ posts, firebaseClient }}>{children}</PostsContext.Provider>
  );
};
export default PostsContext;
