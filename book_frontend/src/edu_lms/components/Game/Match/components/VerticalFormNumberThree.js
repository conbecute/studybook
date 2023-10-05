import React from "react";
import Answer from "./Answer";
import Question from "./Question";
import _ from "lodash";

const VerticalFormNumberThree = ({
  dataQuestion,
  dataAnswer,
  styleBox,
  disabledBoxItem,
  typeGame,
  onAction,
  classNameQuestion,
  marginBottom,
  classMarginBottom,
  numberSizeMatchWrapper,
  typeDisplayContent,
  fontSizeContent,
}) => {
  return (
    <div
      id="cover-canvas"
      style={{
        width: `${numberSizeMatchWrapper}px`,
        height: "auto",
        overflowX: "hidden",
        overdlowY: "auto",
        margin: "auto",
      }}
      className="vertical-form-number-three-wrapper mb-5 position-relative d-flex justify-content-between align-items-center quicksand-medium"
    >
      <canvas id="canvas-match" />
      <Question
        data={_.slice(dataQuestion, 0, dataQuestion.length / 2)}
        sizeWidth={styleBox.sizeWidth}
        sizeHeight={styleBox.sizeHeight}
        onAction={onAction}
        typeGame={Number(typeGame)}
        disabledBoxItem={disabledBoxItem}
        classNameQuestion={classNameQuestion}
        showAudio={false}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={1}
        type={1}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
      <div>
        <Answer
          data={dataAnswer}
          sizeWidth={styleBox.sizeWidth}
          sizeHeight={"50"}
          onAction={onAction}
          typeGame={Number(typeGame)}
          disabledBoxItem={disabledBoxItem}
          classNameQuestion={classNameQuestion}
          classMarginBottom={classMarginBottom}
          numberClickQuestion={2}
          typeDisplayContent={typeDisplayContent}
          fontSizeContent={fontSizeContent}
        />
      </div>
      <Question
        data={_.slice(dataQuestion, dataQuestion.length / 2)}
        sizeWidth={styleBox.sizeWidth}
        sizeHeight={styleBox.sizeHeight}
        onAction={onAction}
        typeGame={Number(typeGame)}
        disabledBoxItem={disabledBoxItem}
        classNameQuestion={classNameQuestion}
        showAudio={false}
        marginBottom={marginBottom}
        classMarginBottom={classMarginBottom}
        numberClickQuestion={1}
        type={2}
        typeDisplayContent={typeDisplayContent}
        fontSizeContent={fontSizeContent}
      />
    </div>
  );
};

export default VerticalFormNumberThree;
