import React from "react";
import Answer from "./Answer";
import Question from "./Question";

const VerticalForm = ({
  dataQuestion,
  dataAnswer,
  styleBox,
  disabledBoxItem,
  typeGame,
  onAction,
  classNameQuestion,
  typeDisplay,
  columnTitleLeft,
  columnTitleRight,
  marginBottom,
  classMarginBottom,
  typeDisplayContent,
  fontSizeContent,
}) => {
  return (
    <div
      id="cover-canvas"
      style={{
        width: "840px",
        height: "auto",
        overflow: "hidden",
        margin: "auto",
      }}
      className="position-relative d-flex justify-content-between quicksand-medium"
    >
      <canvas id="canvas-match" />
      <Question
        data={dataQuestion}
        sizeWidth={styleBox.sizeWidth}
        sizeHeight={styleBox.sizeHeight}
        onAction={onAction}
        typeGame={typeGame}
        disabledBoxItem={disabledBoxItem}
        typeDisplay={typeDisplay}
        columnTitleLeft={columnTitleLeft}
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
        typeGame={typeGame}
        disabledBoxItem={disabledBoxItem}
        typeDisplay={typeDisplay}
        columnTitleRight={columnTitleRight}
        classNameQuestion={classNameQuestion}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={2}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
    </div>
  );
};

export default VerticalForm;
