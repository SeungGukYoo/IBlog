import Loader from 'components/Loader';
import Router from 'components/Router';
import AuthContext from 'context/AuthContext';
import ThemeContext from 'context/ThemeContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { theme } = useContext(ThemeContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAuth(app)?.currentUser);
  const [init, setInit] = useState(false);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!auth) return;
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <div className={theme === 'light' ? 'white' : 'dark'}>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      <ToastContainer />
    </div>
  );
}

export default App;
