import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  ANSWER_STATUS,
  AUDIO_SUCCESS,
  AUDIO_ERROR,
  RESULT,
} from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import {
  Board,
  convertCoordinatesToInteger,
  DEFAULT_POINT_A,
  DEFAULT_POINT_B,
  MOUSE_DRAG,
  TYPE_GRAPH,
  TYPE_EQUATION,
} from "./constants";
import DragDropGraphFirstDegrees from "./DragDropGraphFirstDegree";
import DragDropQuadratic from "./DragDropQuadratic";

const DragDropGraph = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const dispatch = useDispatch();

  let graphId = `jxgbox${Math.random()}`;
  const graphStyle = data.game_config.data[0].type_graph.icon_id;
  const gameConfig = data.game_config.data[0];
  const [checkAnswer, setCheckAnswer] = useState([
    ANSWER_STATUS.DEFAULT,
    ANSWER_STATUS.DEFAULT,
  ]);
  const [coorPointA, setCoorPointA] = useState(DEFAULT_POINT_A);
  const [coorPointB, setCoorPointB] = useState(DEFAULT_POINT_B);
  const a = gameConfig?.coefficient_a; //hệ số a của phương trình
  const b = gameConfig?.coefficient_b; //hệ số b của phương trình
  const c = gameConfig?.coefficient_c; //hệ số c của phương trình

  useEffect(() => {
    setCoorPointA(data.historyAnswer?.coorPointA || DEFAULT_POINT_A);
    setCoorPointB(data.historyAnswer?.coorPointB || DEFAULT_POINT_B);
  }, [data]);

  useEffect(() => {
    data.historyAnswer
      ? setCheckAnswer([data.historyAnswer?.isCheckAnswer])
      : setCheckAnswer([ANSWER_STATUS.DEFAULT]);
  }, [data]);

  useImperativeHandle(ref, () => ({
    handleComplete: onCheckLevelFunction,
  }));

  const categoryGames = () => {
    switch (graphStyle) {
      case TYPE_EQUATION.FIRST_DEGREE:
        return (
          <DragDropGraphFirstDegrees factor={{ a, b }} graphId={graphId} />
        );

      case TYPE_EQUATION.QUADRATIC:
        return <DragDropQuadratic factor={{ a, b, c }} graphId={graphId} />;

      default:
        return null;
    }
  };

  let strokeColor = "#00c2f3";
  if (!_.includes(checkAnswer, ANSWER_STATUS.DEFAULT)) {
    strokeColor = "green";
    const isWrong =
      _.includes(
        data.historyAnswer?.isCheckAnswer || [],
        ANSWER_STATUS.WRONG
      ) || _.includes(checkAnswer, ANSWER_STATUS.WRONG);
    if (isWrong) {
      strokeColor = "red";
    }
  }

  useEffect(() => {
    const board = Board(
      gameConfig,
      {
        control: false,
        drag: true,
      },
      graphId
    );

    const pointA = board.create(TYPE_GRAPH.POINT, coorPointA, {
      name: "",
    });
    const pointB = board.create(TYPE_GRAPH.POINT, coorPointB, {
      name: "",
    });

    pointA.isDraggable = !isReadOnly;
    pointB.isDraggable = !isReadOnly;
    pointA.on(MOUSE_DRAG, () => {
      onPlaying(false);
      pointA.moveTo(convertCoordinatesToInteger(pointA));
      setCoorPointA(convertCoordinatesToInteger(pointA));
    });

    pointB.on(MOUSE_DRAG, () => {
      onPlaying(false);
      pointB.moveTo(convertCoordinatesToInteger(pointB));
      setCoorPointB(convertCoordinatesToInteger(pointB));
    });

    if (graphStyle === TYPE_EQUATION.QUADRATIC) {
      const parabol = board.create(
        TYPE_GRAPH.PARABOL,
        (x) => {
          const ax = pointA.X();
          const ay = pointA.Y();
          const bx = pointB.X();
          const by = pointB.Y();
          const a = (by - ay) / ((bx - ax) * (bx - ax));

          return a * (x - ax) * (x - ax) + ay;
        },
        showCorrectAnswer && {
          fixed: false,
          strokeColor,
        }
      );
      parabol.isDraggable = false;
    }

    if (graphStyle === TYPE_EQUATION.FIRST_DEGREE) {
      const line = board.create(
        TYPE_GRAPH.LINE,
        [pointA, pointB],
        showCorrectAnswer && {
          fixed: false,
          strokeColor,
        }
      );
      line.isDraggable = false;
    }
  }, [a, b, c, checkAnswer]);

  const checkResultFirstEquation = () => {
    let isCorrect = RESULT._TRUE;
    let isCheckAnswer = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    const xA = coorPointA[0];
    const yA = coorPointA[1];
    const xB = coorPointB[0];
    const yB = coorPointB[1];

    const checkPointA = yA === a * xA + b;
    checkPointA && (isCheckAnswer[0] = ANSWER_STATUS.CORRECT);

    const checkPointB = yB === a * xB + b;
    checkPointB && (isCheckAnswer[1] = ANSWER_STATUS.CORRECT);

    checkPointA && checkPointB
      ? (isCorrect = RESULT._TRUE)
      : (isCorrect = RESULT._FALSE);
    showCorrectAnswer &&
      dispatch(
        onDispatchSrcAudio(
          checkPointA && checkPointB ? AUDIO_SUCCESS : AUDIO_ERROR
        )
      );

    setCheckAnswer(isCheckAnswer);
    onComplete({
      isCorrect,
      historyAnswer: { coorPointA, coorPointB, isCheckAnswer },
    });
  };

  const checkResultQuadratic = () => {
    let isCorrect = RESULT._TRUE;
    let isCheckAnswer = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    let checkGraphStyle = false;
    const xA = coorPointA[0];
    const yA = coorPointA[1];
    const xB = coorPointB[0];
    const yB = coorPointB[1];
    const checkPointA = yA === a * xA * xA + b * xA + c;
    checkPointA && (isCheckAnswer[0] = ANSWER_STATUS.CORRECT);

    const checkPointB = yB === a * xB * xB + b * xB + c;
    checkPointB && (isCheckAnswer[1] = ANSWER_STATUS.CORRECT);
    if (a > 0 && yA < yB) checkGraphStyle = true; // Kiểm tra hàm đồng biến và nghịch biến
    if (a < 0 && yA > yB) checkGraphStyle = true; // Kiểm tra hàm đồng biến và nghịch biến

    checkPointA && checkPointB && checkGraphStyle
      ? (isCorrect = RESULT._TRUE)
      : (isCorrect = RESULT._FALSE);
    showCorrectAnswer &&
      dispatch(
        onDispatchSrcAudio(
          checkPointA && checkPointB && checkGraphStyle
            ? AUDIO_SUCCESS
            : AUDIO_ERROR
        )
      );
    setCheckAnswer(isCheckAnswer);
    onComplete({
      isCorrect,
      historyAnswer: {
        coorPointA: [xA, yA],
        coorPointB: [xB, yB],
        isCheckAnswer,
      },
    });
  };

  const onCheckLevelFunction = () => {
    graphStyle === TYPE_EQUATION.FIRST_DEGREE && checkResultFirstEquation();
    graphStyle === TYPE_EQUATION.QUADRATIC && checkResultQuadratic();
  };
  return <div className="h-100">{categoryGames()}</div>;
};

export default forwardRef(DragDropGraph);
