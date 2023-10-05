import JXG from "jsxgraph";
import { RESULT } from "edu_lms/constants/type";

export const ID_BOARD = "jxgbox";
export const QUESTION = "Vẽ đồ thị hàm số sau: ";
export const ANSWERS_TITLE = "2 điểm thuộc đồ thị hàm số là:";
export const ANSWERS_TITLE_QUADRATIC = "3 điểm thuộc đồ thị hàm số là:";
export const DEFAULT_POINT_A = [3, 0];
export const DEFAULT_POINT_B = [0, 3];

// type
export const TYPE_GRAPH = {
  POINT: "point",
  LINE: "line",
  PARABOL: "functiongraph",
};

export const TYPE_EQUATION = {
  FIRST_DEGREE: 1,
  QUADRATIC: 2,
  CUBIC: 3,
  QUATERNARY: 4,
};

// event
export const MOUSE_DRAG = "mousedrag";
export const TOUCHEND = "touchend";

export const convertCoordinatesToInteger = (point) => {
  const dx = Math.round(point.X());
  const dy = Math.round(point.Y());
  return [dx, dy];
};

//conver number (1), example: y = 1x + 2 ==> y = x + 2
export const convertNumber = (number) => {
  if (number === 1) return "";
  if (number === -1) return "-";
  return number;
};

export const convertSigns = (number) => {
  if (number > 0) return `+ ${number}`;
  if (number < 0) return `- ${Math.abs(number)}`;
  return "";
};

export const checkCorrectGraphQuadratic = (
  isCorrect,
  pointUserFill,
  pointCorrect
) => {
  if (isCorrect === RESULT._TRUE) {
    return pointCorrect;
  }
  if (isCorrect === RESULT._FALSE && pointUserFill.length > 0) {
    return pointUserFill;
  }
  return pointCorrect;
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
    shownavigation: control || false, // disable navigation
    showcopyright: false, // disable title jsxgraph
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
