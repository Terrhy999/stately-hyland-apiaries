import Image from "next/image";
import { IPostImage } from "../../types";

const PostImage = ({
  src,
  height,
  width,
  alt,
  justify,
  caption,
}: IPostImage) => {
  return (
    <div className={`flex flex-col items-${justify} justify-${justify} py-3`}>
      <Image src={src} height={height} width={width} alt={alt} />
      <span className="text-sm mx-10 mt-3 italic">{caption}</span>
    </div>
  );
};

export default PostImage;
