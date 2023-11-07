import Header from 'components/Header';
import PostList from 'components/PostList';

function PostsPage() {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} defaultTab="all" />
    </>
  );
}

export default PostsPage;
