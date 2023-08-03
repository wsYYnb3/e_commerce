import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ currentPage, totalPages, handlePageChange }) => {
  let items = [];
  let leftPage = currentPage - 2;
  let rightPage = currentPage + 2;

  if (leftPage <= 0) {
    rightPage = rightPage - leftPage + 1;
    leftPage = 1;
  }
  if (rightPage > totalPages) {
    leftPage = leftPage - (rightPage - totalPages);
    rightPage = totalPages;
    if (leftPage < 1) {
      leftPage = 1;
    }
  }

  for (let number = leftPage; number <= rightPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className='d-flex justify-content-center'>
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );

  return paginationBasic;
};

export default CustomPagination;
