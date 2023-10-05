import React from "react";
import Answer from "./Answer";
import Question from "./Question";

const HorizontalForm = ({
  dataQuestion,
  dataAnswer,
  styleBox,
  disabledBoxItem,
  typeGame,
  onAction,
  classNameQuestion,
  marginBottom,
  classMarginBottom,
  typeDisplayContent,
  fontSizeContent,
}) => {
  return (
    <div
      id="cover-canvas"
      className="horizontal-wrapper position-relative mb-5 quicksand-medium"
      style={{ overflow: "hidden" }}
    >
      <canvas id="canvas-match" />
      <Question
        data={dataQuestion}
        sizeWidth={styleBox.sizeWidth}
        sizeHeight={styleBox.sizeHeight}
        onAction={onAction}
        typeGame={Number(typeGame)}
        disabledBoxItem={disabledBoxItem}
        classNameQuestion={classNameQuestion}
        marginBottom={marginBottom}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={1}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
      <Answer
        data={dataAnswer}
        sizeWidth={styleBox.sizeWidth}
        sizeHeight={styleBox.sizeHeight}
        onAction={onAction}
        typeGame={Number(typeGame)}
        disabledBoxItem={disabledBoxItem}
        classNameQuestion={classNameQuestion}
        marginBottom={marginBottom}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={2}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
    </div>
  );
};

export default HorizontalForm;
