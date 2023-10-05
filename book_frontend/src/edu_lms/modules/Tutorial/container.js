import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import * as Scroll from "react-scroll";
import { Element, animateScroll as scroll } from "react-scroll";
import BannerComponent from "../../components/Banner";
import TutorialWrapper from "./components";
import { onDispatchTutorialId, onDispatchListBookTutorial } from "./actions";
import {
  getListBookTutorial,
  searchBookTutorial,
} from "../../services/tutorial";
import { onDispatchShowLoading } from "../App/actions";
import {
  BOOK_DOCUMENT_POWERPOINT,
  BOOK_DOCUMENT_POWERPOINT_PDF,
  OPTIONS_FILE,
} from "../../constants/type";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";
import { onResultTypeBook } from "../../modules/selection";

class TutorialContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 12,
      currentPage: 0,
      total: 0,
    };
  }

  componentDidMount() {
    const data = {
      typeDocument: onResultTypeBook(this.props.fileId),
      gradeId: 0,
    };
    this.onGetData(data);
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;

    this.props.onDispatchShowLoading(true);
    getListBookTutorial(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListBookTutorial(res.data.data.data);
          this.setState({
            pageCount: Math.ceil(res.data.data.total / this.state.perPage),
            total: res.data.data.total,
          });
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };

  onGetDataBook = (selectId, typeBook) => {
    const newTypeBook = onResultTypeBook(selectId);
    this.props.onDispatchTutorialId(selectId);
    const data = {
      typeDocument: newTypeBook,
      gradeId: 0,
    };
    this.onGetData(data);
  };

  onSearch = (value) => {
    const data = {
      typeDocument: onResultTypeBook(this.props.fileId),
      value: value,
    };
    this.props.onDispatchShowLoading(true);
    searchBookTutorial(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListBookTutorial(res.data.data.data);
          this.setState({
            pageCount: Math.ceil(res.data.data.total / this.state.perPage),
            total: res.data.data.total,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onPageClick = (e) => {
    const selectedPage = e.selected + 1;
    const data = {
      typeDocument: onResultTypeBook(this.props.fileId),
      gradeId: 0,
      page: selectedPage,
    };
    this.onGetData(data);
  };
  render() {
    return (
      <Fragment>
        <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          path_home={true}
          styleUI={true}
          values={[TEXT.TITLE_BANNER_TUTORIAL_1, TEXT.TITLE_BANNER_TUTORIAL_2]}
          isButton={false}
          description={TEXT.DESCRIPTION_BANNER_TUTORIAL_2}
        />
        <Element name="myScrollToElement">
          <TutorialWrapper
            data={this.props.listBookTutorial}
            listFileOption={OPTIONS_FILE}
            fileId={this.props.fileId}
            total={this.state.total}
            typeBook={onResultTypeBook(this.props.fileId)}
            pageCount={this.state.pageCount}
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            onGetDataBook={this.onGetDataBook}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { listBookTutorial, fileId } = state.tutorialReducer;
  return {
    listBookTutorial,
    fileId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListBookTutorial,
      onDispatchTutorialId,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TutorialContainer);
