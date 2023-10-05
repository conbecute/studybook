import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { onResultUserInfo } from "../../../selection";
import AdminDetailWrapper from "./components";
import {
  getListAccountSchool,
  getListAccountTeacher,
} from "../../../../services/dashboard";
import { getHistoryQuiz } from "../../../../services/listQuiz";

import { onDispatchShowLoading } from "../../../App/actions";
import {
  onDispatchListAccountProvince,
  onDispatchListAccountSchool,
  onDispatchListAccountTeacher,
} from "../../actions";
import * as PATH from "../../../../constants/path";
import { cleanLocalStorage } from "../../../../constants/general";
export class AdminDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { provinceId, districtId, schoolId, userId, user_name, roleId } =
      this.props.match.params;
    if (Number(schoolId) === 0) {
      this.onGetListAccountSchool(provinceId, districtId);
    }
    if (Number(schoolId) !== 0) {
      this.onGetListAccountTeacher(provinceId, districtId, schoolId);
    }
    if (Number(roleId) === 4) {
      this.onGetHistoryQuiz(provinceId, districtId, schoolId, userId);
    }
  }

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
  onGetHistoryQuiz = (provinceId, districtId, schoolId, userId) => {
    this.props.onDispatchShowLoading(true);
    getHistoryQuiz(provinceId, districtId, schoolId, userId)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListResultQuiz(res.data.data);
        }
        if (res.data === 401) {
          cleanLocalStorage();
          this.props.history.push(PATH.ROUTE_PATH_SIGN_IN);
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onSearch = (data) => {
    const { provinceId, districtId, schoolId, userId, roleId } =
      this.props.match.params;
    if (data.roleId === 2) {
      this.onGetListAccountSchool(
        provinceId,
        districtId,
        data.name,
        data.email,
        data.status
      );
    }
    if (data.roleId === 3) {
      this.onGetListAccountTeacher(
        provinceId,
        districtId,
        schoolId,
        data.name,
        data.email,
        data.phone
      );
    }
  };

  render() {
    const userInfo = onResultUserInfo();
    const { roleId } = this.props.match.params;
    const dataConfig = {
      2: this.props.listAccountSchool.list_school,
      3: this.props.listAccountTeacher.list_teacher,
      4: this.props.listResultQuiz.list_account,
    };
    return (
      <AdminDetailWrapper
        roleId={Number(roleId)}
        userInfo={userInfo}
        data={dataConfig[Number(roleId)]}
        onSearch={this.onSearch}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    listAccountProvince,
    listAccountSchool,
    listAccountTeacher,
    listResultQuiz,
  } = state.dashboardReducer;
  return {
    listAccountProvince,
    listAccountSchool,
    listAccountTeacher,
    listResultQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListAccountProvince,
      onDispatchListAccountSchool,
      onDispatchListAccountTeacher,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminDetailContainer);
