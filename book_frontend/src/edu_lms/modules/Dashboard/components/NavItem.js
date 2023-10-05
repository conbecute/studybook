import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const NavItem = ({ data, roleId, onChangeValueBreadcrumb }) => {
  const history = useHistory();
  const onNavItem = () => {
    history.push(data.path);
    onChangeValueBreadcrumb(data.value);
  };
  return (
    <p onClick={onNavItem} className="cursor mb-2 hvr-registration">
      {data.value}
    </p>
  );
};
export default NavItem;
