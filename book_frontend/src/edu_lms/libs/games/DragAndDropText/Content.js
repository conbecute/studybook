import { useState, useEffect } from "react";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";

export const Content = ({
  listAnswer,
  listQuestion,
  onHandleDrop,
  checkSubmit,
  showCorrectAnswer,
  isReadOnly,
  dataGameConfig,
}) => {
  function isDropped(boxName) {}

  const handleDrop = (index, item) => {
    onHandleDrop(index, item);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingLeft: "30px",
        paddingRight: "30px",
        flex: 1,
      }}
    >
      <div className="row justify-content-center" style={{ marginBottom: 20 }}>
        {listAnswer.map(({ icon, type }, index) => (
          <Box
            icon={icon}
            type={type}
            isDropped={isDropped(icon)}
            key={index}
            isReadOnly={isReadOnly}
            dataGameConfig={dataGameConfig}
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
          <div
            className={`col-md-${12 / listQuestion.length} col-${
              12 / listQuestion.length
            } col-sm-${12 / listQuestion.length} col-lg-${
              12 / listQuestion.length
            }`}
          >
            <Dustbin
              dataGameConfig={dataGameConfig}
              accept={accepts}
              icon={icon}
              lastDroppedItem={[...lastDroppedItem].reverse()}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
              checkSubmit={checkSubmit}
              showCorrectAnswer={showCorrectAnswer}
              isReadOnly={isReadOnly}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
