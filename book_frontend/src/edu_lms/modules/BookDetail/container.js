import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import BooDetailWrapper from "./components";
import { getBookDetail } from "../../services/bookDetail/bookDetail";
import * as PATH from "../../constants/path";
import * as TEXT from "../../constants/text";
import { cleanLocalStorage } from "../../constants/general";
import { TIME_OUT_LOGOUT } from "../../constants/type";
import { onDispatchDataInfo } from "../../modules/SignIn/actions";
import { onDispatchTogglePopupSuccess } from "../../modules/App/actions";
import { onDispatchShowLoading } from "../App/actions";

export class BookDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBook: this.props.match.params.id,
      bookType: this.props.match.params.bookType,
      linkHtml: "",
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    this.props.onDispatchShowLoading(true);
    getBookDetail(this.state.idBook)
      .then((res) => {
        if (res.data.status === "success") {
          this.setState({
            linkHtml: res.data.data.url,
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => {
        this.props.onDispatchShowLoading(false);
      });
  }

  onIdle = () => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      cleanLocalStorage();
      this.props.onDispatchShowPopupActivateBook(false);
      const userInfo = {
        job_id: "",
        full_name: "",
        birth_day: "",
        gender_id: "",
        email: "",
        phone: "",
        province_id: "",
        district_id: "",
        ward_id: "",
        school_id: "",
        grade_id: "",
      };
      this.props.onDispatchDataInfo(userInfo);
      const dataSuccessConfig = {
        status: true,
        title: [TEXT.TITLE_POPUP_NOT_SEEN_ANY_ACTIVITY],
        url: PATH.ROUTE_PATH_SIGN_IN,
        labelButton: TEXT.BUTTON_PLEASE_RE_LOGIN,
      };
      this.props.onDispatchTogglePopupSuccess(dataSuccessConfig);
    }
  };

  render() {
    return (
      <>
        <IdleTimer
          ref={(ref) => {
            this.idleTimerRef = ref;
          }}
          timeout={TIME_OUT_LOGOUT}
          element={document}
          onIdle={this.onIdle}
          debounce={250}
        />
        <BooDetailWrapper linkBook={this.state.linkHtml} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { listTextbooks, listBookInUse } = state.generalReducer;
  return {
    listBookInUse,
    listTextbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchDataInfo,
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(BookDetailContainer);
