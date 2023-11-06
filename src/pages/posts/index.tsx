import Footer from 'components/Footer';
import Header from 'components/Header';
import PostList from 'components/PostList';
import React from 'react';

function PostsPage() {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} defaultTab="all" />
      <Footer />
    </>
  );
}

export default PostsPage;
