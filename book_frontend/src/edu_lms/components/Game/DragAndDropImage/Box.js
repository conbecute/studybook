import { useDrag } from "react-dnd";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../constants/type";
import useSound from "use-sound";
import UseSound from "../../UseSound";
import styled from "styled-components";
const style = {
  // border: "2px solid gray",
  borderRadius: "10px",
  // backgroundColor: "#eefcff",
  // marginRight: "1rem",
  marginBottom: "0.6rem",
  padding: "10px",
  cursor: "move",
  float: "left",
  display: "flex",
  justifyContent: "center",
};
const ImgDrag = styled.img`
  border: 2px solid gray;
  border-radius: 10px;
`;
export const Box = function Box({
  icon,
  type,
  numberInRow,
  widthImage,
  isDropped,
}) {
  const [play] = useSound(`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { icon },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [icon, type]
  );
  return (
    <div
      ref={drag}
      role="Box"
      style={{ ...style, opacity }}
      className={`${
        numberInRow ? `col-md-${12 / numberInRow}` : ""
      } position-relative`}
    >
      <>
        {icon[0].props[0]?.audio[0]?.path && (
          <UseSound top={"10px"} left={"14px"} src={`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`} />
        )}
      </>
      <ImgDrag
        src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`}
        width={widthImage ? widthImage : "120px"}
        height="auto"
      ></ImgDrag>
    </div>
  );
};
