import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResultQuizSchoolWrapper from "./components";
import { onResultUserInfo } from "../../../selection";
import { getListAccountTeacher } from "../../../../services/dashboard";
import * as PATH from "../../../../constants/path";
import { onDispatchListAccountTeacher } from "../../actions";
import { onDispatchShowLoading } from "../../../App/actions";

export class ResultQuizSchoolContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  onSearch = (data) => {
    const userInfo = onResultUserInfo();
    if (data.roleId === 3) {
      this.onGetListAccountTeacher(
        userInfo.province_id,
        userInfo.district_id,
        userInfo.school_id,
        data.name,
        data.email,
        data.phone
      );
    }
  };
  onGetListAccountTeacher = (
    provinceId,
    districtId,
    schoolId,
    name = "",
    email = "",
    phone = ""
  ) => {
    this.props.onDispatchShowLoading(true);
    getListAccountTeacher(provinceId, districtId, schoolId, name, email, phone)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListAccountTeacher(res.data.data);
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
      <ResultQuizSchoolWrapper
        listAccountTeacher={this.props.listAccountTeacher.list_teacher}
        roleId={Number(userInfo.role_id)}
        userInfo={userInfo}
        onSearch={this.onSearch}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { listAccountTeacher } = state.dashboardReducer;
  return {
    listAccountTeacher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListAccountTeacher,
      onDispatchShowLoading,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResultQuizSchoolContainer);
