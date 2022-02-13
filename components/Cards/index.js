import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
const Card = forwardRef(({ data }, ref) => (
  <a
    href={data.link}
    ref={ref}
    className="block p-6 sm:max-w-full lg:max-w-fit bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h4 className="text-white text-2xl">{data.title}</h4>
    <h6 className="mb-2 text-ellipsis overflow-hidden font-bold tracking-tight text-gray-900 dark:text-white">
      {data.address}
    </h6>
    <p className="font-normal text-gray-700 dark:text-gray-400">{data.body}</p>
  </a>
));

Card.propTypes = propTypes;
export default Card;
