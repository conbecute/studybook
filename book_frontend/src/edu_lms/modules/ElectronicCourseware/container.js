import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Scroll from "react-scroll";
import { Element, animateScroll as scroll } from "react-scroll";
import ElectronicCoursewareWrapper from "./components";
import BannerComponent from "../../components/Banner";
import { onDispatchShowLoading } from "../App/actions";
import {
  getListDocument,
  searchBookTutorial,
  searchListDocument,
} from "../../services/tutorial";
import { getListSubject } from "../../services/app/app";
import {
  onDispatchListBookCourseware,
  onDispatchUpdateParamterCourseware,
  onDispatchListSubjectCourseware,
} from "./actions";
import * as LINK from "../../constants/background";
import * as PATH from "../../constants/path";
import {
  OPTIONS_GRADE_IN_INTRODUCE,
  SHOW_PAGINATE,
  OPTIONS_FILE_COURSEWARE,
  WORKSHEET_ELEARNING_DOCUMENT,
} from "../../constants/type";
import { onResultTypeBook } from "../../modules/selection";

class ElectronicCoursewareContainer extends Component {
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
      typeDocument: this.props.paramterCourseware.fileId,
      gradeId: this.props.paramterCourseware.gradeId,
      subjectId: this.props.paramterCourseware.subjectId,
      category: WORKSHEET_ELEARNING_DOCUMENT,
    };
    this.onGetData(data);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.paramterCourseware != this.props.paramterCourseware) {
      const data = {
        typeDocument: this.props.paramterCourseware.fileId,
        gradeId: this.props.paramterCourseware.gradeId,
        subjectId: this.props.paramterCourseware.subjectId,
        category: WORKSHEET_ELEARNING_DOCUMENT,
      };
      this.onGetData(data);
    }
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListDocument(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListBookCourseware(res.data.data.data);
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
          this.props.onDispatchListSubjectCourseware(list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSearch = (value) => {
    const data = {
      typeDocument: this.props.paramterCourseware.fileId,
      gradeId: this.props.paramterCourseware.gradeId,
      subjectId: this.props.paramterCourseware.subjectId,
      category: WORKSHEET_ELEARNING_DOCUMENT,
      value: value,
    };
    this.props.onDispatchShowLoading(true);
    searchListDocument(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListBookCourseware(res.data.data.data);
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
      typeDocument: this.props.paramterCourseware.fileId,
      gradeId: this.props.paramterCourseware.gradeId,
      subjectId: this.props.paramterCourseware.subjectId,
      category: WORKSHEET_ELEARNING_DOCUMENT,
      page: selectedPage,
    };
    this.onGetData(data);
  };
  onGetDataBookByGrade = (selectedOptionId, typeBook) => {
    const data = {
      gradeId: selectedOptionId,
    };
    this.onGetDataSubject(selectedOptionId);
    this.props.onDispatchUpdateParamterCourseware(data);
    this.props.onDispatchListBookCourseware([]);
  };
  onGetDataBook = (selectedOptionId, typeBook) => {
    const data = {
      fileId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterCourseware(data);
    this.props.onDispatchListBookCourseware([]);
  };
  onGetSubjects = (selectedOptionId, typeBook) => {
    const data = {
      subjectId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterCourseware(data);
    this.props.onDispatchListBookCourseware([]);
  };
  render() {
    return (
      <Fragment>
        <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          values={["HỌC LIỆU ĐIỆN TỬ"]}
          path_home={true}
          styleUI={true}
          isButton={false}
          description={"Bộ sách giáo khoa Cánh Diều"}
        />
        <Element name="myScrollToElement">
          <ElectronicCoursewareWrapper
            pageCount={this.state.pageCount}
            data={this.props.listBookCourseware}
            total={this.state.total}
            listOptionGrade={OPTIONS_GRADE_IN_INTRODUCE}
            listSubjects={this.props.listSubjectCourseware}
            listFileOption={OPTIONS_FILE_COURSEWARE}
            gradeId={this.props.paramterCourseware.gradeId}
            fileId={this.props.paramterCourseware.fileId}
            subjectId={this.props.paramterCourseware.subjectId}
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            onGetDataBookByGrade={this.onGetDataBookByGrade}
            onGetDataBook={this.onGetDataBook}
            onGetSubjects={this.onGetSubjects}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { listBookCourseware, paramterCourseware, listSubjectCourseware } =
    state.coursewareReducer;
  return {
    listBookCourseware,
    paramterCourseware,
    listSubjectCourseware,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListBookCourseware,
      onDispatchUpdateParamterCourseware,
      onDispatchListSubjectCourseware,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectronicCoursewareContainer);
