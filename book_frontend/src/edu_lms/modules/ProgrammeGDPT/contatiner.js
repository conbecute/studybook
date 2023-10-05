import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import ProgrammerWrapper from "./components";

class ProgrammerContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <ProgrammerWrapper />
      </Fragment>
    );
  }
}

export default ProgrammerContainer;
