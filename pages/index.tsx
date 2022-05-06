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
  return (
    <div className="w-full h-min grid grid-cols sm:grid-cols-2 lg:grid-cols-3 p-3 gap-5">
      {metaData.map((post, i) => (
        <PostCard
          key={i}
          title={post.title}
          date={post.date}
          caption={post.caption}
          thumbnail={post.thumbnail}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Home;
