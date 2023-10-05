import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
export const Content = ({
  numberInRow,
  widthImage,
  listAnswer,
  listQuestion,
  fontSizeAnswer,
  onHandleDrop,
  checkSubmit,
  showCorrectAnswer,
  isReadOnly,
  dataConfig,
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
        paddingLeft: "15px",
        paddingRight: "15px",
        flex: 1,
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ marginBottom: 10 }}
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
            isReadOnly={isReadOnly}
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
            key={index}
            className={`col-md-${12 / listQuestion.length} col-${
              12 / listQuestion.length
            } col-sm-${12 / listQuestion.length} col-lg-${
              12 / listQuestion.length
            }`}
          >
            <Dustbin
              widthImage={widthImage}
              dataConfig={dataConfig}
              accept={accepts}
              icon={icon}
              lastDroppedItem={[...lastDroppedItem].reverse()}
              onDrop={(item) => handleDrop(index, item)}
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
