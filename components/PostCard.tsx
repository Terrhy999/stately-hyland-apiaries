import Image from "next/image";
import Link from "next/link";
import type { Meta } from "../types/Meta";

const PostCard = ({ title, date, caption, thumbnail, slug }: Meta) => {
  return (
    <Link href={`/posts/${slug}`} passHref={true}>
      <div className="rounded cursor-pointer overflow-hidden flex flex-col font-lato drop-shadow-md">
        <div className="aspect-[3/2] flex-shrink-0 relative overflow-hidden">
          <Image
            src={thumbnail || "https://via.placeholder.com/300"}
            alt="Post Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>
        <div className="w-full p-3 bg-white rounded">
          <h2 className="font-semibold text-lg w-full pb-2">{title}</h2>
          <p className="text-sm pb-2">{date}</p>
          <p>{caption}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
