import Image from "next/image";
import { IPostImageAndText } from "../../types";

const PostImageAndText = ({
  src,
  width,
  height,
  paragraphs,
  imageJustify = "left",
  percentageWidth = 40,
}: IPostImageAndText) => {
  const flexDirection =
    imageJustify == "left"
      ? "md:flex-row"
      : "md:flex-row-reverse md:space-x-reverse";

  const getPercentageWidth = (percentage: number): string => {
    if (percentage < 1 || percentage > 100) {
      throw new Error("percentageWidth must be an integer between 1 and 100");
    } else {
      return percentage + "%";
    }
  };

  return (
    <div
      className={`w-full flex flex-col ${flexDirection} items-center md:space-x-3 py-5`}
    >
      <div
        className="hidden relative shrink-0 h-fit"
        style={{ flexBasis: `${getPercentageWidth(percentageWidth)}` }}
      >
        <Image
          src={src}
          alt=""
          layout="responsive"
          width={width}
          height={height}
        />
      </div>
      <div>
        <Image src={src} alt="" width={width} height={height} />
      </div>
      <div className="shrink self-start">
        {paragraphs.map((text, i) => (
          <p className="m-0" key={i}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostImageAndText;
