import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import PostList from '../pages/posts';
import PostDetail from '../pages/posts/detail';
import PostEdit from '../pages/posts/edit';
import PostNew from '../pages/posts/new';
import Profile from '../pages/profile';
import SignInPage from '../pages/signin';
import SignUpPage from '../pages/signup';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<SignUpPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default Router;
