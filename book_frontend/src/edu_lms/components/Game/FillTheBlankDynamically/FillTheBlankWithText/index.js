import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertSuccessEnglish,
  AlertErrorEnglish,
  onResultIcon,
} from "../../selection";
import { onDataConfig, onDataConvert, getCorrectWrongInputAnswers } from "../selection";
import FillTheBlankWithTextWrapper from "./components";
import {
  TYPE_ENGLISH,
  CTA_POPUP_TYPE,
  ANSWER_STATUS,
} from "../../../../constants/type";
import { GAME_VERSION } from "edu_lms/constants/game";
import { postHistoryGame } from "../../../../services/readingBook";
import AnswerComponent from "../../AnswerComponent";

const FillTheBlankWithText = ({
  isPopupTestGame,
  dataDefault,
  objectId,
  alert,
  languageBook,
  onDispatchDataAlert,
}) => {
  const dataGameConfig = dataDefault.game_config;
  const iconList = dataDefault.icon_list;
  const dataConfig = onDataConfig(dataGameConfig, iconList);

  const [dataUserInput, setDataUserInput] = useState(Array(dataGameConfig.data.length).fill([]));
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (checkComplete(dataUserInput?.data)) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataUserInput),
      };
      postHistoryGame(dataPost);
    }
  }, [dataUserInput]);

  useEffect(() => {
    setStateDataAnswers(dataConfig[indexQuestion]);
    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion]?.question,
      iconList[0].icons
    );
    setStateTitleQuestion(resultQuestion);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [dataGameConfig, indexQuestion]);

  const checkComplete = (array) => {
    if (!array) {
      return false;
    }

    return !array?.some((item) => item.length == 0);
  };

  const onHandleForm = (dataForm) => {
    const dataInputShadow = [...dataUserInput];
    dataInputShadow[indexQuestion] = dataDefault.game_config.data[indexQuestion]

    let resultInputAnswers = null;
    if (dataGameConfig.version === GAME_VERSION.V1) {
      // Check correct wrong answer new version v1
      resultInputAnswers = getCorrectWrongInputAnswers(dataAnswers.answers, dataForm);
    } else {
      // Check correct wrong answer old version
      resultInputAnswers = onDataConvert(dataAnswers, dataForm);
    }

    dataForm.forEach((item, index) => {
      dataInputShadow[indexQuestion].answers[index].result = {
        answer: item,
        is_correct: resultInputAnswers[index].status === ANSWER_STATUS.CORRECT ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.DEFAULT
      };
    });

    setStateDataAnswers({ ...dataAnswers, answers: resultInputAnswers });

    const hasWrongAnswer = resultInputAnswers.some(answer => answer.status === ANSWER_STATUS.WRONG);
    dataInputShadow[indexQuestion].results = hasWrongAnswer
      ? ANSWER_STATUS.DEFAULT
      : ANSWER_STATUS.CORRECT;
    dataGameConfig.data[indexQuestion].status = hasWrongAnswer ? ANSWER_STATUS.WRONG : ANSWER_STATUS.CORRECT;

    setDataUserInput(dataInputShadow);
    setStateButtonReset(true);

    setTotalQuestion(resultInputAnswers.length);
    const resultStatusCorrect = resultInputAnswers.filter(answer => answer.status === ANSWER_STATUS.CORRECT);
    setCountCorrect(resultStatusCorrect.length);

    if (resultInputAnswers.length > 0) {
      onDispatchDataAlert(AlertDefault);
      setShowAlert(true);
    } else {
      let alert = Number(languageBook) === TYPE_ENGLISH ? AlertSuccessEnglish : AlertSuccess;
      if (hasWrongAnswer) {
        alert = Number(languageBook) === TYPE_ENGLISH ? AlertErrorEnglish : AlertError;
      }
      onDispatchDataAlert(alert);
      setShowAlert(false);
    }
  };

  const onReset = () => {
    setTotalQuestion(0);
    setCountCorrect(0);
    setShowAlert(false);
    setStateButtonReset(false);
  };

  const chooseQuestion = (index, reset) => {
    setStateIndexQuestion(index);
    setStateDataAnswers(dataConfig[index]);
    onReset();
    onDispatchDataAlert(AlertDefault);
    reset();
  };

  const nextQuestion = (reset) => {
    reset();
    setStateIndexQuestion(indexQuestion + 1);
    setStateDataAnswers(dataConfig[indexQuestion + 1]);
    onReset();
  };

  const onResetForm = (reset) => {
    setStateDataAnswers(dataConfig[indexQuestion]);
    reset();
    onReset();
    onDispatchDataAlert(AlertDefault);
  };

  const onResetFormScreen = () => {
    setStateDataAnswers(dataConfig[0]);
    setStateIndexQuestion(0);
    onDispatchDataAlert(AlertDefault);
    onReset();
  };

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  const totalCorrectScreen = dataGameConfig.data?.filter((item) => {
    if (item.status === ANSWER_STATUS.CORRECT) {
      return item.status;
    }
  });

  if (dataGameConfig?.data.length > 1 && indexQuestion >= dataGameConfig?.data.length) {
    return (
      <AnswerComponent
        checkScreen={CTA_POPUP_TYPE.finalReport}
        onResetData={onResetFormScreen}
        totalQuestion={dataConfig.length}
        totalAnswer={totalCorrectScreen.length}
      />
    );
  }

  return (
    indexQuestion < dataConfig.length && (
      <FillTheBlankWithTextWrapper
        isPopupTestGame={isPopupTestGame}
        dataGame={dataGameConfig.data}
        titleQuestion={titleQuestion}
        dataConfig={dataConfig}
        data={dataAnswers.answers}
        typeQuestion={dataDefault?.game_config?.type_question}
        indexQuestion={indexQuestion}
        alert={alert}
        languageBook={languageBook}
        isButtonReset={isButtonReset}
        onHandleForm={onHandleForm}
        chooseQuestion={chooseQuestion}
        nextQuestion={nextQuestion}
        onResetForm={onResetForm}
        handleDispatchDataAlert={handleDispatchDataAlert}
        totalQuestion={totalQuestion}
        countCorrect={countCorrect}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    )
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FillTheBlankWithText);
