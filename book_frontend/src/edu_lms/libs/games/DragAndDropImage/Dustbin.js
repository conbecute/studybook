import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import _ from "lodash";
import styles from "./DragAndDropImage.module.scss";
import BoxAnswer from "./BoxAnswer";

const styleH = {
  color: "black",
  background: "#b5f0ff",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const Wrapper = styled.div`
  text-align: center;
  border: 2px solid #00c2f3;
  border-radius: 15px;
  min-height: 22rem;
  max-height: 100%;
  @media (max-height: 768px), (max-width: 576px) {
    min-height: 12rem;
  }
`;
const ImageStyle = styled.img`
  display: inline;
  height: auto;
  @media (max-height: 768px), (max-width: 576px) {
    height: 60px;
  }
`;
const HrStyle = styled.hr`
  border: 1px solid #00c2f3;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const H5 = styled.h5`
  padding: 10px;
  @media (max-height: 768px), (max-width: 576px) {
    padding: 5px;
  }
`;
const WrapAnswer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const Dustbin = function Dustbin({
  widthImage,
  accept,
  lastDroppedItem,
  icon,
  onDrop,
  checkSubmit,
  showCorrectAnswer,
  isReadOnly,
  dataConfig,
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
    <Wrapper ref={drop} role="Dustbin">
      {_.includes(dataConfig.type_question, "text") && icon[0].props[0]?.text && (
        <H5
          style={{
            ...styleH,
            fontSize: `${dataConfig.font_size_answer}px`,
          }}
        >
          {icon[0].props[0]?.text}
        </H5>
      )}
      {_.includes(dataConfig.type_question, "image") && (
        <>
          <ImageStyle
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${icon[0]?.path}`}
            alt="#"
            className={styles.DusbintImg}
          />
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
              widthImage={widthImage}
              icon={icon[0].icon_id}
              isReadOnly={isReadOnly}
            />
          ))}
      </WrapAnswer>
    </Wrapper>
  );
};
