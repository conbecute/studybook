import { useState, useEffect } from "react";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
export const Container = ({
  typeQuestion,
  numberInRow,
  widthImage,
  listAnswer,
  listQuestion,
  fontSizeQuestion,
  fontSizeAnswer,
  onHandleDrop,
}) => {
  useEffect(() => {}, [listQuestion, listAnswer, typeQuestion]);

  function isDropped(boxName) {}

  const handleDrop = (index, item) => {
    onHandleDrop(index, item);
  };

  const [countColumn] = useState(12 / listQuestion.length);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingLeft: "30px",
        paddingRight: "30px",
        flex: 1,
        overflow: "auto",
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ marginBottom: 20 }}
      >
        {listAnswer.map(({ icon, type }, index) => (
          <Box
            icon={icon}
            type={type}
            numberInRow={numberInRow}
            widthImage={widthImage}
            isDropped={isDropped(icon)}
            key={index}
            fontSizeAnswer={fontSizeAnswer}
          />
        ))}
      </div>
      <div
        className="row"
        style={{
          flex: 1,
        }}
      >
        {listQuestion.map(({ accepts, lastDroppedItem, icon }, index) => (
          <div className={`col-md-${countColumn}`}>
            <Dustbin
              typeQuestion={typeQuestion}
              fontSizeAnswer={fontSizeAnswer}
              fontSizeQuestion={fontSizeQuestion}
              widthImage={widthImage}
              accept={accepts}
              icon={icon}
              lastDroppedItem={[...lastDroppedItem].reverse()}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
