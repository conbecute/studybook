import React, { Component } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DashboardWrapper from "./components";
import { onResultUserInfo } from "../selection";
import * as PATH from "../../constants/path";
import {
  onDispatchNumberIndex,
  onDispatchListAccountProvince,
  onDispatchListAccountSchool,
  onDispatchListAccountTeacher,
} from "./actions";
import { onDispatchShowLoading } from "../App/actions";
import {
  getListAccountProvince,
  getListAccountTeacher,
  getListAccountSchool,
} from "../../services/dashboard";
import { cleanLocalStorage } from "../../constants/general";

export class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumb: "",
    };
  }

  componentDidMount() {
    const userInfo = onResultUserInfo();
    if (Number(userInfo.role_id) === 0) {
      this.props.history.push(PATH.ROUTE_PATH_NOT_FOUND);
    }
    if (Number(userInfo.role_id) === 4) {
      this.props.history.push(PATH.ROUTE_PATH_NOT_FOUND);
    }
    window.addEventListener("load", this.handleLoad);
    if (Number(userInfo.role_id) === 2) {
      this.onGetListAccountSchool(userInfo.province_id, userInfo.district_id);
    }
    if (Number(userInfo.role_id) === 3) {
      this.onGetListAccountTeacher(
        userInfo.province_id,
        userInfo.district_id,
        userInfo.school_id
      );
    }
    this.onGetListAccountProvince(userInfo.province_id);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  onGetListAccountProvince = (provinceId) => {
    this.props.onDispatchShowLoading(true);
    getListAccountProvince(provinceId)
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
  onGetListAccountSchool = (provinceId, districtId) => {
    this.props.onDispatchShowLoading(true);
    getListAccountSchool(provinceId, districtId)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListAccountSchool(res.data.data);
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
  onGetListAccountTeacher = (provinceId, districtId, schoolId) => {
    this.props.onDispatchShowLoading(true);
    getListAccountTeacher(provinceId, districtId, schoolId)
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

  handleLoad = () => {
    this.setState({
      breadcrumb: "",
    });
    this.props.history.push(PATH.ROUTE_PATH_DASHBOARD);
  };

  onChangeValueBreadcrumb = (value) => {
    this.setState({
      breadcrumb: value,
    });
  };
  onAccordionToggle = (data) => {
    this.props.onDispatchNumberIndex(data.index);
  };

  render() {
    const userInfo = onResultUserInfo();
    const { dataNavDashboard, numberIndex } = this.props;
    return (
      <DashboardWrapper
        userInfo={userInfo}
        data={this.props.data}
        breadcrumb={this.state.breadcrumb}
        dataNavDashboard={dataNavDashboard}
        numberIndex={numberIndex}
        onChangeValueBreadcrumb={this.onChangeValueBreadcrumb}
        onAccordionToggle={this.onAccordionToggle}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { dataNavDashboard, numberIndex } = state.dashboardReducer;
  return {
    dataNavDashboard,
    numberIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchNumberIndex,
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
)(DashboardContainer);
