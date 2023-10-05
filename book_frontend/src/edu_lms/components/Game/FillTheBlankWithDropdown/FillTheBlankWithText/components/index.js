import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import styled from "styled-components";
import FooterComponent from "../../components/FooterComponent";
import BoxAnswer from "./BoxAnswer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchIsClickSubmitAnswer } from "../../../../../modules/General/actions";

const FillTheBlankWithTextWrapper = ({
  data,
  dataConfig,
  indexQuestion,
  typeAnswer,
  fontSizeAnswer,
  typeText,
  isButtonReset,
  alert,
  onHandleForm,
  onNextQuestion,
  onResetForm,
  handleDispatchDataAlert,
  onDispatchIsClickSubmitAnswer,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  let dataForm = {};
  const isDisabled = !isDirty || !isValid;

  const onSubmit = (valueForm) => {};

  const onSubmitForm = handleSubmit((dataForm) => {
    onDispatchIsClickSubmitAnswer(true);
    const newData = Object.values(dataForm);
    let statusTrue = true;
    newData.forEach((item) => {
      if (!item?.is_correct) {
        statusTrue = false;
      }
    });
    onHandleForm(dataForm, statusTrue);
  });

  data.map((item, index) => {
    let counter = -1;
    item.answer_text.map((childItem, childIndex) => {
      if (childItem === "aaa") {
        counter++;
        dataForm["demo_" + index + "_" + counter] = null;
      }
    });
  });
  const onHandleQuestion = (index) => {
    onNextQuestion(index, reset);
  };
  const onResetFormData = () => {
    onResetForm();
    reset(dataForm);
  };

  let numberQuestion = 0;
  data.forEach((item) => {
    item?.blank_answer.length === 1 && (numberQuestion = numberQuestion + 1);
  });

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 monkey-fz-20 mx-auto quicksand-medium"
      >
        <FromContent
          style={{ textAlign: "left" }}
          column={dataConfig[indexQuestion].answer_number_in_a_row}
        >
          {data.map((answer, indexAnswer) => {
            return (
              <BoxAnswer
                dataConfig={dataConfig}
                key={indexAnswer}
                typeAnswer={typeAnswer}
                typeText={typeText}
                indexQuestion={indexQuestion}
                index={indexAnswer}
                data={answer}
                fontSizeAnswer={fontSizeAnswer}
                register={register({ required: true })}
                isButtonReset={isButtonReset}
                nameControl={control}
              />
            );
          })}
        </FromContent>
      </form>
      <FooterComponent
        data={dataConfig}
        isButtonReset={isButtonReset}
        indexQuestion={indexQuestion}
        isDisabled={isDisabled}
        alert={alert}
        onResetFormData={onResetFormData}
        onHandleQuestion={onHandleQuestion}
        onSubmitForm={onSubmitForm}
        handleDispatchDataAlert={handleDispatchDataAlert}
        totalQuestion={numberQuestion || data[0].blank_answer.length}
        countCorrect={countCorrect}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        dataAnswer={data}
      ></FooterComponent>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchIsClickSubmitAnswer,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(FillTheBlankWithTextWrapper);

const FromContent = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.column ? props.column : 1}, 1fr);`};
  grid-gap: 1rem;
`;
