import React from "react";
import router from "next/router";
import PropTypes from "prop-types";
import ButtonIcon from "../Button/ButtonIcon";

const propTypes = {
  title: PropTypes.string,
  meta: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  linkLabel: PropTypes.string,
};
const ShowCard = ({ title, meta, description, link, linkLabel }) => {
  const handleClick = () => {
    router.push(link);
  };
  return (
    <div className="p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p className="break-words text-ellipsis mb-2 overflow-hidden tracking-tight text-gray-900 dark:text-white text-xl">
        {title}
      </p>
      <span className="text-sm text-gray-600">{meta}</span>
      <p className="text-ellipsis mb-2 overflow-hidden tracking-tight text-gray-900 dark:text-white">
        {description}
      </p>
      {link && <ButtonIcon label={linkLabel} onClick={handleClick} />}
    </div>
  );
};
ShowCard.propTypes = propTypes;
ShowCard.defaultProps = {
  title: "",
  meta: "",
  description: "",
  link: "",
  linkLabel: "",
};
export default ShowCard;
