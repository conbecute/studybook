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
import {
  onRangeArray,
  resultNumber,
  onChangeIsAnswerDataQuestion,
  onResultRandomNumber,
  onRandomNumberGenerator,
} from "../selection";
import _ from "lodash";
import { TYPE_CALCULATION } from "../../../constants/type";
import { TEXT_SPACE } from "../../../constants/text";
import ImageQuestion from "../component/ImageQuestion";
import FooterQuestion from "../component/FooterQuestion";
import { AlertSuccess, AlertError } from "../selection";

const FillTheBlankWithImages = ({
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
  const [correctAnswer, setStateCorrectAnswer] = useState();
  const [resultNumberOne, setStateResultNumberOne] = useState();
  const [resultNumberTwo, setStateResultNumberTwo] = useState();

  useEffect(() => {
    const correctAnswer =
      data.answer.type === 1
        ? onResultRandomNumber(data.answer.start, data.answer.end)
        : onRandomNumberGenerator(data.answer.start, data.answer.end, 1, false);
    const resultNumberOne =
      data.answer.type === 1
        ? onResultRandomNumber(1, correctAnswer)
        : onRandomNumberGenerator(
            1,
            parseFloat(correctAnswer).toFixed(0),
            1,
            false
          );
    const resultNumberTwo = resultNumber(
      Number(correctAnswer),
      Number(resultNumberOne),
      data.answer.operators,
      data.answer.type
    );

    setStateCorrectAnswer(correctAnswer);
    setStateResultNumberOne(resultNumberOne);
    setStateResultNumberTwo(resultNumberTwo);
  }, [data]);
  const onSubmitForm = handleSubmit((value) => {
    const createValue = Object.keys(value).map((key) => Number(value[key]));
    const result = _.isEqual(createValue, [correctAnswer]);
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
    <Fragment>
      <div className="fill-the-black-number-body mt-4">
        <form id={data.question}>
          <div className="d-flex align-items-center">
            {data.answer.operators == TYPE_CALCULATION.ADDITION && (
              <div>
                <span>
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    name={data.question}
                    ref={register({ required: true })}
                    autoComplete="off"
                  />
                  {TEXT_SPACE}
                </span>
                {TEXT_SPACE}={TEXT_SPACE}
                <span className="monkey-color-light-yellow">
                  {TEXT_SPACE}
                  {resultNumberOne}
                  {TEXT_SPACE}
                </span>
                {TYPE_CALCULATION.ADDITION}{" "}
                <span className="monkey-color-blue">
                  {TEXT_SPACE}
                  {resultNumberTwo}
                </span>
              </div>
            )}
            {data.answer.operators == TYPE_CALCULATION.SUBTRACTION && (
              <div>
                <span className="monkey-color-blue">
                  {TEXT_SPACE}
                  {resultNumberTwo}
                  {TEXT_SPACE}
                </span>
                {TEXT_SPACE}
                {TYPE_CALCULATION.SUBTRACTION}
                {TEXT_SPACE}
                <span className="monkey-color-light-yellow">
                  {TEXT_SPACE}
                  {resultNumberOne}
                  {TEXT_SPACE}
                </span>
                {TEXT_SPACE}={TEXT_SPACE}
                <span>
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    name={data.question}
                    ref={register({ required: true })}
                    autoComplete="off"
                  />
                </span>
              </div>
            )}
          </div>
        </form>
        {data.answer.type === 1 && (
          <ImageQuestion
            operators={data.answer.operators}
            resultNumberTwo={resultNumberTwo}
            resultNumberOne={resultNumberOne}
          />
        )}
      </div>
      <FooterQuestion
        onSubmitForm={onSubmitForm}
        onNextQuestion={onNextQuestion}
        currentIndex={indexQuestion}
        questionList={dataQuestion}
        disabled={!isDirty || !isValid}
        isButtonNextQuestion={isButtonNextQuestion}
        alert={alert}
      />
    </Fragment>
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
)(FillTheBlankWithImages);
