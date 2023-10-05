import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import {
  getListQuestion,
  postCreateQuestion,
  postDeleteQuestion,
  postUpdateQuestion,
} from "../../services/question";
import { onDispatchShowLoading } from "../App/actions";
import {
  onDispatchListQuestion,
  onDispatchGradeName,
  onDispatchSubjectName,
  onDispatchTitleQuestionSet,
} from "./actions";

import QuestionWrapper from "./components";

export class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionSetId: this.props.match.params.id,
      gradeName: "",
      subjectName: "",
      title: "",
      gradeId: "",
      subjectId: "",
    };
  }

  componentDidMount() {
    const data = {
      question_set_id: this.state.questionSetId,
    };
    this.onGetData(data);
  }

  onGetData = (data) => {
    getListQuestion(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchListQuestion(res.data.data.list_question || []);
          this.props.onDispatchSubjectName(res.data.data.subject_name);
          this.props.onDispatchGradeName(res.data.data.grade_name);
          this.props.onDispatchTitleQuestionSet(res.data.data.title);
          this.setState({
            gradeId: res.data.data.grade_id,
            subjectId: res.data.data.subject_id,
          });
        }
      })
      .catch(() => {});
  };

  onEditQuestion = (dataCreateQuestion) => {
    const data = {
      question_set_id: this.state.questionSetId,
    };
    postUpdateQuestion(dataCreateQuestion)
      .then((res) => {
        if (res.data.status === "success") {
          this.onGetData(data);
          toast.success("Cập nhật câu hỏi thành công!");
        } else {
          toast.error("Cập nhật câu hỏi thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAddQuestion = (dataCreateQuestion) => {
    const data = {
      question_set_id: this.state.questionSetId,
    };
    postCreateQuestion(dataCreateQuestion)
      .then((res) => {
        if (res.data.status === "success") {
          this.onGetData(data);
          toast.success("Thêm câu hỏi thành công!");
        } else {
          toast.error("Thêm câu hỏi thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDeleteQuestion = (dataDeleteQuestion) => {
    postDeleteQuestion(dataDeleteQuestion)
      .then((res) => {
        const data = {
          question_set_id: this.state.questionSetId,
        };
        if (res.data.status === "success") {
          console.log(123);
          this.onGetData(data);
          toast.success("Xoá câu hỏi thành công!");
        } else {
          toast.error("Xoá câu hỏi thất bại");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <QuestionWrapper
        questionSetId={this.state.questionSetId}
        datalistQuestion={this.props.listQuestion}
        gradeName={this.props.gradeName}
        subjectName={this.props.subjectName}
        title={this.props.title}
        gradeId={this.state.gradeId}
        subjectId={this.state.subjectId}
        onEditQuestion={this.onEditQuestion}
        onDeleteQuestion={this.onDeleteQuestion}
        onAddQuestion={this.onAddQuestion}
        onGetData={this.onGetData}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { listQuestion, gradeName, subjectName, title } = state.questionReducer;
  return {
    listQuestion,
    gradeName,
    subjectName,
    title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchListQuestion,
      onDispatchGradeName,
      onDispatchSubjectName,
      onDispatchTitleQuestionSet,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
