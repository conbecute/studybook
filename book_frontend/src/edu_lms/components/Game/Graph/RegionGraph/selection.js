import JXG from "jsxgraph";
import _ from "lodash";
import { ANSWER_STATUS } from "edu_lms/constants/type";

export function formatQuestion(data) {
  return data.map((item) => ({
    ...item,
    result: 0,
    markConfig: item?.markGame,
  }));
}

export const ID_BOARD = "jxgbox";
export const DISEQUATIONS = "Biểu diễn miền nghiệm của bất phương trình:";
export const SYSTEM_OF_INEQUALITIES =
  "Biểu diễn miền nghiệm của hệ bất phương trình:";
export const DRAW_LINE = "- Vẽ đường thẳng d";
export const DISEQUATIONS_REGION =
  "- Nhập tọa độ điểm M bất kì thuộc miền nghiệm của bất phương trình (1) (không thuộc đường thẳng d";
export const ANSWERS_TITLE_QUADRATIC = "3 điểm thuộc đồ thị hàm số là:";
export const WARNING_DISEQUATIONS = "Bạn chưa nhập đủ tọa độ";
export const EQUATION = 1;
export const RESULT_PLAIN =
  "Miền nghiệm của bất phương trình là nửa mặt phẳng không bị gạch chứa điểm M, kể cả đường thẳng d.";
export const RESULT_EQUATIONS =
  "Miền nghiệm của bất phương trình là nửa mặt phẳng không bị gạch chứa điểm M, không kể đường thẳng d.";
export const RESULT_DISEQUATIONS =
  "Miền nghiệm của hệ bất phương trình đã cho là phần không bị gạch.";
export const DEFAULT_POINT_A = [1, 0];
export const DEFAULT_POINT_B = [0, 1];

// type
export const POINT = "point";
export const LINE = "line";
export const PARABOL = "functiongraph";

// type equation
export const FIRST_DEGREE_EQUATION = 1;
export const QUADRATIC_EQUATION = 2;
export const CUBIC_EQUATION = 3;
export const QUATERNARY_EQUATION = 4;

// event
export const MOUSE_DRAG = "mousedrag";

// chuyển sang tọa độ số nguyên
export const coorInteger = (point) => {
  const dx = Math.round(point.X());
  const dy = Math.round(point.Y());
  return [dx, dy];
};

//conver number (1), example: y = 1x + 2 ==> y = x + 2
export const convertNumber = (number) => {
  if (number === 1 || number === 0) return "";
  if (number === -1) return "- ";
  return number;
};

export const convertSigns = (numberB, numberA) => {
  if (numberB === 1) return numberA !== 0 ? "+" : "";
  if (numberB === -1) return "-";
  if (numberB === 0) return "";
  if (numberB > 1 && numberA !== 0) return `+${numberB}`;
  return numberB;
};

// create board
export const Board = (game_config, { control, drag }, boardId = ID_BOARD) =>
  JXG.JSXGraph.initBoard(boardId, {
    boundingbox: [
      game_config.negative_coor_x || -5,
      game_config.positive_coor_y || 5,
      game_config.positive_coor_x || 5,
      game_config.negative_coor_y || -5,
    ],
    axis: true,
    shownavigation: control || false,
    showcopyright: false,
    drag: { enabled: drag || false },
    defaultAxes: {
      x: {
        name: "x",
        withLabel: true,
        label: {
          position: "rt",
          offset: [0, 10],
        },
      },
      y: {
        withLabel: true,
        name: "y",
        label: {
          position: "rt",
          offset: [10, 0],
        },
      },
    },
  });

export const coordinatesRegion = (data) => {
  const { a, b, c, negativeX, negativeY, positiveX, positiveY } = data;
  const coordinatesY = (c - a * negativeX) / b;
  const coordinatesX = (c - b * negativeY) / a;
  let coordinatesLeft = [negativeX, coordinatesY];
  let coordinatesRight = [-negativeX, coordinatesY];
  let points = [coordinatesLeft, coordinatesRight];

  if (b !== 0) {
    if (a === 0) {
      points = [coordinatesRight, coordinatesLeft];
    }
    if (a > 0 && b > 0) {
      points = [
        [coordinatesX, negativeY],
        [negativeX, coordinatesY],
      ];
    }
    if (a < 0 && b < 0) {
      points = [
        [negativeX, coordinatesY],
        [coordinatesX, negativeY],
      ];
    }
    if (a > 0 && b < 0) {
      points = [
        [coordinatesX, negativeY],
        [positiveX, (c - a * positiveY) / b],
      ];
    }
    if (a < 0 && b > 0) {
      points = [
        [negativeX, coordinatesY],
        [(c - b * positiveY) / a, positiveY],
      ];
    }
  } else {
    coordinatesLeft = [coordinatesX, negativeY];
    coordinatesRight = [coordinatesX, -negativeY];
    points = [coordinatesLeft, coordinatesRight];
  }

  return points;
};

