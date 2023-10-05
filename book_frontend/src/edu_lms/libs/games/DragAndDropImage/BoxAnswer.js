import { useDrag } from "react-dnd";
import styled from "styled-components";
import classNames from "classnames";
import UseSound from "edu_lms/components/UseSound";
import styles from "./DragAndDropImage.module.scss";

export default function BoxAnswer({
  item,
  checkSubmit,
  showCorrectAnswer,
  icon,
  isReadOnly,
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: icon,
      item: item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      canDrag: !isReadOnly,
    }),
    [item]
  );
  return (
    <PStyle
      ref={drag}
      role="Box"
      style={{ ...style, opacity }}
      checkResult={item.checkResult && checkSubmit}
      complete={checkSubmit}
      showCorrectAnswer={showCorrectAnswer}
      className={classNames({
        [styles.cursorMove]: !isReadOnly,
      })}
    >
      <div className="d-flex flex-column justify-content-center">
        {item.icon[0].props[0]?.audio[0]?.path && (
          <UseSound
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${item.icon[0].props[0]?.audio[0]?.path}`}
          />
        )}
        <span>
          <Image
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${item.icon[0]?.path}`}
            style={{ borderRadius: "10px" }}
            className={styles.imgWidth}
          />
        </span>
      </div>
    </PStyle>
  );
}

const PStyle = styled.p`
  color: black;
  border: 2px solid
    ${(props) =>
      props.showCorrectAnswer
        ? props.complete
          ? props.checkResult
            ? "#bde099"
            : "red"
          : "#ccc"
        : "#ccc"};
  border-radius: 10px;
  margin: 5px;
  position: relative;
`;
const style = {
  borderRadius: "10px",
  marginBottom: "0.6rem",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
};
const Image = styled.img`
  width: 180px;
  height: auto;
  @media (max-height: 768px), (max-width: 576px) {
    width: 80px;
  }
`;
