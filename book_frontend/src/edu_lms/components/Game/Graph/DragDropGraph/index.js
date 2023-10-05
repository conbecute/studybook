import { onDispatchDataAlert } from "edu_lms/components/ListQuestion/actions";
import { TYPE_ENGLISH, ANSWER_STATUS } from "edu_lms/constants/type";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDefault,
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
} from "../../selection";
import {
  Board,
  coorInteger,
  CUBIC_EQUATION,
  DEFAULT_POINT_A,
  DEFAULT_POINT_B,
  FIRST_DEGREE_EQUATION,
  formatDataActivity,
  LINE,
  MOUSE_DRAG,
  PARABOL,
  POINT,
  QUADRATIC_EQUATION,
  QUATERNARY_EQUATION,
} from "../constant";
import DragDropGraphFirstDegreeEquation from "./DragDropGraphFirstDegreeEquation";
import DragDropQuadraticEquation from "./DragDropQuadraticEquation";
import FooterGraph from "./FooterGraph";

export default function DragDropGraph({ data }) {
  const [isReview, setIsReview] = useState(false);
  const [getCoorPointA, setCoorPointA] = useState(DEFAULT_POINT_A);
  const [getCoorPointB, setCoorPointB] = useState(DEFAULT_POINT_B);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [question, setQuestion] = useState(
    formatDataActivity(data.game_config.data)
  );
  const [dataActive, setDataActive] = useState(question[activeQuestion]);
  const graphStyle = dataActive.type_graph.icon_id;
  const [showResult, setShowResult] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState([
    ANSWER_STATUS.DEFAULT,
    ANSWER_STATUS.DEFAULT,
  ]);
  const [checkParabol, setCheckParabol] = useState(false);

  const a = dataActive?.coefficient_a; //hệ số a của phương trình
  const b = dataActive?.coefficient_b; //hệ số b của phương trình
  const c = dataActive?.coefficient_c; //hệ số c của phương trình
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const alert = useSelector((state) => state.listQuestion.alert);
  const dispatch = useDispatch();

  const categoryGames = () => {
    switch (graphStyle) {
      case FIRST_DEGREE_EQUATION:
        return (
          <DragDropGraphFirstDegreeEquation
            showResult={showResult}
            question={question}
            countCorrect={countCorrect}
            languageBook={languageBook}
            onResetData={onResetData}
            activeQuestion={activeQuestion}
            checkAnswer={checkAnswer}
            isReview={isReview}
            factor={{ a, b }}
          />
        );
      case QUADRATIC_EQUATION:
        return (
          <DragDropQuadraticEquation
            showResult={showResult}
            question={question}
            countCorrect={countCorrect}
            languageBook={languageBook}
            onResetData={onResetData}
            activeQuestion={activeQuestion}
            checkAnswer={checkAnswer}
            isReview={isReview}
            factor={{ a, b, c }}
          />
        );
      case CUBIC_EQUATION:
        return <div></div>;
      case QUATERNARY_EQUATION:
        return <div></div>;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (graphStyle === QUADRATIC_EQUATION) {
      const board = Board(
        dataActive,
        {
          control: false,
          drag: true,
        },
        activeQuestion < question.length && `jxgbox${activeQuestion}`
      );
      const isCheckAnswer = checkAnswer.map((item) => {
        const isCorrect = item
          ? item === ANSWER_STATUS.CORRECT && checkParabol
            ? "green"
            : "red"
          : "rgb(213, 94, 0)";
        return isCorrect;
      });

      const pointA = board.create(POINT, getCoorPointA, {
        name: "",
        strokeColor: isCheckAnswer[0],
        fillColor: isCheckAnswer[0],
      });
      const pointB = board.create(POINT, getCoorPointB, {
        name: "",
        strokeColor: isCheckAnswer[1],
        fillColor: isCheckAnswer[1],
      });
      const parabol = board.create(
        PARABOL,
        (x) => {
          const ax = pointA.X();
          const ay = pointA.Y();
          const bx = pointB.X();
          const by = pointB.Y();
          const a = (by - ay) / ((bx - ax) * (bx - ax));
          return a * (x - ax) * (x - ax) + ay;
        },
        {
          fixed: false,
          strokeColor: `${
            !_.includes(checkAnswer, ANSWER_STATUS.DEFAULT)
              ? _.includes(checkAnswer, ANSWER_STATUS.CORRECT) &&
                checkParabol &&
                isCheckAnswer.every((item) => item === "green")
                ? "green"
                : "red"
              : "#00c2f3"
          }`,
        }
      );
      parabol.isDraggable = false;

      pointA.on(MOUSE_DRAG, () => {
        pointA.moveTo(coorInteger(pointA));
        setCoorPointA(coorInteger(pointA));
      });

      pointB.on(MOUSE_DRAG, () => {
        pointB.moveTo(coorInteger(pointB));
        setCoorPointB(coorInteger(pointB));
      });
    }

    if (graphStyle === FIRST_DEGREE_EQUATION) {
      const board = Board(
        dataActive,
        {
          control: false,
          drag: true,
        },
        activeQuestion < question.length && `jxgbox${activeQuestion}`
      );
      const pointA = board.create(POINT, getCoorPointA, {
        name: "",
      });
      const pointB = board.create(POINT, getCoorPointB, {
        name: "",
      });
      const line = board.create(LINE, [pointA, pointB]);
      line.isDraggable = false;

      pointA.on(MOUSE_DRAG, () => {
        pointA.moveTo(coorInteger(pointA));
        setCoorPointA(coorInteger(pointA));
      });

      pointB.on(MOUSE_DRAG, () => {
        pointB.moveTo(coorInteger(pointB));
        setCoorPointB(coorInteger(pointB));
      });
    }
  }, [isReview, a, b, c, checkAnswer, checkParabol]);

  useEffect(() => {
    setDataActive(question[activeQuestion]);
  }, [activeQuestion, question]);

  const checkResultFirstEquation = () => {
    setShowAlert(true);
    let isCheckAnswer = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    const xA = getCoorPointA[0];
    const yA = getCoorPointA[1];
    const xB = getCoorPointB[0];
    const yB = getCoorPointB[1];

    const checkPointA = yA === a * xA + b;
    checkPointA && (isCheckAnswer[0] = ANSWER_STATUS.CORRECT);

    const checkPointB = yB === a * xB + b;
    checkPointB && (isCheckAnswer[1] = ANSWER_STATUS.CORRECT);

    if (checkPointA && checkPointB) {
      setCountCorrect(countCorrect + 1);
      const newQuestion = question.map((item, index) =>
        index === activeQuestion ? { ...item, result: 1 } : item
      );
      setQuestion(newQuestion);
      dispatch(
        onDispatchDataAlert(
          parseInt(languageBook) === TYPE_ENGLISH
            ? AlertSuccessEnglish
            : AlertSuccess
        )
      );
    } else {
      const newQuestion = question.map((item, index) =>
        index === activeQuestion ? { ...item, result: 2 } : item
      );
      setQuestion(newQuestion);
      dispatch(
        onDispatchDataAlert(
          parseInt(languageBook) === TYPE_ENGLISH
            ? AlertErrorEnglish
            : AlertError
        )
      );
    }

    setCheckAnswer(isCheckAnswer);
    setIsReview(!isReview);
  };

  const checkResultQuadratic = () => {
    setShowAlert(true);
    let isCheckAnswer = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    let checkGraphStyle = false;
    const xA = getCoorPointA[0];
    const yA = getCoorPointA[1];
    const xB = getCoorPointB[0];
    const yB = getCoorPointB[1];

    const checkPointA = yA === a * xA * xA + b * xA + c;
    checkPointA && (isCheckAnswer[0] = ANSWER_STATUS.CORRECT);

    const checkPointB = yB === a * xB * xB + b * xB + c;
    checkPointB && (isCheckAnswer[1] = ANSWER_STATUS.CORRECT);

    if (a > 0 && yA < yB) checkGraphStyle = true; // Kiểm tra hàm đồng biến và nghịch biến
    if (a < 0 && yA > yB) checkGraphStyle = true; // Kiểm tra hàm đồng biến và nghịch biến
    setCheckParabol(checkGraphStyle);
    if (checkPointA && checkPointB && checkGraphStyle) {
      setCountCorrect(countCorrect + 1);
      setDataActive({ ...dataActive, result: 1 });
      const newQuestion = question.map((item, index) =>
        index === activeQuestion ? { ...item, result: 1 } : item
      );
      setQuestion(newQuestion);
      dispatch(
        onDispatchDataAlert(
          parseInt(languageBook) === TYPE_ENGLISH
            ? AlertSuccessEnglish
            : AlertSuccess
        )
      );
    } else {
      setDataActive({ ...dataActive, result: 2 });
      const newQuestion = question.map((item, index) =>
        index === activeQuestion ? { ...item, result: 2 } : item
      );

      setQuestion(newQuestion);
      dispatch(
        onDispatchDataAlert(
          parseInt(languageBook) === TYPE_ENGLISH
            ? AlertErrorEnglish
            : AlertError
        )
      );
    }
    setCheckAnswer(isCheckAnswer);
    setIsReview(!isReview);
  };

  const onResetData = () => {
    setCheckParabol(false);
    setShowAlert(false);
    setQuestion(
      question.map((question) => {
        return { ...question, result: 0 };
      })
    );
    setActiveQuestion(0);
    setShowResult(false);
    setCoorPointA(DEFAULT_POINT_A);
    setCoorPointB(DEFAULT_POINT_B);
    setIsReview(!isReview);
    setStateIndexQuestion(0);
    onDispatchDataAlert(AlertDefault);
    setCountCorrect(0);
    setCheckAnswer([ANSWER_STATUS.DEFAULT, ANSWER_STATUS.DEFAULT]);
  };
  const onNextQuestion = () => {
    setCheckParabol(false);
    setCoorPointA([1, 0]);
    setCoorPointB([-1, 0]);
    setDataActive(dataActive);
    setActiveQuestion(
      activeQuestion < question.length ? activeQuestion + 1 : ""
    );
    setStateIndexQuestion(
      indexQuestion < question.length ? indexQuestion + 1 : ""
    );
    setIsReview(!isReview);
    onDispatchDataAlert(AlertDefault);
    setShowAlert(false);
    setCheckAnswer([ANSWER_STATUS.DEFAULT, ANSWER_STATUS.DEFAULT]);
  };

  const handleDispatchDataAlert = (alertDefault) => {
    dispatch(onDispatchDataAlert(alertDefault));
  };

  const onCheckLevelFunction = () => {
    if (graphStyle === QUADRATIC_EQUATION) checkResultQuadratic();
    if (graphStyle === FIRST_DEGREE_EQUATION) checkResultFirstEquation();
  };
  return (
    <div className="h-100">
      {categoryGames()}
      {!showResult && (
        <FooterGraph
          indexQuestion={indexQuestion}
          activeQuestion={activeQuestion}
          isReview={isReview}
          checkResult={onCheckLevelFunction}
          alert={alert}
          languageBook={languageBook}
          onNextQuestion={onNextQuestion}
          handleDispatchDataAlert={handleDispatchDataAlert}
          onResetData={onResetData}
          countCorrect={countCorrect}
          setShowResult={setShowResult}
          question={question}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  );
}
