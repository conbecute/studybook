import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import _ from "lodash";
import AnswerComponent from "../../AnswerComponent";
import { CTA_POPUP_TYPE, ANSWER_STATUS } from "edu_lms/constants/type";
import FillTheBlankWithTextWrapper from "./components";
import { onDataConfig, onDataConvert } from "../selection";
import { onResultIcon } from "../../selection";
import Title from "./components/Title";

const FillTheBlankWithText = ({ data, dataDefault, iconList }) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);

  useEffect(() => {
    const dataConfig = onDataConfig(data, iconList);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);

    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion]?.question,
      iconList[0].icons
    );

    setStateTitleQuestion(resultQuestion);
  }, [data, indexQuestion]);

  const onHandleForm = (dataForm, reset) => {
    setShowAlert(true);
    data[indexQuestion].status = ANSWER_STATUS.DEFAULT;
    const dataConvert = onDataConvert(dataAnswers, dataForm);
    let resultStatus = [];
    _.forEach(dataConvert, function (item) {
      resultStatus = [...resultStatus, ...item.status];
      let result = 0;
      let indexQuestionScreen = 0;
      resultStatus.forEach(
        (item) => item === ANSWER_STATUS.CORRECT && (result = result + 1)
      );
      dataForm.forEach((item) => {
        indexQuestionScreen = indexQuestionScreen + item.value.length;
      });
      result === indexQuestionScreen &&
        (data[indexQuestion].status = ANSWER_STATUS.CORRECT);
      setTotalAnswer(result);
      setTotalQuestion(indexQuestionScreen);
    });
    setStateDataAnswers({ ...dataAnswers, answers: dataConvert });

    setStateButtonReset(true);
  };

  const onNextQuestion = (index, reset) => {
    setShowAlert(false);
    setStateIndexQuestion(index);
    setStateDataAnswers(dataConfig[index]);
    setStateButtonReset(false);
    reset();
  };
  const onResetForm = (reset) => {
    setShowAlert(false);
    setStateDataAnswers(dataConfig[0]);
    setStateButtonReset(false);
  };
  const nextQuestion = (reset) => {
    setStateIndexQuestion(indexQuestion + 1);
    setStateDataAnswers(dataConfig[indexQuestion + 1]);
    setStateButtonReset(false);
    setShowAlert(false);
    reset();
  };
  const onReset = () => {
    onResetForm();
    setStateIndexQuestion(0);
    setStateDataAnswers(dataConfig[0]);
  };

  const totalAnswerScreens = data.filter((item) => {
    if (item?.status === ANSWER_STATUS.CORRECT) {
      return item?.status;
    }
  });

  return (
    <Fragment>
      {indexQuestion < dataConfig.length ? (
        <Fragment>
          <Title
            titleQuestion={titleQuestion}
            typeQuestion={dataDefault?.game_config?.type_question}
            typeText={dataDefault?.game_config?.type_text}
            fontSize={dataDefault?.game_config?.font_size}
          />
          <FillTheBlankWithTextWrapper
            dataDefault={dataAnswers}
            data={dataAnswers.answers}
            indexQuestion={indexQuestion}
            dataConfig={dataConfig}
            typeText={dataDefault?.game_config?.type_text}
            typeAnswer={dataDefault?.game_config?.type_answer}
            fontSize={dataDefault?.game_config?.font_size}
            isButtonReset={isButtonReset}
            onHandleForm={onHandleForm}
            onNextQuestion={onNextQuestion}
            nextQuestion={nextQuestion}
            onResetForm={onResetForm}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            totalQuestion={totalQuestion}
            totalAnswer={totalAnswer}
          />
        </Fragment>
      ) : (
        <AnswerComponent
          checkScreen={CTA_POPUP_TYPE.finalReport}
          onResetData={onReset}
          totalQuestion={dataConfig.length}
          totalAnswer={totalAnswerScreens.length}
        />
      )}
    </Fragment>
  );
};

export default FillTheBlankWithText;
