import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { postHistoryGame } from "../../../services/readingBook";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertSuccessEnglish,
  AlertErrorEnglish,
} from "../selection";
import { TYPE_ENGLISH, URL_AUDIO } from "../../../constants/type";
import MultipleChoiceWrapper from "./components";

const MultipleChoice = ({
  data,
  dataDefault,
  objectId,
  onDispatchDataAlert,
  alert,
  languageBook,
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
}) => {
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isDisabled, setStateDisabled] = useState(false);
  const [dataConfig, setStateData] = useState([]);
  const [dataFormatAnswer, setStateDataFormatAnswer] = useState([]);
  const [result, setStateResult] = useState([]);
  const [isReview, setStateReview] = useState(true);
  const [isVisible, setStateVisible] = useState(true);
  const [listStatusAudio, setlistStatusAudio] = useState([]);
  const [dataInput, setDataInput] = useState({});
  const [typeIndex, setStateTypeIndex] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [audio, setAudio] = useState({
    audio: new Audio(""),
  });
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
    const dataConvert = onFormatData(data.game_config.data);
    setStateData(dataConvert);

    const dataFormatAnswer = data.game_config.data.map((answers) => {
      answers.answers.map((answer) => {
        const icon = _.filter(data.icon_list[0].icons, function (o) {
          return o.icon_id === answer.answer_id;
        });
        answer.icon = icon;
        return { ...answer };
      });
      return { ...answers };
    });

    setStateDataFormatAnswer(dataFormatAnswer);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data]);

  audio.audio.onended = function () {
    resetStatusAudio(null);
  };

  const resetStatusAudio = (i) => {
    const listStatus = dataFormatAnswer[indexQuestion]?.answers?.map(
      (value, index) => (index == i ? true : false)
    );
    setlistStatusAudio(listStatus);
  };
  const toggleChange = (index) => {
    resetStatusAudio(index);
    audio?.audio?.pause();
    let url =
      URL_AUDIO +
      dataFormatAnswer[indexQuestion].answers[index]?.icon[0]?.props[0]
        ?.audio[0]?.path;
    setAudio({
      url,
      audio: new Audio(url),
      isPlaying: false,
    });
  };

  useEffect(() => {
    resetStatusAudio(null);
  }, [dataFormatAnswer]);

  useEffect(() => {
    if (audio?.audio) {
      audio?.audio
        ?.play()
        .then(() => audio.audio.play())
        .catch((e) => console.log(e));
    }
  }, [audio]);

  useEffect(() => {
    setStateVisible(true);
    if (typeof data.game_config.type_index !== "undefined") {
      if (typeof data.game_config.type_index[0] !== "undefined") {
        setStateTypeIndex(data.game_config?.type_index[0]);
      }
    }
  }, [data.game_config.type_index]);

  const onAction = (value) => {
    const disabled = value ? true : false;
    setStateDisabled(disabled);
    const newData = dataConfig.map((item, index) => {
      if (index === indexQuestion) {
        item.answers.map((i) => {
          if (i.answer_id === value) {
            i.isActive = true;
          } else {
            i.isActive = false;
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
    let input = _.cloneDeep(dataInput);
    input.data[indexQuestion] = _.cloneDeep(dataConfig[indexQuestion]);
    setDataInput(input);
    const resultAnswer = dataConfig[indexQuestion].answers.map(
      (item) => item.is_correct === item.isActive && item.is_correct === true
    );
    const newData = dataConfig.map((item, index) => {
      if (index === indexQuestion) {
        item.result = _.includes(resultAnswer, true) === true ? 2 : 3;
      }
      return { ...item };
    });
    const isStatus = _.includes(resultAnswer, true);
    isStatus ? setTotalAnswer(1) : setTotalAnswer(0);
    if (isStatus) {
      if (parseInt(languageBook) === TYPE_ENGLISH) {
        onDispatchDataAlert(AlertSuccessEnglish);
      } else {
        onDispatchDataAlert(AlertSuccess);
      }
    } else {
      if (parseInt(languageBook) === TYPE_ENGLISH) {
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
      array?.forEach((item, index) => {
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
    onDispatchIsClickRefresh(true);
    const data = onFormatData(dataConfig);
    setStateData(data);
    setStateIndexQuestion(0);
    setStateResult([]);
    onDispatchDataAlert(AlertDefault);
    setStateReview(true);
    setStateVisible(true);
    setShowAlert(false);
  };
  const onNextQuestion = () => {
    setStateIndexQuestion(indexQuestion + 1);
    setStateReview(true);
    setStateVisible(true);
    onDispatchDataAlert(AlertDefault);
    setShowAlert(false);
  };
  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };
  return (
    <Fragment>
      <MultipleChoiceWrapper
        dataConfig={dataConfig}
        iconList={data.icon_list}
        toggleChange={toggleChange}
        listStatusAudio={listStatusAudio}
        typeAnswer={data.game_config.type_answer}
        typeQuestion={data.game_config.type_question}
        typeText={data.game_config.type_text}
        typeIndex={typeIndex}
        fontSize={data.game_config.font_size}
        fontSizeAnswer={data.game_config.font_size_answer}
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
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        totalAnswer={totalAnswer}
      />
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
      onDispatchIsClickSubmitAnswer,
      onDispatchIsClickRefresh,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

function onFormatData(data) {
  return data.map((item) => {
    const answerItem = item.answers.map((item) => ({
      ...item,
      isActive: false,
    }));
    return { ...item, answers: answerItem, result: 0 };
  });
}
