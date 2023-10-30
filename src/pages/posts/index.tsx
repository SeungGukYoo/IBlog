import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PostList from '../../components/PostList';

function PostsPage() {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
}

export default PostsPage;
