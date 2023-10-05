import classNames from "classnames";
import { onDispatchDataAlert } from "edu_lms/components/ListQuestion/actions";
import TextComponent from "edu_lms/components/TextComponent";
import {
  BOOK_LANGUAGE,
  INNER_WIDTH,
  TYPE_ENGLISH,
  ANSWER_STATUS,
  GAME_TYPE,
  CTA_POPUP_TYPE,
  ANSWER_GAME_GRAPH_002,
} from "edu_lms/constants/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
  styleAlertGame,
} from "../../selection";
import {
  ANSWERS_TITLE,
  Board,
  convertNumber,
  convertSigns,
  LINE,
  POINT,
  QUESTION,
} from "../constant";
import CheckGraph from "./CheckGraph";
import AnswerComponent from "../../AnswerComponent";
import { CheckAnswer, ShowAlert, BoardStyle } from "./style";

export default function FillTheBlankFirstDegreeEquation({
  data,
  indexQuestion,
  setIndexQuestion,
  setShowSuccess,
  showSuccess,
  setCheckAlert,
  isCheckQuestion,
  setIsCheckQuestion,
  setDataGame,
  dataGame,
  totalCorrect,
  setTotalCorrect,
}) {
  const [isShowGraph, setShowGraph] = useState(false);
  const [valueInputXa, setValueInputXa] = useState("");
  const [valueInputYa, setValueInputYa] = useState("");
  const [valueInputXb, setValueInputXb] = useState("");
  const [valueInputYb, setValueInputYb] = useState("");
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isCheckActive, setIsCheckActive] = useState([
    ANSWER_STATUS.WRONG,
    ANSWER_STATUS.WRONG,
  ]);
  const dispatch = useDispatch();
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const gameConfig = data.game_config.data[indexQuestion];
  const getTypeButton = BOOK_LANGUAGE.find((item) => item.id === languageBook);
  const [typeButton, setTypeButton] = useState(getTypeButton.buttonCheck);
  const a = gameConfig.coefficient_a; //hệ số a của phương trình
  const b = gameConfig.coefficient_b; //hệ số b của phương trình

  useEffect(() => {
    const board = Board(gameConfig, {
      control: true,
      drag: false,
    });
    const xA = valueInputXa || 0;
    const yA = a * xA + b;

    const yB = valueInputYb || 0;
    const xB = (yB - b) / a;
    const pointA = board.create(POINT, [xA, yA], {
      name: "A",
    });
    const pointB = board.create(POINT, [xB, yB], {
      name: "B",
    });
    const line = board.create(LINE, [pointA, pointB]);
    line.isDraggable = false;
  }, [typeButton]);

  useEffect(() => {
    setIsCheckActive([
      valueInputXa && valueInputYa,
      valueInputXb && valueInputYb,
    ]);
  }, [valueInputXa, valueInputYa, valueInputXb, valueInputYb]);

  const resetData = () => {
    setTypeButton(getTypeButton.buttonCheck);
    setValueInputXa("");
    setValueInputYa("");
    setValueInputXb("");
    setValueInputYb("");
    setShowAlert(false);
    setIsCheckActive([]);
  };
  const onResetData = () => {
    resetData();
    setIndexQuestion(0);
    setTotalCorrect(0);
    setShowSuccess(false);
    setDataGame(data.game_config.data);
    setIsCheckQuestion(false);
  };
  const checkResult = () => {
    setShowAlert(true);
    setCheckAlert(true);
    let checkStatus;
    const checkActive = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    if (typeButton === getTypeButton.buttonCheck) {
      const checkPointA = Number(valueInputYa) === a * valueInputXa + b;
      checkPointA && (checkActive[0] = ANSWER_STATUS.CORRECT);

      const checkPointB = Number(valueInputYb) === a * valueInputXb + b;
      checkPointB && (checkActive[1] = ANSWER_STATUS.CORRECT);

      if (checkPointA && checkPointB) {
        setTotalAnswer(ANSWER_GAME_GRAPH_002.DEFAULT);
        dispatch(
          onDispatchDataAlert(
            parseInt(languageBook) === TYPE_ENGLISH
              ? AlertSuccessEnglish
              : AlertSuccess
          )
        );
        setTypeButton(getTypeButton.showGraph);
        checkStatus = data.game_config.data.map((item, index) => {
          if (indexQuestion === index) {
            return { ...item, status: ANSWER_STATUS.CORRECT };
          }
          return { ...dataGame[index] };
        });
        setDataGame(checkStatus);
        setTotalCorrect(totalCorrect + 1);
      } else {
        setTotalAnswer(ANSWER_GAME_GRAPH_002.WRONG);
        dispatch(
          onDispatchDataAlert(
            parseInt(languageBook) === TYPE_ENGLISH
              ? AlertErrorEnglish
              : AlertError
          )
        );
        checkStatus = data.game_config.data.map((item, index) => {
          if (indexQuestion === index) {
            return { ...item, status: ANSWER_STATUS.WRONG };
          }
          return { ...dataGame[index] };
        });
        setDataGame(checkStatus);
        dataGame.length < 2
          ? setTypeButton(getTypeButton.buttonRefresh)
          : setIsCheckQuestion(true);
      }
      setIsCheckActive(checkActive);
    }

    if (typeButton === getTypeButton.showGraph) {
      setShowAlert(false);
      setShowGraph(true);
      dataGame.length < 2
        ? setTypeButton(getTypeButton.buttonRefresh)
        : setIsCheckQuestion(true);
    }

    if (typeButton === getTypeButton.buttonRefresh) {
      resetData();
      setShowGraph(false);
    }
  };

  const onNextQuestionGame = () => {
    setShowGraph(false);
    if (indexQuestion >= dataGame.length - 1) {
      setCheckAlert(false);
      setShowSuccess(true);
    } else {
      setIndexQuestion(indexQuestion + 1);
      setIsCheckQuestion(false);
      resetData();
      setCheckAlert(false);
    }
    setShowAlert(false);
  };

  return (
    <>
      {showSuccess ? (
        <AnswerComponent
          checkScreen={CTA_POPUP_TYPE.finalReport}
          totalAnswer={totalCorrect}
          totalQuestion={data.game_config?.data.length}
          onResetData={onResetData}
        />
      ) : (
        <div
          className={classNames("position-relative vh-100", {
            "pl-5": window.innerWidth > INNER_WIDTH.MOBILE,
          })}
        >
          <div className="mb-4 monkey-fz-24">
            <div className="monkey-f-header d-flex">
              <h2 className="pt-3">{QUESTION}</h2>
              <TextComponent
                data={`\\(y = ${convertNumber(a)}${
                  a !== 0 ? "x" : ""
                } ${convertSigns(b)} \\)`}
              />
            </div>
          </div>
          <div className="m-5 position-relative monkey-fz-24">
            <h2>{ANSWERS_TITLE}</h2>
            <CheckAnswer
              checkActive={isCheckActive[0]}
              showAlert={showAlert}
              className="mt-4 mb-4 pl-2 mt-2"
            >
              <span className="monkey-f-header monkey-color-orange">A</span>
              <span>{" ( "}</span>
              <input
                type="text"
                value={valueInputXa}
                className="h-50"
                onChange={({ target }) => setValueInputXa(target.value)}
              />
              <span>{"; "}</span>
              <input
                type="text"
                value={valueInputYa}
                className="h-50"
                onChange={({ target }) => setValueInputYa(target.value)}
              />
              <span>{" )"}</span>
            </CheckAnswer>
            <CheckAnswer
              checkActive={isCheckActive[1]}
              showAlert={showAlert}
              className="pl-2"
            >
              <span className="monkey-f-header monkey-color-orange">B</span>
              <span>{" ( "}</span>
              <input
                type="text"
                value={valueInputXb}
                className="h-50"
                onChange={({ target }) => setValueInputXb(target.value)}
              />
              <span>{"; "}</span>
              <input
                type="text"
                value={valueInputYb}
                className="h-50"
                onChange={({ target }) => setValueInputYb(target.value)}
              />
              <span>{" )"}</span>
            </CheckAnswer>
            <BoardStyle
              id="jxgbox"
              className={classNames("jxgbox position-absolute", {
                "active-board": isShowGraph,
              })}
            />
          </div>
          <CheckGraph
            dataGame={dataGame}
            indexQuestion={indexQuestion}
            isActive={isCheckActive.every((activeStatus) => activeStatus)}
            typeButton={typeButton}
            onNextQuestionGame={onNextQuestionGame}
            isCheckQuestion={isCheckQuestion}
            checkResult={checkResult}
            languageBook={languageBook}
          />
          <ShowAlert styleAlertGame={styleAlertGame}>
            <AnswerComponent
              typeGame={GAME_TYPE.oneGame}
              checkScreen={CTA_POPUP_TYPE.yesNo}
              totalAnswer={totalAnswer}
              totalQuestion={CTA_POPUP_TYPE.rangeOneGame}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </ShowAlert>
        </div>
      )}
    </>
  );
}
