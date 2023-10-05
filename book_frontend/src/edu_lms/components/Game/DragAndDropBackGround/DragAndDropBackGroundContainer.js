import React, { useState, useEffect, Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { formatListDataAnswer, formatListDataQuestion } from "./selection";
import ButtonReset from "./components/ButtonReset";
import ReactAudioPlayer from "react-audio-player";
import { AlertDefault, AlertSuccess } from "../selection";
import {
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import TitleQuestion from "./components/TitleQuestion";
import { formatQuestionTitle } from "../DragAndDropBackGround/selection";
import { onDispatchIsClickRefresh } from "../../../modules/General/actions";
import reactImageSize from "react-image-size";
import { Box } from "./Box";
import { Dustbin } from "./Dustbin";
import FooterDragDropBackGroundComponent from "./components/FooterComponent";
import { postHistoryGame } from "../../../services/readingBook";

const DrapAndDropBackGroundContainer = ({
  data,
  alert,
  objectId,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickRefresh,
}) => {
  const [listAnswer, setStateListAnswer] = useState(formatListDataAnswer(data));
  const [listQuestion, setStateListQuestion] = useState(
    formatListDataQuestion(data)
  );
  const [srcAudio, setStateSrcAudio] = useState("");
  const [questionTitle] = useState(formatQuestionTitle(data));
  const [typeQuestion] = useState(data.game_config.type_question);
  const [fontSizeTitle] = useState(data.game_config.fontSizeTitle);
  const [countAnswerCorrect, setStateCountAnswerCorrect] = useState(0);
  const [backgroundImage] = useState(
    data.background_list.backgroundList[0].value[0].path
  );
  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();
  const [constScale, setStateConstScale] = useState(1);
  const [widthImageConst] = useState(
    data.background_list.backgroundList[0].value[0].image_width
  );
  const [start, setStart] = useState(0);
  const [indexCheck, setIndexCheck] = useState(0);
  const [disabledBoxItem, setStateDisabledBoxItem] = useState(false);
  const [totalQuestion] = useState(listAnswer.length);
  const [inputData, setInputData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
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
  });

  function isDropped(boxName) {}

  const onResetData = () => {
    setShowAlert(false);
    onDispatchIsClickRefresh(true);
    setStateListAnswer(formatListDataAnswer(data));
    setStateListQuestion(formatListDataQuestion(data));
    setStateCountAnswerCorrect(0);
    onDispatchDataAlert(AlertDefault);
  };

  const onHandleDrop = (index, item) => {
    const dataListAnswer = listAnswer.filter(
      (answer) => answer.icon_id_answer != item.icon[0].icon_id
    );

    let checkResult = false;

    listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        const dataAnswer = listAnswer.filter(
          (answer) => answer.icon_id_answer === item.icon[0].icon_id
        );
        if (question.icon_id == dataAnswer[0].icon_id_question) {
          checkResult = true;
        }
      }
    });

    if (checkResult) {
      setStateCountAnswerCorrect(countAnswerCorrect + 1);
    }

    if (checkResult) {
      setStart(1);
      setStateSrcAudio(AUDIO_SUCCESS);
    } else {
      setStart(2);
      setStateSrcAudio(AUDIO_ERROR);
    }
    setIndexCheck(index);

    const dataListQuestion = listQuestion.map((question, indexQuestion) => {
      if (index === indexQuestion) {
        item.checkResult = checkResult;
        return {
          ...question,
          lastDroppedItem: [...question.lastDroppedItem, item],
        };
      } else {
        return { ...question };
      }
    });

    setStateListQuestion(dataListQuestion);
    setStateListAnswer(dataListAnswer);

    setStateDisabledBoxItem(true);

    if (listAnswer.length === 1) {
      onDispatchDataAlert(AlertSuccess);
    }
    if (dataListAnswer.length === 0) {
      setInputData({ ...inputData, results: dataListQuestion });
      setShowAlert(true);
    }
    setTimeout(function () {
      setStateSrcAudio("");
      setStart(0);
    }, 1000);
  };

  const onCheckAnswer = () => {};

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  useEffect(() => {
    setInputData({ ...data.game_config });
  }, [data]);

  useEffect(() => {
    if (inputData.results) {
      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(inputData),
      };
      postHistoryGame(dataPost);
    }
  }, [inputData]);

  return (
    <>
      <TitleQuestion
        questionTitle={questionTitle}
        fontSizeTitle={fontSizeTitle}
      />
      <PlayArea>
        <DragAndDropBackGroundContainerWrapper>
          <StyledImage
            width={`${widthImage}px`}
            height={`${heightImage}px`}
            src={`${URL_IMAGE_QUESTION}${backgroundImage}`}
            alt=""
          />
          <DndProvider backend={HTML5Backend}>
            {listAnswer.map(({ icon, type, touch }, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    zIndex: 11,
                    top: touch[0].y * constScale,
                    left: touch[0].x * constScale,
                  }}
                >
                  <Box
                    width={(touch[1].x - touch[0].x) * constScale}
                    key={index}
                    type={type}
                    src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`}
                    icon={icon}
                    isDropped={isDropped(icon)}
                  />
                </div>
              );
            })}

            {listQuestion.map(
              ({ accepts, lastDroppedItem, icon, touch }, index) => {
                return (
                  <>
                    {start > 0 && indexCheck === index && (
                      <i
                        style={{
                          position: "absolute",
                          zIndex: 20,
                          top: touch[0].y * constScale - 10,
                          left:
                            ((touch[1].x - touch[0].x) / 2 + touch[0].x) *
                              constScale -
                            10,
                        }}
                        className={`${
                          start === 1
                            ? "fa-check-circle monkey-color-green"
                            : "fa-times-circle monkey-color-red"
                        }   fa monkey-fz-30`}
                        aria-hidden="true"
                      ></i>
                    )}
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        zIndex: 11,
                        top: touch[0].y * constScale,
                        left: touch[0].x * constScale,
                      }}
                    >
                      <Dustbin
                        typeQuestion={typeQuestion}
                        accept={accepts}
                        icon={icon}
                        lastDroppedItem={[...lastDroppedItem].reverse()}
                        onDrop={(item) => onHandleDrop(index, item)}
                        key={index}
                        width={(touch[1].x - touch[0].x) * constScale}
                      />
                    </div>
                  </>
                );
              }
            )}
          </DndProvider>
        </DragAndDropBackGroundContainerWrapper>
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
      <FooterDragDropBackGroundComponent
        handleDispatchDataAlert={handleDispatchDataAlert}
        countCorrect={countAnswerCorrect}
        totalQuestion={totalQuestion}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </>
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
)(DrapAndDropBackGroundContainer);

const StyledImage = styled.img`
  z-index: -1;
`;

const WrapperButtonReset = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
`;
const PlayArea = styled.div`
  display: flex;
  justify-content: center;
`;

const DragAndDropBackGroundContainerWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: fit-content;
  height: 100%;
  overflow-y: hidden;
`;
