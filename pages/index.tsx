import type { NextPage } from "next";
import BlogPost from "../components/BlogPost";

const Home: NextPage = () => {
  return (
    <div className="min-w-full flex justify-center">
      <div className="grid max-w-2xl mx-3 gap-4 justify-items-center">
        <BlogPost
          title="Test title"
          date={new Date()}
          content="this is a whole bunch of content"
          slug="test"
        />
      </div>
    </div>
  );
};

export default Home;
