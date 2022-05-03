import { Post } from "../types/Post";
import { compiler } from "markdown-to-jsx";

const BlogPost = ({ post }: { post: Post }) => {
  const content = compiler(post.content, { wrapper: null });

  return (
    <div className="flex flex-col prose font-lato" key={post.slug}>
      <h1 className="text-[40px] font-bold text-[#2d2d2d] cursor-pointer">
        {post.frontmatter.title}
      </h1>
      <p>{post.frontmatter.date}</p>
      <div className="flex flex-col w-full text-lg prose prose-blockquote:border-gray-600 prose-blockquote:bg-gray-300">
        {content}
      </div>
    </div>
  );
};

export default BlogPost;
