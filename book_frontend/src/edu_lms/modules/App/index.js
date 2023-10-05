import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Element } from "react-scroll";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Tour from "reactour";
import * as Sentry from "@sentry/react";

import {
  onDispatchListGrade,
  onDispatchListBookType,
  onDispatchSrcAudio,
  onDispatchListGradeAll,
  onDispatchStatusTour,
  onDispatchCurrentStep,
  onDispatchSetUserLocation,
} from "./actions";
import { onDispatchListSubjectCourseware } from "./../ElectronicCourseware/actions";
import { onDispatchListSubjectEducationTeacher } from "./../EducationTeacher/actions";
import { getListBookType, getListGrade } from "../../services/app/app";
import LoadingComponent from "../../components/loading/";
import { getDataUrlListProvince } from "../../services/info/info";
import { onDispatchListProvince } from "../UpdateInformation/actions";
import { LIST_PROVINCE_ALL } from "../../constants/type";
import { onShowPopup, onResultUserInfo, setItemUserInfo } from "../selection";
import { getListSubject } from "../../services/app/app";
import { onDispatchListSubjectAll } from "../UpdateInformation/actions";
import history from "./../../helpers/history";
import { setEventGTM } from "../../constants/googleTagManager";
import { BOOK_GUIDING } from "../../constants/eventNameGTM";
import RouteList from "edu_lms_v2/RouteList";
import FBMessenger from "edu_lms/components/FBMessenger";
import Maintenance from "edu_lms/components/Maintenance";
import { getUserLocation } from "edu_lms_v2/services/ipAddress";
import { getUserInfo } from "../../services/signIn/signIn";
import { onDispatchDataInfo } from "../SignIn/actions";
import { isSSR } from "edu_lms_v2/utils";

const maintenance = false;

