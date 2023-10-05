import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { MOUSE_DRAG, TOUCHEND } from "../../Graph/constants";
import {
  Board,
  coorInteger,
  LINE,
  POINT,
  COLOR_REGION,
  REGION,
  SMALL_COORDINATES,
} from "edu_lms/components/Game/Graph/constant";
import { EQUATION } from "edu_lms/components/Game/Graph/RegionGraph/selection";
import { ANSWER_STATUS } from "edu_lms/constants/type";
import {
  coordinatesRegion,
  isCovariate,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";
import {
  showRegionResults,
  colorAnswerRegion,
  convertValueDataForm,
} from "../constant";

export default function Graph({
  isReadOnly,
  data,
  dataActive,
  coorPointA,
  coorPointB,
  showCorrectAnswer,
  onPlaying,
  setShowAnswers,
  setIndexResetForm,
  valueDataForm,
  answerRegion,
  setAnswerRegion,
  isDisabled,
  checkInput,
  isResetColorRegion,
  setIsResetColorRegion,
}) {
  const graphId = `jxgbox${Math.random()}`;
  const gameRef = useRef(null);
  const { dataInput, isValueForm } = convertValueDataForm(valueDataForm, data);

  useEffect(() => {
    const board = Board(
      dataActive,
      {
        control: false,
        drag: true,
      },
      graphId
    );
    let coordinatesQ1 = coorPointA;
    let coordinatesQ2 = coorPointB;
    const isAnswerRegion = !_.isEmpty(answerRegion);

    dataActive.coefficient.forEach((item, index) => {
      const { colorPointQ1, colorPointQ2, colorLines } = colorAnswerRegion(
        answerRegion[index],
        isAnswerRegion,
        showCorrectAnswer,
        isResetColorRegion
      );
      const pointQ1 = board.create(POINT, coorPointA[index], {
        name: "",
        strokeColor: colorPointQ1,
        color: colorPointQ1,
      });
      const pointQ2 = board.create(POINT, coorPointB[index], {
        name: "",
        strokeColor: colorPointQ2,
        color: colorPointQ2,
      });
      const line = board.create(LINE, [pointQ1, pointQ2], {
        withLines: false,
        withLabel: true,
        name: `${
          dataActive?.coefficient?.length !== EQUATION ? `d${index + 1}` : "d"
        }`,
        label: { offset: [0, -3] },
        strokeColor: colorLines,
      });
      pointQ1.isDraggable = !isReadOnly;
      pointQ2.isDraggable = !isReadOnly;
      line.isDraggable = false;
      pointQ1.on(MOUSE_DRAG, () => {
        pointQ1.moveTo(coorInteger(pointQ1));
        coordinatesQ1[index] = coorInteger(pointQ1);
        gameRef.current = index;
      });
      pointQ2.on(MOUSE_DRAG, () => {
        pointQ2.moveTo(coorInteger(pointQ2));
        coordinatesQ2[index] = coorInteger(pointQ2);
        gameRef.current = index;
      });
      board.on(TOUCHEND, () => {
        _.debounce(
          () => {
            setAnswerRegion([]);
          },
          4,
          1000,
          { leading: false }
        );
        onPlaying(false);
        setShowAnswers(false);
        setIsResetColorRegion(false);
        setIndexResetForm(gameRef.current);
      });

      //hiển thị miền nghiệm người dùng nhập

      if (
        dataInput.length !== ANSWER_STATUS.DEFAULT &&
        !dataInput[index]?.includes("") &&
        !isValueForm
      ) {
        const answerResult = answerRegion.map((item) => {
          if (_.includes(item, false)) {
            return false;
          }
          return true;
        });
        showRegionResults(
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
        );
      }
    });
    //Màn show đáp án
    if (data?.showResult) {
      const board = Board(
        dataActive,
        {
          control: false,
          drag: true,
        },
        graphId
      );
      const points = [
        Math.abs(dataActive?.negative_coor_x),
        Math.abs(dataActive?.negative_coor_y),
        dataActive?.positive_coor_x,
        dataActive?.positive_coor_y,
      ];
      const maxCoordinates = _.max(points);
      dataActive.coefficient.forEach((item, index) => {
        const getCoorPointResult = data.dataResult[index];
        const pointQ1 = board.create(POINT, getCoorPointResult.x, {
          name: "",
          strokeColor: "green",
          color: "green",
        });
        const pointQ2 = board.create(POINT, getCoorPointResult.y, {
          name: "",
          strokeColor: "green",
          color: "green",
        });
        const line = board.create(LINE, [pointQ1, pointQ2], {
          strokeColor: "green",
          withLines: false,
          withLabel: true,
          name: `${
            dataActive?.coefficient?.length !== EQUATION ? `d${index + 1}` : "d"
          }`,
          label: { offset: [0, -3] },
        });
        pointQ1.isDraggable = false;
        pointQ2.isDraggable = false;
        line.isDraggable = false;

        const dataCoefficient = dataActive?.coefficient[index];
        const coefficientResult = {
          a: dataCoefficient?.coefficient_a,
          b: dataCoefficient?.coefficient_b,
          c: dataCoefficient?.coefficient_c,
          negativeX: -maxCoordinates - 10,
          negativeY: -maxCoordinates - 10,
          positiveX: maxCoordinates + 10,
          positiveY: maxCoordinates + 10,
        };
        let drawRegion = coordinatesRegion(coefficientResult);
        const covariate = isCovariate(dataCoefficient);
        const comb = board.create("comb", drawRegion, {
          curve: {
            strokeColor: COLOR_REGION[index],
            width: REGION.width,
            angle: covariate ? REGION.angleLeft : REGION.angleRight,
            frequency:
              dataActive?.positive_coor_y > SMALL_COORDINATES
                ? REGION.frequency
                : REGION.lowFrequency,
          },
        });
        comb.highlight = false;
      });
    }
  }, [
    data.showResult,
    valueDataForm,
    coorPointA,
    coorPointB,
    answerRegion,
    checkInput,
    isResetColorRegion,
  ]);

  return (
    <div
      className={
        data?.showResult || isReadOnly
          ? "col-12 col-lg-12 col-md-12"
          : "col-lg-5 col-md-5"
      }
    >
      <div className="position-relative board-style justify-content-center">
        <div id={graphId} className="graph" />
        {(isReadOnly || isDisabled) && (
          <div className="position-absolute w-100 h-100 overlay" />
        )}
      </div>
    </div>
  );
}
