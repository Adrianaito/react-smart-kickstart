import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

const TextArea = (props) => {
  const { label, name, onBlur, setFieldValue } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className="block my-2 ml-1 text-xl font-medium text-gray-900 dark:text-gray-900"
      >
        {label}
      </label>
      <Field
        as="textarea"
        name={name}
        id={name}
        onBlur={onBlur}
        onChange={setFieldValue}
        className="bg-gray-700 w-2/4 h-40  border border-gray-600 text-gray-200 "
      />
    </div>
  );
};

TextArea.propTypes = propTypes;
TextArea.defaultProps = {
  onBlur: null,
};

export default TextArea;
