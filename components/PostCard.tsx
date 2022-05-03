import Image from "next/image";
import Link from "next/link";
import type { Post } from "../types/Post";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div
      key={post.slug}
      className="rounded h-fit overflow-hidden flex flex-col font-lato bg-white drop-shadow-md"
    >
      <Link href={`/posts/${post.slug}`} passHref={true}>
        <div className="aspect-[3/2] cursor-pointer relative overflow-hidden">
          <Image
            src={post.frontmatter.thumbnail}
            alt="Post Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>
      </Link>
      <div className="w-full p-3">
        <h2 className="font-semibold text-lg cursor-pointer w-full">
          {post.frontmatter.title}
        </h2>
        <p>{post.frontmatter.date}</p>
      </div>
    </div>
  );
};

export default PostCard;
