import fs from "fs";
import matter from "gray-matter";
import PostCard from "../components/PostCard";
import type { Post, Frontmatter } from "../types/Post";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data, content } = matter(readFile);
    const frontmatter: Frontmatter = {
      title: data["title"],
      date: data["date"],
      thumbnail: data["thumbnail"],
    };
    const post: Post = {
      frontmatter,
      content,
      slug,
    };
    return post;
  });

  return {
    props: {
      posts,
    },
  };
}

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-full grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-5">
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
    </div>
  );
};

export default Home;
