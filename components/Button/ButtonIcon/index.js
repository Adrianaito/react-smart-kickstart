import React, { forwardRef } from "react";

const ButtonIcon = forwardRef(
  ({ icon = null, onClick, label = null, isValid }, ref) => {
    return (
      <>
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
      </>
    );
  }
);

export default ButtonIcon;
