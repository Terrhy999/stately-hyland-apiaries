import { ClassAttributes, AnchorHTMLAttributes } from "react";

const LinkNewTab = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  return (
    <a
      target={"_blank"}
      rel="noreferrer"
      className="text-shaGreen visited:text-purple-900"
      {...props}
    />
  );
};

export default LinkNewTab;
