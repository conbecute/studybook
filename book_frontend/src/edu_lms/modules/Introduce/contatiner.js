import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import BannerComponent from "../../components/Banner";
import IntroduceWrapper from "./components";
import {
  onDispatchListBookIntroduce,
  onDispatchUpdateParamterIntroduce,
} from "./actions";
import { OPTIONS_FILE, OPTIONS_GRADE_IN_INTRODUCE } from "../../constants/type";
import { onDispatchShowLoading } from "../App/actions";
import {
  getListBookTutorial,
  searchBookTutorial,
} from "../../services/tutorial";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";
import { onResultTypeBook } from "../../modules/selection";
import { BOOK_DOCUMENT_PDF, SHOW_PAGINATE } from "../../constants/type";
import * as PATH from "../../constants/path";

class IntroduceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: SHOW_PAGINATE,
      total: 0,
    };
  }

  componentDidMount() {
    const data = {
      typeDocument: onResultTypeBook(this.props.paramterIntroduce.fileId),
      gradeId: this.props.paramterIntroduce.gradeId,
    };
    this.onGetData(data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paramterIntroduce != this.props.paramterIntroduce) {
      const data = {
        typeDocument: onResultTypeBook(this.props.paramterIntroduce.fileId),
        gradeId: this.props.paramterIntroduce.gradeId,
      };
      this.onGetData(data);
    }
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListBookTutorial(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListBookIntroduce(res.data.data.data);
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

  onSearch = (value) => {
    const data = {
      typeDocument: onResultTypeBook(this.props.paramterIntroduce.fileId),
      value: value,
    };
    this.props.onDispatchShowLoading(true);
    searchBookTutorial(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListBookIntroduce(res.data.data.data);
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
      typeDocument: onResultTypeBook(this.props.paramterIntroduce.fileId),
      gradeId: this.props.paramterIntroduce.gradeId,
      page: selectedPage,
    };
    this.onGetData(data);
  };

  onGetDataBook = (selectedOptionId, typeBook) => {
    const data = {
      fileId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterIntroduce(data);
    this.props.onDispatchListBookIntroduce([]);
  };

  onGetDataBookByGrade = (selectedOptionId, typeBook) => {
    const data = {
      gradeId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterIntroduce(data);
    this.props.onDispatchListBookIntroduce([]);
  };

  render() {
    return (
      <Fragment>
        <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          path_home={true}
          styleUI={true}
          values={[
            TEXT.TITLE_BANNER_INTRODUCE_1,
            TEXT.TITLE_BANNER_INTRODUCE_2,
          ]}
        />
        <Element name="myScrollToElement">
          <IntroduceWrapper
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            onGetDataBook={this.onGetDataBook}
            onGetDataBookByGrade={this.onGetDataBookByGrade}
            data={this.props.listBookIntroduce}
            pageCount={this.state.pageCount}
            total={this.state.total}
            gradeId={this.props.paramterIntroduce.gradeId}
            fileId={this.props.paramterIntroduce.fileId}
            typeBook={onResultTypeBook(this.props.paramterIntroduce.fileId)}
            listFileOption={OPTIONS_FILE}
            listOptionGrade={OPTIONS_GRADE_IN_INTRODUCE}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { paramterIntroduce, listBookIntroduce } = state.introduceReducer;
  return {
    paramterIntroduce,
    listBookIntroduce,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListBookIntroduce,
      onDispatchUpdateParamterIntroduce,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(IntroduceContainer);
