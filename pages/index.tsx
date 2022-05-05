import fs from "fs";
import { join } from "path";
import type { Meta } from "../types/Meta";
import PostCard from "../components/PostCard";

export async function getStaticProps() {
  const postsDirectory = join(process.cwd(), "pages/posts");
  const files = fs.readdirSync(postsDirectory);

  const metaData: Meta[] = await Promise.all(
    files.map(async (file) => {
      const { meta }: { meta: Meta } = await import(`../pages/posts/${file}`);
      return meta;
    })
  );

  return { props: { metaData } };
}

const Home = ({ metaData }: { metaData: Meta[] }) => {
  console.log("metadata", metaData);
  return (
    <div className="w-full grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-5">
      {metaData.map((post, i) => (
        <PostCard
          key={i}
          title={post.title}
          caption={post.caption}
          thumbnail={post.thumbnail}
        />
      ))}
    </div>
  );
};

export default Home;
