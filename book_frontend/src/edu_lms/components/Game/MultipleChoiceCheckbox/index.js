import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { postHistoryGame } from "../../../services/readingBook";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertSuccessEnglish,
  AlertErrorEnglish,
} from "../selection";

import MultipleChoiceWrapper from "./components";
import {
  TYPE_ENGLISH,
  TYPE_INCORRECT,
  TYPE_SUCCESS,
} from "../../../constants/type";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";

const MultipleChoiceCheckbox = ({
  data,
  dataDefault,
  objectId,
  onDispatchDataAlert,
  alert,
  languageBook,
  onDispatchIsClickRefresh,
  onDispatchIsClickSubmitAnswer,
}) => {
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isDisabled, setStateDisabled] = useState(false);
  const [dataConfig, setStateData] = useState([]);
  const [result, setStateResult] = useState([]);
  const [isReview, setStateReview] = useState(true);
  const [isVisible, setStateVisible] = useState(true);
  const [typeIndex, setStateTypeIndex] = useState("");
  const [dataInput, setDataInput] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [totalChoose, setTotalChoose] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [totalFinalAnswer, setTotalFinalAnswer] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    let gameConfig = { ...dataDefault.game_config };
    let countQuestion = dataDefault.game_config.data.length;
    gameConfig.data = Array(countQuestion).fill([]);
    setDataInput(gameConfig);
  }, [dataDefault]);

  useEffect(() => {
    if (checkComplete(dataInput.data)) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataInput),
      };
      postHistoryGame(dataPost);
    }
  }, [dataInput]);

  useEffect(() => {
    const dataConvert = onFormatData(data.game_config.data);
    setStateData(dataConvert);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data]);

  useEffect(() => {
    setStateVisible(true);
    if (typeof data.game_config.type_index !== "undefined") {
      if (typeof data.game_config.type_index[0] !== "undefined") {
        setStateTypeIndex(data.game_config?.type_index[0]);
      }
    }
  });

  const onAction = (value) => {
    const disabled = value ? true : false;
    setStateDisabled(disabled);
    const newData = dataConfig.map((item, index) => {
      if (index === indexQuestion) {
        item.answers.map((i) => {
          if (i.answer_id === value) {
            i.isActive = !i.isActive;
          }
          return { ...i };
        });
      }
      return { ...item };
    });
    setStateData(newData);
  };

  const onReview = () => {
    setShowAlert(true);
    onDispatchIsClickSubmitAnswer(true);
    let input = { ...dataInput };
    input.data[indexQuestion] = dataConfig[indexQuestion];
    setDataInput(input);
    const resultAnswer = dataConfig[indexQuestion].answers.map((item) =>
      item.isActive ? true : false
    );

    let totalInput = 0;
    resultAnswer.forEach((item) => item && (totalInput = totalInput + 1));
    setTotalChoose(totalInput);
    let totalCorrect = 0;
    const dataIsCorrect = dataConfig[indexQuestion].answers.map((item) => {
      if (item.is_correct) {
        totalCorrect = totalCorrect + 1;
        return true;
      }
      return false;
    });
    setTotalQuestion(totalCorrect);
    const newData = dataConfig.map((item, index) => {
      if (index === indexQuestion) {
        let answerCorrect = [];
        item.answers.map((answer) => {
          answerCorrect.push(answer?.is_correct ? true : false);
        });
        item.result =
          (JSON.stringify(resultAnswer) === JSON.stringify(answerCorrect)) ===
          true
            ? TYPE_SUCCESS
            : TYPE_INCORRECT;
      }
      return { ...item };
    });
    let chooseInput = 0;
    let totalAnswer = 0;
    newData[indexQuestion].answers.forEach((item) => {
      if (item.is_correct && item.is_correct === item.isActive) {
        totalAnswer = totalAnswer + 1;
      }
    });
    newData.forEach((item) => {
      item.result === TYPE_SUCCESS && (chooseInput = chooseInput + 1);
    });
    setTotalAnswer(totalAnswer);
    setTotalFinalAnswer(chooseInput);
    const isStatus = _.isEqual(resultAnswer, dataIsCorrect);

    if (isStatus) {
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertSuccessEnglish);
      } else {
        onDispatchDataAlert(AlertSuccess);
      }
    } else {
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertErrorEnglish);
      } else {
        onDispatchDataAlert(AlertError);
      }
    }
    setStateResult([...result, isStatus]);
    setStateData(newData);
    setStateDisabled(false);
    setStateReview(false);
  };

  const checkComplete = (array) => {
    let complete = true;
    if (array) {
      array.forEach((item, index) => {
        if (item.length == 0) {
          complete = false;
        }
      });
    } else {
      return false;
    }

    return complete;
  };
  const onResetData = () => {
    setShowAlert(false);
    setTotalAnswer(0);
    setTotalQuestion(0);
    onDispatchIsClickRefresh(true);
    const data = onFormatData(dataConfig);
    setStateData(data);
    setStateIndexQuestion(0);
    setStateResult([]);
    onDispatchDataAlert(AlertDefault);
    setStateVisible(false);
    setStateReview(true);
  };
  const onNextQuestion = () => {
    setTotalAnswer(0);
    setShowAlert(false);
    setStateIndexQuestion(indexQuestion + 1);
    setStateReview(true);
    setStateVisible(false);
    onDispatchDataAlert(AlertDefault);
  };
  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  return (
    <MultipleChoiceWrapper
      dataConfig={dataConfig}
      iconList={data.icon_list}
      typeAnswer={data.game_config.type_answer}
      typeQuestion={data.game_config.type_question}
      typeText={data.game_config?.type_text}
      fontSize={data.game_config.font_size}
      fontSizeAnswer={data.game_config.font_size_answer}
      typeIndex={typeIndex}
      indexQuestion={indexQuestion}
      isReview={isReview}
      result={result}
      alert={alert}
      languageBook={languageBook}
      isVisible={isVisible}
      isDisabled={isDisabled}
      handleDispatchDataAlert={handleDispatchDataAlert}
      onNextQuestion={onNextQuestion}
      onAction={onAction}
      onResetData={onResetData}
      onReview={onReview}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      totalChoose={totalChoose}
      totalAnswer={totalAnswer}
      totalFinalAnswer={totalFinalAnswer}
      totalQuestion={totalQuestion}
    />
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
      onDispatchIsClickRefresh,
      onDispatchIsClickSubmitAnswer,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoiceCheckbox);

function onFormatData(data) {
  return data.map((item) => {
    const answerItem = item.answers.map((item) => ({
      ...item,
      isActive: false,
    }));
    return { ...item, answers: answerItem, result: 0 };
  });
}
