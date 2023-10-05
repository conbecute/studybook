import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withAlert } from "react-alert";
import _ from "lodash";
import ReadingBooksWrapper from "./components";
import FormReference from "../../modules/ReferencePopup";

import {
  onDispatchShowQuestionPopup,
  onDispatchNumberPageBook,
  onDispatchDataQuestion,
  onDispatchTypeGameQuestion,
  onDispatchDataBook,
  onDispatchMenuBook,
  onDispatchParamterPage,
  onDispatchIdBook,
  onDispatchLanguageBook,
  onDispatchChangeTotal,
  onDispatchChangeIsActive,
  onDispatchChangeIsLicence,
  onDispatchChangeParamterBookId,
  onDispatchUpdatePageId,
  onDispatchUpdateBookToolPage,
  onDispatchUpdateReadingBookData,
  onDispatchUpdateCurrentMenu,
} from "./actions";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
  onDispatchTogglePopupSuccess,
  onDispatchShowLoading,
  onDispatchStatusTour,
  onDispatchIsBookEnglish,
} from "../App/actions";
import { onDispatchBookInfo, onDispatchAddBookId } from "../General/actions";
import {
  CODE_NOT_ACCESS_BOOK,
  CODE_NOT_LOGIN,
  TYPE_POPUP_ACTIVE_BOOK,
  TYPE_POPUP_BUY_BOOK,
  TYPE_POPUP_QUESTION,
  TYPE_POPUP_REQUIRED_LOGIN,
  TYPE_REFERENCE,
} from "../../constants/type";
import * as PATH from "../../constants/path";
import * as TEXT from "../../constants/text";
import { getListBook, getMenuBook } from "../../services/readingBook";
import { getActionGameBook } from "../../services/readingBook/";
import { findIdQuestion } from "./components/const";
import { onResultUserInfo } from "edu_lms/modules/selection";
import { HOC10_VIEW_BOOK } from "edu_lms/constants/eventNameGTM";
import { setEventGTM } from "edu_lms/constants/googleTagManager";