class App extends Component {
  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  closeTour = (status) => {
    if (!status) {
      let pathName = introStep.filter((value) =>
        window.location.pathname.includes(value.pathName)
      )[0]?.pathName;
      localStorage.setItem(`${pathName}-hidden-intro`, 1);
    }
    this.props.onDispatchStatusTour(0);
  };
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.closeTour(true);
    });
    if (!maintenance) {
      getListBookType()
        .then((res) => {
          if (res.data.status === "success") {
            this.props.onDispatchListBookType(res.data.data);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });

      getListGrade()
        .then((res) => {
          if (res.data.status === "success") {
            this.props.onDispatchListGrade(res.data.data);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      getListSubject(0)
        .then((res) => {
          if (res?.data.status === "success") {
            const configData = res.data?.data?.list_subject.map((item) => ({
              ...item,
              label: item.title,
              value: item.title,
            }));
            this.props.onDispatchListSubjectAll(configData);

            // get subject for search docuemnt
            let list = [{ id: 0, label: "Tất cả", value: "file_0", type: 0 }];
            res.data?.data?.list_subject.forEach((value, index) => {
              list.push({
                id: value.id,
                label: value.title,
                value: `file_${value.id}`,
                type: value.id,
              });
            });
            this.props.onDispatchListSubjectCourseware(list);
            this.props.onDispatchListSubjectEducationTeacher(list);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      getListGrade(true)
        .then((res) => {
          if (res.data.status === "success") {
            this.props.onDispatchListGradeAll(res.data.data);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      getDataUrlListProvince(LIST_PROVINCE_ALL)
        .then((res) => {
          if (res.data.status === "success") {
            this.props.onDispatchListProvince(res.data.data);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });

      getUserLocation()
        .then((res) => {
          if (res.data.status === "success") {
            this.props.onDispatchSetUserLocation(res.data.data.location);
          }
        })
        .catch((error) => console.log(error));
      const token = localStorage.getItem("token");
      if (token) {
        getUserInfo().then((res) => {
          if (res.data.status === "success") {
            // Vi api get user info nay khong tra ve email, phone, is_user_hoc10, show_change_pw nen phai exclude 4 field nay truoc khi update user data o fe
            // TODO: Chi dung 1 API duy nhat get user info cho ca app
            const { email, phone, is_user_hoc10, show_change_pw } =
              onResultUserInfo();
            const userInfo = {
              ...res.data.data,
              email,
              phone,
              is_user_hoc10,
              show_change_pw,
            };
            this.props.onDispatchDataInfo(userInfo);
            setItemUserInfo(userInfo);
          }
        });
      }
    }
  }

  render() {
    const options = {
      timeout: 5000,
      position: positions.TOP_RIGHT,
      containerStyle: {
        top: "100px",
      },
    };
    const accentColor = "#5cb7b7";
    const userInfo = onResultUserInfo();
    const steps = introStep.filter((value) =>
      window.location.pathname.includes(value.pathName)
    )[0]?.steps;

    return !maintenance ? (
      <Provider template={AlertTemplate} {...options}>
        <Tour
          className="helper"
          steps={steps || []}
          isOpen={Boolean(steps && this.props.statusTour)}
          onRequestClose={() => this.closeTour(false)}
          accentColor={accentColor}
          onAfterOpen={this.disableBody}
          onBeforeClose={(e) => {
            this.enableBody(e);
            setEventGTM({
              event: BOOK_GUIDING,
              stop_at: this.props.currentStep,
            });
          }}
          // closeWithMask={false}
          getCurrentStep={(curr) => this.props.onDispatchCurrentStep(curr + 1)}
        />
        <Element name="myScrollToElement">
          <Router history={history}>
            <RouteList />
            {!isSSR && <FBMessenger />}
            {onShowPopup(
              this.props.typePopup,
              this.props.statusModal,
              this.props.dataPopupPdf,
              this.props.idBook,
              this.props.titleQuestion,
              this.props.dataPopupQuiz,
              this.props.resultQuestion,
              Number(userInfo?.role_id || 1)
            )}
            {this.props.isShowLoading && <LoadingComponent />}
          </Router>
        </Element>
        {this.props.srcAudio && (
          <ReactAudioPlayer
            src={this.props.srcAudio}
            className="d-none"
            autoPlay={true}
            controls={true}
            onEnded={() => this.props.onDispatchSrcAudio("")}
          />
        )}
      </Provider>
    ) : (
      <Maintenance />
    );
  }
}

const introStep = [
  {
    pathName: "doc-sach",
    steps: [
      {
        selector: "#tool",
        content: () => (
          <div>
            <p className="quicksand-bold monkey-fz-20 text-center">
              Phóng to thu nhỏ
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Phóng to hoặc thu nhỏ trang sách bằng công cụ hoặc dùng con lăn
              chuột
            </p>
          </div>
        ),
      },
      {
        selector: "#full-screen",
        content: () => (
          <div>
            <img
              style={{ width: "100%" }}
              src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/thumb/hand-drag.gif`}
            />
            <p className="quicksand-bold monkey-fz-20 text-center">
              Di chuyển trang giấy
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Ấn giữ và kéo chuột để di chuyển quanh trang giấy
            </p>
          </div>
        ),
      },
      {
        selector: "#use-book",
        content: () => (
          <div>
            <p className="quicksand-bold monkey-fz-20 text-center">
              Chuyển trang sách
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Đi đến trang sách cần sử dụng bằng 3 cách sau đây:
            </p>
            <p className="quicksand-medium monkey-fz-18">
              {"- Bấm vào nút < >"}
            </p>
            <p className="quicksand-medium monkey-fz-18">
              - Gõ trực tiếp số trang cần tìm
            </p>
            <p className="quicksand-medium monkey-fz-18">
              - Dùng phím mũi tên trên bàn phím
            </p>
          </div>
        ),
      },
      {
        selector: "#tooltip-tool",
        content: () => (
          <div>
            <p className="quicksand-bold monkey-fz-20 text-center">
              Thanh công cụ
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Chọn thanh công cụ để viết/vẽ trên sách và khối nội dung
            </p>
          </div>
        ),
      },
      {
        selector: "#tooltip-menu",
        // "#root > div:nth-child(1) > div > div:nth-child(5) > div:nth-child(1) > span:nth-child(1)",
        content: () => (
          <div>
            <p className="quicksand-bold monkey-fz-20 text-center">
              Mục lục điện tử
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Mở mục lục điện tử để xem và truy cập nhanh bài học
            </p>
          </div>
        ),
      },
      {
        selector: "#reading-support-tooltip",
        content: () => (
          <div>
            <p className="quicksand-bold monkey-fz-20 text-center">
              Xem hướng dẫn
            </p>
            <p className="quicksand-medium monkey-fz-18">
              Xem video hướng dẫn sử dụng bài tập tương tác
            </p>
          </div>
        ),
      },
    ],
  },
];

const mapStateToProps = (state) => {
  const {
    statusModal,
    dataSuccess,
    isShowLoading,
    dataPopupPdf,
    typePopup,
    statusTour,
    currentStep,
    srcAudio,
    trainingConfig,
  } = state.app;
  const { gradeIdTextBook, gradeIdBookUsed } = state.generalReducer;
  const { dataQuestion, idBook } = state.readingBookReducers;
  const { indexQuestion, titleQuestion } = state.listQuestion;
  const { dataPopupQuiz, resultQuestion } = state.updateListQuiz;

  return {
    statusModal,
    dataSuccess,
    gradeIdTextBook,
    gradeIdBookUsed,
    isShowLoading,
    dataPopupPdf,
    typePopup,
    dataQuestion,
    indexQuestion,
    idBook,
    titleQuestion,
    dataPopupQuiz,
    resultQuestion,
    statusTour,
    currentStep,
    srcAudio,
    trainingConfig,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchListBookType,
      onDispatchListGrade,
      onDispatchListGradeAll,
      onDispatchListProvince,
      onDispatchListSubjectAll,
      onDispatchListSubjectCourseware,
      onDispatchListSubjectEducationTeacher,
      onDispatchStatusTour,
      onDispatchCurrentStep,
      onDispatchSrcAudio,
      onDispatchSetUserLocation,
      onDispatchDataInfo,
    },
    dispatch
  );
};

export default Sentry.withProfiler(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
