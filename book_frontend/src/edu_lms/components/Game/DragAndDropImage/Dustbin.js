import { useDrop } from "react-dnd";
import styled from "styled-components";
import _ from "lodash";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../constants/type";
import UseSound from "../../UseSound";
const style = {
  textAlign: "center",
  border: "2px solid #00c2f3",
  borderRadius: "15px",
  minHeight: "15rem",
  height: "100%",
};
const styleH = {
  color: "black",
  background: "#b5f0ff",
  padding: "10px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};
const PStyle = styled.p`
  // background: #eefcff;
  color: black;
  // padding: 0.7rem 1.5rem;
  border: 2px solid ${(props) => (props.checkResult ? "#bde099" : "red")};
  border-radius: 10px;
  margin: 5px;
  position: relative;
`;

const ImageStyle = styled.img`
  display: inline;
  height: 100px;
`;
const HrStyle = styled.hr`
  border: 1px solid #00c2f3;
`;
const WrapAnswer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Dustbin = function Dustbin({
  typeQuestion,
  fontSizeQuestion,
  widthImage,
  fontSizeAnswer,
  accept,
  lastDroppedItem,
  icon,
  data,
  onDrop,
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
      {_.includes(typeQuestion, "image") && (
        <>
          <ImageStyle src={`${URL_IMAGE_QUESTION}${icon[0]?.path}`} alt="#" />
          <HrStyle />
        </>
      )}
      <WrapAnswer>
        {lastDroppedItem &&
          lastDroppedItem.map((item) => (
            <PStyle checkResult={item.checkResult}>
              {item.icon[0].props[0]?.audio[0]?.path && (
                <UseSound
                  src={`${URL_AUDIO}${item.icon[0].props[0]?.audio[0]?.path}`}
                />
              )}
              <span>
                {" "}
                <img
                  src={`${URL_IMAGE_QUESTION}${item.icon[0]?.path}`}
                  width={widthImage ? widthImage : "150px"}
                  height="auto"
                  style={{borderRadius: "10px"}}
                />
              </span>
            </PStyle>
          ))}
      </WrapAnswer>
    </div>
  );
};
