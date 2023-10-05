import _ from "lodash";
import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import MatchImageImage from "./HorizontalDisplay/MatchImageImage";
import MatchImageText from "./HorizontalDisplay/MatchImageText";
import MatchTextText from "./HorizontalDisplay/MatchTextText";
import {
  addIsCorrect,
  HEIGHT_CANVAS,
  MATCH_POINT_ANSWER,
  MATCH_POINT_QUESTION,
  MATCH_IMAGE_IMAGE,
  MATCH_IMAGE_TEXT,
  MATCH_TEXT_TEXT,
  HORIZONTAL_DISPLAY,
  VERTICAL_DISPLAY,
  ELEMENT_HEIGHT,
  getCoorItem,
  OBJECT_CHANGE_STATE,
  OBJECT_NEW_STATE,
} from "./constant";
import MatchImageImageVertical from "./VerticalDisplay/MatchImageImageVertical";
import MatchTextTextVertical from "./VerticalDisplay/MatchTextTextVertical";
import MatchImageTextVertical from "./VerticalDisplay/MatchImageTextVertical";
import { AUDIO_ERROR, AUDIO_SUCCESS, RESULT } from "edu_lms/constants/type";
import { isDesktop } from "react-device-detect";

function MatchTheCorrect(
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) {
  useImperativeHandle(ref, () => ({
    handleComplete,
  }));

  const randomCanvasId = Math.random();
  const refWrapper = useRef();
  const [dataMatch, setDataMatch] = useState([]);
  const srcAudio = useSelector((state) => state.app.srcAudio);
  const dispatch = useDispatch();
  const questionTitle = data?.icon_list[0]?.icons.find(
    (item) => item.icon_id === data?.game_config?.title_question?.icon_id
  );
  const [dataQuestion, setDataQuestion] = useState([]);
  const [dataAnswers, setDataAnswer] = useState([]);

  useEffect(() => {
    setDataQuestion(
      data.dataQuestion ||
        data?.game_config?.question.map((item) =>
          data?.icon_list[0].icons.find(
            (_item) => _item.icon_id === item.icon_id
          )
        )
    );

    setDataAnswer(
      data.dataAnswer ||
        data?.game_config?.order_answer.map((item) =>
          data?.icon_list[0].icons.find(
            (_item) => _item.icon_id === item.icon_id
          )
        )
    );
  }, [data]);

  useEffect(() => {
    if (data.dataMatch) onPlaying(true);
    setDataMatch(data.dataMatch || []);
  }, [data.dataMatch]);

  const handlePlayAudio = (src) => {
    if (src) {
      dispatch(onDispatchSrcAudio(src !== srcAudio ? src : ""));
    }
  };

  const handleDataMatch = ({ target }, type, resultId) => {
    if (isReadOnly) return;

    let removeAfterQuestion = [];
    let removeAfterAnswer = [];
    let checkDuplicateQuestion = [];
    let checkDuplicateAnswer = [];
    let currentCoorQuestion = {};
    let currentCoorAnswer = {};
    const coorPoint = target.getBoundingClientRect();
    const getLastObject = dataMatch[dataMatch.length - 1] || {};

    if (Number(data.game_config.type_display) === HORIZONTAL_DISPLAY) {
      currentCoorQuestion = {
        questionCoorX: coorPoint.left + coorPoint.width / 2,
        questionCoorY: MATCH_POINT_QUESTION,
        questionId: resultId,
      };
      currentCoorAnswer = {
        answerCoorX: coorPoint.left + coorPoint.width / 2,
        answerCoorY: MATCH_POINT_ANSWER,
        answerId: resultId,
      };
      removeAfterQuestion = dataMatch.filter(
        (item) =>
          Math.floor(item.questionCoorX) !==
          Math.floor(currentCoorQuestion.questionCoorX)
      );
      removeAfterAnswer = dataMatch.filter(
        (item) =>
          Math.floor(item.answerCoorX) !==
          Math.floor(currentCoorAnswer.answerCoorX)
      );
      checkDuplicateQuestion = dataMatch.some(
        (item) =>
          Math.floor(item.questionCoorX) ===
          Math.floor(currentCoorQuestion.questionCoorX)
      );
      checkDuplicateAnswer = dataMatch.some(
        (item) =>
          Math.floor(item.answerCoorX) ===
          Math.floor(currentCoorAnswer.answerCoorX)
      );
    }

    if (Number(data.game_config.type_display) === VERTICAL_DISPLAY) {
      currentCoorQuestion = {
        questionCoorX: 0,
        questionCoorY:
          coorPoint.top +
          coorPoint.height / 2 -
          refWrapper.current.offsetTop +
          data.coorScroll,
        questionId: resultId,
      };
      currentCoorAnswer = {
        answerCoorX: refWrapper.current.width / 2,
        answerCoorY:
          coorPoint.top +
          coorPoint.height / 2 -
          refWrapper.current.offsetTop +
          data.coorScroll,
        answerId: resultId,
      };
      removeAfterQuestion = dataMatch.filter(
        (item) =>
          Math.floor(item.questionCoorY) !==
          Math.floor(currentCoorQuestion.questionCoorY)
      );
      removeAfterAnswer = dataMatch.filter(
        (item) =>
          Math.floor(item.answerCoorY) !==
          Math.floor(currentCoorAnswer.answerCoorY)
      );
      checkDuplicateQuestion = dataMatch.some(
        (item) =>
          Math.floor(item.questionCoorY) ===
          Math.floor(currentCoorQuestion.questionCoorY)
      );
      checkDuplicateAnswer = dataMatch.some(
        (item) =>
          Math.floor(item.answerCoorY) ===
          Math.floor(currentCoorAnswer.answerCoorY)
      );
    }
    const checkTypeItem =
      type === "question" ? currentCoorQuestion : currentCoorAnswer;

    if (Object.values(getLastObject).length === OBJECT_CHANGE_STATE) {
      if (checkDuplicateQuestion || checkDuplicateAnswer) {
        const checkRemoveType =
          type === "question" ? removeAfterQuestion : removeAfterAnswer;
        setDataMatch([
          ...checkRemoveType,
          { ...getLastObject, ...checkTypeItem },
        ]);
      } else {
        setDataMatch(
          dataMatch.map((item, index) =>
            index === dataMatch.length - 1
              ? {
                  ...item,
                  ...checkTypeItem,
                }
              : item
          )
        );
      }
    }

    if (OBJECT_NEW_STATE.includes(Object.values(getLastObject).length)) {
      if (checkDuplicateQuestion || checkDuplicateAnswer) {
        const checkRemoveType =
          type === "question" ? removeAfterQuestion : removeAfterAnswer;
        setDataMatch([...checkRemoveType, checkTypeItem]);
      } else {
        setDataMatch([...dataMatch, checkTypeItem]);
      }
    }
    onPlaying(false);
  };

  useEffect(() => {
    let canvas;
    if (Number(data.game_config.type_display) === HORIZONTAL_DISPLAY) {
      canvas = new fabric.Canvas(`canvas-match-image-${randomCanvasId}`, {
        width: isDesktop
          ? window.innerWidth - (window.innerWidth * 25) / 100
          : window.innerWidth,
        height: HEIGHT_CANVAS,
      });
      for (const key of dataMatch) {
        const itemQuestion = getCoorItem(
          key?.questionId,
          refWrapper.current.domQuestions
        );
        const itemAnswer = getCoorItem(
          key?.answerId,
          refWrapper.current.domAnswers
        );

        const coorQuestion =
          itemQuestion?.offsetLeft + itemQuestion?.offsetWidth / 2;

        const coorAnswer = itemAnswer?.offsetLeft + itemAnswer?.offsetWidth / 2;

        canvas.add(
          new fabric.Line(
            [
              coorQuestion,
              MATCH_POINT_QUESTION,
              coorAnswer,
              MATCH_POINT_ANSWER,
            ],
            {
              stroke: "#2A404F",
              strokeWidth: 3,
              hasControls: false,
              hasBorders: false,
              lockMovementX: true,
              lockMovementY: true,
              hoverCursor: "default",
            }
          )
        );
      }
    }

    if (Number(data.game_config.type_display) === VERTICAL_DISPLAY) {
      const widthCanvas = window.innerWidth > 500 ? 0.5 : 0.3;
      canvas = new fabric.Canvas(
        `canvas-match-image-vertical-${randomCanvasId}`,
        {
          width: refWrapper.current.width / 2,
          height: data.game_config.number * ELEMENT_HEIGHT,
        }
      );
      for (const key of dataMatch) {
        const itemQuestion = getCoorItem(
          key?.questionId,
          refWrapper.current.domQuestions
        );
        const itemAnswer = getCoorItem(
          key?.answerId,
          refWrapper.current.domAnswers
        );

        const coorQuestion =
          itemQuestion?.offsetTop +
          itemQuestion?.offsetHeight / 2 -
          refWrapper.current.offsetTop;

        const coorAnswer =
          itemAnswer?.offsetTop +
          itemAnswer?.offsetHeight / 2 -
          refWrapper.current.offsetTop;
        canvas.add(
          new fabric.Line(
            [
              MATCH_POINT_QUESTION,
              coorQuestion,
              refWrapper.current.width * widthCanvas,
              coorAnswer,
            ],
            {
              stroke: "#2A404F",
              strokeWidth: 3,
              hasControls: false,
              hasBorders: false,
              lockMovementX: true,
              lockMovementY: true,
              hoverCursor: "default",
            }
          )
        );
      }
    }

    canvas.selection = false;
  }, [dataMatch]);

  const handleComplete = () => {
    const getCorrectAnswer = data?.game_config?.answer.couple_of_icon;
    const userResult = dataMatch.map((item) => item.questionId + item.answerId);
    const correctAnswer = getCorrectAnswer.map(
      (item) => item.icon_id_question + item.icon_id_answer
    );
    const arrListCorrect = [];

    for (const i of userResult) {
      for (const j of correctAnswer) {
        if (i === j) arrListCorrect.push(i);
      }
    }

    const isCorrectAnswer =
      arrListCorrect.length === Number(data.game_config.number);

    let saveDataUser = {
      dataMatch,
      isCorrect: isCorrectAnswer ? RESULT._TRUE : RESULT._FALSE,
      dataQuestion: addIsCorrect(dataQuestion, arrListCorrect),
      dataAnswer: addIsCorrect(dataAnswers, arrListCorrect),
    };
    if (showCorrectAnswer) {
      setDataQuestion(addIsCorrect(dataQuestion, arrListCorrect));
      setDataAnswer(addIsCorrect(dataAnswers, arrListCorrect));
      handlePlayAudio(isCorrectAnswer ? AUDIO_SUCCESS : AUDIO_ERROR);
    }
    onComplete(saveDataUser);
  };

  if (Number(data.game_config.type_display) === HORIZONTAL_DISPLAY) {
    switch (Number(data.game_config.type_game)) {
      case MATCH_IMAGE_IMAGE:
        return (
          <MatchImageImage
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      case MATCH_TEXT_TEXT:
        return (
          <MatchTextText
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      case MATCH_IMAGE_TEXT:
        return (
          <MatchImageText
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      default:
        return false;
    }
  }

  if (Number(data.game_config.type_display) === VERTICAL_DISPLAY) {
    switch (Number(data.game_config.type_game)) {
      case MATCH_IMAGE_IMAGE:
        return (
          <MatchImageImageVertical
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      case MATCH_TEXT_TEXT:
        return (
          <MatchTextTextVertical
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      case MATCH_IMAGE_TEXT:
        return (
          <MatchImageTextVertical
            id={randomCanvasId}
            dataMatch={dataMatch}
            title={questionTitle}
            dataQuestion={dataQuestion}
            dataAnswers={dataAnswers}
            handlePlayAudio={handlePlayAudio}
            handleDataMatch={handleDataMatch}
            ref={refWrapper}
            showCorrectAnswer={showCorrectAnswer}
            dataConfig={data.game_config}
          />
        );
      default:
        return false;
    }
  }
}

export default forwardRef(MatchTheCorrect);
