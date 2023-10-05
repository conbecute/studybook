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
import { onResultBackgroundColor } from "../../selection";
import {
  onOrderBy,
  onRangeArray,
  onChangeIsAnswerDataQuestion,
} from "../selection";
import _ from "lodash";
import styled from "styled-components";
import FooterQuestion from "../component/FooterQuestion";
import { AlertSuccess, AlertError } from "../selection";

const FillTheBlankWithNumberRandom = ({
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
  const [createArrayNumber, setStateCreateArrayNumber] = useState([]);
  const [correctAnswer, setStateCorrectAnswer] = useState([]);

  useEffect(() => {
    const createArrayNumber = onOrderBy(
      onRangeArray(data.answer.start, data.answer.end, data.answer.range),
      data.answer.operators
    );
    const correctAnswer = onOrderBy(
      _.sampleSize(createArrayNumber, data.answer.number),
      1
    );
    setStateCreateArrayNumber(createArrayNumber);
    setStateCorrectAnswer(correctAnswer);
  }, [data]);

  const onSubmitForm = handleSubmit((value) => {
    const createValue = Object.keys(value).map((key) => Number(value[key]));
    const result = _.isEqual(createValue, correctAnswer);
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
    <div className="fill-the-black-number-random mt-4" style={{ width: "50%" }}>
      <form id={data.question}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridGap: "0.5rem",
          }}
        >
          {createArrayNumber.map((item, index) => {
            const styleObject = {
              backgroundColor: "#a9dfca",
              border: "1px solid #28ae7b",
            };
            if (_.includes(correctAnswer, item)) {
              return (
                <Fragment key={index}>
                  <span className="mr-1 ml-1">
                    <input
                      type="text"
                      style={{
                        width: "40px",
                        border: "3px solid #00c2f3",
                        height: "30px",
                      }}
                      name={index}
                      ref={register({ required: true })}
                      autoComplete="off"
                    />
                  </span>
                </Fragment>
              );
            }
            return (
              <Fragment key={index}>
                <span
                  style={{
                    padding: "4px",
                    width: "40px",
                    textAlign: "center",
                    ...styleObject,
                  }}
                  className="mr-1 ml-1"
                >
                  {item}
                </span>
              </Fragment>
            );
          })}
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
)(FillTheBlankWithNumberRandom);
