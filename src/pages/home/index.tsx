import Footer from 'components/Footer';
import Header from 'components/Header';
import PostList from 'components/PostList';
import React from 'react';
function Home() {
  return (
    <div>
      <Header />
      <PostList />
      <Footer />
    </div>
  );
}

export default Home;
