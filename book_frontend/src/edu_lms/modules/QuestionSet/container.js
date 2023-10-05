import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Element, animateScroll as scroll } from "react-scroll";
import { onDispatchShowLoading } from "../App/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListSubject } from "../../services/app/app";
import {
  onDispatchListQuestionSet,
  onDispatchUpdateParamterQuestionSet,
  onDispatchListSubjectQuestionSet,
} from "./actions";
import {
  OPTIONS_FILE_COURSEWARE,
  OPTIONS_GRADE_IN_INTRODUCE,
  SHOW_PAGINATE,
} from "../../constants/type";
import QuestionSetWrapper from "./components";
import QuestionSet from "./components/QuestionSet";
import {
  getListQuestionSet,
  postCreateQuestionSet,
} from "../../services/question";

class QuestionSetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: SHOW_PAGINATE,
      currentPage: 0,
      total: 0,
      showFormQuestionSetModal: false,
    };
  }
  componentDidMount() {
    const data = {
      gradeId: this.props.paramterQuestionSet.gradeId,
      subjectId: this.props.paramterQuestionSet.subjectId,
      title: "",
    };
    this.onGetData(data);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.paramterQuestionSet != this.props.paramterQuestionSet) {
      const data = {
        gradeId: this.props.paramterQuestionSet.gradeId,
        subjectId: this.props.paramterQuestionSet.subjectId,
        title: "",
      };
      this.onGetData(data);
    }
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListQuestionSet(data)
      .then((res) => {
        this.props.onDispatchShowLoading(false);
        if (res.data.status === "success") {
          this.props.onDispatchListQuestionSet(res.data.data.data);
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
          this.props.onDispatchListSubjectQuestionSet(list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSearch = (value) => {
    const data = {
      gradeId: this.props.paramterQuestionSet.gradeId,
      subjectId: this.props.paramterQuestionSet.subjectId,
      value: value,
      title: value,
    };
    this.props.onDispatchShowLoading(true);
    getListQuestionSet(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListQuestionSet(res.data.data.data);
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
      gradeId: this.props.paramterQuestionSet.gradeId,
      subjectId: this.props.paramterQuestionSet.subjectId,
      page: selectedPage,
      title: "",
    };
    this.onGetData(data);
  };
  onGetDataBookByGrade = (selectedOptionId, typeBook) => {
    const data = {
      gradeId: selectedOptionId,
      subjectId: 0,
    };
    this.onGetDataSubject(selectedOptionId);
    this.props.onDispatchUpdateParamterQuestionSet(data);
    this.props.onDispatchListQuestionSet([]);
  };
  onGetDataBook = (selectedOptionId, typeBook) => {
    const data = {
      fileId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterQuestionSet(data);
    this.props.onDispatchListQuestionSet([]);
  };
  onGetSubjects = (selectedOptionId) => {
    const data = {
      subjectId: selectedOptionId,
    };
    this.props.onDispatchUpdateParamterQuestionSet(data);
    this.props.onDispatchListQuestionSet([]);
  };

  handleClose = () => {
    this.setState({
      showFormQuestionSetModal: false,
    });
  };
  onCreateQuestionSet = () => {
    this.setState({
      showFormQuestionSetModal: true,
    });
  };

  onSaveQuestionSet = (dataCreateQuestionSet) => {
    postCreateQuestionSet(dataCreateQuestionSet)
      .then((res) => {
        console.log("res", res);
        if (res.data.status === "success") {
          toast.success("Tạo mới bộ đề thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const data = {
            gradeId: this.props.paramterQuestionSet.gradeId,
            subjectId: this.props.paramterQuestionSet.subjectId,
            title: "",
          };
          this.onGetData(data);
          this.setState({
            showFormQuestionSetModal: false,
          });
        } else {
          toast.error("Tạo mới câu hỏi thất bại!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <ToastContainer />
        {this.state.showFormQuestionSetModal && (
          <QuestionSet
            onSaveQuestionSet={this.onSaveQuestionSet}
            show={this.state.showFormQuestionSetModal}
            onHide={this.handleClose}
          />
        )}
        <Element name="myScrollToElement">
          <QuestionSetWrapper
            pageCount={this.state.pageCount}
            data={this.props.listQuestionSet}
            total={this.state.total}
            listOptionGrade={OPTIONS_GRADE_IN_INTRODUCE}
            listSubjects={this.props.listSubjectQuestionSet}
            listFileOption={OPTIONS_FILE_COURSEWARE}
            gradeId={this.props.paramterQuestionSet.gradeId}
            fileId={this.props.paramterQuestionSet.fileId}
            subjectId={this.props.paramterQuestionSet.subjectId}
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            onGetDataBookByGrade={this.onGetDataBookByGrade}
            onGetDataBook={this.onGetDataBook}
            onGetSubjects={this.onGetSubjects}
            onCreateQuestionSet={this.onCreateQuestionSet}
          />
        </Element>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { listQuestionSet, paramterQuestionSet, listSubjectQuestionSet } =
    state.questionSetReducer;
  return {
    listQuestionSet,
    paramterQuestionSet,
    listSubjectQuestionSet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListQuestionSet,
      onDispatchUpdateParamterQuestionSet,
      onDispatchListSubjectQuestionSet,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionSetContainer);
