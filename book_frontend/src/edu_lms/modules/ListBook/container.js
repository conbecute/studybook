import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { bindActionCreators } from "redux";

import ListBookWrapper from "./component";

import {
  getListBook,
  getListBookUse,
  getListWorkSheet,
  getListSubjectActive,
} from "../../services/general/general";

import { onDispatchListTextbooks, onDispatchListBooksInUse } from "./actions";
import { onDispatchShowPopupActivateBook } from "../App/actions";
import {
  onDispatchAddBookId,
  onDispatchGradeIdBooksInUse,
  onDispatchGradeIdTextBook,
  onDispatchBooksInUse,
  onDispatchTextbooks,
  onDispatchBooksTeacher,
  onDispatchBooksTest3710,
  onDispatchBooksDocument,
  onDispatchGradeIdBookTeacher,
  onDispatchGradeIdBookTest3710,
  onDispatchGradeIdBookDocument,
  onDispatchSubjectIdBookDocument,
  onDispatchWorkBooks,
  onDispatchGradeIdWorkBooks,
  onDispatchListSubjectActive,
} from "../General/actions";
import { onDispatchShowLoading } from "../App/actions";
import { getSearchBook } from "../../services/book/book";
import * as TYPE from "../../constants/general";
import { onResultDataBook, onResultParamterBook } from "../selection";
import {
  getGradeIdTest3710,
  GRADETEST3710,
  SHOW_PAGINATE,
} from "../../constants/type";

