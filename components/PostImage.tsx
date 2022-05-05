import Image from "next/image";

const PostImage = ({
  src,
  height,
  width,
  alt,
  justify,
  caption,
}: {
  src: string;
  height: number;
  width: number;
  alt: string;
  justify: "start" | "end" | "center";
  caption?: string;
}) => {
  return (
    <div className={`flex flex-col items-${justify} w-full justify-${justify}`}>
      <Image src={src} height={height} width={width} alt={alt} />
      <span className="text-sm mx-10 mt-3">{caption}</span>
    </div>
  );
};

export default PostImage;
