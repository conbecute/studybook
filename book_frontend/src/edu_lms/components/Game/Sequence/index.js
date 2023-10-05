import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactAudioPlayer from "react-audio-player";
import { onDispatchDataAlert } from "edu_lms/components/ListQuestion/actions";
import { reorder } from "edu_lms/components/selection";
import _ from "lodash";
import SequenceWrapper from "./components/index";
import { AlertDefault } from "edu_lms/components/Game/selection";
import { onDataConfig } from "./selection";
import { postHistoryGame } from "edu_lms/services/readingBook/index";
import { onDispatchIsClickSubmitAnswer } from "edu_lms/modules/General/actions";
import { ANSWER_STATUS, CTA_POPUP_TYPE } from "edu_lms/constants/type";
import SuccessComponentSqc from "./components/SuccessComponentSqc";
import AnswerComponent from "../AnswerComponent";

const Sequence = ({
  dataGame,
  objectId,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickSubmitAnswer,
}) => {
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState([]);
  const [resultAnswers, setStateResultAnswers] = useState([]);
  const [isDisabled, setStateDisabled] = useState(true);
  const [srcAudio, setStateSrcAudio] = useState("");
  const [inputData, setInputData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [countCorrect, setCountCorrect] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [checkButton, setCheckButton] = useState(false);
  const [stateResult, setStateResult] = useState(dataGame.game_config.data);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState(0);

  const data = dataGame?.game_config?.data
    ? {
        ...dataGame,
        game_config: {
          ...dataGame.game_config,
          answer: dataGame?.game_config?.data[indexQuestion]?.answer,
          type_display:
            dataGame?.game_config?.data[indexQuestion]?.type_display,
        },
      }
    : {
        ...dataGame,
        game_config: {
          ...dataGame.game_config,
          data: [
            {
              answer: dataGame.game_config.answer,
              question: dataGame.game_config.question[0],
              type_display: dataGame.game_config.type_display,
            },
          ],
        },
      };

  useEffect(() => {
    setInputData({ ...data.game_config, results: { data: [], status: null } });

    const dataQuestionConfig = Object.values(
      data.game_config.data[indexQuestion].question
    ).map((item) => {
      const resultFilterIcon = data?.icon_list[0]?.icons.filter(
        (icon) => icon.icon_id == item
      )[0];
      return { ...resultFilterIcon };
    });

    const dataAnswersConfig = onDataConfig(
      data.game_config.answer,
      data.icon_list[0].icons,
      Number(data.game_config.type_display[0])
    );

    const _resultAnswers = dataAnswersConfig.map((itemAnswer) => {
      const resultFilterIcon = _.orderBy(
        itemAnswer,
        [
          function (o) {
            return Number(o.index);
          },
        ],
        ["asc"]
      );
      return [...resultFilterIcon];
    });
    setStateResultAnswers(_resultAnswers);
    setStateDataAnswers(dataAnswersConfig);
    setStateDataQuestion(dataQuestionConfig);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [indexQuestion, dataGame]);

  useEffect(() => {
    if (inputData?.results?.data.length) {
      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(inputData),
      };
      postHistoryGame(dataPost);
    }
  }, [inputData]);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    if (source.droppableId == destination.droppableId) {
      const items = reorder(
        dataAnswers[source.droppableId.match(/\d+/)[0]],
        source.index,
        destination.index
      );
      if (source.droppableId == "droppable_1") {
        setStateDataAnswers([dataAnswers[0], items]);
      } else {
        setStateDataAnswers(_.compact([items, dataAnswers[1]]));
      }
      return;
    }

    const _result = move(
      dataAnswers[source.droppableId.match(/\d+/)[0]],
      dataAnswers[destination.droppableId.match(/\d+/)[0]],
      source,
      destination
    );
    setStateDataAnswers([_result.droppable_0, _result.droppable_1]);
  };

  const onCheckAnswers = () => {
    onDispatchIsClickSubmitAnswer(true);
    let result = [];
    dataAnswers.forEach((data, i) => {
      const array = data.map((item, j) => {
        if (Number(item.index) === Number(resultAnswers[i][j]?.index)) {
          item.status = ANSWER_STATUS.CORRECT;
        } else {
          item.status = ANSWER_STATUS.WRONG;
        }
        return { ...item };
      });
      result = [...result, array];
    });

    let isStatus = [];
    result.forEach((item) => {
      const resultFilter = _.filter(item, function (o) {
        return o.status !== ANSWER_STATUS.CORRECT;
      });
      isStatus = [...isStatus, ...resultFilter];
    });
    setInputData({
      ...inputData,
      results: {
        ...inputData.results,
        data: resultAnswers[0],
        status:
          isStatus.length > 0 ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG,
      },
    });

    const newResult = stateResult?.map((item, index) => {
      if (index == indexQuestion) {
        const status =
          isStatus.length > 0 ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG;
        return { ...item, status };
      }

      return item;
    });
    let answerNumber = 0;
    newResult?.forEach(
      (item) =>
        item?.status === ANSWER_STATUS.WRONG &&
        (answerNumber = answerNumber + 1)
    );

    setTotalAnswer(answerNumber);
    setStateResult(newResult);
    setCountCorrect(data.game_config.answer.length - isStatus.length);
    setStateDataAnswers(result);
    setStateDisabled(false);
    setShowAlert(true);
  };

  const onResetData = () => {
    let result = [];
    dataAnswers.forEach((data) => {
      const array = data.map((item) => ({
        ...item,
        status: ANSWER_STATUS.DEFAULT,
      }));
      result = [...result, array];
    });
    setStateDataAnswers(result);
    setStateDisabled(true);
    setShowAlert(false);
  };

  const onSrcAudio = (value) => {
    setStateSrcAudio(value);
  };

  const onNextQuestion = () => {
    indexQuestion >= stateResult.length - 1
      ? setShowSuccess(true)
      : setIndexQuestion(indexQuestion + 1);
    onDispatchDataAlert(AlertDefault);
    setCheckButton(true);
  };
  const resetData = () => {
    setShowSuccess(false);
    setIndexQuestion(0);
    setStateResult(dataGame.game_config.data);
  };
  return (
    <>
      {showSuccess ? (
        <AnswerComponent
          checkScreen={CTA_POPUP_TYPE.finalReport}
          onResetData={resetData}
          totalQuestion={dataGame.game_config.data.length}
          totalAnswer={totalAnswer}
        />
      ) : (
        <Fragment>
          <SequenceWrapper
            typeTextContent={data?.game_config?.type_text_content}
            typeAnswer={data.game_config.type_answer}
            typeQuestion={data.game_config.type_question}
            fontSizeTitle={data.game_config.font_size_title}
            typeText={data.game_config?.type_text}
            typeDisplay={data.game_config.type_display}
            srcAudio={srcAudio}
            dataAnswers={dataAnswers}
            dataQuestion={dataQuestion}
            isDisabled={isDisabled}
            onResetData={onResetData}
            onDragEnd={onDragEnd}
            onSrcAudio={onSrcAudio}
            onCheckAnswers={onCheckAnswers}
            totalQuestion={data?.game_config?.answer?.length}
            countCorrect={countCorrect}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            fontSizeAnswer={data?.game_config?.font_size_answer}
            indexQuestion={indexQuestion}
            onNextQuestion={onNextQuestion}
            checkButton={checkButton}
            setCheckButton={setCheckButton}
            languageBook={languageBook}
            stateResult={stateResult}
          />
          <ReactAudioPlayer
            src={srcAudio}
            className="d-none"
            autoPlay
            controls
            onEnded={() => setStateSrcAudio("")}
          />
        </Fragment>
      )}
    </>
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
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Sequence);
