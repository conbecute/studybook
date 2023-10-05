import { useDrop } from "react-dnd";
import styled from "styled-components";
import _ from "lodash";
import { URL_IMAGE_QUESTION } from "../../../constants/type";
import LatextComponent from "edu_lms/components/LatextComponent";
import styles from "./DragAndDropText.module.scss";
import BoxAnswer from "./BoxAnswer";

const style = {
  textAlign: "center",
  border: "2px solid #00c2f3",
  borderRadius: "15px",
  minHeight: "20rem",
  maxHeight: "100%",
};

const styleH = {
  color: "black",
  background: "#b5f0ff",
  padding: "10px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const ImageStyle = styled.img`
  height: 100px;
  display: inline;
`;
const HrStyle = styled.hr`
  border: 1px solid #00c2f3;
`;
const WrapAnswer = styled.div`
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  max-height: 40vh;
`;

export const Dustbin = function Dustbin({
  accept,
  lastDroppedItem,
  icon,
  data,
  onDrop,
  checkSubmit,
  showCorrectAnswer,
  isReadOnly,
  dataGameConfig,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} role="Dustbin" style={{ ...style }}>
      {_.includes(dataGameConfig.type_question, "text") && (
        <h3
          style={{
            ...styleH,
            fontSize: `${dataGameConfig.font_size_question}px`,
          }}
          className={`${styles.fontSizeQuestionBox}`}
        >
          <LatextComponent
            data={icon[0].props[0].text}
            typeText={dataGameConfig?.typeText}
            fontSize={dataGameConfig?.font_size_question}
          />
        </h3>
      )}
      {_.includes(dataGameConfig.type_question, "image") && (
        <>
          <ImageStyle src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`} alt="#" />
          <HrStyle />
        </>
      )}
      <WrapAnswer>
        {lastDroppedItem &&
          lastDroppedItem.map((item) => (
            <BoxAnswer
              item={item}
              checkSubmit={checkSubmit}
              showCorrectAnswer={showCorrectAnswer}
              icon={icon[0].icon_id}
              isReadOnly={isReadOnly}
              dataGameConfig={dataGameConfig}
            />
          ))}
      </WrapAnswer>
    </div>
  );
};
