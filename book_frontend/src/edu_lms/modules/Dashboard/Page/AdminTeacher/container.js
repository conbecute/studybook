import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdminTeacherWrapper from "./components";
import { formSearchAdmin, dataTheadTableAdmin } from "../../selection";
import { onResultUserInfo } from "../../../selection";

export class AdminTeacherContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const userInfo = onResultUserInfo();
    return (
      <AdminTeacherWrapper
        dataForm={formSearchAdmin[Number(2)]}
        dataTheadTableAdmin={dataTheadTableAdmin[Number(2)].data}
        value={dataTheadTableAdmin[Number(2)].value}
        listAccountSchool={this.props.listAccountSchool.list_school}
        roleId={Number(userInfo.role_id)}
        userInfo={userInfo}
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

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       onDispatchNumberIndex,
//       onDispatchShowLoading,
//       onDispatchListAccountProvince,
//     },
//     dispatch
//   );
// };
export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(AdminTeacherContainer);
