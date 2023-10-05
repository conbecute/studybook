import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { compose } from "redux";
import ListQuizWrapper from "./components";
import {
  onDispatchShowLoading,
  onDispatchTogglePopupSuccess,
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../App/actions";
import { onDispatchListQuiz, onDispatchDataQuiz } from "./actions";
import * as PATH from "../../constants/path";
import {
  TYPE_POPUP_EXAM_EXERCISES,
  TYPE_POPUP_TEACHING_INFORMATION,
} from "../../constants/type";
import { getListQuiz } from "../../services/listQuiz";
import { LOCAL_STORAGE_KEY_USER_INFO } from "../../constants/type";
import { onResultUserInfo, onCryptoData } from "../selection";
import { onCheckValueNull } from "../selection";

export class ListQuizContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onGetListExamExercise();
  }

  onGetListExamExercise = () => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListQuiz()
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListQuiz(res.data.data);
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
        }
        // if (res.data === 401) {
        //   localStorage.clear();
        //   this.props.history.push(PATH.ROUTE_PATH_SIGN_IN);
        // }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onPopupExamExercises = (data) => {
    const titleQuiz = onCryptoData(data.title, "title_quiz");
    localStorage.setItem("title_quiz", titleQuiz);

    this.props.onDispatchTypePopup(TYPE_POPUP_EXAM_EXERCISES);
    this.props.onDispatchDataQuiz(data);
    this.props.onDispatchShowPopupActivateBook(!this.props.statusModal);
    localStorage.setItem("isEventUpdateInfo", true);
  };
  onUpdateTeachingInformation = () => {
    this.props.history.push(PATH.ROUTE_UPDATE_INFORMATION);
    localStorage.setItem("isEventUpdateInfo", true);

    // this.props.onDispatchTypePopup(TYPE_POPUP_TEACHING_INFORMATION);
    // this.props.onDispatchShowPopupActivateBook(!this.props.statusModal);
  };
  render() {
    const userInfo = onResultUserInfo();
    return (
      <Fragment>
        <ListQuizWrapper
          listExamExercises={this.props.listQuiz}
          isValueNull={onCheckValueNull(userInfo)}
          provinceId={userInfo?.province_id}
          onPopupExamExercises={this.onPopupExamExercises}
          onUpdateTeachingInformation={this.onUpdateTeachingInformation}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { listQuiz } = state.updateListQuiz;
  const { statusModal } = state.app;

  return {
    listQuiz,
    statusModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchTogglePopupSuccess,
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
      onDispatchListQuiz,
      onDispatchDataQuiz,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ListQuizContainer);
