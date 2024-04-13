import React from "react";

const TableCellWithButton = ({ value, selectedValue, onClick, onClear }) => {
  return (
    <td
      className={`relative cursor-pointer px-[0.125rem] py-4 ${
        selectedValue === value && "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {value}
      {selectedValue === value && (
        <button
          onClick={onClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            focusable="false"
            className="pointer-events-none w-full h-full"
          >
            <path
              fill="white"
              d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"
            ></path>
          </svg>
        </button>
      )}
    </td>
  );
};

export default TableCellWithButton;
