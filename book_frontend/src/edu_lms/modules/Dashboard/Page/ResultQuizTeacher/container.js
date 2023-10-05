import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResultQuizTeacherWrapper from "./components";
import { onResultUserInfo } from "../../../selection";

export class ResultQuizTeacherContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { listResultQuiz } = this.props;
    const userInfo = onResultUserInfo();
    return (
      <ResultQuizTeacherWrapper
        listAccountProvince={listResultQuiz}
        roleId={Number(userInfo.role_id)}
        userInfo={userInfo}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { listResultQuiz } = state.dashboardReducer;
  return {
    listResultQuiz,
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
)(ResultQuizTeacherContainer);
