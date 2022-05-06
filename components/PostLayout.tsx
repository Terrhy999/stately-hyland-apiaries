import type { Meta } from "../types/Meta";

interface LayoutProps {
  children: React.ReactNode;
}

const PostLayout = ({
  children,
  meta,
}: {
  children: LayoutProps;
  meta: Meta;
}) => {
  return (
    <div className="m-5 prose prose-lg prose-blockquote:border-gray-500 prose-blockquote:bg-gray-300 prose-blockquote:overflow-auto font-lato">
      <div className="text-4xl font-bold">{meta.title}</div>
      {children}
    </div>
  );
};

export default PostLayout;
