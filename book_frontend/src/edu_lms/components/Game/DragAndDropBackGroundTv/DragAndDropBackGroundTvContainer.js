import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import {
  formatDefaultListDataQuestion,
  formatListDataAnswer,
  formatListDataQuestion,
  totalAnswer,
} from "./selection";
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
import ButtonCheck from "./components/ButtonCheck";

const DrapAndDropBackGroundTvContainer = ({
  data,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickRefresh,
}) => {
  const [listAnswer, setStateListAnswer] = useState(formatListDataAnswer(data));
  const [defaultListAnswer, setStateDefaultListAnswer] = useState(
    formatListDataAnswer(data)
  );
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
  const [totalQuestion] = useState(totalAnswer(data));
  const [showButtonCheck, setShowButtonCheck] = useState(false);
  const [totalDrag, setTotalDrag] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [isFirework, setFirework] = useState(false);
  const [activeIndexDrag, setActiveIndexDrag] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [totalChoose, setTotalChoose] = useState(0);

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
  }, [widthImage, heightImage, listAnswer]);

  function isDropped(boxName) {}

  const onResetData = () => {
    setShowAlert(false);
    setShowButtonCheck(false);
    onDispatchIsClickRefresh(true);
    setStateListAnswer(formatListDataAnswer(data));
    setStateListQuestion(formatListDataQuestion(data));
    setStateCountAnswerCorrect(0);
    setTotalDrag(0);
    onDispatchDataAlert(AlertDefault);
    setStateDefaultListAnswer(formatListDataAnswer(data));
    setIsReset(false);
  };

  const onCheckData = () => {
    let totalChooses = 0;
    defaultListAnswer.forEach((item) => {
      if (item.check) {
        totalChooses++;
      }
    });
    setTotalChoose(totalChooses);
    setStateListAnswer(defaultListAnswer);
    onDispatchDataAlert(AlertSuccess);
    setIsReset(true);
    setStateListQuestion(formatDefaultListDataQuestion(data));
    setShowAlert(true);
  };

  const onHandleDrop = (index, item) => {
    let totalDnd = totalDrag + 1;
    setTotalDrag(totalDnd);
    setShowButtonCheck(true);

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

    const dataCheckListAnswer = defaultListAnswer.map((answer) => {
      if (answer.icon_id_answer === item.icon[0].icon_id) {
        return {
          ...answer,
          check: answer?.check ? answer?.check : checkResult ? 1 : 2,
        };
      } else {
        return { ...answer, check: answer?.check ? answer?.check : "" };
      }
    });
    setStateDefaultListAnswer(dataCheckListAnswer);

    if (checkResult) {
      setStateCountAnswerCorrect(countAnswerCorrect + 1);
    }
    if (checkResult) {
      setActiveIndexDrag(index);
      setStateSrcAudio(AUDIO_SUCCESS);
      setFirework(true);
      setTimeout(() => {
        setFirework(false);
      }, 1000);
    } else {
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

    setTimeout(function () {
      setStateSrcAudio("");
      setStart(0);
    }, 1000);
  };

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
            {listAnswer.map(({ icon, type, touch, check }, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    zIndex: 11,
                    top: touch[0].y * constScale,
                    left: touch[0].x * constScale,
                    border: `3px solid ${
                      check == undefined || check == ""
                        ? "transparent"
                        : check == 1
                        ? "#33cc33"
                        : "red"
                    }`,
                    borderRadius: "10px",
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
                    {isFirework && activeIndexDrag === index && (
                      <div
                        className="pyro"
                        style={{
                          position: "absolute",
                          zIndex: 20,
                          top: touch[0].y * constScale - 10,
                          left:
                            ((touch[1].x - touch[0].x) / 2 + touch[0].x) *
                              constScale -
                            10,
                        }}
                      >
                        <div className="before"></div>
                        <div className="after"></div>
                      </div>
                    )}
                    {icon[0]?.icon_id !== "fail" && (
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
                    )}
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
        {!isReset && (
          <ButtonReset
            isDislabeled={false}
            languageBook={languageBook}
            onResetData={onResetData}
            className=""
          />
        )}
      </WrapperButtonReset>
      {showButtonCheck && (
        <WrapperButtonCheck>
          <ButtonCheck
            isDislabeled={false}
            languageBook={languageBook}
            onResetData={onResetData}
            onCheckData={onCheckData}
            className=""
            isReset={isReset}
          />
        </WrapperButtonCheck>
      )}

      <FooterDragDropBackGroundComponent
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        countCorrect={countAnswerCorrect}
        totalChoose={totalChoose}
        totalQuestion={totalQuestion}
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
)(DrapAndDropBackGroundTvContainer);

const StyledImage = styled.img`
  z-index: -1;
`;

const WrapperButtonReset = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
`;
const WrapperButtonCheck = styled.div`
  position: absolute;
  bottom: 40px;
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
