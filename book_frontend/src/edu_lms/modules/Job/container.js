import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import JopWrapper from "./components";
import { onDispatchDataInfo } from "../SignIn/actions";
import * as PATH from "../../constants/path";
import { postUpdateUserSchool } from "../../services/info/info";
import { APP_ID } from "../../constants/type";

export class JobContainer extends Component {
  constructor(props) {
    super(props);
  }

  onSubmitJob = (value) => {
    const status = localStorage.getItem("status");
    const userInfo = {
      job_id: value,
      full_name: this.props.user_info.full_name,
      birth_day: this.props.user_info.birth_day,
      gender_id: this.props.user_info.gender_id,
      province_id: this.props.user_info.province_id,
      district_id: this.props.user_info.district_id,
      ward_id: this.props.user_info.ward_id,
      school_id: this.props.user_info.school_id,
      grade_id: this.props.user_info.grade_id,
      notification: this.props.user_info.notification,
    };
    this.props.onDispatchDataInfo(userInfo);
    localStorage.setItem("job_id", value);
    if (status == 1) {
      this.props.history.push(PATH.ROUTE_UPDATE_INFORMATION);
    } else {
      this.props.history.push(PATH.ROUTE_PATH_SIGN_UP);
      localStorage.setItem("status", 0);
    }
  };
  render() {
    return (
      <Fragment>
        <JopWrapper
          onSubmitJob={this.onSubmitJob}
          job={this.props.user_info.job_id}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user_info } = state.signInReducers;
  return {
    user_info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataInfo,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JobContainer);
