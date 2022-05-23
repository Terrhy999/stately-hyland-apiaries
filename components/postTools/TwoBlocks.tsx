import Image from "next/image";
import type { PostImage } from "../../types/PostImage";
import PostImage from "./PostImage";

const TwoBlocks = ({ postImages }: { postImages: PostImage[] }) => {
  return (
    <div className="w-full flex">
      <PostImage />
    </div>
  );
};

export default TwoBlocks;
