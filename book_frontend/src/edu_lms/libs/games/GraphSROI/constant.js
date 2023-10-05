import _ from "lodash";
import {
  convertNumber,
  convertSigns,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";
import { ANSWER_STATUS } from "edu_lms/constants/type";
import {
  isCovariate,
  EQUATION,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";
import {
  REGION,
  COLOR_REGION,
  SMALL_COORDINATES,
} from "edu_lms/components/Game/Graph/constant";

export const coordinatesRegionGame = (data) => {
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
        [(c - b * positiveY) / a, positiveY],
        [negativeX, coordinatesY],
      ];
    }
  } else {
    coordinatesLeft = [coordinatesX, negativeY];
    coordinatesRight = [coordinatesX, -negativeY];
    points = [coordinatesLeft, coordinatesRight];
  }

  return points;
};

export const equationsGame = (data) => {
  const { coorPointA, coorPointB } = data;
  const y1 = coorPointA[1];
  const y2 = coorPointB[1];
  const x1 = coorPointA[0];
  const x2 = coorPointB[0];
  if (x1 === x2) {
    return { b: 0, a: 1, c: +x1 };
  }
  if (y1 === y2) {
    return { a: 0, b: 1, c: +y1 };
  }
  const a = (y2 - y1) / (x2 - x1);
  const c = y1 - a * x1;
  return { a: -a, b: 1, c: c };
};

export const formatText = (item) => {
  return `\\(${convertNumber(item.coefficient_a)}${
    item.coefficient_a !== 0 ? "x" : ""
  } ${convertSigns(item.coefficient_b, item.coefficient_a)} ${
    item.coefficient_b !== 0 ? "y" : ""
  } = ${item.coefficient_c}\\)`;
};

export const checkCoordinates = (data, dataInput) => {
  if (dataInput) {
    const { a, b, c } = data;
    const x = +dataInput[0];
    const y = +dataInput[1];
    return a * x + b * y === c;
  }
  return false;
};

export const showRegionResults = (
  dataInput,
  index,
  dataActive,
  coorPointA,
  coorPointB,
  answerResult,
  checkInput,
  showCorrectAnswer,
  isResetColorRegion,
  board
) => {
  const dataCoefficient = dataActive?.coefficient[index];
  // giá trị hệ số a, b, c khi người dùng điền sai
  const getCoorPoint = {
    coorPointA: coorPointA[index],
    coorPointB: coorPointB[index],
  };
  const coefficient = equationsGame(getCoorPoint);
  const checkCoefficient = checkCoordinates(coefficient, dataInput[index]);

  const data = {
    getCoorPoint,
    a: coefficient?.a,
    b: coefficient?.b,
    c: coefficient?.c,
    negativeX: dataActive?.negative_coor_x - 10,
    negativeY: dataActive?.negative_coor_y - 10,
    positiveX: dataActive?.positive_coor_x + 10,
    positiveY: dataActive?.positive_coor_y + 10,
  };
  //drawRegion: Vẽ đồ thị khi người dùng nhập sai
  let drawRegion = coordinatesRegionGame(data);
  const covariate = isCovariate(dataCoefficient);
  const dataPoint = dataActive.coefficient[index];
  let mark = dataPoint.markGame;

  if (mark.includes("le")) {
    mark = "<";
  }
  if (mark.includes("ge")) {
    mark = ">";
  }

  let checkResultForm = false;
  if (dataInput[index]) {
    checkResultForm = eval(
      `${
        coefficient.a * dataInput[index][0] +
        coefficient.b * dataInput[index][1]
      } ${mark} ${coefficient.c}`
    );
  }

  if (!checkCoefficient) {
    const isSetColor =
      showCorrectAnswer &&
      isResetColorRegion &&
      ((!answerResult[index] && !_.isEmpty(checkInput)) ||
        (!checkInput[index] && !_.isEmpty(checkInput)));
    const comb = board.create("comb", drawRegion, {
      highlight: false,
      curve: {
        strokeColor: isSetColor ? "red" : COLOR_REGION[index],
        width: REGION.width,
        angle:
          covariate === checkResultForm ? REGION.angleLeft : REGION.angleRight,
        frequency:
          dataActive?.positive_coor_y > SMALL_COORDINATES
            ? REGION.frequency
            : REGION.lowFrequency,
      },
    });
  }
};

export const resetValueForm = (valueDataForm, indexResetForm, dataActive) => {
  let resetIndex = 0;
  dataActive.coefficient.length !== EQUATION &&
    (resetIndex = indexResetForm + 1);
  const newValueForm = { ...valueDataForm };
  newValueForm[`x${resetIndex}`] = "";
  newValueForm[`y${resetIndex}`] = "";
  return newValueForm;
};

export const convertValueDataForm = (valueDataForm, data) => {
  const isValueForm = _.isEmpty(valueDataForm);
  let dataConvert = [];
  !isValueForm &&
    (dataConvert = Object.values(valueDataForm).map((item) => {
      return item.trim();
    }));
  if (isValueForm && data?.dataForm) {
    dataConvert = Object.values(data?.dataForm).map((item) => {
      return item.trim();
    });
  }
  const dataInput = _.chunk(dataConvert, 2);
  return { dataInput, isValueForm, dataConvert };
};

export const colorAnswerRegion = (
  colorAnswer,
  isAnswerRegion,
  showCorrectAnswer,
  isResetColorRegion
) => {
  const COLOR_REGION = {
    defaultPoint: "#d45f03",
    defaultLine: "#0172B2",
    answerCorrect: "green",
    answerWrong: "red",
  };
  let colorPointQ1 = COLOR_REGION.defaultPoint;
  let colorPointQ2 = COLOR_REGION.defaultPoint;
  let colorLines = COLOR_REGION.defaultLine;
  if (isAnswerRegion && showCorrectAnswer && isResetColorRegion) {
    colorLines = COLOR_REGION.answerCorrect;
    if (_.includes(colorAnswer, false)) {
      colorLines = COLOR_REGION.answerWrong;
    }
    colorAnswer[0]
      ? (colorPointQ1 = COLOR_REGION.answerCorrect)
      : (colorPointQ1 = COLOR_REGION.answerWrong);
    colorAnswer[1]
      ? (colorPointQ2 = COLOR_REGION.answerCorrect)
      : (colorPointQ2 = COLOR_REGION.answerWrong);
  }
  return { colorPointQ1, colorPointQ2, colorLines };
};
