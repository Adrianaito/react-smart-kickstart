import React from "react";

const ShowCard = ({ title, meta, description }) => {
  return (
    <div className="p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p className="break-words text-ellipsis mb-2 overflow-hidden tracking-tight text-gray-900 dark:text-white text-xl">
        {title}
      </p>
      <span className="text-sm text-gray-600">{meta}</span>
      <p className="text-ellipsis mb-2 overflow-hidden tracking-tight text-gray-900 dark:text-white">
        {description}
      </p>
    </div>
  );
};

export default ShowCard;
