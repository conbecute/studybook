import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAlert } from "react-alert";
import UpdateInformationWrapper from "./components";
import { onDispatchShowLoading } from "../App/actions";
import {
  onDispatchListProvince,
  onDispatchListDistrict,
  onDispatchListWard,
  onDispatchListSchool,
  onDispatchActiveSliderUpdateInfo,
  onDispatchListTeachingInformation,
} from "./actions";
import { onDispatchDataInfo } from "../SignIn/actions";
import {
  getDataUrlListProvince,
  postUpdateUserSchool,
  getDataUrlListSchoolByProvince,
  postUpdateTeachingInformation,
} from "../../services/info/info";
import { getListSubject } from "../../services/app/app";
import { postUserInfo } from "../../services/signIn/signIn";
import {
  onLevelSchool,
  onValueOptionDefault,
  onListGradeSubject,
} from "../../modules/UpdateInformation/config";
import { confirmPw } from "../../services/forgotPw/forgotPw";
import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";

import {
  GRADE_ID_DEFAULT,
  FEMALE,
  TYPE_CUSTOM_NEXT_SLIDER_UPDATE_INFO,
} from "../../constants/type";
import { onDispatchTogglePopupSuccess } from "../App/actions";
import { LOCAL_STORAGE_KEY_USER_INFO } from "../../constants/type";
import { onResultUserInfo, onCryptoData } from "../selection";
import { setEventGTM } from "../../constants/googleTagManager";
import { UPDATE_USER_INFORMATION } from "../../constants/eventNameGTM";

