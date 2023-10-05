import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import * as PATH from "../../../constants/path";

const BreadcrumbWrapper = ({
  breadcrumb,
  isMenu,
  onChangeValueBreadcrumb,
  onNavBar,
}) => {
  const history = useHistory();
  const onBreadcrumb = () => {
    history.push(PATH.ROUTE_PATH_DASHBOARD);
    onChangeValueBreadcrumb("");
  };
  return (
    <Breadcrumb
      className="monkey-bg-white d-flex align-item-center"
      style={{ height: "53px" }}
    >
      {!isMenu && (
        <i
          onClick={onNavBar}
          className="fa fa-bars monkey-fz-30 mr-3 cursor hvr-registration"
          aria-hidden="true"
        ></i>
      )}
      <Breadcrumb.Item
        className="cursor hvr-registration"
        active={breadcrumb !== "" ? false : true}
        onClick={onBreadcrumb}
      >
        Dashboard
      </Breadcrumb.Item>
      {breadcrumb !== "" && (
        <Breadcrumb.Item active>{breadcrumb}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};
export default BreadcrumbWrapper;
