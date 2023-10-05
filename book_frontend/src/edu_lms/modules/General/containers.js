import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Element, scroller } from "react-scroll";
import GeneralWrapper from "./components";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
} from "../App/actions";
import {
  onDispatchTextbooks,
  onDispatchReferenceBooks,
  onDispatchBooksInUse,
  onDispatchAddBookId,
  onDispatchGradeIdTextBook,
  onDispatchGradeIdBooksInUse,
  onDispatchBooksTeacher,
  onDispatchBooksTest3710,
  onDispatchBooksDocument,
  onDispatchGradeIdBookTeacher,
  onDispatchGradeIdBookTest3710,
  onDispatchGradeIdBookDocument,
  onDispatchWorkBooks,
  onDispatchGradeIdWorkBooks,
} from "./actions";
import { onDispatchShowLoading } from "../App/actions";
import {
  getListBook,
  getListBookUse,
  getListBookTeacher,
  getListBookDocument,
} from "../../services/general/general";

import { getListDocument } from "../../services/tutorial";
import {
  TYPE_TEXT_BOOKS,
  TYPE_TEXT_BOOKS_USED,
  TYPE_TEXT_BOOKS_TEACHER,
  TYPE_TEXT_BOOKS_TEST_3710,
  TYPE_TEXT_WORK_BOOKS,
} from "../../constants/general";
import BannerComponent from "../../components/Banner";
import * as TYPE from "../../constants/general";
import * as PATH from "../../constants/path";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";
import {
  TYPE_POPUP_ACTIVE_BOOK,
  WORKSHEET_BOOK_DOCUMENT,
} from "../../constants/type";

