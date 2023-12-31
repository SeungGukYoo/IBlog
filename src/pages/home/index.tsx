import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PostList from 'components/PostList';

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <PostList defaultTab="all" />
      <Footer />
    </div>
  );
}

export default Home;
