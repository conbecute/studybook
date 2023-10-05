import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import NavDashboard from "./NavDashboard";
import Title from "./Title";
import ComponentWrapper from "../../../components/ComponentWrapper";
import BreadcrumbWrapper from "./Breadcrumb";
import { PrivateRoute } from "edu_lms_v2/RouteList";

const DashboardWrapper = ({
  userInfo,
  breadcrumb,
  dataNavDashboard,
  data,
  numberIndex,
  onChangeValueBreadcrumb,
  onAccordionToggle,
}) => {
  const roleId = Number(userInfo.role_id);
  const [isMenu, setStateMenu] = useState(true);

  const onNavBar = () => {
    setStateMenu(!isMenu);
  };
  return (
    <div className="dashboard_wrapper d-flex">
      <SliderBar isMenu={isMenu}>
        <Title
          userInfo={userInfo}
          onNavBar={onNavBar}
          onChangeValueBreadcrumb={onChangeValueBreadcrumb}
        />
        <div className="body pt-3 pb-3">
          <NavDashboard
            numberIndex={numberIndex}
            roleId={Number(userInfo.role_id)}
            dataNavDashboard={dataNavDashboard}
            onChangeValueBreadcrumb={onChangeValueBreadcrumb}
            onAccordionToggle={onAccordionToggle}
          />
        </div>
      </SliderBar>
      <DashboardBody isMenu={isMenu}>
        <BreadcrumbWrapper
          breadcrumb={breadcrumb}
          isMenu={isMenu}
          onNavBar={onNavBar}
          onChangeValueBreadcrumb={onChangeValueBreadcrumb}
        />
        <div className="p-3">
          <Switch>
            {data.map((route, index) => {
              if (_.includes(route.roleId, roleId)) {
                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                    layout={ComponentWrapper}
                    routerKey={route.key}
                    showMenu={route.showMenu}
                  />
                );
              }
            })}
          </Switch>
        </div>
      </DashboardBody>
    </div>
  );
};
export default DashboardWrapper;

const DashboardBody = styled.div`
  width: ${(props) => (props.isMenu ? "80%" : "100%")};
  transition: width 0.5s linear;
  // opacity: ${(props) => (props.isMenu ? 1 : 0)};
  .breadcrumb {
    background-color: #fff;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SliderBar = styled.div`
  width: ${(props) => (props.isMenu ? "20%" : 0)};
  transition: all 0.5s linear;
  opacity: ${(props) => (props.isMenu ? 1 : 0)};
  background-color: #fff;
`;
