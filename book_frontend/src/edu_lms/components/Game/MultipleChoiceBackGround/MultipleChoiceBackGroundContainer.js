import React, { useState, useEffect, Fragment } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import reactImageSize from "react-image-size";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { onFormatDataGameConfig } from "./selection";
import FooterMultipleChoiceBackGroundComponent from "./components/FooterComponent";
import { postHistoryGame } from "../../../services/readingBook";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";

import {
  TYPE_ENGLISH,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import AudioComponent from "../../AudioComponent";
import {
  AlertDefault,
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
} from "../selection";

const MultipleChoiceBackGroundContainer = ({
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
  const [constScale, setStateConstScale] = useState(1);
  const [disabledBoxItem, setStateDisabledBoxItem] = useState(false);
  const [backgroundImage] = useState(
    data.background_list.backgroundList[0].value[0].path
  );
  const [typeGame] = useState(data.game_config.type_game);
  const [checkType] = useState(data.game_config.check_type);
  const [fontSizeIcon] = useState(
    data.game_config.font_size_icon !== undefined
      ? data.game_config.font_size_icon
      : "30px"
  );
  const [listAudio, setStateListAudio] = useState([]);
  const [listCheckType, setStateListCheckType] = useState();
  const [listPositionClick, setStateListPositionClick] = useState([]);
  const [answerCorrect] = useState(data.game_config.answer_correct);

  const [widthImageConst] = useState(
    data.background_list.backgroundList[0].value[0].image_width
  );

  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();
  const [inputData, setInputData] = useState({});
  const [countCorrect, setCountCorrect] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

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

    let listArrayCheckType = [];
    backgroundList.map((item) => {
      if (item?.touch_vector !== undefined) {
        let touchVector = JSON.parse(item?.touch_vector);
        const dataObject = touchVector.map((vector) => {
          return {
            ...vector,
            x: vector.x * constScale,
            y: vector.y * constScale,
          };
        });
        const polygon = new fabric.Polygon(dataObject, {
          strokeWidth: 1.5,
          hasBorders: true,
          selectionRadius: 20,
          stroke: item.color === undefined ? "transparent" : item.color,
          fill: "transparent",
          selectable: false,
          hoverCursor: "pointer",
          id: item.name.replace("object-", ""),
        });
        canvas.add(polygon);
        if (checkType === "v") {
          if (listPositionClick.includes(item.name.replace("object-", ""))) {
            listArrayCheckType.push({
              left:
                (touchVector[3].x -
                  15 +
                  (touchVector[2].x - touchVector[3].x) / 2) *
                constScale,
              top: (touchVector[2].y - 30) * constScale,
              color: "black",
              id: item.name.replace("object-", ""),
            });
          }
        }
      }
      canvas.renderAll();
    });

    setStateListCheckType(listArrayCheckType);

    canvas.on("mouse:over", (e) => onMouseOver(e, canvas));

    canvas.on("mouse:out", (e) => onMouseOut(e, canvas));

    canvas.on("mouse:down", (e) => onMouseDown(e, canvas));

    return () => {
      if (listPositionClick.length == 0) {
        onDispatchDataAlert(AlertDefault);
      }
    };
  }, [backgroundList, widthImage, heightImage]);

  const onCheckAnswer = () => {
    setShowAlert(true);
    onDispatchIsClickSubmitAnswer(true);
    let isStatus = true;

    if (checkType === "border") {
      let answerCorrect = data.game_config.answer_correct.split(",");
      let answerChoose = backgroundList.filter(
        (answer) => answer.color === "black"
      );
      let dataAnswerChoose = answerChoose.map((answer) =>
        answer.name.replace("object-", "")
      );
      if (JSON.stringify(answerCorrect) !== JSON.stringify(dataAnswerChoose)) {
        isStatus = false;
      }

      if (dataAnswerChoose.length != answerCorrect.length) {
        isStatus = false;
      }
      let count = 0;
      let chooseAnswer = 0;
      const dataBackGroundList = backgroundList.map((item) => {
        if (item.color === "black") {
          chooseAnswer++;
          if (answerCorrect.includes(item.name.replace("object-", ""))) {
            item.color = "green";
            count++;
          } else {
            item.color = "red";
          }
        }
        return { ...item };
      });
      setStateBackgroundList(dataBackGroundList);
      setTotalQuestion(answerCorrect.length);
      setCountCorrect(count);
    }

    if (checkType === "v") {
      let arrayAnswerCorrect = answerCorrect.split(",");
      if (listCheckType.length !== arrayAnswerCorrect.length) {
        isStatus = false;
      }
      let count = 0;
      let dataListCheckType = listCheckType.map((check) => {
        if (arrayAnswerCorrect.includes(check.id)) {
          check.color = "green";
          count++;
        } else {
          isStatus = false;
          check.color = "red";
        }
        return { ...check };
      });
      setCountCorrect(count);
      setTotalQuestion(arrayAnswerCorrect.length);
      setStateListCheckType(dataListCheckType);
    }

    setInputData({
      ...inputData,
      results: { ...inputData.results, status: isStatus ? 1 : 0 },
    });

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
    }

    setStateDisabledBoxItem(true);
  };

  const onResetData = () => {
    setShowAlert(false);
    setCountCorrect(0);
    onDispatchIsClickRefresh(true);
    const dataBackGroundList = backgroundList.map((item) => ({
      ...item,
      color: "transparent",
    }));
    setStateBackgroundList(dataBackGroundList);
    onDispatchDataAlert(AlertDefault);
    setStateDisabledBoxItem(false);
    setStateListPositionClick([]);
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
  function removeItem(arr, item) {
    return arr.filter((f) => f !== item);
  }

  const onMouseDown = (e, canvas) => {
    if (e.target && e.button === 1) {
      let index = e.target.get("id");
      if (listPositionClick.includes(index.toString())) {
        const listClick = removeItem(listPositionClick, index.toString());
        setStateListPositionClick(listClick);
      }
      listPositionClick.push(index);
      setInputData({
        ...inputData,
        results: { ...inputData.results, data: listPositionClick },
      });
      if (typeGame === "mtc") {
        const dataBackGroundList = backgroundList.map((item) => {
          item.name.replace("object-", "") === index && checkType === "border"
            ? (item.color = "black")
            : (item.color = "transparent");
          return { ...item };
        });
        setStateBackgroundList(dataBackGroundList);
      } else {
        const dataBackGroundList = backgroundList.map((item) => ({
          ...item,
          color:
            item.name.replace("object-", "") === index && checkType === "border"
              ? item.color === "black"
                ? "transparent"
                : "black"
              : item.color,
        }));
        setStateBackgroundList(dataBackGroundList);
      }
      canvas.renderAll();
    }
  };

  return (
    <Fragment>
      <PlayArea>
        <MultipleChoiceBackGroundContainerWrapper>
          <StyledImage
            width={`${widthImage}px`}
            height={`${heightImage}px`}
            src={`${URL_IMAGE_QUESTION}${backgroundImage}`}
            alt=""
          />
          <canvas id="match_background" />

          {listCheckType !== undefined &&
            listCheckType.map((check, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    top: check.top,
                    left: check.left,
                    color: check.color,
                  }}
                >
                  <IStyle fontSizeIcon={fontSizeIcon}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </IStyle>
                </div>
              );
            })}

          {listAudio.map((audio, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  zIndex: 11,
                  top: audio.top,
                  left: audio.left,
                }}
              >
                <AudioComponent key={index} src={`${URL_AUDIO}${audio.url}`} />
              </div>
            );
          })}
        </MultipleChoiceBackGroundContainerWrapper>
      </PlayArea>
      <FooterMultipleChoiceBackGroundComponent
        disabledBoxItem={disabledBoxItem}
        alert={alert}
        languageBook={languageBook}
        onCheckAnswer={onCheckAnswer}
        onResetData={onResetData}
        handleDispatchDataAlert={handleDispatchDataAlert}
        countCorrect={countCorrect}
        totalQuestion={totalQuestion}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        backgroundList={backgroundList}
        listCheckType={listCheckType}
      />
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
)(MultipleChoiceBackGroundContainer);

const StyledImage = styled.img`
  zindex: 1;
`;

const IStyle = styled.i`
  font-size: ${(props) => props.fontSizeIcon};
`;

const PlayArea = styled.div`
  display: flex;
  justify-content: center;
`;

const MultipleChoiceBackGroundContainerWrapper = styled.div`
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
