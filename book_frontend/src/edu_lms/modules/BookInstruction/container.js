import React, { Fragment, Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import BookIntroduceWrapper from "./components";

class BookIntroduceContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <BookIntroduceWrapper />;
  }
}

export default compose(withRouter, connect(null, null))(BookIntroduceContainer);
