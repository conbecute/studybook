import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import Container from "./Container";
import { styleAlertGame } from "../selection";
import {
  formatListDataAnswer,
  formatListDataQuestion,
  formatQuestionTitle,
} from "./selection";
import ButtonReset from "./components/ButtonReset";
import {
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  GAME_TYPE,
  CTA_POPUP_TYPE,
  TYPE_TEXT,
} from "../../../constants/type";
import TitleQuestion from "./components/TitleQuestion";
import { postHistoryGame } from "../../../services/readingBook";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";
import AnswerComponent from "../AnswerComponent";

const DrapAndDropContainer = ({
  data,
  objectId,
  languageBook,
  onDispatchIsClickRefresh,
}) => {
  const [listAnswer, setStateListAnswer] = useState(formatListDataAnswer(data));
  const [listQuestion, setStateListQuestion] = useState(
    formatListDataQuestion(data)
  );
  const [inputData, setInputData] = useState({});
  const [srcAudio, setStateSrcAudio] = useState("");
  const [countAnswerCorrect, setStateCountAnswerCorrect] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const defaultListAnswer = formatListDataAnswer(data);
  const questionTitle = formatQuestionTitle(data);
  const {
    type_question: typeQuestion,
    type_text: typeTextQuestion,
    type_answer: typeAnswer,
    type_text_answer: typeTextAnswer,
    font_size_title: fontSizeTitle,
    font_size_question: fontSizeQuestion,
    font_size_answer: fontSizeAnswer,
  } = data.game_config;

  useEffect(() => {
    setInputData({ ...data.game_config });
  }, [data]);

  useEffect(() => {
    if (inputData.results) {
      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(inputData),
      };
      postHistoryGame(dataPost);
    }
  }, [inputData]);

  const onResetData = () => {
    onDispatchIsClickRefresh(true);
    setStateListAnswer(formatListDataAnswer(data));
    setStateListQuestion(formatListDataQuestion(data));
    setStateCountAnswerCorrect(0);
    setShowAlert(false);
  };

  const onHandleDrop = (index, item) => {
    const dataListAnswer = listAnswer.filter(
      (answer) => answer.icon_id_answer != item.icon[0].icon_id
    );

    let checkResult = false;

    listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        const dataAnswer = listAnswer.filter(
          (answer) => answer.icon_id_answer === item.icon[0].icon_id
        );
        if (question.icon_id == dataAnswer[0].icon_id_question) {
          checkResult = true;
        }
      }
    });

    if (checkResult) {
      setStateCountAnswerCorrect(countAnswerCorrect + 1);
    }

    checkResult
      ? setStateSrcAudio(AUDIO_SUCCESS)
      : setStateSrcAudio(AUDIO_ERROR);

    const dataListQuestion = listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        item.checkResult = checkResult;
        return {
          ...question,
          lastDroppedItem: [...question.lastDroppedItem, item],
        };
      } else {
        return { ...question };
      }
    });

    if (dataListAnswer.length === 0) {
      setShowAlert(true);
      setInputData({ ...inputData, results: dataListQuestion });
    }
    setStateListQuestion(dataListQuestion);
    setStateListAnswer(dataListAnswer);

    setTimeout(function () {
      setStateSrcAudio("");
    }, 1000);
  };

  return (
    <>
      <TitleQuestion
        questionTitle={questionTitle}
        fontSizeTitle={fontSizeTitle}
        typeText={typeTextQuestion}
      />
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalAnswer={countAnswerCorrect}
          totalQuestion={defaultListAnswer.length}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
      <DndProvider backend={HTML5Backend}>
        <Container
          typeQuestion={typeQuestion}
          typeAnswer={typeAnswer}
          typeTextAnswer={typeTextAnswer}
          typeTextQuestion={typeTextQuestion}
          fontSizeQuestion={fontSizeQuestion}
          fontSizeAnswer={fontSizeAnswer}
          listAnswer={listAnswer}
          listQuestion={listQuestion}
          onHandleDrop={onHandleDrop}
        />
      </DndProvider>
      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
      <WrapperButtonReset>
        <ButtonReset
          isDislabeled={false}
          languageBook={languageBook}
          onResetData={onResetData}
          className=""
        />
      </WrapperButtonReset>
    </>
  );
};
const WrapperButtonReset = styled.div`
  position: absolute;
  top: 2px;
  right: 40px;
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

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
)(DrapAndDropContainer);
