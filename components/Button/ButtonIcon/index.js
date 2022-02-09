import React from "react";

const ButtonIcon = ({ icon = null, onClick, label = null }) => {
  return (
    <>
      <button type="button" className="button" onClick={onClick}>
        {icon}
        {label}
      </button>
    </>
  );
};

export default ButtonIcon;
