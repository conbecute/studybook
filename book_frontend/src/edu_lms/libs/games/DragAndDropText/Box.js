import { useDrag } from "react-dnd";
import useSound from "use-sound";
import { URL_AUDIO } from "edu_lms/constants/type";
import UseSound from "edu_lms/components/UseSound";
import styles from "./DragAndDropText.module.scss";
import styleDoing from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
import classNames from "classnames";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

const style = {
  borderRadius: "10px",
  backgroundColor: "#eefcff",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  marginBottom: "0.6rem",
  position: "relative",
  textAlign: "center",
};

export const Box = function Box({ icon, type, isReadOnly, dataGameConfig }) {
  const [play] = useSound(`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { icon },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      canDrag: !isReadOnly,
    }),
    [icon, type]
  );
  return (
    <div
      ref={drag}
      role="Box"
      style={{ ...style, opacity }}
      className={classNames(
        `col-3 col-sm-3 col-md-3 col-lg-2 ${styleDoing.answerDefault}`,
        {
          [styles.cursorMove]: !isReadOnly,
        }
      )}
    >
      {icon[0].props[0]?.audio[0]?.path && (
        <UseSound src={`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`} />
      )}

      <span
        style={{ fontSize: `${dataGameConfig.font_size_answer}px` }}
        className={`${styles.fontSizeQuestionDustbin}`}
      >
        <LatextComponent
          data={icon[0].props[0].text}
          typeText={dataGameConfig.type_text_answer}
          fontSize={dataGameConfig.font_size_answer}
        />
      </span>
    </div>
  );
};
