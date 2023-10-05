import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";

import * as PATH from "../../../constants/path";
import * as PATH_NAME from "../../../constants/routerName";

const SectionLogin = () => {
  return (
    <Fragment>
      <li
        className="nav-item ml-2 distance-center d-flex"
        style={{ height: "100%" }}
      >
        <NavLink
          className={`${
            !isMobile ? "mr-2" : ""
          } btn monkey-bc-violet hvr-registration-white monkey-f-bold monkey-color-violet nav-link-monkey rounded-pill monkey-fz-15 text-uppercase`}
          to={PATH.ROUTE_PATH_SIGN_IN}
        >
          {PATH_NAME.ROUTE_NAME_SIGN_IN}
        </NavLink>
      </li>
    </Fragment>
  );
};
export default SectionLogin;