export const isCovariate = (data) => {
  const { coefficient_a, coefficient_b, markGame } = data;
  const isGreater = markGame === ">" || _.includes(markGame, "ge");
  if (coefficient_b === 0 && coefficient_a < 0) {
    return isGreater;
  }
  if (coefficient_a === 0 && coefficient_b < 0) {
    return isGreater;
  }
  if (coefficient_a < 0 && coefficient_b > 0) {
    return isGreater;
  }
  return !isGreater;
};

export const configQuestion = (question) => {
  const BACK_SLASH = "\\";
  let dataQuestion = "";
  question[0].coefficient.forEach((item, index) => {
    const dataConvert = `${convertNumber(item.coefficient_a)}${
      item.coefficient_a !== 0 ? "x" : ""
    } ${convertSigns(item.coefficient_b, item.coefficient_a)} ${
      item.coefficient_b !== 0 ? "y" : ""
    } ${item.markGame} ${item.coefficient_c}`;
    if (question[0].coefficient.length > EQUATION) {
      if (index === 0) {
        dataQuestion = `\\begin{cases}${dataQuestion}${dataConvert}\\qquad &(${
          index + 1
        })`;
      }
      if (index !== 0) {
        dataQuestion = `${dataQuestion}${BACK_SLASH}${BACK_SLASH}${dataConvert}\\qquad &(${
          index + 1
        })${BACK_SLASH}`;
      }
      if (index === question[0].coefficient.length - EQUATION) {
        dataQuestion = `${dataQuestion}end{cases}`;
      }
    } else {
      dataQuestion = `\\begin{align} ${dataConvert} \\end{align}`;
    }
    dataQuestion = dataQuestion.replace(
      `${BACK_SLASH}${BACK_SLASH}${BACK_SLASH}`,
      `${BACK_SLASH}${BACK_SLASH}`
    );
  });
  return dataQuestion;
};

export const onCheckDataForm = (data, dataActive, checkData) => {
  const dataPoint = dataActive.coefficient;
  const dataConvert = Object.values(data).map((item) => {
    return item.trim();
  });

  if (_.includes(dataConvert, "") && !checkData) {
    return ANSWER_STATUS.WRONG;
  } else {
    const dataInput = _.chunk(dataConvert, 2);
    const checkResult = dataActive.coefficient.map((item, index) => {
      const valueInputX = dataInput[index][0];
      const valueInputY = dataInput[index][1];
      const a = dataPoint[index].coefficient_a;
      const b = dataPoint[index].coefficient_b;
      const c = dataPoint[index].coefficient_c;
      let mark = dataPoint[index].markGame;
      if (mark.includes("le")) {
        mark = "<";
      }
      if (mark.includes("ge")) {
        mark = ">";
      }
      if (!valueInputX || !valueInputY) {
        return false;
      }
      const answer = eval(`${a * valueInputX + b * valueInputY} ${mark} ${c}`);
      return answer;
    });
    return checkResult;
  }
};
export const checkResultRegion = (dataActive, getCoorPointA, getCoorPointB) => {
  const dataPoint = dataActive.coefficient;
  const checkAnswerRegion = dataActive.coefficient.map((item, index) => {
    let isCheckAnswer = [ANSWER_STATUS.WRONG, ANSWER_STATUS.WRONG];
    const coorPointQ1 = getCoorPointA[index];
    const coorPointQ2 = getCoorPointB[index];
    const xA = coorPointQ1[0];
    const yA = coorPointQ1[1];
    const xB = coorPointQ2[0];
    const yB = coorPointQ2[1];
    const a = dataPoint[index].coefficient_a;
    const b = dataPoint[index].coefficient_b;
    const c = dataPoint[index].coefficient_c;

    const checkPointA = c === a * xA + b * yA;
    checkPointA && (isCheckAnswer[0] = ANSWER_STATUS.CORRECT);
    const checkPointB = c === a * xB + b * yB;
    checkPointB && (isCheckAnswer[1] = ANSWER_STATUS.CORRECT);
    return [checkPointA, checkPointB];
  });
  return checkAnswerRegion;
};

export const getStrokeColor = (answerRegion, index) => {
  let color = "#0072B2";
  if (answerRegion[0]) {
    color = "green";
    if (answerRegion[index] === ANSWER_STATUS.WRONG) {
      color = "red";
    }
  }
  return color;
};