export class UpdateInformationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageError: "",
      isForgotPassword: true,
      successful: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onDisableTab);
    this.setState({
      isForgotPassword:
        this.props.match.path === PATH.ROUTE_UPDATE_INFORMATION ? true : false,
    });
    if (localStorage.getItem("pathQuiz") !== PATH.ROUTE_PATH_TRAINING_TEST_2) {
      const userInfo = onResultUserInfo();
      const userId = localStorage.getItem("user_id");
      const email = userInfo?.email;
      const phone = userInfo?.phone;
      if (userId) {
        this.props.onDispatchShowLoading(true);
        postUserInfo(userId)
          .then((res) => {
            if (res.data.status === "success") {
              const userInfo = res.data.data;
              const grade_id = res.data.data.grade_id
                ? res.data.data.grade_id
                : GRADE_ID_DEFAULT;
              const gender_id = res.data.data.gender_id
                ? res.data.data.gender_id
                : FEMALE;
              const list_grade_subject = onListGradeSubject(
                res.data.data.list_grade_subject
              );
              const newUserInfo = {
                ...userInfo,
                gender_id,
                grade_id,
                list_grade_subject,
                email,
                phone,
              };
              const encryptUserInfo = onCryptoData(
                newUserInfo,
                LOCAL_STORAGE_KEY_USER_INFO
              );
              localStorage.setItem(
                LOCAL_STORAGE_KEY_USER_INFO,
                encryptUserInfo
              );

              const resultValueNull = getKeyByValueResultNull(newUserInfo);
              const disabledDotSlider =
                localStorage.getItem("status") == 1 ? true : false;
              this.props.onDispatchActiveSliderUpdateInfo(
                disabledDotSlider
                  ? TYPE_CUSTOM_NEXT_SLIDER_UPDATE_INFO[resultValueNull]
                  : 0
              );
              if (list_grade_subject) {
                list_grade_subject.forEach((item) => {
                  this.handleGetListSubject(item.grade_id);
                });
              }
              this.props.onDispatchDataInfo(newUserInfo);
              getDataUrlListProvince(this.props.user_info.province_id)
                .then((res) => {
                  if (res.data.status === "success") {
                    this.props.onDispatchListDistrict(res.data.data);
                    this.props.onDispatchShowLoading(false);
                  }
                })
                .catch((errors) => {
                  console.log(errors);
                  this.props.onDispatchShowLoading(false);
                });
              getDataUrlListProvince(this.props.user_info.district_id)
                .then((res) => {
                  if (res.data.status === "success") {
                    this.props.onDispatchListWard(res.data.data);
                    this.props.onDispatchShowLoading(false);
                  }
                })
                .catch((errors) => {
                  console.log(errors);
                  this.props.onDispatchShowLoading(false);
                });
              getDataUrlListSchoolByProvince(this.props.user_info.ward_id, 0)
                .then((res) => {
                  if (res.data.status === "success") {
                    this.props.onDispatchListSchool(res.data.data);
                    this.props.onDispatchShowLoading(false);
                  }
                })
                .catch((errors) => {
                  console.log(errors);
                  this.props.onDispatchShowLoading(false);
                });
            }
          })
          .catch((error) => {
            console.log(error);
            this.props.onDispatchShowLoading(false);
          });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onDisableTab);
  }

  onDisableTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      return false;
    }
  };
  onResetPW = (data) => {
    confirmPw(data)
      .then((res) => {
        if (res.data.status == "fail") {
          this.setState({
            messageError: res.data.message,
          });
          this.props.alert.error(res.data.message);
        }
        if (res.data.status == "success") {
          this.props.alert.success("Thay đổi mật khẩu thành công");
          const dataSuccess = {
            status: true,
            title: [TEXT.TEXT_CHANGE_PW_SUCCESS],
            close: true,
          };
          this.setState({
            messageError: "",
          });
          this.props.onDispatchTogglePopupSuccess(dataSuccess);
        }
      })
      .catch((errors) => {
        this.props.alert.error(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onUpdateInfo = (userInfo) => {
    postUpdateUserSchool(userInfo)
      .then((res) => {
        if (res.data.status === "fail") {
          this.setState({ successful: false });
          this.props.alert.error(res.data.message);
        }
        if (res.data.status === "success") {
          this.setState({ successful: true });
          this.props.alert.success("Cập nhật thông tin thành công");
        }
        setEventGTM(
          UPDATE_USER_INFORMATION,
          ["type", userInfo.type],
          ["update_detail", userInfo.updateDetail],
          ["successful", this.state.successful]
        );
      })
      .catch((error) => {
        this.props.alert.error(error);
      });
  };

  onActiveSliderUpdateInfo = (value) => {
    this.props.onDispatchActiveSliderUpdateInfo(value);
  };

  onUpdateTeachingInformation = (data) => {
    this.props.onDispatchShowLoading(true);
    postUpdateTeachingInformation(data)
      .then((res) => {
        if (res.data.status === "fail") {
          this.setState({ successful: false });
          this.props.alert.error(res.data.message);
        }
        if (res.data.status === "success") {
          this.setState({ successful: true });
          this.props.alert.success("Cập nhật thông tin thành công");
        }
        this.props.onDispatchShowLoading(false);
        setEventGTM(
          UPDATE_USER_INFORMATION,
          ["type", data.type],
          ["update_detail", "teaching_info"],
          ["successful", this.state.successful]
        );
      })
      .catch((error) => {
        this.props.onDispatchShowLoading(false);
        this.props.alert.error(error);
      });
  };

  handleGetListSubject = (id) => {
    this.props.onDispatchShowLoading(true);
    getListSubject(id)
      .then((res) => {
        if (res.status === 200) {
          this.props.onDispatchShowLoading(false);
          if (res.data.data.list_subject.length > 0) {
            const configData = res.data?.data?.list_subject.map((item) => ({
              ...item,
              label: item.title,
              value: item.title,
            }));
            this.props.onDispatchListTeachingInformation({
              id: id,
              listSubjects: configData,
            });
          }
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetListSubject = (id) => {
    this.handleGetListSubject(id);
  };

  render() {
    const {
      listProvince,
      listDistrict,
      listWard,
      listSchool,
      listGradeAll,
      user_info,
      listGrade,
      numberActiveSlider,
      listTeachingInformation,
      listSubjectAll,
    } = this.props;
    return (
      <Fragment>
        <UpdateInformationWrapper
          onResetPW={this.onResetPW}
          onUpdateInfo={this.onUpdateInfo}
          onActiveSliderUpdateInfo={this.onActiveSliderUpdateInfo}
          onUpdateTeachingInformation={this.onUpdateTeachingInformation}
          onGetListSubject={this.onGetListSubject}
          listProvince={listProvince}
          listDistrict={listDistrict}
          listWard={listWard}
          listSchool={listSchool}
          listGradeAll={listGrade}
          userInfo={user_info}
          numberActiveSlider={numberActiveSlider}
          isForgotPassword={this.state.isForgotPassword}
          notification={user_info.notification}
          valueGradeDefault={onLevelSchool(user_info.grade_id)}
          valueProvinceDefault={onValueOptionDefault(
            listProvince,
            user_info.province_id
          )}
          valueDistrictDefault={onValueOptionDefault(
            listDistrict,
            user_info.district_id
          )}
          valueWardDefault={onValueOptionDefault(listWard, user_info.ward_id)}
          valueSchool={onValueOptionDefault(listSchool, user_info.school_id)}
          valueSchoolName={user_info.school_name}
          statusSchool={user_info.status_school}
          listSubjectAll={listSubjectAll}
          valueJob={
            Number(localStorage.getItem("job_id"))
              ? Number(localStorage.getItem("job_id"))
              : ""
          }
          dataTeachingInformation={user_info.list_grade_subject}
          listTeachingInformation={listTeachingInformation}
          messageError={this.state.messageError}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    listProvince,
    listDistrict,
    listWard,
    listSchool,
    listTeachingInformation,
    numberActiveSlider,
    isSettingEmail,
    listSubjectAll,
  } = state.updateInfoInReducers;
  const { listGradeAll, listGrade } = state.app;
  const { user_info } = state.signInReducers;
  return {
    listProvince,
    listDistrict,
    listWard,
    listSchool,
    listGradeAll,
    listGrade,
    listTeachingInformation,
    user_info,
    numberActiveSlider,
    isSettingEmail,
    listSubjectAll,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListProvince,
      onDispatchListDistrict,
      onDispatchListWard,
      onDispatchListSchool,
      onDispatchDataInfo,
      onDispatchTogglePopupSuccess,
      onDispatchActiveSliderUpdateInfo,
      onDispatchListTeachingInformation,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  withAlert(),
  connect(mapStateToProps, mapDispatchToProps)
)(UpdateInformationContainer);

function getKeyByValueResultNull(object) {
  return Object.keys(object).find((key) => object[key] === null);
}