export class ListBookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPage: 1,
      perPage: SHOW_PAGINATE,
      titleBook: onResultParamterBook(
        this.props.match.path,
        this.props.gradeIdTextBook,
        this.props.gradeIdBookUsed,
        this.props.gradeIdBookTeacher,
        this.props.gradeIdBookTest3710,
        this.props.gradeIdBookDocument,
        this.props.gradeIdWorkbook
      ).title,
      total: 0,
      bookId: 0,
    };
  }
  componentDidMount() {
    const typeBook = onResultParamterBook(
      this.props.match.path,
      this.props.gradeIdTextBook,
      this.props.gradeIdBookUsed,
      this.props.gradeIdBookTeacher,
      this.props.gradeIdBookTest3710,
      this.props.gradeIdBookDocument,
      this.props.gradeIdWorkbook
    );

    const parameterTextBooks = {
      typeBook: typeBook.type,
      gradeId: typeBook.gradeId,
    };
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;

    if (typeBook.type === TYPE.TYPE_TEXT_BOOKS) {
      this.props.onDispatchShowLoading(true);
      this.onListBook(parameterTextBooks);
    }
    if (typeBook.type === TYPE.TYPE_TEXT_BOOKS_USED) {
      this.props.onDispatchShowLoading(true);
      this.onListBookUse(parameterTextBooks);
    }
    if (typeBook.type === TYPE.TYPE_TEXT_BOOKS_TEACHER) {
      this.props.onDispatchShowLoading(true);
      this.onGetListBookTeacher(parameterTextBooks);
    }
    if (typeBook.type === TYPE.TYPE_TEXT_BOOKS_TEST_3710) {
      this.props.onDispatchShowLoading(true);
      this.onGetListBookTest3710(parameterTextBooks);
    }
    if (typeBook.type === TYPE.TYPE_TEXT_BOOKS_DOCUMENT) {
      this.props.onDispatchShowLoading(true);
      this.onGetListBookDocument(parameterTextBooks);
      this.onGetListSubjectActive(parameterTextBooks);
    }
    if (typeBook.type === TYPE.TYPE_TEXT_WORK_BOOKS) {
      this.props.onDispatchShowLoading(true);
      this.onGetListWorkBook(parameterTextBooks);
    }
  }

  onListBook = (parameter) => {
    getListBook(parameter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
          this.props.onDispatchTextbooks(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onListBookUse = (parameter) => {
    getListBookUse(parameter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksInUse(res.data.data);
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetListBookDocument = (paramter) => {
    getListWorkSheet(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchBooksDocument(res.data.data);
          this.setState({ total: res.data.data.total });
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
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
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
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
          this.props.onDispatchBooksTest3710(res.data.data);
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
  onGetListSubjectActive = (paramter) => {
    getListSubjectActive(paramter)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListSubjectActive(res.data.data);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };
  onSearch = (text, gradeId, typeBook) => {
    this.props.onDispatchShowLoading(true);
    getSearchBook(text, gradeId, typeBook)
      .then((data) => {
        if (data.data.status == "success") {
          const typeBook = onResultParamterBook(
            this.props.match.path,
            this.props.gradeIdTextBook,
            this.props.gradeIdBookUsed,
            this.props.gradeIdBookTeacher
          ).type;
          if (typeBook == TYPE.TYPE_TEXT_BOOKS) {
            this.props.onDispatchTextbooks(data.data.data);
            this.props.onDispatchShowLoading(false);
          }
          if (typeBook == TYPE.TYPE_TEXT_BOOKS_USED) {
            this.props.onDispatchBooksInUse(data.data.data);
            this.props.onDispatchShowLoading(false);
          }
          if (typeBook == TYPE.TYPE_TEXT_BOOKS_TEACHER) {
            this.props.onDispatchBooksTeacher(data.data.data);
            this.props.onDispatchShowLoading(false);
          }
          if (typeBook == TYPE.TYPE_TEXT_WORK_BOOKS) {
            this.props.onDispatchWorkBooks(data.data.data);
            this.props.onDispatchShowLoading(false);
          }
          if (typeBook == TYPE.TYPE_TEXT_BOOKS_TEST_3710) {
            this.props.onDispatchBooksTest3710(data.data.data);
            this.props.onDispatchShowLoading(false);
          }
        } else {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchTextbooks([]);
          this.props.onDispatchBooksInUse([]);
          this.props.onDispatchBooksTeacher([]);
          this.props.onDispatchWorkBooks([]);
          this.props.onDispatchBooksTest3710([]);
        }
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetDataBook = (selectId, typeBook, page, bookId) => {
    const parameterTextBooks = {
      typeBook: typeBook,
      gradeId: selectId,
      page: page || this.state.countPage,
      subjectId: bookId ? bookId : 0,
    };
    this.props.onDispatchShowLoading(true);
    if (typeBook === TYPE.TYPE_TEXT_BOOKS) {
      this.props.onDispatchGradeIdTextBook(selectId);
      this.onListBook(parameterTextBooks);
    }
    if (typeBook === TYPE.TYPE_TEXT_BOOKS_USED) {
      this.props.onDispatchGradeIdBooksInUse(selectId);
      this.onListBookUse(parameterTextBooks);
    }
    if (typeBook === TYPE.TYPE_TEXT_BOOKS_TEACHER) {
      this.props.onDispatchGradeIdBookTeacher(selectId);
      this.onGetListBookTeacher(parameterTextBooks);
    }
    if (typeBook === TYPE.TYPE_TEXT_BOOKS_TEST_3710) {
      this.props.onDispatchGradeIdBookTest3710(selectId);
      this.onGetListBookTest3710(parameterTextBooks);
    }
    if (typeBook === TYPE.TYPE_TEXT_BOOKS_DOCUMENT) {
      this.props.onDispatchGradeIdBookDocument(selectId);
      this.onGetListBookDocument(parameterTextBooks);
      this.onGetListSubjectActive(parameterTextBooks);
    }
    if (typeBook === TYPE.TYPE_TEXT_WORK_BOOKS) {
      this.props.onDispatchGradeIdWorkBooks(selectId);
      this.onGetListWorkBook(parameterTextBooks);
    }
  };

  onGetDataByGrade = (selectId, typeBook) => {
    this.onGetDataBook(selectId, typeBook, 1, 0);
  };

  onGetDataBookBySubject = (selectId, typeBook, gradeId) => {
    this.setState({ bookId: selectId });
    const parameterTextBooks = {
      gradeId: gradeId,
      subjectId: selectId,
      page: this.state.countPage,
    };
    if (typeBook === TYPE.TYPE_TEXT_BOOKS_DOCUMENT) {
      onDispatchSubjectIdBookDocument(selectId);
      this.onGetListBookDocument(parameterTextBooks);
      // this.onGetListSubjectActive(parameterTextBooks);
    }
  };

  onShowPopupActivateBook = (statusModal, bookId) => {
    this.props.onDispatchShowPopupActivateBook(statusModal);
    this.props.onDispatchAddBookId(bookId);
  };
  onPageClick = (e, gradeId, typeBook, bookId) => {
    const page = e.selected + 1;

    this.onGetDataBook(gradeId, typeBook, page, bookId);
  };
  render() {
    const {
      listTextbooks,
      listBookInUse,
      listGrade,
      listBookTeacher,
      listBookTest3710,
      listBookDocument,
      listWorkbook,
      listSubjectActive,
    } = this.props;
    const typeBook = onResultParamterBook(
      this.props.match.path,
      this.props.gradeIdTextBook,
      this.props.gradeIdBookUsed,
      this.props.gradeIdBookTeacher,
      this.props.gradeIdBookTest3710,
      this.props.gradeIdBookDocument,
      this.props.gradeIdWorkbook
    );

    return (
      <Fragment>
        <Element name="myScrollToElement">
          <ListBookWrapper
            title={this.state.titleBook}
            data={onResultDataBook(
              typeBook.type,
              listTextbooks,
              listBookInUse,
              listBookTeacher,
              listBookTest3710,
              listBookDocument,
              listWorkbook
            )}
            gradeId={typeBook.gradeId}
            subjectId
            listGrade={
              typeBook.type !== 6
                ? listGrade
                : getGradeIdTest3710(localStorage.getItem("grade_id_book_test"))
            }
            listSubjectActive={listSubjectActive}
            statusModal={this.props.statusModal}
            typeBook={typeBook.type}
            onShowPopupActivateBook={this.onShowPopupActivateBook}
            onGetDataBook={this.onGetDataByGrade}
            onGetDataBookBySubject={this.onGetDataBookBySubject}
            onSearch={this.onSearch}
            total={this.state.total}
            pageCount={Math.ceil(this.state.total / this.state.perPage)}
            onPageClick={this.onPageClick}
            bookId={this.state.bookId}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { statusModal, listGrade } = state.app;
  const {
    gradeIdTextBook,
    gradeIdBookUsed,
    gradeIdBookTeacher,
    gradeIdBookTest3710,
    gradeIdBookDocument,
    gradeIdWorkbook,
    listTextbooks,
    listBookInUse,
    listBookTeacher,
    listBookTest3710,
    listBookDocument,
    listWorkbook,
    listSubjectActive,
  } = state.generalReducer;
  return {
    listBookInUse,
    listBookTeacher,
    listBookTest3710,
    listBookDocument,
    listTextbooks,
    statusModal,
    gradeIdTextBook,
    gradeIdBookUsed,
    gradeIdBookTeacher,
    gradeIdBookTest3710,
    gradeIdBookDocument,
    gradeIdWorkbook,
    listGrade,
    listWorkbook,
    listSubjectActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchListTextbooks,
      onDispatchShowPopupActivateBook,
      onDispatchListBooksInUse,
      onDispatchAddBookId,
      onDispatchGradeIdBooksInUse,
      onDispatchGradeIdTextBook,
      onDispatchBooksInUse,
      onDispatchTextbooks,
      onDispatchShowLoading,
      onDispatchBooksTeacher,
      onDispatchBooksTest3710,
      onDispatchBooksDocument,
      onDispatchGradeIdBookTeacher,
      onDispatchGradeIdBookTest3710,
      onDispatchGradeIdBookDocument,
      onDispatchSubjectIdBookDocument,
      onDispatchWorkBooks,
      onDispatchGradeIdWorkBooks,
      onDispatchListSubjectActive,
    },
    dispatch
  );
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ListBookContainer);
