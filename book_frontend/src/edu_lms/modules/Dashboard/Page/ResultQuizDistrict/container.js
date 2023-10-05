import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { onResultUserInfo } from "../../../selection";
import ResultQuizDistrictWrapper from "./components";
import { getListAccountSchool } from "../../../../services/dashboard";
import * as PATH from "../../../../constants/path";
import { onDispatchListAccountSchool } from "../../actions";
import { onDispatchShowLoading } from "../../../App/actions";

export class ResultQuizDistrictContainer extends Component {
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
        data.name
      );
    }
  };
  onGetListAccountSchool = (provinceId, districtId, name = "") => {
    this.props.onDispatchShowLoading(true);
    getListAccountSchool(provinceId, districtId, name)
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
  render() {
    const userInfo = onResultUserInfo();
    return (
      <ResultQuizDistrictWrapper
        roleId={Number(userInfo.role_id)}
        userInfo={userInfo}
        listAccountSchool={this.props.listAccountSchool.list_school}
        onSearch={this.onSearch}
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
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResultQuizDistrictContainer);
