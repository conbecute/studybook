import JXG from "jsxgraph";

export const ID_BOARD = "jxgbox";
export const QUESTION = "Vẽ đồ thị hàm số sau: ";
export const ANSWERS_TITLE = "2 điểm thuộc đồ thị hàm số là:";
export const ANSWERS_TITLE_QUADRATIC = "3 điểm thuộc đồ thị hàm số là:";

export const DEFAULT_POINT_A = [1, 0];
export const DEFAULT_POINT_B = [0, 1];
export const DEFAULT_POINT_Q1 = [
  [2, 0],
  [1, 0],
  [-1, 0],
  [-2, 0],
  [-3, 0],
];
export const DEFAULT_POINT_Q2 = [
  [0, 2],
  [0, 1],
  [0, -1],
  [0, -2],
  [0, -3],
];
export const COLOR_REGION = [
  "#4cbc3c",
  "#0000FF",
  "#008080",
  "#f1a71d",
  "#8B8B00",
];

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

export function formatDataActivity(data) {
  const dataIcon = data.map((item) => {
    for (const key in item) {
      if (isNaN(Number(item[key]))) {
        item[key].icon_id = Number(item[key].icon_id);
        continue;
      }

      item[key] = Number(item[key]);
    }

    return { ...item, result: 0 };
  });

  return dataIcon;
}

export const convertSigns = (number) => {
  if (number > 0) return `+ ${number}`;
  if (number < 0) return `- ${Math.abs(number)}`;
  if (number === 0) return "";
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

export const SMALL_COORDINATES = 4;
export const REGION = {
  width: 999,
  angleLeft: 1.6,
  angleRight: 1.5,
  frequency: 0.4,
  lowFrequency: 0.2,
};
