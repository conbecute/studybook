import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isDesktop } from "react-device-detect";
import {
  formatListDataAnswer,
  formatListDataQuestion,
  formatQuestionTitle,
} from "./selection";
import ReactAudioPlayer from "react-audio-player";
import { AUDIO_ERROR, AUDIO_SUCCESS, RESULT } from "edu_lms/constants/type";
import TitleQuestion from "./TitleQuestion";
import { Content } from "./Content";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
const DragDropImage = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const dispatch = useDispatch();
  const [listAnswer, setStateListAnswer] = useState([]);
  const [listQuestion, setStateListQuestion] = useState([]);
  const [listAnswerDefault, setListAnswerDefault] = useState([]);
  const [srcAudio, setStateSrcAudio] = useState("");
  const [questionTitle] = useState(formatQuestionTitle(data));
  const [countAnswerCorrect, setStateCountAnswerCorrect] = useState(0);
  const [checkSubmit, setCheckSubmit] = useState(data?.isCorrect);
  const [inputData, setInputData] = useState({});
  useEffect(() => {
    setStateListAnswer(data?.historyAnswer ?? formatListDataAnswer(data));
    setStateListQuestion(data?.historyQuestion ?? formatListDataQuestion(data));
    setListAnswerDefault(formatListDataAnswer(data));
    setStateCountAnswerCorrect(0);
  }, [data]);

  useEffect(() => {}, [data, listAnswer, listQuestion]);
  useEffect(() => {
    setInputData({ ...data.game_config });
  }, [data]);
  useImperativeHandle(ref, () => ({
    handleComplete,
  }));
  const handleComplete = () => {
    setCheckSubmit(true);
    let isCorrect = RESULT._TRUE;
    if (listAnswer.length === 0) {
      listQuestion?.forEach((question) => {
        const lastDroppedItem = question.lastDroppedItem;
        lastDroppedItem.forEach((item) => {
          if (!item.checkResult) {
            isCorrect = RESULT._FALSE;
          }
        });
      });
    } else {
      isCorrect = RESULT._FALSE;
    }
    if (isCorrect === RESULT._TRUE) {
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_SUCCESS));
    } else {
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_ERROR));
    }
    onComplete({
      isCorrect,
      historyAnswer: listAnswer,
      historyQuestion: listQuestion,
    });
  };
  const onHandleDrop = (index, item) => {
    setCheckSubmit(false);
    onPlaying(false);
    const dataListAnswer = listAnswer.filter(
      (answer) => answer.icon_id_answer != item.icon[0].icon_id
    );
    let checkResult = false;
    listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        const dataAnswer = listAnswerDefault.filter(
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
    const dataListQuestion = listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        item.checkResult = checkResult;
        const newLastDroppedItem = question.lastDroppedItem.includes(item)
          ? [...question.lastDroppedItem]
          : [...question.lastDroppedItem, item];
        return {
          ...question,
          lastDroppedItem: newLastDroppedItem,
        };
      } else {
        const lastDroppedItem = question.lastDroppedItem;
        const newLastDroppedItem = lastDroppedItem.filter(
          (lastItem) => lastItem.icon[0].icon_id !== item.icon[0].icon_id
        );
        return { ...question, lastDroppedItem: newLastDroppedItem };
      }
    });
    if (dataListAnswer.length == 0) {
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
        dataConfig={data.game_config}
      />

      <DndProvider backend={isDesktop ? HTML5Backend : TouchBackend}>
        <Content
          typeQuestion={data.game_config.type_question}
          numberInRow={data.game_config.number_in_row}
          widthImage={data.game_config.width_image}
          dataConfig={data.game_config}
          listAnswer={listAnswer}
          listQuestion={listQuestion}
          onHandleDrop={onHandleDrop}
          checkSubmit={checkSubmit}
          showCorrectAnswer={showCorrectAnswer}
          isReadOnly={isReadOnly}
        />
      </DndProvider>

      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
    </>
  );
};
export default forwardRef(DragDropImage);
