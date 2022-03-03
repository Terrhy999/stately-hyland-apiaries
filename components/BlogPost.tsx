import Link from "next/link";

const BlogPost = () => {
  return (
    <div className="flex flex-col w-full font-lato">
      <Link href={"/"} passHref={true}>
        <h1 className="text-[40px] font-bold py-4 text-[#2d2d2d] cursor-pointer">
          <a>Post Title</a>
        </h1>
      </Link>
      <div className="flex flex-col w-full text-lg">Post Content</div>
    </div>
  );
};

export default BlogPost;
