import { useDrag } from "react-dnd";
import TextComponent from "edu_lms/components/TextComponent";
import { URL_AUDIO } from "../../../constants/type";
import useSound from "use-sound";
import UseSound from "../../UseSound";
const style = {
  border: "2px solid gray",
  borderRadius: "10px",
  backgroundColor: "#eefcff",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  marginBottom: "0.6rem",
  cursor: "move",
  float: "left",
  position: "relative",
};

export const Box = function Box({ icon, type, typeTextQuestion, fontSizeAnswer }) {
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
          <UseSound src={`${URL_AUDIO}${icon[0].props[0]?.audio[0]?.path}`} />
        )}
      </>
      <TextComponent
        data={icon[0].props[0].text}
        typeText={typeTextQuestion}
        fontSize={`${fontSizeAnswer}px`}
      />
    </div>
  );
};
