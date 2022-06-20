import type { IMeta } from "../../types";
import ScrollToTop from "../ScrollToTop";
import { MDXProvider } from "@mdx-js/react";
import LinkNewTab from "./LinkNewTab";
import PostImage from "./PostImage";
import PostImageAndText from "./PostImageAndText";
import ImagesGrid from "./ImagesGrid";

interface LayoutProps {
  children: React.ReactNode;
}

const PostLayout = ({
  children,
  meta,
}: {
  children: LayoutProps;
  meta: IMeta;
}) => {
  const postDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const postDate = new Date(meta.date).toLocaleDateString(
    "en-us",
    postDateOptions
  );

  const mdComponents = {
    a: LinkNewTab,
    PostImage,
    PostImageAndText,
    ImagesGrid,
  };

  return (
    <MDXProvider components={mdComponents}>
      <div className="prose prose-lg text-[19px] prose-blockquote:border-gray-500 prose-blockquote:bg-gray-300 prose-blockquote:overflow-auto font-lato">
        <div className="text-4xl font-bold mb-1">{meta.title}</div>
        <div className="text-gray-500 mb-3">{postDate}</div>
        {children}
        <ScrollToTop />
      </div>
    </MDXProvider>
  );
};

export default PostLayout;
