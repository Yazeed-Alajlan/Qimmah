import React from "react";

const Divider = ({ text, button, direction, width, className }) => {
  return (
    <div className="w-full my-8">
      <div className="inline-flex items-center justify-center w-full">
        {!button && (
          <hr className="w-full h-1  border-0 rounded bg-gray-200 dark:bg-gray-700" />
        )}
        {text && (
          <span className="absolute px-3 font-medium rounded text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            {text}
          </span>
        )}
        {button && (
          <div className="inline-flex items-center justify-center w-full">
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
            <button
              type="button"
              className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-1 h-4 w-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
              View More
            </button>
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Divider;
