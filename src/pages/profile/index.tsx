import Header from 'components/Header';
import PostList from 'components/PostList';
import Profile from 'components/Profile';

function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
    </>
  );
}

export default ProfilePage;
