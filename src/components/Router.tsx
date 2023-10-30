import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        <Route path="/posts" element={<h1>hello world</h1>} />
        <Route path="/posts/:id" element={<h1>hello detail</h1>} />
        <Route path="/posts/new" element={<h1>hello new page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>hello edit page</h1>} />
        <Route path="/profile" element={<h1>profile page</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default Router;
