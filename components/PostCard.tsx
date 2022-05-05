import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  title,
  caption,
  thumbnail,
}: {
  title: string;
  caption: string;
  thumbnail?: string;
}) => {
  return (
    <div className="rounded h-fit overflow-hidden flex flex-col font-lato bg-white drop-shadow-md">
      <Link href={`/`} passHref={true}>
        <div className="aspect-[3/2] cursor-pointer relative overflow-hidden">
          <Image
            src={thumbnail || "https://via.placeholder.com/300"}
            alt="Post Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>
      </Link>
      <div className="w-full p-3">
        <h2 className="font-semibold text-lg cursor-pointer w-full">{title}</h2>
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
