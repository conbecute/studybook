import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResultQuizProvinceWrapper from "./components";
import { onResultUserInfo } from "../../../selection";
import { getListAccountProvince } from "../../../../services/dashboard";
import * as PATH from "../../../../constants/path";
import { onDispatchListAccountProvince } from "../../actions";
import { onDispatchShowLoading } from "../../../App/actions";
export class ResultQuizProvinceContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onSearch = (data) => {
    const userInfo = onResultUserInfo();
    if (data.roleId === 1) {
      this.onGetListAccountProvince(userInfo.province_id, data.name);
    }
  };
  onGetListAccountProvince = (provinceId, name) => {
    this.props.onDispatchShowLoading(true);
    getListAccountProvince(provinceId, name)
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
  render() {
    const { listAccountProvince } = this.props;
    const userInfo = onResultUserInfo();
    return (
      <ResultQuizProvinceWrapper
        listAccountProvince={listAccountProvince.list_account}
        roleId={Number(userInfo.role_id)}
        userInfo={userInfo}
        onSearch={this.onSearch}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { listAccountProvince } = state.dashboardReducer;
  return {
    listAccountProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchListAccountProvince,
      onDispatchShowLoading,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResultQuizProvinceContainer);
