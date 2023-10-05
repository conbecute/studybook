import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import * as Scroll from "react-scroll";
import { Element, animateScroll as scroll } from "react-scroll";
import BannerComponent from "../../components/Banner";
import IntroduceWrapper from "./components";
import { getListSubject } from "../../services/app/app";
import {
  onDispatchListBookEducationTeacher,
  onDispatchUpdateParamterEducationTeacher,
  onDispatchListSubjectEducationTeacher,
} from "./actions";
import {
  OPTIONS_FILE_COURSEWARE,
  OPTIONS_GRADE_IN_INTRODUCE,
  WORKSHEET_TRANING_DOCUMENT,
} from "../../constants/type";
import { onDispatchShowLoading } from "../App/actions";
import { getListDocument, searchBookTutorial } from "../../services/tutorial";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";
import { onResultTypeBook } from "../../modules/selection";
import { SHOW_PAGINATE } from "../../constants/type";
import * as PATH from "../../constants/path";
import FillTheBlankWithImages from "../../components/Game/FillTheBlankWithImages";

class EducationTeacherContainer extends Component {
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
      category: WORKSHEET_TRANING_DOCUMENT,
      subjectId: this.props.paramterIntroduce.subjectId,
      typeDocument: this.props.paramterIntroduce.fileId,
      gradeId: this.props.paramterIntroduce.gradeId,
    };
    this.onGetData(data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paramterIntroduce != this.props.paramterIntroduce) {
      const data = {
        category: WORKSHEET_TRANING_DOCUMENT,
        subjectId: this.props.paramterIntroduce.subjectId,
        typeDocument: this.props.paramterIntroduce.fileId,
        gradeId: this.props.paramterIntroduce.gradeId,
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
        if (res.data.status === "success") {
          this.props.onDispatchListBookEducationTeacher(res.data.data.data);
          this.setState({
            pageCount: Math.ceil(res.data.data.total / this.state.perPage),
            total: res.data.data.total,
          });
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
        }
        this.props.onDispatchShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };

  onSearch = (value) => {
    const data = {
      category: WORKSHEET_TRANING_DOCUMENT,
      subjectId: this.props.paramterIntroduce.subjectId,
      typeDocument: this.props.paramterIntroduce.fileId,
      value: value,
    };
    this.props.onDispatchShowLoading(true);
    searchBookTutorial(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListBookEducationTeacher(res.data.data.data);
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
          this.props.onDispatchListSubjectEducationTeacher(list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPageClick = (e) => {
    const selectedPage = e.selected + 1;
    const data = {
      category: WORKSHEET_TRANING_DOCUMENT,
      subjectId: this.props.paramterIntroduce.subjectId,
      typeDocument: this.props.paramterIntroduce.fileId,
      gradeId: this.props.paramterIntroduce.gradeId,
      page: selectedPage,
    };
    this.onGetData(data);
  };

  onGetDataBook = (selectedOptionId, typeBook) => {
    const data = {
      fileId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterEducationTeacher(data);
    this.props.onDispatchListBookEducationTeacher([]);
  };

  onGetDataBookByGrade = (selectedOptionId, typeBook) => {
    const data = {
      gradeId: selectedOptionId,
    };
    this.onGetDataSubject(selectedOptionId);
    this.props.onDispatchUpdateParamterEducationTeacher(data);
    this.props.onDispatchListBookEducationTeacher([]);
  };

  onGetDataBookBySubject = (selectedOptionId, typeBook) => {
    const data = {
      subjectId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterEducationTeacher(data);
    this.props.onDispatchListBookEducationTeacher([]);
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
            onGetDataBookBySubject={this.onGetDataBookBySubject}
            data={this.props.listBookIntroduce}
            pageCount={this.state.pageCount}
            total={this.state.total}
            gradeId={this.props.paramterIntroduce.gradeId}
            subjectId={this.props.paramterIntroduce.subjectId}
            fileId={this.props.paramterIntroduce.fileId}
            typeBook={onResultTypeBook(this.props.paramterIntroduce.fileId)}
            listFileOption={OPTIONS_FILE_COURSEWARE}
            listOptionGrade={OPTIONS_GRADE_IN_INTRODUCE}
            listOptionSubject={this.props.listSubject}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { paramterIntroduce, listBookIntroduce, listSubject } =
    state.educationTeacherReducer;
  return {
    paramterIntroduce,
    listBookIntroduce,
    listSubject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListBookEducationTeacher,
      onDispatchUpdateParamterEducationTeacher,
      onDispatchListSubjectEducationTeacher,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EducationTeacherContainer);
