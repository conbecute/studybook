import React, { useState, useEffect, Fragment } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import reactImageSize from "react-image-size";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { onFormatDataGameConfig } from "./selection";
import {
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import AudioComponent from "../../AudioComponent";
import { AlertDefault } from "../selection";
import ReactAudioPlayer from "react-audio-player";
import ButtonReset from "./components/ButtonReset";
import { onDispatchIsClickRefresh } from "../../../modules/General/actions";

const MultipleChoiceBackGroundTvContainer = ({
  data,
  alert,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickRefresh,
}) => {
  const [backgroundList, setStateBackgroundList] = useState(
    data.background_list.backgroundList[0].value[0].touch
  );
  const [listAnswer, setStateListAnswer] = useState(
    data.background_list.backgroundList[0].value[0].touch
  );
  const [constScale, setStateConstScale] = useState(1);
  const [backgroundImage] = useState(
    data.background_list.backgroundList[0].value[0].path
  );
  const [checkType] = useState(data.game_config.check_type);

  const [listAudio, setStateListAudio] = useState([]);
  const [listPositionClick, setStateListPositionClick] = useState([]);

  const [widthImageConst] = useState(
    data.background_list.backgroundList[0].value[0].image_width
  );

  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();

  const [srcAudio, setStateSrcAudio] = useState("");

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
          strokeWidth: 3,
          hasBorders: true,
          selectionRadius: 20,
          stroke: item.color === undefined ? "transparent" : item.color,
          fill: "transparent",
          selectable: false,
          strokeLineJoin: "round",
          hoverCursor: "pointer",
          id: item.name.replace("object-", ""),
        });
        canvas.add(polygon);
      }
      canvas.renderAll();
    });

    canvas.on("mouse:over", (e) => onMouseOver(e, canvas));

    canvas.on("mouse:out", (e) => onMouseOut(e, canvas));

    canvas.on("mouse:down", (e) => onMouseDown(e, canvas));

    return () => {
      if (listPositionClick.length == 0) {
        onDispatchDataAlert(AlertDefault);
      }
    };
  }, [backgroundList, widthImage, heightImage, listAnswer]);

  const onResetData = () => {
    onDispatchIsClickRefresh(true);
    const dataBackGroundList = backgroundList.map((item) => ({
      ...item,
      color: "transparent",
    }));
    const dataListAnswer = listAnswer.map((answer) => ({
      ...answer,
      color: "transparent",
    }));
    setStateListAnswer(dataListAnswer);
    setStateBackgroundList(dataBackGroundList);
    onDispatchDataAlert(AlertDefault);
    setStateListPositionClick([]);
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

  const onMouseDown = (e, canvas) => {
    if (e.target && e.button === 1) {
      let index = e.target.get("id");
      let answerCorrect = data.game_config.answer_correct;

      let checkAnswerCorrect = 0;
      if (answerCorrect.includes(index.toString())) {
        checkAnswerCorrect = 1;
      }
      const dataBackGroundList = backgroundList.map((item) => ({
        ...item,
        color:
          item.name.replace("object-", "") === index && checkType === "border"
            ? item.color === "black"
              ? "transparent"
              : checkAnswerCorrect
              ? "#33cc33"
              : "red"
            : item.color,
      }));

      e.target.set("stroke", checkAnswerCorrect ? "#33cc33" : "red");

      setStateBackgroundList(dataBackGroundList);

      canvas.renderAll();

      if (checkAnswerCorrect) {
        setStateSrcAudio(AUDIO_SUCCESS);
      } else {
        setStateSrcAudio(AUDIO_ERROR);
      }

      setTimeout(function () {
        setStateSrcAudio("");
      }, 1000);
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
        <ReactAudioPlayer
          src={srcAudio}
          className="d-none"
          autoPlay={true}
          controls={true}
        />
      </PlayArea>
      <WrapperButtonReset>
        <ButtonReset
          isDislabeled={false}
          languageBook={languageBook}
          onResetData={onResetData}
          className=""
        />
      </WrapperButtonReset>
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
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoiceBackGroundTvContainer);

const StyledImage = styled.img`
  zindex: 1;
`;

const WrapperButtonReset = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
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
