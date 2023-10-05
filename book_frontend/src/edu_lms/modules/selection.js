import React from "react";
import _ from "lodash";
import * as TEXT from "../constants/text";
import * as PATH from "../constants/path";
import * as TYPE from "../constants/general";
import * as CONSTANTS_TYPE from "../constants/type";
import * as IMAGES from "../constants/background";
import ContentPopupPdf from "../components/ContentPopupPdf";
import PopupSupport from "../components/PopupSupport";
import ListQuestion from "../components/ListQuestion";
import PopupComponent from "../components/popup";
import GamePopup from "../components/popup/GamePopup";
import FromActivateBook from "../components/FromActiveBook";
import ContentExamExercises from "../components/ContentExamExercises";
import TestResults from "../components/TestResults";
import TeachingInformation from "../components/ContentTeachingInformation";
import ContentPopupFormDashboard from "../components/ContentPopupFormDashboard";
import ContentPopupOTP from "../components/ContentPopupOTP";
import ContentPopupChangePw from "../components/ContentPopupChangePw";
import {
  forceOpenTrainingConfigs,
  handleForceOpenTraining,
} from "../../edu_lms_v2/utils/training";
import ContentPopupRequireLogin from "edu_lms/components/ContentPopupRequireLogin";
import ContentPopupBuyBook from "edu_lms/components/ContentPopupBuyBook";
import { STATUS_TEST_BOOK } from "edu_lms_v2/modules/ListBook/const";

const CryptoJS = require("crypto-js");

export const onDecryptedData = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
export const onCryptoData = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};
export const encryptBase64 = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

export const decryptBase64 = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

export const setItemUserInfo = (userInfo) => {
  const encryptUserInfo = onCryptoData(
    userInfo,
    CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO
  );
  localStorage.setItem(
    CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO,
    encryptUserInfo
  );
  handleForceOpenTraining(
    { provinceId: userInfo.province_id, isUserHoc10: userInfo.is_user_hoc10 },
    forceOpenTrainingConfigs
  );
};

export const onResultUserInfo = () => {
  let result;
  if (localStorage.getItem(CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO)) {
    result = onDecryptedData(
      localStorage.getItem(CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO),
      CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO
    );
  }
  return result;
};
export const onAddLocalStorage = (token, user_id, status, testBook = STATUS_TEST_BOOK.DISABLE) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("status", status);
  localStorage.setItem("status_test_book", testBook);
  return true;
};

export const onCheckValueNull = (data) => {
  const userInfo = _.pickBy(data, (v) => v == null || v === undefined);
  return _.isEmpty(userInfo);
};

export const onDataSuccess = (isValueNull, data) => {
  const job_id = data?.job_id !== null ? true : false;
  const status = localStorage.getItem("status");
  return {
    status: true,
    title: isValueNull
      ? [TEXT.TITLE_POPUP_SUCCESS_LOGIN]
      : [TEXT.TEXT_TITLE_UPDATE_INFORMATION],
    url: isValueNull
      ? PATH.ROUTE_PATH_GENERAL
      : job_id
      ? PATH.ROUTE_UPDATE_INFORMATION
      : status === 0
      ? PATH.ROUTE_UPDATE_INFORMATION
      : PATH.ROUTE_PATH_FORM_JOB,
    labelButton: isValueNull
      ? TEXT.BUTTON_ACCESS_TO_THE_SOFT_BOOK_STORE
      : TEXT.TITLE_BUTTON_UPDATE,
  };
};

