import type { IMeta } from "../../types";
import ScrollToTop from "../ScrollToTop";

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
  return (
    <>
      <div className="prose prose-lg text-[19px] prose-blockquote:border-gray-500 prose-blockquote:bg-gray-300 prose-blockquote:overflow-auto font-lato">
        <div className="text-4xl font-bold mb-5">{meta.title}</div>
        {children}
        <ScrollToTop />
      </div>
    </>
  );
};

export default PostLayout;
