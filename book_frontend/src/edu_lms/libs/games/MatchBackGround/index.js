import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import reactImageSize from "react-image-size";
import { dispatch } from "edu_lms/redux/configureStore";
import { fabric } from "fabric";
import _ from "lodash";
import { shallowEqual } from "react-redux";
import styled from "styled-components";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import {
  URL_IMAGE_QUESTION,
  ANSWER_STATUS,
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  RESULT,
  TYPE_GAME_MAT_BG,
} from "../../../constants/type";
import { getPosition } from "./selection";

const MatchBackGround = (
  { data, onComplete, isReadOnly, onPlaying, showCorrectAnswer },
  ref
) => {
  const [backgroundList, setStateBackgroundList] = useState(
    data.background_list.backgroundList[0]?.value[0]?.touch
  );
  const [dataLine, setStateDataLine] = useState([]);
  const [arrayDataLine, setStateArrayDataLine] = useState(
    data?.arrayDataLine ? data?.arrayDataLine : []
  );
  const [constScale, setStateConstScale] = useState(1);
  const [prevNumberPoint, setStatePreNumberPoint] = useState(0);
  const [numberPoint, setStateNumberPoint] = useState(1);
  const [listResult, setStateListResult] = useState([]);
  const [canvas, setStateCanvas] = useState("");
  const [checkCreateLineResult, setStateCheckCreateLineResult] = useState([]);
  const [firstClickPoint, setStateFirstClickPoint] = useState(0);
  const [inputData, setInputData] = useState({
    ...data.game_config,
    results: { data: [], status: null },
  });
  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();
  const [widthForm, setWidthForm] = useState(null);
  const div = useCallback((node) => {
    if (node !== null) {
      setWidthForm(node.getBoundingClientRect().width);
    }
  }, []);
  const widthImageConst =
    data.background_list.backgroundList[0]?.value[0]?.image_width;
  let checkWidth = ANSWER_STATUS.DEFAULT;
  widthForm > TYPE_GAME_MAT_BG.widthLaptop &&
    (checkWidth = ANSWER_STATUS.CORRECT);
  function removeItem(arr, item) {
    return arr.filter((f) => f !== item);
  }
  const canvasId = `canvas_${Math.random()}`;

  useEffect(() => {
    async function setWidthHeightImage() {
      const { width, height } = await reactImageSize(
        `${URL_IMAGE_QUESTION}${data.background_list.backgroundList[0].value[0].path}`
      );
      let setWidth = String(1000);
      let setHeight = String(height * 1000) / width;

      if (height > TYPE_GAME_MAT_BG.heightImage) {
        let heightWindow =
          window.innerHeight - 150 > 0
            ? window.innerHeight - TYPE_GAME_MAT_BG.defaultHeight
            : TYPE_GAME_MAT_BG.heightImage;
        let widthImage = String(Math.round((width * heightWindow) / height));
        if (widthImage < TYPE_GAME_MAT_BG.widthLaptop) {
          setWidth = String(widthImage);
          setHeight = String(heightWindow);
        }
      } else if (width < TYPE_GAME_MAT_BG.widthLaptop) {
        setWidth = String(width);
        setHeight = String(height);
      }
      setStateWidthImage(setWidth);
      setStateHeightImage(setHeight);
    }
    setWidthHeightImage();
    setStateConstScale(widthImage / widthImageConst);

    const canvas = new fabric.Canvas(canvasId, {
      width: parseInt(widthImage),
      height: parseInt(heightImage),
    });
    setStateCanvas(canvas);
    backgroundList.forEach((item) => {
      let touchVector = JSON.parse(item.touch_vector);
      const dataObject = touchVector.map((vector) => {
        return {
          ...vector,
          x: vector.x * constScale,
          y: vector.y * constScale,
        };
      });
      const polygon = new fabric.Polygon(dataObject, {
        strokeWidth: 1,
        hasBorders: true,
        stroke: !isReadOnly && (!item.color ? "transparent" : item.color),
        fill: "transparent",
        selectable: false,
        hoverCursor: "pointer",
        id: item.name.replace("object-", ""),
      });

      canvas.add(polygon);
      canvas.sendToBack(polygon);
    });

    canvas.renderAll();

    if (data?.historyAnswer) {
      data?.historyAnswer.forEach((line, index) => {
        const dataAnswer = line?.dataLine.map((answer) => {
          return answer * constScale;
        });
        const create = new fabric.Line(dataAnswer, {
          stroke: "green",
          strokeWidth: 2.5,
          opacity: 0.6,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          hoverCursor: "default",
          id: line.index,
        });
        canvas.add(create);
        canvas.sendToBack(create);
      });
    }

    if (arrayDataLine.length > 0 && !data?.historyAnswer) {
      arrayDataLine.map((line) => {
        const createLine = new fabric.Line(line.data, {
          stroke: line.color && showCorrectAnswer ? line.color : "black",
          strokeWidth: 2.5,
          opacity: 0.6,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          hoverCursor: "default",
          id: line.index,
        });
        canvas.add(createLine);
        canvas.sendToBack(createLine);
      });
    }

    if (dataLine.length === TYPE_GAME_MAT_BG.thePoint) {
      setStateArrayDataLine((line) => [
        ...line,
        {
          data: dataLine,
          index: firstClickPoint + "_" + prevNumberPoint,
          color: "black",
        },
      ]);
      setStateCheckCreateLineResult((oldArray) => [
        ...checkCreateLineResult,
        ...oldArray,
        { data: dataLine, index: firstClickPoint + "_" + prevNumberPoint },
      ]);
      setStateDataLine([]);
      const dataBackGroundList = backgroundList.map((item) => {
        item.color = "transparent";
        return { ...item };
      });
      setStateBackgroundList(dataBackGroundList);
    }

    let listResultCheck = listResult.slice(0, listResult.length - 1);
    let currentClick = listResult.slice(-1).toString();
    let arrayRevertCurrentClick = currentClick.split("_");
    let revertCurrentClick =
      arrayRevertCurrentClick[1] + "_" + arrayRevertCurrentClick[0];

    if (
      listResultCheck.includes(currentClick) ||
      listResultCheck.includes(revertCurrentClick)
    ) {
      let allLine = canvas.getObjects("line");
      allLine.forEach((item) => {
        if (item.id === currentClick || item.id === revertCurrentClick) {
          const dataArrayDataLine = arrayDataLine.filter(
            (line) => line.index !== item.id
          );
          setStateArrayDataLine(dataArrayDataLine);
          const dataCreateLine = checkCreateLineResult.filter(
            (line) => line.index !== item.id
          );
          setStateCheckCreateLineResult(dataCreateLine);
          canvas.remove(item);
          const dataListResult = removeItem(listResult, item.id);
          let revertItem = item.id.split("_");
          const dataRevertListResult = removeItem(
            dataListResult,
            revertItem[1] + "_" + revertItem[0]
          );
          setStateListResult(dataRevertListResult);
        }
      });
    }

    canvas.renderAll();

    canvas.on("mouse:over", (e) => onMouseOver(e, canvas));

    canvas.on("mouse:out", (e) => onMouseOut(e, canvas));

    canvas.on("mouse:down", (e) => onMouseDown(e));
  }, [backgroundList, dataLine, widthImage, heightImage]);

  const onCheckAnswer = () => {
    let dataLine = canvas.getObjects("line");
    dataLine.forEach((item) => {
      canvas.remove(item);
    });

    canvas.renderAll();
    let isStatus = true;

    let answerCorrect = data.game_config.answer_correct.split(",");

    const newCheckCreateLine = _.uniqBy(arrayDataLine, "index");
    if (newCheckCreateLine.length < answerCorrect.length) {
      isStatus = false;
    }
    let numberAnswerCorrect = 0;
    const newAnswer = newCheckCreateLine.map((result) => {
      let splitResult = result.index.split("_");
      let reverseResult = splitResult[1] + "_" + splitResult[0];
      let color = "red";
      if (
        answerCorrect.includes(result.index) ||
        answerCorrect.includes(reverseResult)
      ) {
        color = "green";
        numberAnswerCorrect++;
      }
      let line = new fabric.Line(result.data, {
        stroke: showCorrectAnswer ? color : "black",
        strokeWidth: 2.5,
        opacity: 0.6,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: "default",
      });
      canvas.add(line);
      canvas.sendToBack(line);
      return color;
    });

    if (
      numberAnswerCorrect < answerCorrect.length ||
      newAnswer.length > answerCorrect.length
    ) {
      isStatus = false;
    }
    const arrayAnswer = _.compact(newAnswer);
    arrayAnswer.forEach((item, index) => {
      arrayDataLine?.[index]?.color && (arrayDataLine[index].color = item);
    });
    canvas.renderAll();
    let input = _.cloneDeep(inputData);
    input.results.status = isStatus
      ? ANSWER_STATUS.CORRECT
      : ANSWER_STATUS.DEFAULT;
    setInputData(input);
    const audioStatus = isStatus ? AUDIO_SUCCESS : AUDIO_ERROR;
    showCorrectAnswer && dispatch(onDispatchSrcAudio(audioStatus));
    data.dataAnswerLine = newCheckCreateLine;
    onComplete({
      isCorrect: isStatus ? RESULT._TRUE : RESULT._FALSE,
      arrayDataLine: arrayDataLine,
      checkCreateLineResult: newCheckCreateLine,
    });
  };
  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onCheckAnswer();
    },
  }));

  const onMouseOver = (e, canvas) => {
    if (e.target) {
      e.target.set("fill", "rgba(102, 217, 255, 0.2)");
      canvas.renderAll();
    }
  };
  const onMouseOut = (e, canvas) => {
    if (e.target) {
      e.target.set("fill", "transparent");
      canvas.renderAll();
    }
  };
  const onMouseDown = (e) => {
    if (e.target && e.button === 1) {
      let index = e.target.get("id");
      setStatePreNumberPoint(index);
      setStateNumberPoint(numberPoint + 1);
      let checkCreateLine = true;
      if (numberPoint % 2 === 0) {
        let input = _.cloneDeep(inputData);
        let matching = [prevNumberPoint, index].sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        if (input.results.data.some((_item) => shallowEqual(_item, matching))) {
          if (_.isArray(input.results)) {
            let indexRemove = input.results?.indexOf(matching);

            input.results.data.splice(indexRemove, 1);
          }
        } else {
          input.results.data.push(matching);
        }
        setInputData(input);
        let ignoreLine = data.game_config.ignore_line.split("|");
        if (ignoreLine) {
          ignoreLine.forEach((line) => {
            let arrayLine = line.split(",");
            if (prevNumberPoint) {
              if (
                _.includes(arrayLine, prevNumberPoint.toString()) &&
                _.includes(arrayLine, index.toString())
              ) {
                checkCreateLine = false;
                setStateDataLine([]);
                return true;
              }
            }
          });
        }
        if (prevNumberPoint !== index && checkCreateLine) {
          onPlaying(false);
          listResult.push(prevNumberPoint + "_" + index);
          setStateListResult(listResult);
        }
      }

      const dataBackGroundList = backgroundList.map((item) => {
        let itemId = item.name.replace("object-", "");
        if (!isReadOnly) {
          if (
            (itemId === prevNumberPoint && numberPoint % 2 === 0) ||
            itemId === index
          ) {
            item.color = "black";
          } else {
            item.color = "transparent";
          }
        }
        return { ...item };
      });
      setStateBackgroundList(dataBackGroundList);

      if (dataBackGroundList[index - 1]?.touch_vector) {
        let positionLine = JSON.parse(
          dataBackGroundList[index - 1].touch_vector
        );

        if (checkCreateLine) {
          let getDataPosition = getPosition(
            index,
            data,
            positionLine,
            checkWidth
          );
          let positionX = getDataPosition[0];
          let positionY = getDataPosition[1];
          dataLine.push(positionX * constScale, positionY * constScale);
        }

        if (dataLine.length < TYPE_GAME_MAT_BG.thePoint && checkCreateLine) {
          setStateFirstClickPoint(index);
          setStateDataLine(dataLine);
        }
      }
    }
  };

  useEffect(() => {
    if (canvas) {
      const dataCanvas = canvas.getObjects("line");
      dataCanvas.forEach((item) => {
        canvas.remove(item);
      });
      canvas.renderAll();
      const dataBackGroundList =
        data.background_list.backgroundList[0].value[0].touch.map((item) => {
          item.color = "transparent";
          return { ...item };
        });
      setStateBackgroundList(dataBackGroundList);
      setStateDataLine([]);
      setStateArrayDataLine(data?.dataAnswerLine ? data?.dataAnswerLine : []);
      setStateListResult([]);
    }
  }, [data]);

  return (
    <div ref={div}>
      <WrapperMat>
        <MatchBackGroundContainerWrapper
          checkWidth={checkWidth}
          isReadOnly={isReadOnly}
          widthForm={widthForm}
        >
          <StyledImage
            width={`${widthImage}px`}
            height={`${heightImage}px`}
            src={`${URL_IMAGE_QUESTION}${data.background_list.backgroundList[0].value[0].path}`}
            alt=""
          />
          <canvas id={canvasId} />
        </MatchBackGroundContainerWrapper>
      </WrapperMat>
    </div>
  );
};

export default forwardRef(MatchBackGround);

const StyledImage = styled.img`
  z-index: 1;
`;

const WrapperMat = styled.div`
  display: flex;
  justify-content: center;
`;

const MatchBackGroundContainerWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: fit-content;
  height: 100%;
  .answer-wrapper,
  .question-wrapper {
    z-index: 12;
    position: relative;
    .box-item {
      &:hover {
        background-color: rgba(102, 217, 255, 0.2) !important;
      }
    }
  }
  .canvas-container {
    display: block !important;
    position: absolute !important;
    top: 0;
    left: 0;
    width: ${(props) =>
      props.isReadOnly ? `${props.widthForm}px` : ""} !important;
    z-index: 1;
    pointer-events: ${(props) => (props.isReadOnly ? "none" : "")};
  }
  .upper-canvas {
    overflow: hidden !important;
  }
  .upper-canvas,
  .lower-canvas {
    width: ${(props) =>
      props.isReadOnly ? `${props.widthForm}px` : ""} !important;
  }
`;
