import React from "react";
import CardNotFlip from "./CardNotFlip";
import CardFlip from "./CardFlip";

const PreviewNotSliderWrapper = ({
  data,
  iconList,
  typeGame,
  typeQuestion,
  typeAnswer,
  textButton,
}) => {
  return (
    <div className="preview-wrapper">
      {data.map((item, index) => {
        if (typeGame === 2) {
          return (
            <CardFlip
              data={item}
              key={index}
              index={index + 1}
              iconList={iconList}
              typeQuestion={typeQuestion}
              typeAnswer={typeAnswer}
            />
          );
        } else {
          return (
            <CardNotFlip
              data={item}
              key={index}
              index={index + 1}
              iconList={iconList}
              typeQuestion={typeQuestion}
              typeAnswer={typeAnswer}
              textButton={textButton}
            />
          );
        }
      })}
    </div>
  );
};
export default PreviewNotSliderWrapper;
