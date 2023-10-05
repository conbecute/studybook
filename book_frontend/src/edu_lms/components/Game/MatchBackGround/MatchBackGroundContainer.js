import React, { useState, useEffect, Fragment } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import reactImageSize from "react-image-size";
import _ from "lodash";
import { connect, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import FooterComponent from "./components/FooterComponent";
import { postHistoryGame } from "../../../services/readingBook";
import AnswerComponent from "../AnswerComponent";
import {
  onFormatDataGameConfig,
  onGetBackgroundImage,
} from "../MultipleChoiceBackGround/selection";
import {
  AlertDefault,
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
  styleAlertGame,
} from "../selection";
import {
  TYPE_ENGLISH,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import AudioComponent from "../../AudioComponent";
import { getPosition } from "./selection";
import ButtonReset from "../DragDropShowAnswer/components/ButtonReset";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";
import { GAME_TYPE, CTA_POPUP_TYPE } from "edu_lms/constants/type";

const MatchBackGroundContainer = ({
  data,
  dataDefault,
  objectId,
  alert,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickRefresh,
  onDispatchIsClickSubmitAnswer,
}) => {
  const [backgroundList, setStateBackgroundList] = useState(
    data.background_list.backgroundList[0].value[0].touch
  );
  const [dataLine, setStateDataLine] = useState([]);
  const [arrayDataLine, setStateArrayDataLine] = useState([]);
  const [constScale, setStateConstScale] = useState(1);
  const [disabledBoxItem, setStateDisabledBoxItem] = useState(false);
  const [backgroundImage] = useState(
    data.background_list.backgroundList[0].value[0].path
  );
  const [listAudio, setStateListAudio] = useState([]);
  const [prevNumberPoint, setStatePreNumberPoint] = useState(0);
  const [numberPoint, setStateNumberPoint] = useState(1);
  const [listResult, setStateListResult] = useState([]);
  const [canvas, setStateCanvas] = useState("");
  const [checkCreateLineResult, setStateCheckCreateLineResult] = useState([]);
  const [firstClickPoint, setStateFirstClickPoint] = useState(0);
  const [inputData, setInputData] = useState({});
  const [widthImageConst] = useState(
    data.background_list.backgroundList[0].value[0].image_width
  );

  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();
  const [countCorrect, setCountCorrect] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showCheckAnswer, setShowCheckAnswer] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [totalChoose, setTotalChoose] = useState(0);

  function removeItem(arr, item) {
    return arr.filter((f) => f !== item);
  }

  useEffect(() => {
    setInputData({
      ...dataDefault.game_config,
      results: { data: [], status: null },
    });
  }, [dataDefault]);

  useEffect(() => {
    let dataListAudio = onFormatDataGameConfig(data, constScale);
    setStateListAudio(dataListAudio);

    async function setWidthHeghtImage() {
      const { width, height } = await reactImageSize(
        `${URL_IMAGE_QUESTION}${data.background_list.backgroundList[0].value[0].path}`
      );
      if (height > 600) {
        let heightWindow =
          window.innerHeight - 150 > 0 ? window.innerHeight - 150 : 600;
        let widthImage = String(Math.round((width * heightWindow) / height));
        if (widthImage > 1100) {
          setStateWidthImage(String(1000));
          setStateHeightImage(String(height * 1000) / width);
        } else {
          setStateWidthImage(String(widthImage));
          setStateHeightImage(String(heightWindow));
        }
      } else {
        if (width > 1100) {
          setStateWidthImage(String(1000));
          setStateHeightImage(String(height * 1000) / width);
        } else {
          setStateWidthImage(String(width));
          setStateHeightImage(String(height));
        }
      }
    }
    setWidthHeghtImage();
    setStateConstScale(widthImage / widthImageConst);

    const canvas = new fabric.Canvas("match_background", {
      width: parseInt(widthImage),
      height: parseInt(heightImage),
    });

    setStateCanvas(canvas);

    backgroundList.map((item) => {
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
        stroke: item.color === undefined ? "transparent" : item.color,
        fill: "transparent",
        selectable: false,
        hoverCursor: "pointer",
        id: item.name.replace("object-", ""),
      });

      canvas.add(polygon);
      canvas.sendToBack(polygon);
    });

    canvas.renderAll();

    if (arrayDataLine.length > 0) {
      arrayDataLine.map((line) => {
        const createLine = new fabric.Line(line.data, {
          stroke: "black",
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
    if (dataLine.length === 4) {
      setStateArrayDataLine((line) => [
        ...line,
        { data: dataLine, index: firstClickPoint + "_" + prevNumberPoint },
      ]);
      setStateCheckCreateLineResult((oldArray) => [
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

    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [backgroundList, dataLine, widthImage, heightImage]);

  const onCheckAnswer = () => {
    setShowCheckAnswer(false);
    setShowAlert(true);
    onDispatchIsClickSubmitAnswer(true);
    if (listResult.length === 0) {
      return;
    }
    const dataLine = canvas.getObjects("line");
    dataLine.forEach((item) => {
      canvas.remove(item);
    });

    canvas.renderAll();
    let isStatus = true;

    let answerCorrect = data.game_config.answer_correct.split(",");

    if (checkCreateLineResult.length < answerCorrect.length) {
      // isStatus = false;
    }
    let numberAnswerCorrect = 0;
    let totalLine = 0;
    checkCreateLineResult.map((result) => {
      totalLine++;
      let splitResult = result.index.split("_");
      let reverseResult = splitResult[1] + "_" + splitResult[0];
      if (
        !(
          answerCorrect.includes(result.index) ||
          answerCorrect.includes(reverseResult)
        )
      ) {
        const line = new fabric.Line(result.data, {
          stroke: "red",
          strokeWidth: 2.5,
          opacity: 0.6,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          hoverCursor: "default",
        });
        isStatus = false;
        canvas.add(line);
        canvas.sendToBack(line);
      } else {
        const line = new fabric.Line(result.data, {
          stroke: "green",
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
        numberAnswerCorrect++;
      }
    });

    if (numberAnswerCorrect < answerCorrect.length) {
      isStatus = false;
    }
    setTotalChoose(totalLine);
    setTotalQuestion(
      answerCorrect.length < totalLine ? totalLine : answerCorrect.length
    );
    setCountCorrect(numberAnswerCorrect);

    canvas.renderAll();
    let input = _.cloneDeep(inputData);
    input.results.status = isStatus ? 1 : 0;
    setInputData(input);
    let dataPost = {
      objectId: objectId,
      gameId: dataDefault.game_id,
      data: JSON.stringify(inputData),
    };
    postHistoryGame(dataPost);

    if (isStatus) {
      languageBook === TYPE_ENGLISH
        ? onDispatchDataAlert(AlertSuccessEnglish)
        : onDispatchDataAlert(AlertSuccess);
    } else {
      languageBook === TYPE_ENGLISH
        ? onDispatchDataAlert(AlertErrorEnglish)
        : onDispatchDataAlert(AlertError);
      setStateDisabledBoxItem(true);
    }
  };

  const onResetData = () => {
    setShowCheckAnswer(true);
    onDispatchIsClickRefresh(true);
    const dataLine = canvas.getObjects("line");
    dataLine.forEach((item) => {
      canvas.remove(item);
    });

    canvas.renderAll();
    const dataBackGroundList = backgroundList.map((item) => {
      item.color = "transparent";
      return { ...item };
    });
    setStateBackgroundList(dataBackGroundList);
    setStateArrayDataLine([]);
    onDispatchDataAlert(AlertDefault);
    setStateDisabledBoxItem(false);
    setStateCheckCreateLineResult([]);
    setStateListResult([]);
    setShowAlert(false);
  };

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

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
    if (!showCheckAnswer) {
      return;
    }
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
        if (ignoreLine !== undefined) {
          ignoreLine.forEach((line) => {
            let arrayLine = line.split(",");
            if (prevNumberPoint !== undefined) {
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
          listResult.push(prevNumberPoint + "_" + index);
          setStateListResult(listResult);
        }
      }

      const dataBackGroundList = backgroundList.map((item) => {
        let itemId = item.name.replace("object-", "");
        if (
          (itemId === prevNumberPoint && numberPoint % 2 === 0) ||
          itemId === index
        ) {
          item.color = "black";
        } else {
          item.color = "transparent";
        }
        return { ...item };
      });
      setStateBackgroundList(dataBackGroundList);

      if (dataBackGroundList[index - 1]?.touch_vector !== undefined) {
        let positionLine = JSON.parse(
          dataBackGroundList[index - 1].touch_vector
        );

        if (checkCreateLine) {
          let getDataPosition = getPosition(index, data, positionLine);
          let positionX = getDataPosition[0];
          let positionY = getDataPosition[1];
          dataLine.push(positionX * constScale, positionY * constScale);
        }

        if (dataLine.length < 4 && checkCreateLine) {
          setStateFirstClickPoint(index);
          setStateDataLine(dataLine);
        }
      }
    }
  };

  return (
    <Fragment>
      <WrapperMat>
        <MatchBackGroundContainerWrapper>
          {listAudio.map((audio, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  zIndex: 15,
                  top: audio.top,
                  left: audio.left,
                }}
              >
                <AudioComponent key={index} src={`${URL_AUDIO}${audio.url}`} />
              </div>
            );
          })}
          <StyledImage
            width={`${widthImage}px`}
            height={`${heightImage}px`}
            src={`${URL_IMAGE_QUESTION}${backgroundImage}`}
            alt=""
          />
          <canvas id="match_background" />
        </MatchBackGroundContainerWrapper>
        <WrapperButtonReset>
          <ButtonReset
            isDislabeled={false}
            languageBook={languageBook}
            onResetData={onResetData}
            className=""
          />
        </WrapperButtonReset>
      </WrapperMat>
      {showCheckAnswer && (
        <FooterComponent
          disabledBoxItem={disabledBoxItem}
          alert={alert}
          languageBook={languageBook}
          onCheckAnswer={onCheckAnswer}
          onResetData={onResetData}
          isDislabeledResult={!listResult.length > 0}
          handleDispatchDataAlert={handleDispatchDataAlert}
          totalQuestion={totalQuestion}
          countCorrect={countCorrect}
        />
      )}
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.oneGame}
          checkScreen={CTA_POPUP_TYPE.rangeMutipleGame}
          totalQuestion={data.game_config.answer_correct.split(",").length}
          totalAnswer={countCorrect}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          totalChoose={totalChoose}
        />
      </ShowAlert>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
      onDispatchIsClickRefresh,
      onDispatchIsClickSubmitAnswer,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchBackGroundContainer);

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

const StyledImage = styled.img`
  zindex: 1;
`;

const WrapperMat = styled.div`
  display: flex;
  justify-content: center;
`;

const WrapperButtonReset = styled.div`
  position: absolute;
  top: 25px;
  right: 0px;
  z-index: 11;
`;

const MatchBackGroundContainerWrapper = styled.div`
  position: relative;
  overflow: auto;
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
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    z-index: 11;
  }
`;
