import React from "react";

const Card = ({ props }) => {
  console.log(props);
  return (
    <a
      href={props.link}
      className="block p-6 sm:max-w-full lg:max-w-fit bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h4 className="text-white text-2xl">{props.title}</h4>
      <h6 className="mb-2 text-ellipsis overflow-hidden font-bold tracking-tight text-gray-900 dark:text-white">
        {props.address}
      </h6>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.body}
      </p>
    </a>
  );
};

export default Card;
