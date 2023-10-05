import { useDrag } from "react-dnd";
import { URL_AUDIO } from "edu_lms/constants/type";
import classNames from "classnames";
import useSound from "use-sound";
import UseSound from "edu_lms/components/UseSound";
import styled from "styled-components";
import styles from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
const style = {
  borderRadius: "10px",
  marginBottom: "0.6rem",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
};
const ImgDrag = styled.img`
  border-radius: 10px;
  cursor: move;
  width: ${(props) => (props.widthImage ? props.widthImage : "120px")};
  @media (max-height: 768px), (max-width: 576px) {
    width: 85px;
  }
`;
const ImageWrapper = styled.div`
  border-radius: 10px;
  border: 2px solid gray;
`;
export const Box = function Box({
  icon,
  type,
  numberInRow,
  widthImage,
  isDropped,
  isReadOnly,
}) {
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
        `${
          numberInRow
            ? `col-md-${12 / numberInRow} col-${12 / numberInRow} col-lg-${
                12 / numberInRow
              }`
            : ""
        }  position-relative`,
        {
          [styles.cursorMove]: !isReadOnly,
        }
      )}
    >
      <ImageWrapper
        className={`${styles.answerDefault} d-flex flex-column justify-content-center`}
      >
        {icon[0].props[0]?.audio[0]?.path && (
          <UseSound
            top={"10px"}
            left={"14px"}
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${icon[0].props[0]?.audio[0]?.path}`}
          />
        )}

        <ImgDrag
          src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${icon[0]?.path}`}
          widthImage={widthImage}
          height="auto"
        />
      </ImageWrapper>
    </div>
  );
};
