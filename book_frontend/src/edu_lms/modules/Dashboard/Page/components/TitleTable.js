import React from "react";
import { VALUE_BUTTON } from "../../selection";

const TitleTable = ({
  value,
  roleId,
  showButton = false,
  onSubmitFormDashboard,
}) => {
  return (
    <div className="title monkey-bg-violet monkey-color-white p-3 d-flex justify-content-between align-items-center">
      <div>
        <i className="fa fa-sign-in monkey-fz-18 mr-3" aria-hidden="true"></i>
        <span>{value}</span>
      </div>
      {showButton && (
        <button
          onClick={() => onSubmitFormDashboard(roleId)}
          className="btn monkey-bg-white monkey-color-violet"
        >
          {VALUE_BUTTON[roleId]}
        </button>
      )}
    </div>
  );
};
export default TitleTable;
