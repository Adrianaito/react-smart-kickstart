import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  span: PropTypes.string,
};

const Input = ({
  name,
  label,
  setFieldValue,
  type,
  onBlur = null,
  span = null,
}) => (
  <div className="mb-6">
    <label
      htmlFor="base-input"
      className="block my-2 ml-1  text-xl font-medium text-gray-900 dark:text-gray-900"
    >
      {label}
    </label>
    <div className="flex">
      <Field
        type={type}
        name={name}
        onChange={setFieldValue}
        onBlur={onBlur}
        className="inputField"
      />
      {span && (
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {span}
        </span>
      )}
    </div>
  </div>
);

Input.propTypes = propTypes;
Input.defaultProps = {
  onBlur: null,
  span: null,
};
export default Input;
