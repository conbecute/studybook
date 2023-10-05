import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onDispatchIndexQuestion,
  onDispatchDataAlert,
  onDispatchIsButtonNextQuestion,
} from "../../ListQuestion/actions";
import { onDispatchDataQuestion } from "../../../modules/ReadingBooks/actions";
import _ from "lodash";
import {
  onOrderBy,
  onRangeArray,
  onChangeIsAnswerDataQuestion,
} from "../selection";
import { COMPARISON_MATH } from "../../../constants/type";
import FooterQuestion from "../component/FooterQuestion";
import { AlertSuccess, AlertError } from "../selection";

const FillTheBlankWithCompare = ({
  data,
  indexQuestion,
  alert,
  isButtonNextQuestion,
  dataQuestion,
  onDispatchDataAlert,
  onDispatchIsButtonNextQuestion,
  onDispatchIndexQuestion,
  onDispatchDataQuestion,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [correctAnswer, setStateCorrectAnswer] = useState([12, 14]);

  useEffect(() => {
    const createArrayNumber = onRangeArray(data.answer.start, data.answer.end);
    const correctAnswer = onOrderBy(
      _.sampleSize(createArrayNumber, 2),
      data.operators
    );
    setStateCorrectAnswer(correctAnswer);
  }, [data]);

  const onSubmitForm = handleSubmit((value) => {
    const createValue = Object.keys(value).map((key) => value[key]);
    const result = _.isEqual(createValue, [data.operators]);
    if (result) {
      const dataAlert = AlertSuccess;
      const newDataQuestion = onChangeIsAnswerDataQuestion(
        dataQuestion,
        data,
        2
      );
      onDispatchDataAlert(dataAlert);
      onDispatchIsButtonNextQuestion(true);
      onDispatchDataQuestion(newDataQuestion);
    } else {
      const dataAlert = AlertError;
      const newDataQuestion = onChangeIsAnswerDataQuestion(
        dataQuestion,
        data,
        3
      );
      onDispatchDataAlert(dataAlert);
      onDispatchDataQuestion(newDataQuestion);
    }
  });

  const onNextQuestion = (number) => {
    const dataAlert = {
      color: "",
      visible: false,
      text: "",
    };
    const newDataQuestion = onChangeIsAnswerDataQuestion(
      dataQuestion,
      data,
      number
    );
    onDispatchDataQuestion(newDataQuestion);
    onDispatchDataAlert(dataAlert);
    onDispatchIndexQuestion(indexQuestion + 1);
    onDispatchIsButtonNextQuestion(false);
    reset();
  };

  return (
    <div className="fill-the-black-number-body mt-4">
      <form id={data.question}>
        <div className="d-flex align-items-center mb-3">
          <span>{correctAnswer[0]}</span>
          <select
            name={data.question}
            ref={register({ required: true })}
            className="mr-3 ml-3 monkey-f-bold form-control"
            style={{ width: "80px", fontSize: "20px" }}
          >
            <option key="" value="" className="d-none" />
            {COMPARISON_MATH.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
          <span>{correctAnswer[1]}</span>
        </div>
      </form>
      <FooterQuestion
        onSubmitForm={onSubmitForm}
        onNextQuestion={onNextQuestion}
        currentIndex={indexQuestion}
        questionList={dataQuestion}
        disabled={!isDirty || !isValid}
        isButtonNextQuestion={isButtonNextQuestion}
        alert={alert}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { indexQuestion, alert, isButtonNextQuestion } = state.listQuestion;
  const { dataQuestion } = state.readingBookReducers;
  return {
    indexQuestion,
    dataQuestion,
    alert,
    isButtonNextQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchIndexQuestion,
      onDispatchDataAlert,
      onDispatchIsButtonNextQuestion,
      onDispatchDataQuestion,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FillTheBlankWithCompare);
