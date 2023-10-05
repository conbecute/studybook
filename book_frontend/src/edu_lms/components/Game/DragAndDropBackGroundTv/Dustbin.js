import { useDrop } from "react-dnd";
import styled from "styled-components";
import _ from "lodash";
import { URL_IMAGE_QUESTION } from "../../../constants/type";
const style = {
  textAlign: "center",
  borderRadius: "15px",
  height: "100%",
};
const styleH = {
  color: "black",
};

const ImageStyle = styled.img`
  height: auto;
`;

export const Dustbin = function Dustbin({
  typeQuestion,
  fontSizeQuestion,
  accept,
  icon,
  onDrop,
  width,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} role="Dustbin" style={{ ...style }}>
      {_.includes(typeQuestion, "text") && (
        <h5 style={{ ...styleH, fontSize: fontSizeQuestion }}>
          {icon[0].props[0]?.text}
        </h5>
      )}
      {/* {_.includes(typeQuestion, "image") && ( */}
        <>
          <ImageStyle
            width={width}
            height="auto"
            src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`}
            alt="#"
          />
        </>
      {/* )} */}
    </div>
  );
};
