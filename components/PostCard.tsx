import Image from "next/image";
import Link from "next/link";
import type { IPostCard } from "../types";
import { getFormattedDate } from "../lib/utils";

const PostCard = ({ title, date, caption, imageAsset, slug }: IPostCard) => {
  return (
    <Link href={`/post/${slug}`} passHref={true}>
      <div className="rounded cursor-pointer overflow-hidden flex flex-col font-lato drop-shadow-md">
        <div className="aspect-[3/2] flex-shrink-0 relative overflow-hidden">
          <Image
            src={imageAsset.url || "https://via.placeholder.com/300"}
            alt="Post Thumbnail"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            sizes="(max-width: 638px) 100vw,
                    (max-width: 1024px) 50vw,
                      33vw"
            // width={imageAsset.metadata.dimensions.width}
            // height={imageAsset.metadata.dimensions.height}
          />
        </div>
        <div className="w-full p-3 bg-white flex-grow rounded">
          <h2 className="font-semibold text-lg w-full pb-2">{title}</h2>
          <p className="text-sm pb-2">{getFormattedDate(date)}</p>
          <p>{caption}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
