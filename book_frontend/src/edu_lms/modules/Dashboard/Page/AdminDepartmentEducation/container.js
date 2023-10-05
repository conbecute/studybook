import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DepartmentEducationWrapper from "./components";
import { formSearchAdmin, dataTheadTableAdmin } from "../../selection";
import { onResultUserInfo } from "../../../selection";
import { getListAccountProvince } from "../../../../services/dashboard";
import * as PATH from "../../../../constants/path";
import { onDispatchListAccountProvince } from "../../actions";
import {
  onDispatchShowLoading,
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../../../App/actions";
import * as TYPE from "../../../../constants/type";
export class DepartmentEducationContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onSearch = (data) => {
    const userInfo = onResultUserInfo();
    if (data.roleId === 1) {
      this.onGetListAccountProvince(
        userInfo.province_id,
        data.name,
        data.email,
        data.status
      );
    }
  };
  onGetListAccountProvince = (provinceId, name, email, status) => {
    this.props.onDispatchShowLoading(true);
    getListAccountProvince(provinceId, name, email, status)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListAccountProvince(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onSubmitFormDashboard = (roleId) => {
    this.props.onDispatchTypePopup(TYPE.TYPE_POPUP_ADD_FORM_DASHBOARD);
    this.props.onDispatchShowPopupActivateBook(!this.props.statusModal);
  };
  render() {
    const userInfo = onResultUserInfo();
    return (
      <DepartmentEducationWrapper
        dataForm={formSearchAdmin[Number(1)]}
        listAccountProvince={this.props.listAccountProvince.list_account}
        value={dataTheadTableAdmin[Number(1)].value}
        dataTheadTableAdmin={dataTheadTableAdmin[Number(1)].data}
        userInfo={userInfo}
        onSearch={this.onSearch}
        onSubmitFormDashboard={this.onSubmitFormDashboard}
        showButton={true}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { listAccountProvince } = state.dashboardReducer;
  const { statusModal } = state.app;
  return {
    listAccountProvince,
    statusModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchListAccountProvince,
      onDispatchShowLoading,
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DepartmentEducationContainer);