export class ReadingBooksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.total,
      bookId: this.props.match.params.id,
      bookName: this.props.match.params.name,
      bookType: this.props.match.params.bookType,
      objectId: null,
      showPopupReference: false,
      dataPopupRerference: [],
      aspectRatio: '',
      heightBook: 0,
      userInfo: onResultUserInfo()
    };
  }

  componentDidMount() {
    const data = {
      book_id: this.state.bookId,
      book_name: this.state.bookName,
      page: 0,
      limit: 0,
      status: "",
    };
    this.onGetListBook(data);
    this.props.onDispatchChangeParamterBookId(this.state.bookId);
    window.addEventListener('beforeunload', () => this.handleTrackingEvent());

    const dataMenu = {
      book_id: this.state.bookId,
    };

    this.onGetMenuBook(dataMenu);
    this.props.onDispatchNumberPageBook(+this.props.match.params.pageId);
  }

  componentWillUnmount() {
    this.props.onDispatchDataBook([]);
    this.props.onDispatchMenuBook([]);
    this.props.onDispatchNumberPageBook(0);
    this.props.onDispatchUpdatePageId(0);
    this.handleTrackingEvent();
  }

  onGetListBook = (data) => {
    this.props.onDispatchShowLoading(true);
    getListBook(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          const dataBooks = res.data.data;
          const data = _.concat(res.data.data.list_page);

          this.props.onDispatchBookInfo({bookName: dataBooks.title, bookType: dataBooks.book_type_id, bookGrade: dataBooks.grade_id,bookSubject: dataBooks.subject_id, bookThumb: dataBooks.thumb });
          this.props.onDispatchAddBookId(dataBooks.book_id);
          this.props.onDispatchDataBook(data);
          this.state.aspectRatio = `${dataBooks.width} / ${dataBooks.height}`;
          this.state.heightBook = 550 / (dataBooks.width / dataBooks.height);

          this.props.onDispatchUpdateReadingBookData({
            bookType: dataBooks.book_type_id,
          });
          this.props.onDispatchLanguageBook(dataBooks.language);
          this.props.onDispatchChangeTotal(dataBooks.total);
          this.props.onDispatchChangeIsActive(dataBooks.is_active);
          this.props.onDispatchChangeIsLicence(dataBooks.is_licence);
        } else {
          if (res.data.code === CODE_NOT_LOGIN) {
            const dataSuccess = {
              status: true,
              title: [TEXT.TITLE_POPUP_NOT_LOGIN],
              url: PATH.ROUTE_PATH_SIGN_IN,
              labelButton: TEXT.TITLE_SIGN_IN,
              icon: "fa-exclamation",
              close: true,
            };
            this.props.onDispatchTogglePopupSuccess(dataSuccess);
          }
          if (res.data.code === CODE_NOT_ACCESS_BOOK) {
            const dataSuccess = {
              status: true,
              title: [TEXT.TITLE_POPUP_NOT_ACCESS_BOOK],
              url: PATH.ROUTE_PATH_GENERAL,
              labelButton: TEXT.BUTTON_ACCESS_TO_THE_SOFT_BOOK_STORE,
              icon: "fa-exclamation",
              close: true,
            };
            this.props.onDispatchTogglePopupSuccess(dataSuccess);
          }
        }
      })
      .catch(() => {
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetMenuBook = (data) => {
    this.props.onDispatchShowLoading(true);
    getMenuBook(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          const data = _.concat(res.data.data);
          const currentMenu = findIdQuestion(data, +this.props.match.params.pageId);
          this.props.onDispatchMenuBook(data);
          this.props.onDispatchUpdateCurrentMenu(currentMenu);
          this.setState({ ...this.state, total: 0 });
        }
      })
      .catch(() => {
        this.props.onDispatchShowLoading(false);
      });
  };

  onQuestionGame = (id, { pageId, objectType }) => {
    if (objectType == TYPE_REFERENCE) {
      this.setState({ showPopupReference: true, objectId: id });
      getActionGameBook(id)
        .then((res) => {
          if (res.data.status === "success") {
            this.setState({
              dataPopupRerference: res.data.data[0].game_config,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.props.onDispatchUpdatePageId(pageId);
      this.props.onDispatchIdBook(id);
      this.props.onDispatchTypePopup(TYPE_POPUP_QUESTION);
      this.props.onDispatchShowPopupActivateBook(true);
      this.props.onDispatchUpdateBookToolPage({
        ...this.props.bookTool,
        show: false,
      });
    }
  };

  onDispatchShowPopupLogin = (title) => {
    const dataSuccess = {
      status: true,
      title: [title],
      url: PATH.ROUTE_PATH_SIGN_IN,
      labelButton: TEXT.TITLE_SIGN_IN,
      icon: "fa-exclamation",
      close: true,
    };
    this.props.onDispatchTogglePopupSuccess(dataSuccess);
  };

  onDispatchStatusTour = (status) => {
    this.props.onDispatchStatusTour(1);
  };

  onDispatchShowPopupActiveFree = () => {
    const access_token = localStorage.getItem("token");
    let listBookIdEnglish = [
      "110",
      "80",
      "9",
      "81",
      "78",
      "20",
      "138",
      "208",
      "82",
      "79",
      "30",
      "152",
      "207",
      "173",
      "210",
    ];
    let isBookEnglish = listBookIdEnglish.includes(this.state.bookId.toString());

    if (this.props.isActive) {
      this.props.onDispatchTypePopup(TYPE_POPUP_BUY_BOOK);
    } else {
      if (access_token) {
        if (this.props.isLicence) {
          this.props.onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
        } else {
          this.props.onDispatchTypePopup(TYPE_POPUP_BUY_BOOK);
        }
      }

      if (!access_token) {
        if (this.props.isLicence) {
          this.props.onDispatchTypePopup(TYPE_POPUP_REQUIRED_LOGIN);
          this.props.onDispatchIsBookEnglish(isBookEnglish);
        } else {
          this.props.onDispatchTypePopup(TYPE_POPUP_BUY_BOOK);
        }
      }
    }
    this.props.onDispatchShowPopupActivateBook(true);
  };

  handleClose = () => {
    this.setState({ showPopupReference: false, objectId: null });
  };

  handleTrackingEvent = () => {
    const timeOnPage = Math.round(Date.now() / 1000) - this.props.bookInfo.timeStart;
    const data = {
      event: HOC10_VIEW_BOOK,
      time_on_page: timeOnPage,
      have_practice_now_or_not: this.props.currentMenu ? 'yes' : 'no',
      click_practice_now_or_not: this.props.clickPractice ? 'yes' : 'no',
      book_id: this.state.bookId,
      book_name: this.props.bookInfo.bookName,
      knowledge_id: this.props.currentMenu?.id,
      knowledge_name: this.props.currentMenu?.title,
      verified_account_or_not: !!this.state.userInfo?.email_verified ? 'yes' : 'no',
      sign_in_account_or_not: !!this.state.userInfo ? 'yes' : 'no',
    }

    setEventGTM(data);
  }

  render() {
    return (
      <>
        <FormReference
          show={this.state.showPopupReference}
          onHide={this.handleClose}
          data={this.state.dataPopupRerference}
        />
        <ReadingBooksWrapper
          bookId={this.state.bookId}
          bookType={this.state.bookType}
          bookName={this.state.bookName}
          isQuestionPopup={this.props.isQuestionPopup}
          dataBook={this.props.dataBook}
          menuBook={this.props.menuBook}
          heightBook={this.state.heightBook}
          aspectRatio={this.state.aspectRatio}
          dataQuestion={this.props.dataQuestion}
          total={this.props.total}
          isLicence={this.props.isLicence}
          typeGame={this.props.typeGame}
          pageBook={this.props.pageBook}
          onQuestionGame={this.onQuestionGame}
          onDispatchPageBook={this.props.onDispatchNumberPageBook}
          onDispatchCurrentMenu={this.props.onDispatchUpdateCurrentMenu}
          onDispatchUpdatePageId={this.props.onDispatchUpdatePageId}
          onDispatchShowPopupActiveFree={this.onDispatchShowPopupActiveFree}
          onDispatchShowPopupLogin={this.onDispatchShowPopupLogin}
          onDispatchStatusTour={this.props.onDispatchStatusTour}
          languageBook={this.props.languageBook}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    total,
    isActive,
    isLicence,
    isQuestionPopup,
    pageBook,
    dataBook,
    menuBook,
    typeGame,
    dataQuestion,
    paramterPage,
    languageBook,
    bookTool,
    currentMenu,
    clickPractice
  } = state.readingBookReducers;

  const { bookInfo } = state.generalReducer;

  const dataConfig = onDataConfig(dataBook, pageBook);

  return {
    total,
    isActive,
    isLicence,
    isQuestionPopup,
    pageBook,
    dataBook,
    menuBook,
    dataQuestion,
    typeGame,
    paramterPage,
    dataConfig,
    languageBook,
    bookTool: bookTool.page,
    bookInfo,
    currentMenu,
    clickPractice
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowQuestionPopup,
      onDispatchNumberPageBook,
      onDispatchDataQuestion,
      onDispatchTypeGameQuestion,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
      onDispatchShowLoading,
      onDispatchDataBook,
      onDispatchBookInfo,
      onDispatchMenuBook,
      onDispatchParamterPage,
      onDispatchIdBook,
      onDispatchLanguageBook,
      onDispatchChangeTotal,
      onDispatchChangeIsActive,
      onDispatchChangeIsLicence,
      onDispatchChangeParamterBookId,
      onDispatchTogglePopupSuccess,
      onDispatchStatusTour,
      onDispatchUpdatePageId,
      onDispatchUpdateBookToolPage,
      onDispatchUpdateReadingBookData,
      onDispatchIsBookEnglish,
      onDispatchAddBookId,
      onDispatchUpdateCurrentMenu,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  withAlert(),
  connect(mapStateToProps, mapDispatchToProps)
)(ReadingBooksContainer);

function onDataConfig(dataBook, nubmerPage) {
  let data = [];
  if (nubmerPage < 2) {
    data = _.slice(dataBook, 0, 6);
  } else {
    data = _.slice(dataBook, nubmerPage - 2, 6 + nubmerPage - 2);
  }
  return data;
}
