import fs from "fs";
import matter from "gray-matter";
import BlogPost from "../../components/BlogPost";
import { Frontmatter, Post } from "../../types/Post";

export async function getStaticPaths() {
  const slugs = fs.readdirSync("posts");

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug.replace(/\.md$/, ""),
        },
      };
    }),
    fallback: false,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const fileContents = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
  const { data, content } = matter(fileContents);
  const frontmatter: Frontmatter = {
    title: data["title"],
    date: data["date"],
    thumbnail: data["thumbnail"],
  };
  const post: Post = {
    frontmatter,
    content,
    slug: params.slug,
  };
  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }: { post: Post }) => {
  return <BlogPost post={post} />;
};

export default PostPage;