export const onResultTypeBook = (id) => {
  switch (id) {
    case 1:
      return CONSTANTS_TYPE.BOOK_DOCUMENT_POWERPOINT;
    case 2:
      return CONSTANTS_TYPE.BOOK_DOCUMENT_POWERPOINT_PDF;
    case 3:
      return CONSTANTS_TYPE.BOOK_INTRO;
    case 6:
      return CONSTANTS_TYPE.EDUCATION_TEACHER;
    case 5:
      return CONSTANTS_TYPE.BOOK_DOCUMENT_COURSEWARE;
    case 15:
      return CONSTANTS_TYPE.VIDEO_ENGLISH_COURSEWARE;
    case 12:
      return CONSTANTS_TYPE.POWERPOINT_ENGLISH_COURSEWARE;
    case 11:
      return CONSTANTS_TYPE.PDF_ENGLISH_COURSEWARE;
    case 13:
      return CONSTANTS_TYPE.AUDIO_SBT_ENGLISH_COURSEWARE;
    case 14:
      return CONSTANTS_TYPE.AUDIO_SKG_ENGLISH_COURSEWARE;
    case 16:
      return CONSTANTS_TYPE.BOOK_DOCUMENT_POWERPOINT_TEACHER;
    case 17:
      return CONSTANTS_TYPE.ZIP_ENGLISH_COURSEWARE;
    default:
      return CONSTANTS_TYPE.BOOK_DOCUMENT_PDF;
  }
};

export const onResultParamterBook = (
  path,
  gradeIdTextBook,
  gradeIdBookUsed,
  gradeIdBookTeacher,
  gradeIdBookTest3710,
  gradeIdBookDocument,
  gradeIdWorkbook
) => {
  switch (path) {
    case PATH.ROUTE_PATH_LIST_BOOK:
      return {
        type: TYPE.TYPE_TEXT_BOOKS,
        title: TEXT.TEXT_TITLE_BOOKS,
        gradeId: gradeIdTextBook,
      };
    case PATH.ROUTE_PATH_BOOK_USED:
      return {
        type: TYPE.TYPE_TEXT_BOOKS_USED,
        title: TEXT.TEXT_TITLE_LIST_BOOK_USED,
        gradeId: gradeIdBookUsed,
      };
    case PATH.ROUTE_PATH_LIST_BOOK_TEACHER:
      return {
        type: TYPE.TYPE_TEXT_BOOKS_TEACHER,
        title: TEXT.TEXT_TITLE_LIST_BOOK_TEACHER,
        gradeId: gradeIdBookTeacher,
      };
    case PATH.ROUTE_PATH_LIST_BOOK_TEST_3710:
      return {
        type: TYPE.TYPE_TEXT_BOOKS_TEST_3710,
        title: TEXT.TEXT_TITLE_LIST_BOOK_TEST3710,
        gradeId: gradeIdBookTest3710 == "all" ? 6 : gradeIdBookTest3710,
      };
    case PATH.ROUTE_PATH_LIST_BOOK_DOCUMENT:
      return {
        type: TYPE.TYPE_TEXT_BOOKS_DOCUMENT,
        title: TEXT.TEXT_TITLE_LIST_BOOK_DOCUMENT,
        gradeId: gradeIdBookDocument,
      };
    case PATH.ROUTE_PATH_LIST_WORK_BOOK:
      return {
        type: TYPE.TYPE_TEXT_WORK_BOOKS,
        title: TEXT.TEXT_TITLE_LIST_WORK_BOOK,
        gradeId: gradeIdWorkbook,
      };
    default:
      return 0;
  }
};

export const onResultDataBook = (
  type,
  listTextbooks,
  listBookInUse,
  listBookTeacher,
  listBookTest3710,
  listBookDocument,
  listWorkbook
) => {
  switch (type) {
    case TYPE.TYPE_TEXT_BOOKS:
      return listTextbooks;
    case TYPE.TYPE_TEXT_BOOKS_USED:
      return listBookInUse;
    case TYPE.TYPE_TEXT_BOOKS_TEACHER:
      return listBookTeacher;
    case TYPE.TYPE_TEXT_BOOKS_TEST_3710:
      return listBookTest3710;
    case TYPE.TYPE_TEXT_BOOKS_DOCUMENT:
      return listBookDocument;
    case TYPE.TYPE_TEXT_WORK_BOOKS:
      return listWorkbook;
    default:
      return [];
  }
};