export class GeneralContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const parameterTextBooks = {
      typeBook: TYPE_TEXT_BOOKS,
      gradeId: this.props.gradeIdTextBook,
    };
    const parameterBooksUsed = {
      typeBook: TYPE_TEXT_BOOKS_USED,
      gradeId: this.props.gradeIdBookUsed,
    };
    const parameterWorkBook = {
      typeBook: TYPE_TEXT_WORK_BOOKS,
      gradeId: this.props.gradeIdWorkbook,
    };
    const parameterBooksTeacher = {
      typeBook: TYPE_TEXT_BOOKS_TEACHER,
      gradeId: this.props.gradeIdBookTeacher,
    };
    const parameterBooksTest3710 = {
      typeBook: TYPE_TEXT_BOOKS_TEST_3710,
      gradeId: this.props.gradeIdBookTest3710,
    };
    const parameterBooksDocument = {
      typeBook: TYPE.TYPE_TEXT_BOOKS_DOCUMENT,
      gradeId: this.props.gradeIdBookTeacher,
      subjectId: 0,
    };

    this.props.onDispatchShowLoading(true);
    this.onGetListBook(parameterTextBooks);
    this.onGetLitBookUse(parameterBooksUsed);
    this.onGetListBookTeacher(parameterBooksTeacher);
    this.onGetListBookTest3710(parameterBooksTest3710);
    this.onGetListBookDocument(parameterBooksDocument);
    this.onGetListWorkBook(parameterWorkBook);

    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    scroller.scrollTo("scrollBook", {
      smooth: "easeInQuad",
      offset: -75,
    });
  }
  onGetListBook = (paramter) => {
    getListBook(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchTextbooks(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetLitBookUse = (paramter) => {
    getListBookUse(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksInUse(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };
  onGetListBookTeacher = (paramter) => {
    getListBook(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksTeacher(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetListBookTest3710 = (paramter) => {
    getListBook(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksTest3710(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetListBookDocument = (paramter) => {
    const data = {
      typeDocument: 0,
      category: WORKSHEET_BOOK_DOCUMENT,
      gradeId: paramter.gradeId,
      subjectId: paramter.subjectId,
    };
    getListDocument(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksDocument(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetListWorkBook = (paramter) => {
    getListBook(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchWorkBooks(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onShowPopupActivateBook = (statusModal, bookId) => {
    this.props.onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
    this.props.onDispatchShowPopupActivateBook(statusModal);
    this.props.onDispatchAddBookId(bookId);
  };

  onGetDataBook = (selectId, typeBook) => {
    const parameter = {
      typeBook: typeBook,
      gradeId: selectId,
      subjectId: 0,
    };
    switch (typeBook) {
      case TYPE_TEXT_BOOKS:
        this.props.onDispatchGradeIdTextBook(selectId);
        this.props.onDispatchShowLoading(true);
        this.onGetListBook(parameter);
        break;
      case TYPE_TEXT_BOOKS_USED:
        this.props.onDispatchGradeIdBooksInUse(selectId);
        this.props.onDispatchShowLoading(true);
        this.onGetLitBookUse(parameter);
        break;
      case TYPE_TEXT_BOOKS_TEACHER:
        this.props.onDispatchGradeIdBookTeacher(selectId);
        this.props.onDispatchShowLoading(true);
        this.onGetListBookTeacher(parameter);
        break;
      case TYPE_TEXT_BOOKS_TEST_3710:
        this.props.onDispatchGradeIdBookTest3710(
          localStorage.getItem("grade_id_book_test")
        );
        this.props.onDispatchShowLoading(true);
        this.onGetListBookTest3710(parameter);
        break;
      case TYPE_TEXT_WORK_BOOKS:
        this.props.onDispatchGradeIdWorkBooks(selectId);
        this.props.onDispatchShowLoading(true);
        this.onGetListWorkBook(parameter);
        break;
      case TYPE.TYPE_TEXT_BOOKS_DOCUMENT:
        this.props.onDispatchGradeIdBookDocument(selectId);
        this.props.onDispatchShowLoading(true);
        this.onGetListBookDocument(parameter);
        break;
      default:
        return "";
    }
  };

  render() {
    const {
      listBookInUse,
      statusModal,
      listTextbooks,
      listWorkbook,
      referenceBooks,
      listGrade,
      gradeIdBookUsed,
      gradeIdTextBook,
      listBookTeacher,
      listBookTest3710,
      listBookDocument,
      gradeIdBookTeacher,
      gradeIdBookTest3710,
      gradeIdBookDocument,
      gradeIdWorkbook,
    } = this.props;
    return (
      <Fragment>
        <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          styleUI={true}
          disableButton={true}
          values={[TEXT.TITLE_BANNER_HOME_1_1, TEXT.TITLE_BANNER_HOME_2_1]}
        />
        <Element name="scrollBook">
          <GeneralWrapper
            onShowPopupActivateBook={this.onShowPopupActivateBook}
            onGetDataBook={this.onGetDataBook}
            listBookInUse={listBookInUse}
            listTextbooks={listTextbooks}
            listBookTeacher={listBookTeacher}
            listBookTest3710={listBookTest3710}
            listBookDocument={listBookDocument}
            listWorkbook={listWorkbook}
            statusModal={statusModal}
            referenceBooks={referenceBooks}
            listGrade={listGrade}
            gradeIdBookUsed={gradeIdBookUsed}
            gradeIdTextBook={gradeIdTextBook}
            gradeIdBookTeacher={gradeIdBookTeacher}
            gradeIdBookTest3710={gradeIdBookTest3710}
            gradeIdBookDocument={gradeIdBookDocument}
            gradeIdWorkbook={gradeIdWorkbook}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { statusModal, listGrade } = state.app;
  const {
    listBookInUse,
    listTextbooks,
    listBookTeacher,
    listBookTest3710,
    listBookDocument,
    listWorkbook,
    gradeIdTextBook,
    gradeIdBookUsed,
    gradeIdBookTeacher,
    gradeIdBookTest3710,
    showTestBook3710,
    gradeIdBookDocument,
    gradeIdReferenceBook,
    gradeIdWorkbook,
    referenceBooks,
    bookId,
  } = state.generalReducer;
  return {
    listBookInUse,
    listTextbooks,
    listBookTeacher,
    listBookTest3710,
    showTestBook3710,
    listBookDocument,
    listWorkbook,
    statusModal,
    gradeIdTextBook,
    gradeIdBookUsed,
    gradeIdReferenceBook,
    gradeIdBookTeacher,
    gradeIdBookTest3710,
    gradeIdBookDocument,
    gradeIdWorkbook,
    referenceBooks,
    bookId,
    listGrade,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupActivateBook,
      onDispatchTextbooks,
      onDispatchReferenceBooks,
      onDispatchBooksInUse,
      onDispatchAddBookId,
      onDispatchGradeIdTextBook,
      onDispatchGradeIdBooksInUse,
      onDispatchShowLoading,
      onDispatchTypePopup,
      onDispatchBooksTeacher,
      onDispatchBooksTest3710,
      onDispatchBooksDocument,
      onDispatchGradeIdBookTeacher,
      onDispatchGradeIdBookTest3710,
      onDispatchGradeIdBookDocument,
      onDispatchWorkBooks,
      onDispatchGradeIdWorkBooks,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GeneralContainer);
