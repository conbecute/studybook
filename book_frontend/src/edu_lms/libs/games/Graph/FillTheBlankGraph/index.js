import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  ANSWER_STATUS,
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  RESULT,
} from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import {
  Board,
  checkCorrectGraphQuadratic,
  TYPE_EQUATION,
  TYPE_GRAPH,
} from "../constants";
import FillTheBlankFirstDegree from "./FillTheBlankFirstDegree";
import FillTheBlankQuadratic from "./FillTheBlankQuadratic";

const FillTheBlankGraph = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const graphStyle = Number(data.game_config?.data[0]?.type_graph?.icon_id);

  const dispatch = useDispatch();
  let graphId = `jxgbox${Math.random()}`;
  const [valueInputXa, setValueInputXa] = useState("");
  const [valueInputYa, setValueInputYa] = useState("");
  const [valueInputXb, setValueInputXb] = useState("");
  const [valueInputYb, setValueInputYb] = useState("");
  const [valueInputXc, setValueInputXc] = useState("");
  const [valueInputYc, setValueInputYc] = useState("");

  const [isShowGraph, setShowGraph] = useState(false);
  const [isCheckActive, setIsCheckActive] = useState([
    ANSWER_STATUS.DEFAULT,
    ANSWER_STATUS.DEFAULT,
    ANSWER_STATUS.DEFAULT,
  ]);
  const [isCheckActiveFirstDegree, setIsCheckActiveFirstDegree] = useState([
    ANSWER_STATUS.DEFAULT,
    ANSWER_STATUS.DEFAULT,
  ]);

  const [isNotEmptyValue, setIsNotEmptyValue] = useState(false);

  const gameConfig = data.game_config.data[0];
  const a = gameConfig.coefficient_a; //hệ số a của phương trình
  const b = gameConfig.coefficient_b; //hệ số b của phương trình
  const c = gameConfig.coefficient_c; //hệ số c của phương trình

  useEffect(() => {
    setValueInputXa(data.historyAnswer?.pointA.valueInputXa || "");
    setValueInputYa(data.historyAnswer?.pointA.valueInputYa || "");
    setValueInputXb(data.historyAnswer?.pointB.valueInputXb || "");
    setValueInputYb(data.historyAnswer?.pointB.valueInputYb || "");
    setValueInputXc(data.historyAnswer?.pointC?.valueInputXc || "");
    setValueInputYc(data.historyAnswer?.pointC?.valueInputYc || "");
    setShowGraph(!!data.historyAnswer?.pointA);

    setIsNotEmptyValue(
      data?.historyAnswer?.pointA?.valueInputXa?.length > 0 ||
        data?.historyAnswer?.pointA?.valueInputYa?.length > 0 ||
        data?.historyAnswer?.pointB?.valueInputXb?.length > 0 ||
        data?.historyAnswer?.pointB?.valueInputYb?.length > 0 ||
        data?.historyAnswer?.pointC?.valueInputXc?.length > 0 ||
        data?.historyAnswer?.pointC?.valueInputYc?.length > 0
    );
  }, [data]);

  useImperativeHandle(ref, () => ({
    handleComplete: onCheckLevelFunction,
  }));

  useEffect(() => {
    if (graphStyle === TYPE_EQUATION.FIRST_DEGREE) {
      const board = Board(
        gameConfig,
        {
          control: true,
          drag: false,
        },
        graphId
      );
      const xA = valueInputXa || 0;
      const yA = a * xA + b;

      const yB = valueInputYb || 0;
      const xB = (yB - b) / a;

      const pointA = board.create(
        TYPE_GRAPH.POINT,
        [
          data?.historyAnswer?.pointA?.valueInputXa || xA,
          data?.historyAnswer?.pointA?.valueInputYa || yA,
        ],
        {
          name: "A",
        }
      );
      const pointB = board.create(
        TYPE_GRAPH.POINT,
        [
          data?.historyAnswer?.pointB?.valueInputXb || xB,
          data?.historyAnswer?.pointB?.valueInputYb || yB,
        ],
        {
          name: "B",
        }
      );
      const line = board.create(TYPE_GRAPH.LINE, [pointA, pointB]);
      line.isDraggable = false;
    }

    if (graphStyle === TYPE_EQUATION.QUADRATIC) {
      const board = Board(
        gameConfig,
        {
          control: true,
          drag: false,
        },
        graphId
      );

      const xA = -b / (2 * a);
      const yA = a * xA * xA + b * xA + c;
      const xB = Number(valueInputXa !== xA ? valueInputXa : valueInputXb) || 0;
      const yB = a * xB * xB + b * xB + c;

      const pointA = board.create(
        TYPE_GRAPH.POINT,
        [
          checkCorrectGraphQuadratic(
            data?.isCorrect,
            data?.historyAnswer?.pointA?.valueInputXa,
            xA
          ),
          checkCorrectGraphQuadratic(
            data?.isCorrect,
            data?.historyAnswer?.pointA?.valueInputYa,
            yA
          ),
        ],
        {
          name: "",
        }
      );
      const pointB = board.create(
        TYPE_GRAPH.POINT,
        [
          checkCorrectGraphQuadratic(
            data?.isCorrect,
            data?.historyAnswer?.pointB?.valueInputXb,
            xB
          ),
          checkCorrectGraphQuadratic(
            data?.isCorrect,
            data?.historyAnswer?.pointB?.valueInputYb,
            yB
          ),
        ],
        {
          name: "",
        }
      );
      const parabol = board.create(
        TYPE_GRAPH.PARABOL,
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
    }
  }, [a, b, c, isCheckActive, isCheckActiveFirstDegree]);

  const checkResultFirstEquation = () => {
    let isCorrect = RESULT._TRUE;
    let checkActive = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    const checkPointA = Number(valueInputYa) === a * valueInputXa + b;
    checkPointA && (checkActive[0] = ANSWER_STATUS.CORRECT);

    const checkPointB = Number(valueInputYb) === a * valueInputXb + b;
    checkPointB && (checkActive[1] = ANSWER_STATUS.CORRECT);

    checkPointA && checkPointB
      ? (isCorrect = RESULT._TRUE)
      : (isCorrect = RESULT._FALSE);
    showCorrectAnswer &&
      dispatch(
        onDispatchSrcAudio(
          checkPointA && checkPointB ? AUDIO_SUCCESS : AUDIO_ERROR
        )
      );
    setIsCheckActiveFirstDegree(checkActive);
    setShowGraph(true);
    onComplete({
      isCorrect,
      historyAnswer: {
        pointA: { valueInputXa, valueInputYa },
        pointB: { valueInputXb, valueInputYb },
        checkActive,
      },
    });
  };

  const checkResultQuadratic = () => {
    let isCorrect = RESULT._TRUE;
    let checkActive = [
      ANSWER_STATUS.WRONG,
      ANSWER_STATUS.WRONG,
      ANSWER_STATUS.WRONG,
    ];
    const checkPointAQuadratic =
      Number(valueInputYa) ===
      a * valueInputXa * valueInputXa + b * valueInputXa + c;
    checkPointAQuadratic && (checkActive[0] = ANSWER_STATUS.CORRECT);

    const checkPointBQuadratic =
      Number(valueInputYb) ===
      a * valueInputXb * valueInputXb + b * valueInputXb + c;
    checkPointBQuadratic && (checkActive[1] = ANSWER_STATUS.CORRECT);

    const checkPointCQuadratic =
      Number(valueInputYc) ===
      a * valueInputXc * valueInputXc + b * valueInputXc + c;
    checkPointCQuadratic && (checkActive[2] = ANSWER_STATUS.CORRECT);

    checkPointAQuadratic && checkPointBQuadratic && checkPointCQuadratic
      ? (isCorrect = RESULT._TRUE)
      : (isCorrect = RESULT._FALSE);
    showCorrectAnswer &&
      dispatch(
        onDispatchSrcAudio(
          checkPointAQuadratic && checkPointBQuadratic && checkPointCQuadratic
            ? AUDIO_SUCCESS
            : AUDIO_ERROR
        )
      );
    setShowGraph(true);
    setIsCheckActive(checkActive);
    onComplete({
      isCorrect,
      historyAnswer: {
        pointA: { valueInputXa, valueInputYa },
        pointB: { valueInputXb, valueInputYb },
        pointC: { valueInputXc, valueInputYc },
        checkActive,
      },
    });
  };

  const onCheckLevelFunction = () => {
    graphStyle === TYPE_EQUATION.FIRST_DEGREE && checkResultFirstEquation();
    graphStyle === TYPE_EQUATION.QUADRATIC && checkResultQuadratic();
  };

  switch (graphStyle) {
    case TYPE_EQUATION.FIRST_DEGREE:
      return (
        <FillTheBlankFirstDegree
          data={data}
          onPlaying={onPlaying}
          graphId={graphId}
          isCheckActive={isCheckActiveFirstDegree}
          valueInputXa={valueInputXa}
          valueInputXb={valueInputXb}
          valueInputYa={valueInputYa}
          valueInputYb={valueInputYb}
          setValueInputXa={setValueInputXa}
          setValueInputYa={setValueInputYa}
          setValueInputXb={setValueInputXb}
          setValueInputYb={setValueInputYb}
          factor={{ a, b }}
          isShowGraph={isShowGraph}
          isReadOnly={isReadOnly}
          showCorrectAnswer={showCorrectAnswer}
          isNotEmptyValue={isNotEmptyValue}
        />
      );
    case TYPE_EQUATION.QUADRATIC:
      return (
        <FillTheBlankQuadratic
          data={data}
          factor={{ a, b, c }}
          graphId={graphId}
          isCheckActive={isCheckActive}
          valueInputXa={valueInputXa}
          valueInputXb={valueInputXb}
          valueInputXc={valueInputXc}
          valueInputYa={valueInputYa}
          valueInputYb={valueInputYb}
          valueInputYc={valueInputYc}
          setValueInputXa={setValueInputXa}
          setValueInputYa={setValueInputYa}
          setValueInputXb={setValueInputXb}
          setValueInputYb={setValueInputYb}
          setValueInputXc={setValueInputXc}
          setValueInputYc={setValueInputYc}
          isShowGraph={isShowGraph}
          isReadOnly={isReadOnly}
          onPlaying={onPlaying}
          showCorrectAnswer={showCorrectAnswer}
          isNotEmptyValue={isNotEmptyValue}
        />
      );

    default:
      return null;
  }
};

export default forwardRef(FillTheBlankGraph);
