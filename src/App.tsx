import Router from 'components/Router';
import { getAuth } from 'firebase/auth';
import app from 'firebaseApp';

import React, { useEffect, useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAuth(app)?.currentUser);

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
