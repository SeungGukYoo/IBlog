import { createContext } from 'react';
import { FirebaseClient } from 'util/firebaseClient';
import { ContextProps } from './AuthContext';

const PostsContext = createContext({
  firebaseClient: null as null | FirebaseClient,
});

export const PostsProviderContext = ({ children }: ContextProps) => {
  const firebaseClient = new FirebaseClient();

  return <PostsContext.Provider value={{ firebaseClient }}>{children}</PostsContext.Provider>;
};
export default PostsContext;
