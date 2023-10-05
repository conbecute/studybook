import { useDrag } from "react-dnd";
import styled from "styled-components";
import UseSound from "edu_lms/components/UseSound";
import { URL_AUDIO } from "edu_lms/constants/type";
import styles from "./DragAndDropText.module.scss";
import classNames from "classnames";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

export default function BoxAnswer({
  item,
  checkSubmit,
  showCorrectAnswer,
  icon,
  isReadOnly,
  dataGameConfig,
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
      {item.icon[0].props[0]?.audio[0]?.path && (
        <UseSound
          src={`${URL_AUDIO}${item.icon[0].props[0]?.audio[0]?.path}`}
        />
      )}

      <span
        style={{ fontSize: `${dataGameConfig.font_size_answer}px` }}
        className={`${styles.fontSizeQuestionDustbin}`}
      >
        <LatextComponent
          data={item.icon[0].props[0].text}
          typeText={dataGameConfig.type_text_answer}
          fontSize={dataGameConfig.font_size_answer}
        />
      </span>
    </PStyle>
  );
}

const style = {
  borderRadius: "10px",
  marginBottom: "0.6rem",
  padding: "10px",
  float: "left",
  display: "flex",
  justifyContent: "center",
};
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
