import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import TrainingTestWrapper from "./components";
import {
  onDispatchShowLoading,
  onDispatchTogglePopupSuccess,
} from "../App/actions";
import { onCheckValueNull } from "../selection";
import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";
import { onResultUserInfo } from "../selection";

export class TrainingTestContainer extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("cid") ? atob(params.get("cid")) : "";
    const round = params.get("r") || 0;

    this.state = {
      cid: cid,
      round: round,
    };
  }

  componentDidMount() {
    if (this.props.match.path === PATH.ROUTE_PATH_TRAINING_TEST_2) {
      localStorage.setItem("pathQuiz", this.props.match.path);
    }
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    scroller.scrollTo("myScrollToElement", {
      smooth: "easeInQuad",
      offset: -90,
    });
  }

  onStartWork = () => {
    const userInfo = onResultUserInfo();
    const isValueNull = onCheckValueNull(userInfo);
    const dataSuccess = {
      status: true,
      title: [...TEXT.TEXT_POPUP_TRAINING_TEST],
      url: PATH.ROUTE_UPDATE_INFORMATION,
      labelButton: TEXT.TITLE_BUTTON_UPDATE,
    };
    const path = localStorage.getItem("pathQuiz");
    if (path === PATH.ROUTE_PATH_TRAINING_TEST_2) {
      this.props.onDispatchTogglePopupSuccess(dataSuccess);
      localStorage.setItem("isEventUpdateInfo", true);
    } else {
      if (!isValueNull) {
        this.props.onDispatchTogglePopupSuccess(dataSuccess);
        localStorage.setItem("isEventUpdateInfo", true);
      } else {
        this.props.history.push(PATH.ROUTE_PATH_LIST_QUIZ);
      }
    }
  };
  render() {
    return (
      <Fragment>
        <TrainingTestWrapper onStartWork={this.onStartWork} />
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
      onDispatchShowLoading,
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TrainingTestContainer);
