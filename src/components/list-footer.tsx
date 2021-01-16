import React from "react";

interface IListFooterProps {
  page: number;
  totalPages: number;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

export const ListFooter: React.FC<IListFooterProps> = ({
  page,
  totalPages,
  onPrevPageClick,
  onNextPageClick,
}) => {
  return (
    <div className="grid grid-cols-3 text-center max-w-md mt-10 items-center mx-auto">
      {page > 1 ? (
        <button
          onClick={onPrevPageClick}
          className="font-medium text-2xl focus:outline-none"
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span>
        Page {page} of {totalPages}
      </span>
      {page !== totalPages ? (
        <button
          onClick={onNextPageClick}
          className="font-medium text-2xl focus:outline-none"
        >
          &rarr;
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
