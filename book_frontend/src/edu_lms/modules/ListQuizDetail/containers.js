import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { compose } from "redux";
import * as CONSTANTS_TYPE from "edu_lms/constants/type";
import { getUserInfo } from "edu_lms/services/signIn/signIn";
import { onResultUserInfo } from "edu_lms/modules/selection";
import ListQuizDetailWrapper from "./components";
import {
  onDispatchShowLoading,
  onDispatchTogglePopupSuccess,
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../App/actions";
import {
  onDispatchQuizDetail,
  onDispatchResultQuestion,
  onDispatchResetQuestion,
} from "../ListQuiz/actions";
import { getListQuizDetail, getResultQuiz } from "../../services/listQuiz";
import * as PATH from "../../constants/path";
import * as TEXT from "../../constants/text";
import { TYPE_POPUP_TEST_RESULTS } from "../../constants/type";
import { onDecryptedData } from "../selection";
import PopupConfirmExit from "./components/PopupConfirmExit";
import Loading from "edu_lms_v2/components/Loading";

export class ListQuizDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupExit: false,
      showUpdating: false,
      checkInfor: false,
      loading: false,
    };
    this.dataUser = {
      avatar: null,
      birth_day: undefined,
      district_id: undefined,
      district_name: "",
      full_name: "",
      gender_id: undefined,
      is_verify: undefined,
      job_id: undefined,
      list_grade_subject: [{}],
      notification: undefined,
      province_id: undefined,
      province_name: "",
      role_id: undefined,
      school_id: undefined,
      school_name: "",
      status: undefined,
      status_school: undefined,
      test_book_3_7_10: false,
      test_book_hoc10: false,
      ward_id: undefined,
      ward_id_name: "",
    };

    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = onDecryptedData(
        localStorage.getItem(CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO),
        CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO
      );
      if (!userInfo?.email || !userInfo?.phone) {
        // props.history.push(PATH.ROUTE_PATH_V3_TRAINING_UPDATEINFORMATION);
      }
    }
  }
  getUserInfoApi = () => {
    getUserInfo().then((res) => {
      if (res.data.status === "success") {
        this.dataUser = res.data.data;
      }
      const dataGrade = this.dataUser?.list_grade_subject.some(
        (data) =>
          data?.grade_id == this.props.match?.params?.gradeId &&
          data?.subject_id == this.props.match?.params?.subjectId
      );
      if (
        !this.dataUser?.full_name ||
        !this.dataUser?.school_name ||
        !this.dataUser?.ward_id_name ||
        (+this.dataUser?.job_id && +this.dataUser?.email_verified !== 1) ||
        !dataGrade
      ) {
        this.setState({ ...this.state, checkInfor: true });
      } else {
        this.setState({ ...this.state, checkInfor: false });
      }
    });
  };

  componentDidMount() {
    this.getUserInfoApi();
    this.onGetListQuizDetail(this.props.match.params.id);
  }

  onGetListQuizDetail = (year) => {
    const data = {
      gradeId: parseInt(this?.props?.match?.params?.gradeId),
      subjectId: parseInt(this?.props?.match?.params?.subjectId),
      quizId: parseInt(this.props.match?.params?.quizId),
    };
    this.props.onDispatchShowLoading(true);
    getListQuizDetail(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        this.props.onDispatchQuizDetail(res.data.data);
        this.setState({ loading: true });
        if (res.data.status === "fail") {
          this.setState({ ...this.state, showUpdating: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };

  onSubmit = (data) => {
    this.props.onDispatchShowLoading(true);
    const dataConfig = {
      grade_id: parseInt(this.props.match?.params?.gradeId),
      subject_id: parseInt(this.props.match?.params?.subjectId),
      check_quiz: data.toString(),
      quiz_id: parseInt(this.props.match?.params?.quizId),
    };
    getResultQuiz(dataConfig)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        this.props.onDispatchTypePopup(TYPE_POPUP_TEST_RESULTS);
        this.props.onDispatchShowPopupActivateBook(!this.props.statusModal);
        this.props.onDispatchResultQuestion({
          ...res.data.data,
          ...dataConfig,
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onExitQuiz = () => {
    this.setState({ ...this.state, showPopupExit: true });
  };

  handleDispatchResetQuestion = () => {
    this.props.onDispatchResetQuestion(false);
  };

  onClosePopupConfirmExit = () => {
    this.setState({ ...this.state, showPopupExit: false });
  };

  onHandleExit = () => {
    this.props.history.push(PATH.ROUTE_PATH_LIST_QUIZ);
  };
  render() {
    return (
      <>
        {/* {this.state.loading && <Loading />} */}
        {this.state.checkInfor ? (
          <div className="text-center">
            <p className="h3 pt-4 mb-5">
              Bạn phải cập nhật đủ thông tin trước khi làm bài
            </p>
            <Link
              to={PATH.ROUTE_PATH_V3_TRAINING}
              className="btn-pr btn-play btn-access p-3 cursor mt-4"
            >
              Quay lại trang tập huấn
            </Link>
          </div>
        ) : (
          <>
            <Fragment>
              {this.props.dataQuizDetail.length > 0 && (
                <ListQuizDetailWrapper
                  dataQuizDetail={this.props.dataQuizDetail[0]}
                  resetQuiz={this.props.resetQuiz}
                  onSubmit={this.onSubmit}
                  onExitQuiz={this.onExitQuiz}
                  handleDispatchResetQuestion={this.handleDispatchResetQuestion}
                />
              )}
              <PopupConfirmExit
                show={this.state.showPopupExit}
                onHide={this.onClosePopupConfirmExit}
                onSubmit={this.onHandleExit}
              />
            </Fragment>
            {this.state.showUpdating && (
              <p className="text-center h3 pt-4">Đang cập nhật bộ đề</p>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { statusModal } = state.app;
  const { dataQuizDetail, resetQuiz } = state.updateListQuiz;
  return {
    dataQuizDetail,
    statusModal,
    resetQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchTogglePopupSuccess,
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
      onDispatchQuizDetail,
      onDispatchResultQuestion,
      onDispatchResetQuestion,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ListQuizDetailContainer);
