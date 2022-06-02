import Image from "next/image";

interface image {
  src: string;
  width: number;
  height: number;
}

const ImagesGrid = ({
  images,
  caption,
}: {
  images: image[];
  caption: string;
}) => {
  const getCols = (imageArray: image[]) => {
    switch (imageArray.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        throw new Error("Columns must be 1, 2, or 3");
    }
  };

  return (
    <div className="py-3 flex flex-col justify-center">
      <div className={`grid ${getCols(images)} gap-3`}>
        {images.map((image, i) => (
          <div key={i} className="my-auto">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
            />
          </div>
        ))}
      </div>
      <span className="text-sm mx-10 mt-3 italic">{caption}</span>
    </div>
  );
};

export default ImagesGrid;
