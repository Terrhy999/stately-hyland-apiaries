import { ClassAttributes, AnchorHTMLAttributes } from "react";

const LinkNewTab = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  return <a target={"_blank"} rel="noreferrer" {...props} />;
};

export default LinkNewTab;
