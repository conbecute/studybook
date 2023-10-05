import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import HeaderComponent from "../../components/Header";
import ActivateBookWrapper from "./components";
class ActivateBookContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <ActivateBookWrapper />
      </Fragment>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { booksInUse } = state.generalReducer;
//   return {booksInUse};
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       notifyNextStepValidationStatus,
//       notifyNextRoute,
//       resetNavigationOptions,
//       updateAZSelectedProduct,
//       updateAZKYCInfo,
//       updateUserChoice,
//       dispatchAnalyticsPageViewEvent,
//       notifyGoBackwards,
//       updateTimeSpentOnPage
//     },
//     dispatch
//   )
// }

export default connect(null, null)(ActivateBookContainer);
