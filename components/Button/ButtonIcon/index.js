import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

const propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
  style: PropTypes.string,
  tooltip: PropTypes.string,
};

const ButtonIcon = forwardRef(
  ({ icon = null, onClick, label, isValid, style, tooltip }, ref) => (
    <div>
      <button
        type="submit"
        className={style}
        onClick={onClick}
        disabled={isValid}
        ref={ref}
        data-tip={tooltip}
      >
        {icon}
        {label}
      </button>
      {tooltip && <ReactTooltip place="top" type="dark" effect="solid" />}
    </div>
  )
);

ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = {
  icon: null,
  isValid: false,
  onClick: null,
  label: null,
  style: "button",
  tooltip: null,
};
export default ButtonIcon;
