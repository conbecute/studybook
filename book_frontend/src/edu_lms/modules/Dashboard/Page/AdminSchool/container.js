import React, { Component } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdminSchoolWrapper from "./components";
import { formSearchAdmin, dataTheadTableAdmin } from "../../selection";
import { onResultUserInfo } from "../../../selection";
import { getListAccountSchool } from "../../../../services/dashboard";
import * as PATH from "../../../../constants/path";
import { onDispatchListAccountSchool } from "../../actions";
import {
  onDispatchShowLoading,
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
} from "../../../App/actions";
import * as TYPE from "../../../../constants/type";

export class AdminSchoolContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onSearch = (data) => {
    const userInfo = onResultUserInfo();
    if (data.roleId === 2) {
      this.onGetListAccountSchool(
        userInfo.province_id,
        userInfo.district_id,
        data.name,
        data.email,
        data.status
      );
    }
  };
  onGetListAccountSchool = (
    provinceId,
    districtId,
    name = "",
    email = "",
    status = ""
  ) => {
    this.props.onDispatchShowLoading(true);
    getListAccountSchool(provinceId, districtId, name, email, status)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListAccountSchool(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onSubmitFormDashboard = () => {
    this.props.onDispatchTypePopup(TYPE.TYPE_POPUP_ADD_FORM_DASHBOARD);
    this.props.onDispatchShowPopupActivateBook(!this.props.statusModal);
  };
  render() {
    const userInfo = onResultUserInfo();
    return (
      <AdminSchoolWrapper
        dataForm={formSearchAdmin[Number(2)]}
        dataTheadTableAdmin={dataTheadTableAdmin[Number(2)].data}
        value={dataTheadTableAdmin[Number(2)].value}
        listAccountSchool={this.props.listAccountSchool.list_school}
        roleId={Number(userInfo?.role_id)}
        userInfo={userInfo}
        onSearch={this.onSearch}
        onSubmitFormDashboard={this.onSubmitFormDashboard}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { listAccountSchool } = state.dashboardReducer;
  return {
    listAccountSchool,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchListAccountSchool,
      onDispatchShowLoading,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminSchoolContainer);
