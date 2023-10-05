import classNames from "classnames";
import { onDispatchDataAlert } from "edu_lms/components/ListQuestion/actions";
import TextComponent from "edu_lms/components/TextComponent";
import {
  BOOK_LANGUAGE,
  INNER_WIDTH,
  TYPE_ENGLISH,
  ANSWER_STATUS,
  CTA_POPUP_TYPE,
  GAME_TYPE,
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
  ANSWERS_TITLE_QUADRATIC,
  Board,
  convertNumber,
  convertSigns,
  PARABOL,
  POINT,
  QUESTION,
} from "../constant";
import CheckGraph from "./CheckGraph";
import AnswerComponent from "../../AnswerComponent";
import { CheckAnswer, ShowAlert, BoardStyle, TitleAnswer } from "./style";

export default function FillTheBlankQuadraticEquation({
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
  setTotalCorrect,
  totalCorrect,
}) {
  const [isShowGraph, setShowGraph] = useState(false);
  const [valueInputXa, setValueInputXa] = useState("");
  const [valueInputYa, setValueInputYa] = useState("");
  const [valueInputXb, setValueInputXb] = useState("");
  const [valueInputYb, setValueInputYb] = useState("");
  const [valueInputXc, setValueInputXc] = useState("");
  const [valueInputYc, setValueInputYc] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isCheckActive, setIsCheckActive] = useState([
    ANSWER_STATUS.WRONG,
    ANSWER_STATUS.WRONG,
    ANSWER_STATUS.WRONG,
  ]);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const dispatch = useDispatch();
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const gameConfig = data.game_config.data[indexQuestion];
  const getTypeButton = BOOK_LANGUAGE.find((item) => item.id === languageBook);
  const [typeButton, setTypeButton] = useState(getTypeButton.buttonCheck);
  const a = gameConfig.coefficient_a; //hệ số a của phương trình
  const b = gameConfig.coefficient_b; //hệ số b của phương trình
  const c = gameConfig.coefficient_c; //hệ số b của phương trình

  useEffect(() => {
    const board = Board(gameConfig, {
      control: true,
      drag: false,
    });
    const xA = -b / (2 * a);
    const yA = a * xA * xA + b * xA + c;
    const xB = (Number(valueInputXa) !== xA ? valueInputXa : valueInputXb) || 0;
    const yB = a * xB * xB + b * xB + c;
    const pointA = board.create(POINT, [xA, yA], {
      name: "",
    });
    const pointB = board.create(POINT, [xB, yB], {
      name: "",
    });
    const parabol = board.create(
      PARABOL,
      (x) => {
        const ax = pointA.X();
        const ay = pointA.Y();
        const bx = pointB.X();
        const by = pointB.Y();
        const variable = (by - ay) / ((bx - ax) * (bx - ax));
        return variable * (x - ax) * (x - ax) + ay;
      },
      { fixed: false }
    );
    parabol.isDraggable = false;
  }, [typeButton]);

  useEffect(() => {
    setIsCheckActive([
      valueInputXa && valueInputYa,
      valueInputXb && valueInputYb,
      valueInputXc && valueInputYc,
    ]);
  }, [
    valueInputXa,
    valueInputYa,
    valueInputXb,
    valueInputYb,
    valueInputXc,
    valueInputYc,
  ]);
  const resetData = () => {
    setShowAlert(false);
    setTypeButton(getTypeButton.buttonCheck);
    setValueInputXa("");
    setValueInputYa("");
    setValueInputXb("");
    setValueInputYb("");
    setValueInputXc("");
    setValueInputYc("");
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
    let dataGameStatus;
    let checkActive = [
      ANSWER_STATUS.WRONG,
      ANSWER_STATUS.WRONG,
      ANSWER_STATUS.WRONG,
    ];
    if (typeButton === getTypeButton.buttonCheck) {
      const checkPointA =
        Number(valueInputYa) ===
        a * valueInputXa * valueInputXa + b * valueInputXa + c;
      checkPointA && (checkActive[0] = ANSWER_STATUS.CORRECT);

      const checkPointB =
        Number(valueInputYb) ===
        a * valueInputXb * valueInputXb + b * valueInputXb + c;
      checkPointB && (checkActive[1] = ANSWER_STATUS.CORRECT);

      const checkPointC =
        Number(valueInputYc) ===
        a * valueInputXc * valueInputXc + b * valueInputXc + c;
      checkPointC && (checkActive[2] = ANSWER_STATUS.CORRECT);

      if (checkPointA && checkPointB && checkPointC) {
        setTotalAnswer(ANSWER_GAME_GRAPH_002.CORRECT);
        dispatch(
          onDispatchDataAlert(
            parseInt(languageBook) === TYPE_ENGLISH
              ? AlertSuccessEnglish
              : AlertSuccess
          )
        );
        setTypeButton(getTypeButton.showGraph);
        dataGameStatus = data.game_config.data.map((item, index) => {
          if (indexQuestion === index) {
            return { ...item, status: ANSWER_STATUS.CORRECT };
          }
          return { ...dataGame[index] };
        });
        setDataGame(dataGameStatus);
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
        dataGameStatus = data.game_config.data.map((item, index) => {
          if (indexQuestion === index) {
            return { ...item, status: ANSWER_STATUS.WRONG };
          }
          return { ...dataGame[index] };
        });
        setDataGame(dataGameStatus);
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
      setCheckAlert(false);
      setShowAlert(false);
    }
  };

  const onNextQuestionGame = () => {
    setShowAlert(false);
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
                data={`\\(y = ${convertNumber(a)}${a !== 0 ? "x^2" : ""} ${
                  b > 0 ? "+" : ""
                } ${convertNumber(b)}${b !== 0 ? "x" : ""} ${convertSigns(
                  c
                )}\\)`}
              />
            </div>
          </div>
          <div className="m-5 position-relative monkey-fz-24">
            <TitleAnswer>{ANSWERS_TITLE_QUADRATIC}</TitleAnswer>
            <CheckAnswer
              checkActive={isCheckActive[0]}
              showAlert={showAlert}
              className="mt-4 mb-4 pl-2 mt-2 monkey-fz-24"
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
                checkActive={isCheckActive[1]}
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
              className="pl-2 mb-4"
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
            <CheckAnswer
              checkActive={isCheckActive[2]}
              showAlert={showAlert}
              className="pl-2"
            >
              <span className="monkey-f-header monkey-color-orange">C</span>{" "}
              <span>{"( "}</span>
              <input
                type="text"
                value={valueInputXc}
                className="h-50"
                onChange={({ target }) => setValueInputXc(target.value)}
              />
              <span>{"; "}</span>
              <input
                type="text"
                value={valueInputYc}
                className="h-50"
                onChange={({ target }) => setValueInputYc(target.value)}
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
              totalQuestion={CTA_POPUP_TYPE.rangeMutipleGame}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </ShowAlert>
        </div>
      )}
    </>
  );
}
