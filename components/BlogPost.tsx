import Link from "next/link";

interface Post {
  title: string;
  date: Date;
  content: string;
  slug: string;
  key?: number;
}

const BlogPost = ({ title, date, content, slug, key }: Post) => {
  return (
    <div className="flex flex-col w-full font-lato" key={key}>
      <Link href={`/posts/${slug}`} passHref={true}>
        <h1 className="text-[40px] font-bold py-4 text-[#2d2d2d] cursor-pointer">
          <a>{title}</a>
        </h1>
      </Link>
      <p>{date.toLocaleDateString()}</p>
      <div className="flex flex-col w-full text-lg">{content}</div>
    </div>
  );
};

export default BlogPost;
