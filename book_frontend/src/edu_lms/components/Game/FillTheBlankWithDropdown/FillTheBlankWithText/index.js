import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertSuccessEnglish,
  AlertErrorEnglish,
} from "../../selection";
import FillTheBlankWithTextWrapper from "./components";
import { onDataConfig } from "../selection";
import { onResultIcon } from "../../selection";
import {
  TYPE_ENGLISH,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../../constants/type";
import { postHistoryGame } from "../../../../services/readingBook";

import Title from "./components/Title";
const FillTheBlankWithText = ({
  data,
  dataDefault,
  objectId,
  alert,
  languageBook,
  onDispatchDataAlert,
}) => {
  const [dataConfig, setStateDataConfig] = useState([]);

  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [dataInput, setDataInput] = useState({});
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let countQuestion = dataDefault.game_config.data.length;
    setDataInput({
      ...dataDefault.game_config,
      data: Array(countQuestion).fill([]),
    });
  }, [dataDefault]);

  useEffect(() => {
    if (checkComplete(dataInput?.data)) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataInput),
      };
      postHistoryGame(dataPost);
    }
  }, [dataInput]);

  useEffect(() => {
    const dataConfig = onDataConfig(data.game_config, data.icon_list);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);
    let title = dataConfig[indexQuestion].title;
    let iconList = data.icon_list[0];
    const resultQuestion = onResultIcon(title, iconList.icons);
    setStateTitleQuestion(resultQuestion);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data, indexQuestion]);

  const checkComplete = (array) => {
    if (!array) {
      return false;
    }

    return !array?.some((item) => item.length == 0);
  };

  const onHandleForm = (dataAnswer, statusTrue) => {
    setShowAlert(true);

    let input = _.cloneDeep(dataInput);
    input.data[indexQuestion] = _.cloneDeep(
      dataDefault.game_config.data[indexQuestion]
    );

    for (let key in dataAnswer) {
      let index = key.split("_");
      dataConfig[indexQuestion].answers[parseInt(index[1])].blank_answer[
        parseInt(index[2])
      ].status = dataAnswer[key]?.is_correct ? 1 : 0;

      input.data[indexQuestion].list_sentences[index[1]].result = {
        answer: dataAnswer[key]?.answer,
        is_correct: dataAnswer[key]?.is_correct ? 1 : 0,
      };
    }

    input.data[indexQuestion].result = statusTrue ? 1 : 0;
    const resultAnswer = input.data[indexQuestion].list_sentences;
    setTotalQuestion(resultAnswer[0].blank_answer?.length);
    const resultAnswerCorrect = resultAnswer.filter(
      (answer) => answer.result?.is_correct === 1
    );
    setCountCorrect(countCorrect + 1);
    setDataInput(input);
    setStateDataAnswers(dataConfig[indexQuestion]);
    setStateButtonReset(true);
    const alert = statusTrue
      ? languageBook == TYPE_ENGLISH
        ? AlertSuccessEnglish
        : AlertSuccess
      : languageBook == TYPE_ENGLISH
      ? AlertErrorEnglish
      : AlertError;
    if (resultAnswerCorrect?.length > 1) {
      onDispatchDataAlert(AlertDefault);
    } else {
      onDispatchDataAlert(alert);
    }
  };
  const onNextQuestion = (index, reset) => {
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
    const dataConfig = onDataConfig(data.game_config, data.icon_list);
    // dataConfig[indexQuestion].answers.map((item, index) => {
    //   item.blank_answer.map((childItem, childIndex) => {
    //     dataConfig[indexQuestion].answers[index].blank_answer[
    //       childIndex
    //     ].status = "";
    //   });
    // });
    setStateDataAnswers(dataConfig[indexQuestion]);
    setStateDataConfig(dataConfig);
    setStateButtonReset(false);
    onDispatchDataAlert(AlertDefault);
    setTotalQuestion(0);
    setCountCorrect(0);
    setShowAlert(false);
  };
  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };
  return (
    <Fragment>
      {!(indexQuestion >= dataConfig.length) && (
        <Fragment>
          <Title
            titleQuestion={titleQuestion}
            typeQuestion={dataConfig?.type_question}
            typeText={dataConfig?.type_text ? dataConfig?.type_text : "text"}
            fontSizeTitle={data.game_config.font_size}
          />
          <FillTheBlankWithTextWrapper
            data={dataAnswers.answers}
            indexQuestion={indexQuestion}
            dataConfig={dataConfig}
            fontSizeAnswer={data.game_config.font_size_answer}
            alert={alert}
            typeAnswer={dataConfig?.type_answer}
            typeText={dataConfig?.type_text ? dataConfig?.type_text : "text"}
            isButtonReset={isButtonReset}
            onHandleForm={onHandleForm}
            onNextQuestion={onNextQuestion}
            onResetForm={onResetForm}
            handleDispatchDataAlert={handleDispatchDataAlert}
            totalQuestion={totalQuestion}
            countCorrect={countCorrect}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
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
