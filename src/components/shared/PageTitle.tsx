import React from "react";

interface IPageTitleProps {
  title: string;
  id: string | number | undefined;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title, id }) => {
  return (
    <p className="page_title_wrap">
      <span className="page_title">
        {title} <span className="sub_text">{id ? `#${id}` : ""}</span>
      </span>
    </p>
  );
};

export default PageTitle;
