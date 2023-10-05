import classNames from "classnames";
import styled from "styled-components";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import DragAndDrop from "./DragAndDrop.module.scss";

const Container = ({
  typeAnswer,
  typeQuestion,
  typeTextQuestion,
  typeTextAnswer,
  listAnswer,
  listQuestion,
  fontSizeQuestion,
  fontSizeAnswer,
  onHandleDrop,
}) => {
  const handleDrop = (index, item) => {
    onHandleDrop(index, item);
  };

  const countColumn = 12 / listQuestion.length;
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
      <Content
        className={`d-flex flex-wrap justify-content-center ${DragAndDrop.gameDrag}`}
        fontSizeAnswer={fontSizeAnswer}
      >
        {listAnswer.map(({ icon, type }, index) => (
          <Box
            icon={icon}
            type={type}
            key={index}
            fontSizeAnswer={fontSizeAnswer}
            typeTextQuestion={typeTextQuestion}
          />
        ))}
      </Content>

      <div
        className="row"
        style={{
          flex: 1,
        }}
      >
        {listQuestion.map(({ accepts, lastDroppedItem, icon }, index) => (
          <Wrapper
            key={index}
            className={classNames({
              [`col-md-${countColumn}`]: listQuestion.length < 5,
              "p-2 widthDrop": listQuestion.length > 4,
            })}
            column={listQuestion.length}
          >
            <Dustbin
              typeQuestion={typeQuestion}
              typeTextQuestion={typeTextQuestion}
              typeTextAnswer={typeTextAnswer}
              fontSizeQuestion={fontSizeQuestion}
              fontSizeAnswer={fontSizeAnswer}
              accept={accepts}
              icon={icon}
              lastDroppedItem={[...lastDroppedItem].reverse()}
              onDrop={(item) => handleDrop(index, item)}
            />
          </Wrapper>
        ))}
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  &.widthDrop {
    width: ${(props) => `${100 / props.column}%`};
  }
  font-size: ${(props) => `${props.fontSizeAnswer}px` || "24px"};
`;

const Content = styled.div`
  max-height: 30vh;
  overflow: auto;
  margin-bottom: 20px;
  font-size: ${(props) => `${props.fontSizeAnswer}px` || "24px"};
`;

export default Container;
