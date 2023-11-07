import { Auth, User, getAuth, onAuthStateChanged } from 'firebase/auth';
import app from 'firebaseApp';
import { ReactNode, createContext, useEffect, useState } from 'react';

export interface ContextProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
  auth: null as Auth | null,
});

export const AuthContextProvider = ({ children }: ContextProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser, auth }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
