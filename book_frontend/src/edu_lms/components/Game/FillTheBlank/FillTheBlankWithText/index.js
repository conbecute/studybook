import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AnswerComponent from "../../AnswerComponent";
import { postHistoryGame } from "../../../../services/readingBook";
import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertErrorEnglish,
  AlertSuccessEnglish,
} from "../../selection";
import FillTheBlankWithTextWrapper from "./components";
import { onDataConfig, onDataConvert } from "../selection";
import { onResultIcon } from "../../selection";
import Title from "./components/Title";
import {
  TYPE_ENGLISH,
  CTA_POPUP_TYPE,
  ANSWER_STATUS,
} from "../../../../constants/type";

const FillTheBlankWithText = ({
  data,
  dataDefault,
  objectId,
  iconList,
  alert,
  languageBook,
  onDispatchDataAlert,
}) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [dataInput, setDataInput] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let countQuestion = data.length;
    setDataInput(Array(countQuestion).fill([]));
  }, data);

  useEffect(() => {
    const dataConfig = onDataConfig(data, iconList);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);

    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion]?.question,
      iconList[0].icons
    );
    setStateTitleQuestion(resultQuestion);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data, indexQuestion]);

  const onHandleForm = (dataForm) => {
    setShowAlert(true);
    data[indexQuestion].status = ANSWER_STATUS.DEFAULT;
    let input = dataInput;
    let question = data[indexQuestion];
    const dataConvert = onDataConvert(dataAnswers, dataForm);
    let resultStatus = [];
    _.forEach(dataConvert, function (item) {
      resultStatus = [...resultStatus, ...item.status];
    });
    setStateDataAnswers({ ...dataAnswers, answers: dataConvert });

    const isStatus = resultStatus.includes(ANSWER_STATUS.WRONG);
    setStateButtonReset(!isButtonReset);

    question.result = isStatus ? ANSWER_STATUS.DEFAULT : ANSWER_STATUS.CORRECT;
    input[indexQuestion] = question;
    setDataInput([...input]);
    if (checkComplete(dataInput)) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataInput),
      };
      postHistoryGame(dataPost);
    }
    const alert = !isStatus
      ? languageBook == TYPE_ENGLISH
        ? AlertSuccessEnglish
        : AlertSuccess
      : languageBook == TYPE_ENGLISH
      ? AlertErrorEnglish
      : AlertError;
    setTotalQuestion(resultStatus.length);
    const resultStatusCorrect = resultStatus.filter(
      (status) => status === ANSWER_STATUS.CORRECT
    );
    resultStatusCorrect.length === resultStatus?.length &&
      (data[indexQuestion].status = ANSWER_STATUS.CORRECT);
    setCountCorrect(resultStatusCorrect.length);
    if (resultStatus?.length > 1) {
      onDispatchDataAlert(AlertDefault);
    } else {
      onDispatchDataAlert(alert);
    }
  };

  const checkComplete = (array) => {
    let complete = true;
    array.forEach((item, index) => {
      if (item.length == 0) {
        complete = false;
      }
    });
    return complete;
  };
  const chooseQuestion = (index, reset) => {
    setStateIndexQuestion(index);
    setStateDataAnswers(dataConfig[index]);
    setStateButtonReset(false);
    onDispatchDataAlert(AlertDefault);
    reset();
    setTotalQuestion(0);
    setCountCorrect(0);
    setShowAlert(false);
  };

  const onResetForm = (reset) => {
    setStateDataAnswers(dataConfig[indexQuestion]);
    reset();
    setStateButtonReset(false);
    onDispatchDataAlert(AlertDefault);
    setTotalQuestion(0);
    setCountCorrect(0);
    setShowAlert(false);
  };

  const onResetFormScreen = () => {
    setStateButtonReset(false);
    onDispatchDataAlert(AlertDefault);
    setStateIndexQuestion(0);
    setCountCorrect(0);
    setTotalQuestion(0);
    setShowAlert(false);
    setStateDataAnswers(dataConfig[0]);
  };

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  const nextQuestion = (reset) => {
    setStateDataConfig([]);
    reset();
    setStateButtonReset(false);
    setStateIndexQuestion(indexQuestion + 1);
    setStateDataAnswers(dataConfig[indexQuestion + 1]);
    setTotalQuestion(0);
    setCountCorrect(0);
    setShowAlert(false);
  };
  const totalCorrectScreen = data?.filter((item) => {
    if (item.status === ANSWER_STATUS.CORRECT) {
      return item.status;
    }
  });

  if (dataConfig.length > 1 && indexQuestion === dataConfig.length) {
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
    <Fragment>
      {indexQuestion < dataConfig.length && (
        <Fragment>
          {titleQuestion && (
            <Title
              titleQuestion={titleQuestion}
              typeQuestion={dataDefault?.game_config?.type_question}
              typeText={dataDefault?.game_config?.type_text}
              fontSize={dataDefault?.game_config?.font_size}
            />
          )}
          <FillTheBlankWithTextWrapper
            dataDefault={dataAnswers}
            data={dataAnswers?.answers}
            indexQuestion={indexQuestion}
            dataConfig={dataConfig}
            typeText={dataDefault?.game_config?.type_text}
            alert={alert}
            languageBook={languageBook}
            typeAnswer={dataDefault?.game_config?.type_answer}
            fontSize={dataDefault?.game_config?.font_size}
            isButtonReset={isButtonReset}
            onHandleForm={onHandleForm}
            chooseQuestion={chooseQuestion}
            onResetForm={onResetForm}
            handleDispatchDataAlert={handleDispatchDataAlert}
            totalQuestion={totalQuestion}
            countCorrect={countCorrect}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            nextQuestion={nextQuestion}
          />
        </Fragment>
      )}
    </Fragment>
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
