import { AuthContextProvider } from 'context/AuthContext';
import { PostsProviderContext } from 'context/PostsContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthContextProvider>
    <PostsProviderContext>
      <Router>
        <App />
      </Router>
    </PostsProviderContext>
  </AuthContextProvider>,
);
