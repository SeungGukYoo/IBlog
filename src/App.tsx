import Router from 'components/Router';
import { getAuth } from 'firebase/auth';
import app from 'firebaseApp';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAuth(app)?.currentUser);

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
      <ToastContainer />
    </>
  );
}

export default App;
