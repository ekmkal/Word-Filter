/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const PaginationTabs = (words) => {
  return (
    <div>
      <a value="backPage">&laquo</a>
      <div className="pageNumbers"></div>
      <a value="nextPage">&raquo</a>
    </div>
  );
};

export default PaginationTabs;
