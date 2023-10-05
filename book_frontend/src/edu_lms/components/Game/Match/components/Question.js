import React from "react";
import QuestionTitle from "./QuestionTitle";
import QuestionContent from "./QuestionContent";
const Question = ({
  data,
  onAction,
  sizeWidth,
  sizeHeight,
  typeGame,
  disabledBoxItem,
  typeDisplay,
  columnTitleLeft,
  classNameQuestion,
  showAudio = true,
  marginBottom,
  classMarginBottom,
  numberClickQuestion,
  type,
  typeDisplayContent,
  fontSizeContent,
}) => {
  return (
    <div className="question-main">
      {typeDisplay !== 2 && showAudio && (
        <QuestionTitle
          data={data}
          sizeWidth={sizeWidth}
          typeGame={typeGame}
          classNameQuestion={classNameQuestion}
        />
      )}
      <QuestionContent
        data={data}
        onAction={onAction}
        sizeWidth={sizeWidth}
        sizeHeight={sizeHeight}
        typeGame={typeGame}
        disabledBoxItem={disabledBoxItem}
        typeDisplay={typeDisplay}
        columnTitleLeft={columnTitleLeft}
        classNameQuestion={classNameQuestion}
        marginBottom={marginBottom}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={numberClickQuestion}
        type={type}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
    </div>
  );
};
export default Question;
