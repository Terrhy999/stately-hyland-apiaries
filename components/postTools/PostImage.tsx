import Image from "next/image";
import { PostImage } from "../../types/PostImage";

const PostImage = ({
  src,
  height,
  width,
  alt,
  justify,
  caption,
}: PostImage) => {
  return (
    <div className={`flex flex-col items-${justify} justify-${justify} py-3`}>
      <Image src={src} height={height} width={width} alt={alt} />
      <span className="text-sm mx-10 mt-3 italic">{caption}</span>
    </div>
  );
};

export default PostImage;
