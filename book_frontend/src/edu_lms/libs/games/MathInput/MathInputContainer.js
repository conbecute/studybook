import React, { useState, useEffect, forwardRef } from "react";
import _ from "lodash";
import MathInputContainerWrapper from "./components";
import {
  onFormatData,
  formatResultAnswer,
  formatQuestionTitle,
} from "./selection";

const MathInputContainer = (
  {
    data,
    alert,
    languageBook,
    isReadOnly,
    onPlaying,
    onComplete,
    showCorrectAnswer,
  },
  ref
) => {
  const [listQuestion, setListQuestion] = useState(onFormatData(data));
  const [resultAnswer, setResultAnswer] = useState(formatResultAnswer(data));
  const [questionTitle, setQuestionTitle] = useState(formatQuestionTitle(data));
  const [fontSizeQuestion] = useState(
    data?.game_config?.font_size_question
      ? data?.game_config?.font_size_question
      : "30px"
  );
  const [fontSizeAnswer] = useState(
    data?.game_config?.font_size_answer
      ? data?.game_config?.font_size_answer
      : "30px"
  );
  const [numberInARow, setNumberInARow] = useState(
    data?.game_config?.number_in_a_row
  );
  const [typeQuestion, setTypeQuestion] = useState(
    data?.game_config?.type_question
  );
  useEffect(() => {
    setListQuestion(onFormatData(data));
    setResultAnswer(formatResultAnswer(data));
    setQuestionTitle(formatQuestionTitle(data));
    setTypeQuestion(data?.game_config?.type_question);
    setNumberInARow(data?.game_config?.number_in_a_row);
  }, [data]);

  return (
    <>
      <MathInputContainerWrapper
        listQuestion={listQuestion}
        resultAnswer={data.dataInput ? data.dataInput : resultAnswer}
        questionTitle={questionTitle}
        fontSizeAnswer={fontSizeAnswer}
        fontSizeQuestion={fontSizeQuestion}
        numberInARow={numberInARow}
        typeQuestion={typeQuestion}
        alert={alert}
        languageBook={languageBook}
        isReadOnly={isReadOnly}
        onPlaying={onPlaying}
        showCorrectAnswer={showCorrectAnswer}
        onComplete={onComplete}
        ref={ref}
        isDone={data.dataInput ? true : false}
      />
    </>
  );
};

export default forwardRef(MathInputContainer);
