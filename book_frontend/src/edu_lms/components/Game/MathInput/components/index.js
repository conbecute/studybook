import React, { useEffect, useState } from "react";
import { addStyles, StaticMathField } from "react-mathquill";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import styled from "styled-components";
import _ from "lodash";
import {
  GAME_TYPE,
  CTA_POPUP_TYPE,
  ANSWER_STATUS,
  BOOK_LANGUAGE,
} from "edu_lms/constants/type";
import styles from "../MathInput.module.scss";
import MathQuillComponent from "../../../MathQuill/MathQuill";
import TitleQuestion from "./TitleQuestion";
import AnswerComponent from "../../AnswerComponent";
import { useDispatch } from "react-redux";
import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import { AlertDefault, styleAlertGame } from "../../selection";
import { formatResultAnswer } from "../selection";
addStyles();

const BORDER_COLOR = {
  Default: "gray",
  Correct: "green",
  InCorrect: "red",
};

const MathInputContainerWrapper = ({
  data,
  listQuestion,
  resultAnswer,
  setResultAnswer,
  fontSizeAnswer,
  fontSizeQuestion,
  typeQuestion,
  languageBook,
}) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showCaculatorModal, setStateShowCaculatorModal] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const [valueInput, setValueInput] = useState("");
  const [dataInput, setDataInput] = useState([]);
  const [isCheck, setCheck] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(0);
  const [isDisabled, setIsDisable] = useState(true);
  const dispatch = useDispatch();

  let totalQuestionGame = 0;
  let totalInput = 0;
  listQuestion[activeQuestion]?.answers.forEach((question) =>
    question.forEach(
      (item) =>
        _.includes(item.type, "input") &&
        (totalQuestionGame = totalQuestionGame + 1)
    )
  );
  resultAnswer.map((item) => {
    listQuestion[activeQuestion]?.answers.forEach((i) => {
      i.forEach((j) => {
        if (j.index === item.index) {
          item.value && totalInput++;
        }
      });
    });
  });

  useEffect(() => {
    setDataInput(resultAnswer);
    dispatch(onDispatchDataAlert(AlertDefault));
    setIsDisable(!(totalQuestionGame === totalInput));
  }, [dispatch, resultAnswer, totalQuestionGame, totalInput, activeQuestion]);

  const showMathQuill = (index) => {
    setActiveInput(index);
    setValueInput(dataInput[activeInput]?.value);
    setStateShowCaculatorModal(true);
  };

  const onCheck = () => {
    setCheck(true);
    data.game_config.data[activeQuestion].status = ANSWER_STATUS.DEFAULT;
    const convertDataInput = Object.values(dataInput);

    if (convertDataInput) {
      let totalAnswer = 0;
      const swapInputAreaWithIndex = {};
      const correctInputs = { noSwap: [], hasSwap: [] };

      const questionId = listQuestion[activeQuestion]?.question;
      convertDataInput
        .filter((inputArea) => inputArea.question_id === questionId)
        .forEach((inputArea) => {
          if (!inputArea.answerIndex) {
            // Case input in game don't have answerIndex (MathInput - input no swap)
            if (inputArea.result.split("|").includes(inputArea.value)) {
              totalAnswer++;
              correctInputs.noSwap.push({ index: inputArea.index });
            }
          } else {
            // Case input in game have answerIndex (MathInput - input has swap)
            const swapIndex = inputArea.answerIndex;
            if (!Object.keys(swapInputAreaWithIndex).includes(swapIndex)) {
              swapInputAreaWithIndex[swapIndex] = {
                results: [{ text: inputArea.result, index: inputArea.index }],
                values: [{ text: inputArea.value, index: inputArea.index }],
              };
            } else {
              swapInputAreaWithIndex[swapIndex] = {
                results: [
                  ...swapInputAreaWithIndex[swapIndex].results,
                  { text: inputArea.result, index: inputArea.index },
                ],
                values: [
                  ...swapInputAreaWithIndex[swapIndex].values,
                  { text: inputArea.value, index: inputArea.index },
                ],
              };
            }
          }
        });

      // Check MathInput has swap results, values ---> calculate totalAnswer, correctInputs<<hasSwap>>
      Object.values(swapInputAreaWithIndex).forEach((inputArea) => {
        const resultsTemp = inputArea.results;
        inputArea.values.forEach((value) => {
          const indexResultCompare = resultsTemp.findIndex((result) =>
            result.text.split("|").includes(value.text)
          );
          if (indexResultCompare > -1) {
            totalAnswer++;
            correctInputs.hasSwap.push({ value: value.text });
            resultsTemp.splice(indexResultCompare, 1);
          }
        });
      });

      totalAnswer === totalQuestionGame &&
        (data.game_config.data[activeQuestion].status = ANSWER_STATUS.CORRECT);
      setCheckAnswer(totalAnswer);

      const getBorderColor = (inputArea) => {
        if (!inputArea.value) return BORDER_COLOR.Default;

        if (!inputArea.answerIndex) {
          const hasCorrectAnswer = correctInputs.noSwap.some(
            (correctInput) => correctInput.index === inputArea.index
          );
          return hasCorrectAnswer
            ? BORDER_COLOR.Correct
            : BORDER_COLOR.InCorrect;
        }

        const indexCorrectInputSwap = correctInputs.hasSwap.findIndex(
          (correctInput) => {
            return correctInput.value === inputArea.value;
          }
        );
        if (indexCorrectInputSwap > -1) {
          correctInputs.hasSwap.splice(indexCorrectInputSwap, 1);
          return BORDER_COLOR.Correct;
        }
        return BORDER_COLOR.InCorrect;
      };

      setDataInput(
        convertDataInput.map((inputArea) => {
          return {
            ...inputArea,
            border: getBorderColor(inputArea),
          };
        })
      );
    }
  };

  const onNextQuestion = () => {
    setActiveQuestion(activeQuestion + 1);
    setCheck(false);
    dispatch(onDispatchDataAlert(AlertDefault));
    setIsDisable(true);
  };

  const handleClose = () => {
    setStateShowCaculatorModal(false);
  };

  const totalAnswerScreen = data.game_config.data.filter((item) => {
    if (item.status === ANSWER_STATUS.CORRECT) {
      return item.status;
    }
  });

  const insertMathQuill = (data) => {
    if (data === "\\mathbb{C}") {
      data = "\\C";
    }
    if (data === "\\mathbb{N}") {
      data = "\\N";
    }
    if (data === "\\mathbb{Z}") {
      data = "\\Z";
    }
    if (data === "\\mathbb{Q}") {
      data = "\\Q";
    }
    if (data === "\\mathbb{R}") {
      data = "\\R";
    }
    let cloneDataInput = { ...dataInput };
    cloneDataInput[activeInput - 1].value = data.toString();
    setDataInput(cloneDataInput);
    setStateShowCaculatorModal(false);
  };
  const changeQuestion = (index) => {
    dispatch(onDispatchDataAlert(AlertDefault));
    setActiveQuestion(index);
    setCheck(false);
  };

  const handleReset = () => {
    setResultAnswer(formatResultAnswer(data));
    setDataInput(resultAnswer);
    setCheckAnswer(resultAnswer.length);
    setCheck(false);
    setActiveQuestion(0);
    dispatch(onDispatchDataAlert(AlertDefault));
  };

  if (listQuestion.length > 1 && activeQuestion === listQuestion.length) {
    return (
      <AnswerComponent
        checkScreen={CTA_POPUP_TYPE.finalReport}
        onResetData={handleReset}
        totalQuestion={listQuestion.length}
        totalAnswer={totalAnswerScreen.length}
      />
    );
  }
  return (
    <>
      {showCaculatorModal && (
        <MathQuillComponent
          show={showCaculatorModal}
          valueInput={valueInput}
          onHide={handleClose}
          insertMathQuill={insertMathQuill}
        />
      )}
      <div className={styles.MathContainer}>
        <div className="row">
          <TitleQuestion
            questionTitle={listQuestion[activeQuestion]}
            fontSizeTitle={fontSizeQuestion}
            typeQuestion={typeQuestion}
          />
        </div>

        <div className="row ml-3 mt-5" style={{ paddingLeft: "10px" }}>
          {listQuestion[activeQuestion]?.answers.map((listAnswer, index) => (
            <div
              key={index}
              className={`col-md-${
                12 / listQuestion[activeQuestion]?.number_in_a_row
              } mb-3 ${styles.listAnswerWrapper}`}
              style={{ fontSize: fontSizeAnswer }}
            >
              {listAnswer.map((answer, _index) => {
                return answer.type === "input" ? (
                  <InputGame
                    key={_index}
                    dataCheckBorder={dataInput[answer.index - 1]?.border}
                    isCheck={isCheck}
                    onClick={() => showMathQuill(answer.index)}
                    className={styles.answerInput}
                  >
                    <span>
                      <StaticMathField>
                        {dataInput[answer.index - 1]?.value}
                      </StaticMathField>
                    </span>
                  </InputGame>
                ) : (
                  <MathpixLoader key={_index}>
                    <MathpixMarkdown text={String(answer.answer_text) || ""} />
                  </MathpixLoader>
                );
              })}
            </div>
          ))}
        </div>
        <WrapperFooter className="d-flex ml-2 justify-content-between">
          <div className="d-flex ml-3">
            {listQuestion.map((_question, index) => (
              <DivNumberAnswer
                key={index}
                style={{
                  background: activeQuestion === index ? "#00c2f3" : "",
                }}
                onClick={() => changeQuestion(index)}
                className={`d-flex justify-content-center align-items-center text-light another-class mr-3`}
              >
                {index + 1}
              </DivNumberAnswer>
            ))}
          </div>
          <div>
            {!isCheck ? (
              <button
                onClick={onCheck}
                disabled={isDisabled}
                className={`${
                  isDisabled ? "monkey-bg-gray" : "monkey-bg-blue cursor"
                } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                    ?.buttonCheck
                }
              </button>
            ) : (
              <button
                className="monkey-bg-blue cursor monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20"
                onClick={
                  activeQuestion < listQuestion.length &&
                  listQuestion.length > 1
                    ? onNextQuestion
                    : handleReset
                }
              >
                {activeQuestion < listQuestion.length && listQuestion.length > 1
                  ? BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                      ?.buttonContinue
                  : BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                      ?.buttonRefresh}
              </button>
            )}
          </div>
          <ShowAlert styleAlertGame={styleAlertGame} className="pb-3 ml-2">
            <AnswerComponent
              typeGame={GAME_TYPE.multipleGame}
              checkScreen={CTA_POPUP_TYPE.rangeOneGame}
              totalAnswer={checkAnswer}
              totalQuestion={totalQuestionGame}
              showAlert={isCheck}
              setShowAlert={setCheck}
            />
          </ShowAlert>
        </WrapperFooter>
      </div>
    </>
  );
};

const DivNumberAnswer = styled.div`
  height: 35px;
  width: 35px;
  background-color: #606e78;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
`;
const InputGame = styled.div`
  border: 2px solid
    ${(props) => {
      return !props.isCheck
        ? "gray"
        : props.dataCheckBorder === "gray"
        ? "red"
        : props.dataCheckBorder;
    }};
`;
const WrapperFooter = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  width: 100%;
`;

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;
export default MathInputContainerWrapper;
