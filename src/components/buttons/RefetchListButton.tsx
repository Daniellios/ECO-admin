import { Button } from "@pankod/refine-antd";
import { QueryObserverResult } from "@pankod/refine-core";
import React from "react";

interface IRefreshButtonListProps {
  query: QueryObserverResult;
}

const RefetchListButton: React.FC<IRefreshButtonListProps> = ({ query }) => {
  const handleRefresh = () => {
    query.refetch();
  };

  return <Button onClick={handleRefresh}>Обновить</Button>;
};

export default RefetchListButton;
