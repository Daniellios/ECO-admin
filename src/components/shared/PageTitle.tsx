import React from "react";

interface IPageTitleProps {
  title: string;
  id: any;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title, id }) => {
  return (
    <p className="page_title_wrap">
      <span className="page_title">
        {title} <span className="id">{id ? `#${id}` : ""}</span>
      </span>
    </p>
  );
};

export default PageTitle;
