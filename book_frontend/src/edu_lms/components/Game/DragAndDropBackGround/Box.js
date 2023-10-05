import { useDrag } from "react-dnd";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../constants/type";
import useSound from "use-sound";
import UseSound from "../../UseSound";
const style = {
  marginRight: "1rem",
  marginBottom: "0.6rem",
  cursor: "move",
  float: "left",
  position: "relative",
};

export const Box = function Box({ icon, type, isDropped, width }) {
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
    <div ref={drag} role="Box" style={{ ...style, opacity }}>
      <>
        {icon[0].props[0]?.audio[0]?.path && (
          <UseSound fontSize={"20px"} left={"-15px"} src={`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`} />
        )}
      </>
      <img
        src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`}
        width={width}
        height="auto"
      />
    </div>
  );
};
