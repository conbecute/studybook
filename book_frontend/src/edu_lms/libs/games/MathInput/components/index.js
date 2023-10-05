import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import classNames from "classnames";
import MathpixLoader from "mathpix-markdown-it/lib/components/mathpix-loader";
import { AUDIO_ERROR, AUDIO_SUCCESS, RESULT } from "edu_lms/constants/type";
import { addStyles, StaticMathField } from "react-mathquill";
import MathQuillComponent from "edu_lms/components/MathQuill/MathQuill";
import MathpixMarkdown from "mathpix-markdown-it/lib/components/mathpix-markdown";
import TitleQuestion from "./TitleQuestion";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
addStyles();

const MathInputContainerWrapper = (
  {
    listQuestion,
    resultAnswer,
    fontSizeQuestion,
    typeQuestion,
    isReadOnly,
    onPlaying,
    onComplete,
    showCorrectAnswer,
    isDone,
    typeText,
  },
  ref
) => {
  const dispatch = useDispatch();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showCaculatorModal, setStateShowCaculatorModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const [valueInput, setValueInput] = useState("");
  const [dataInput, setDataInput] = useState([]);

  useEffect(() => {
    setDataInput(resultAnswer);
  }, [resultAnswer]);

  const showMathQuill = (index) => {
    setActiveInput(index);
    setValueInput(dataInput[activeInput]?.value);
    setStateShowCaculatorModal(true);
    setIsEdit(true);
    onPlaying(false);
  };

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onCheck();
    },
  }));

  const onCheck = (isCorrect) => {
    setIsEdit(false);
    const convertDataInput = Object.values(dataInput);
    if (convertDataInput) {
      const isCheckResult = convertDataInput.map((valueInput) => ({
        ...valueInput,
        border:
          showCorrectAnswer == true
            ? valueInput?.result.split("|").includes(valueInput?.value)
              ? "green"
              : "red"
            : showCorrectAnswer == false
            ? "gray"
            : "",
      }));
      setDataInput(isCheckResult);
      const isCheck = isCheckResult.map((item, value) => {
        return item?.result.split("|").includes(item?.value);
      });
      if (isCheck?.includes(false)) {
        isCorrect = RESULT._FALSE;
        dispatch(onDispatchSrcAudio(showCorrectAnswer && AUDIO_ERROR));
      } else {
        isCorrect = RESULT._TRUE;
        dispatch(onDispatchSrcAudio(showCorrectAnswer && AUDIO_SUCCESS));
      }
      onComplete({
        isCorrect: isCorrect,
        dataInput: Object.values(isCheckResult),
      });
    }
  };

  const handleClose = () => {
    setStateShowCaculatorModal(false);
  };
  const insertMathQuill = (data) => {
    let cloneDataInput = { ...dataInput };
    cloneDataInput[activeInput - 1].value = data;
    setDataInput(cloneDataInput);
    setStateShowCaculatorModal(false);
  };

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
      <div>
        <div className="row">
          <TitleQuestion
            questionTitle={listQuestion[activeQuestion]}
            fontSizeTitle={fontSizeQuestion}
            typeQuestion={typeQuestion}
            typeText={typeText}
          />
        </div>

        <InputMath className="row ml-3 mt-5">
          {listQuestion[activeQuestion]?.answers.map((listAnswer, index) => (
            <Action
              key={index}
              className={`col-md-${
                12 / listQuestion[activeQuestion]?.number_in_a_row
              } d-flex justify-content-start align-items-center mb-3`}
            >
              {listAnswer.map((answer, _index) => {
                const dataAnswer = dataInput[answer.index - 1];
                const isCorrect = dataAnswer?.result
                  .split("|")
                  .includes(dataAnswer?.value);

                return answer.type === "input" ? (
                  <Input
                    key={_index}
                    onClick={() => showMathQuill(answer?.index)}
                    className={classNames(
                      `${onColorBorder(
                        isCorrect,
                        isEdit,
                        showCorrectAnswer,
                        isDone
                      )}`,
                      { "pointer-event": isReadOnly }
                    )}
                  >
                    <span>
                      <StaticMathField>
                        {dataInput[answer.index - 1]?.value}
                      </StaticMathField>
                    </span>
                  </Input>
                ) : (
                  <span key={_index}>
                    <MathpixLoader>
                      <MathpixMarkdown
                        text={
                          String(answer?.answer_text)
                            ? String(answer?.answer_text)
                            : ""
                        }
                      />
                    </MathpixLoader>
                  </span>
                );
              })}
            </Action>
          ))}
        </InputMath>
      </div>
    </>
  );
};

export default forwardRef(MathInputContainerWrapper);
const Action = styled.div`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
`;
const InputMath = styled.div`
  padding-left: 10px;
`;
const Input = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #ffff;
  margin-right: 10px;
  &.pointer-event {
    pointer-events: none;
  }
`;
function onColorBorder(isCorrect, isEdit, showCorrectAnswer, isDone) {
  let answer = "answerDefault";
  if (!isEdit && showCorrectAnswer && isDone && isCorrect) {
    return (answer = "answerCorrect");
  }
  if (!isEdit && showCorrectAnswer && isDone && !isCorrect) {
    return (answer = "answerIncorrect");
  }
  return answer;
}
