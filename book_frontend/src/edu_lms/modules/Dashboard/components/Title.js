import React from "react";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../constants/path";

const Title = ({ isMenu, userInfo, onChangeValueBreadcrumb, onNavBar }) => {
  const history = useHistory();

  return (
    <div className="title border-bottom p-3 text-center d-flex justify-content-between align-items-center">
      <i
        onClick={onNavBar}
        className="fa fa-bars monkey-fz-30 cursor hvr-registration"
        aria-hidden="true"
      ></i>

      <p
        onClick={() => {
          onChangeValueBreadcrumb("");
          history.push(PATH.ROUTE_PATH_DASHBOARD);
        }}
        className="monkey-color-violet cursor hvr-registration"
      >
        {userInfo.full_name}
      </p>
      <span></span>
    </div>
  );
};
export default Title;
