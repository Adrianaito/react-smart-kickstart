import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
};

const ButtonIcon = forwardRef(
  ({ icon = null, onClick, label, isValid }, ref) => (
    <button
      type="submit"
      className="button"
      onClick={onClick}
      disabled={isValid}
      ref={ref}
    >
      {icon}
      {label}
    </button>
  )
);

ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = {
  icon: null,
  isValid: false,
  onClick: null,
  label: null,
};
export default ButtonIcon;