export const onShowPopup = (
  type,
  statusModal,
  dataPopupPdf,
  idBook,
  titleQuestion,
  dataPopupExamExercises,
  resultQuestion,
  role_id
) => {
  switch (type) {
    case CONSTANTS_TYPE.TYPE_POPUP_ACTIVE_BOOK:
      return (
        <PopupComponent
          className="popup_activate_book"
          modalTitle={TEXT.TITLE_POPUP_ACTIVATE_BOOK}
          content={<FromActivateBook />}
          buttonLabel=""
          statusModal={statusModal}
          // bgWrapper={IMAGES.BG_POPUP_ACTIVATE_BOOK}
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_PDF:
      return (
        <PopupComponent
          className="popup_pdf"
          modalTitle={dataPopupPdf.title}
          content={<ContentPopupPdf url={dataPopupPdf.url} />}
          buttonLabel=""
          backdrop={true}
          statusModal={statusModal}
          bgWrapper={IMAGES.BG_POPUP_ACTIVATE_BOOK}
          size="xl"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_QUESTION:
      return (
        <GamePopup
          className="popup_question"
          modalTitle={titleQuestion}
          content={<ListQuestion idBook={idBook} />}
          buttonLabel=""
          statusModal={statusModal}
          size="xl"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_SUPPORT:
      return (
        <PopupComponent
          className="popup_support"
          modalTitle={TEXT.TEXT_TITLE_POPUP_SUPPORT}
          type={type}
          content={<PopupSupport />}
          buttonLabel=""
          backdrop
          statusModal={statusModal}
          bgWrapper={IMAGES.BG_POPUP_ACTIVATE_BOOK}
          size="lg"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_EXAM_EXERCISES:
      return (
        <PopupComponent
          className=""
          modalTitle=""
          content={
            <ContentExamExercises
              statusModal={statusModal}
              data={dataPopupExamExercises}
            />
          }
          buttonLabel=""
          statusModal={statusModal}
          size="lg"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_TEST_RESULTS:
      return (
        <PopupComponent
          className=""
          modalTitle=""
          content={
            <TestResults statusModal={statusModal} data={resultQuestion} />
          }
          buttonLabel=""
          statusModal={statusModal}
          size="md"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_TEACHING_INFORMATION:
      return (
        <PopupComponent
          className=""
          modalTitle={TEXT.TEXT_TITLE_POPUP_TEACHING_INFORMATION}
          content={<TeachingInformation statusModal={statusModal} />}
          buttonLabel=""
          statusModal={statusModal}
          size="lg"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_ADD_FORM_DASHBOARD:
      return (
        <PopupComponent
          className=""
          modalTitle={TEXT.TITLE_FORM_DASHBOARD[role_id]}
          content={<ContentPopupFormDashboard statusModal={statusModal} />}
          buttonLabel=""
          statusModal={statusModal}
          size="lg"
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_OTP:
      return (
        <PopupComponent
          className=""
          modalTitle=""
          content={<ContentPopupOTP statusModal={statusModal} />}
          buttonLabel=""
          statusModal={statusModal}
        />
      );

    case CONSTANTS_TYPE.TYPE_POPUP_CHANGE_PW:
      return (
        <PopupComponent
          className=""
          modalTitle=""
          content={<ContentPopupChangePw statusModal={statusModal} />}
          buttonLabel=""
          statusModal={statusModal}
        />
      );
    case CONSTANTS_TYPE.TYPE_POPUP_REQUIRED_LOGIN:
      return (
        <PopupComponent
          className="popup_success"
          modalTitle=""
          content={<ContentPopupRequireLogin />}
          buttonLabel=""
          statusModal={statusModal}
        />
      );
    case CONSTANTS_TYPE.TYPE_POPUP_BUY_BOOK:
      return (
        <PopupComponent
          className="popup_success"
          modalTitle=""
          content={<ContentPopupBuyBook />}
          buttonLabel=""
          statusModal={statusModal}
        />
      );

    default:
      return false;
  }
};

export const dataDownloadPage = [
  {
    thumb: `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/download-thumb.png `,
    title: "Link file",
    type_document: 5,
    url: "https://vepicpublishing-my.sharepoint.com/:u:/g/personal/it_vepic_edu_vn/EQmvIuYAjMNBsbdAIgbxiBIBy4Lddv-9QpQye9K171Nzsg?e=eQWJCk",
  },
  // {
  //   thumb:
  //     `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/github-thumb.png`,
  //   title: "Link github",
  //   type_document: 5,
  //   url: "https://github.com/EasyCode-Software/",
  // },
];
