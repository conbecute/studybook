import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Element, animateScroll as scroll } from "react-scroll";
import { onDispatchShowLoading } from "../App/actions";

import { getListSlide } from "../../services/slide";
import { getListSubject } from "../../services/app/app";
import {
  onDispatchListSlide,
  onDispatchUpdateParamterSlide,
  onDispatchListSubjectSlide,
  onDispathSetInitialPage,
} from "./actions";
import {
  OPTIONS_GRADE_IN_INTRODUCE,
  SHOW_PAGINATE,
  OPTIONS_FILE_COURSEWARE,
  WORKSHEET_ELEARNING_DOCUMENT,
} from "../../constants/type";
import SlideLibraryWrapper from "./components";
import { BannerComponent } from "./components/Banner";

class SlideLibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: SHOW_PAGINATE,
      currentPage: 0,
      total: 0,
    };
  }
  componentDidMount() {
    const data = {
      gradeId: this.props.paramterSlide.gradeId,
      subjectId: this.props.paramterSlide.subjectId,
      title: "",
    };
    this.onGetData(data);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.paramterSlide != this.props.paramterSlide) {
      const data = {
        gradeId: this.props.paramterSlide.gradeId,
        subjectId: this.props.paramterSlide.subjectId,
        title: "",
      };
      this.onGetData(data);
    }
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListSlide(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListSlide(res.data.data.data);
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

  onGetDataSubject = (gradeId) => {
    getListSubject(gradeId)
      .then((res) => {
        if (res.data.status === "success") {
          let list = [{ id: 0, label: "Tất cả", value: "file_0", type: 0 }];
          res.data.data.list_subject.forEach((value, index) => {
            list.push({
              id: value.id,
              label: value.title,
              value: `file_${value.id}`,
              type: value.id,
            });
          });
          this.props.onDispatchListSubjectSlide(list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSearch = (value) => {
    const data = {
      gradeId: this.props.paramterSlide.gradeId,
      subjectId: this.props.paramterSlide.subjectId,
      value: value,
      title: value,
    };
    this.props.onDispatchShowLoading(true);
    getListSlide(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListSlide(res.data.data.data);
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
      gradeId: this.props.paramterSlide.gradeId,
      subjectId: this.props.paramterSlide.subjectId,
      category: WORKSHEET_ELEARNING_DOCUMENT,
      page: selectedPage,
      title: "",
    };
    this.onGetData(data);
    this.props.onDispathSetInitialPage(e.selected);
  };
  onGetDataBookByGrade = (selectedOptionId, typeBook) => {
    const data = {
      gradeId: selectedOptionId,
    };
    this.onGetDataSubject(selectedOptionId);
    this.props.onDispatchUpdateParamterSlide(data);
    this.props.onDispatchListSlide([]);
    this.props.onDispathSetInitialPage(0);
  };
  onGetDataBook = (selectedOptionId, typeBook) => {
    const data = {
      fileId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterSlide(data);
    this.props.onDispatchListSlide([]);
  };
  onGetSubjects = (selectedOptionId) => {
    const data = {
      subjectId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterSlide(data);
    this.props.onDispatchListSlide([]);
    this.props.onDispathSetInitialPage(0);
  };
  render() {
    return (
      <Fragment>
        <BannerComponent />
        <Element name="myScrollToElement">
          <SlideLibraryWrapper
            pageCount={this.state.pageCount}
            data={this.props.listSlide}
            total={this.state.total}
            listOptionGrade={OPTIONS_GRADE_IN_INTRODUCE}
            listSubjects={this.props.listSubjectSlide}
            listFileOption={OPTIONS_FILE_COURSEWARE}
            gradeId={this.props.paramterSlide.gradeId}
            fileId={this.props.paramterSlide.fileId}
            subjectId={this.props.paramterSlide.subjectId}
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            onGetDataBookByGrade={this.onGetDataBookByGrade}
            onGetDataBook={this.onGetDataBook}
            onGetSubjects={this.onGetSubjects}
            initialPage={this.props.initialPage}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { listSlide, paramterSlide, listSubjectSlide, initialPage } =
    state.slideReducer;
  return {
    listSlide,
    paramterSlide,
    listSubjectSlide,
    initialPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListSlide,
      onDispatchUpdateParamterSlide,
      onDispatchListSubjectSlide,
      onDispathSetInitialPage,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideLibraryContainer);
