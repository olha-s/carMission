import React from "react";
import PaginationDotItem from "../PaginationDotItem/PaginationDotItem";
import "./PaginationDots.scss";

const PaginationDots = ({ componentsList }) => {
  const dotsList = componentsList.map((section) => {
    return (
      <PaginationDotItem key={Date.now} anchor={section.props.anchorName} />
    );
  });

  return <div className="pagination-dots">{dotsList}</div>;
};

export default PaginationDots;
