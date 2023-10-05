import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import TextComponent from "../../../TextComponent";
import { URL_AUDIO } from "./../../../../constants/type";

const Question = ({ data, typeQuestion, typeText, fontSizeTitle }) => {
  return (
    <Wrapper
      className="question p-3 mb-4 quicksand-bold"
      fontSizeTitle={fontSizeTitle}
    >
      {data.map((item, index) => {
        return (
          <h4 key={index} className="w-100">
            <TextComponent
              typeText={typeText}
              fontSize={fontSizeTitle}
              data={
                String(item.props[0]?.text) ? String(item.props[0]?.text) : ""
              }
            />
            {item.props[0]?.audio[0]?.path && (
              <div className="w-100">
                <ReactAudioPlayer
                  src={URL_AUDIO + item.props[0]?.audio[0].path}
                  className="mx-auto d-block"
                  autoPlay={false}
                  controls={true}
                />
              </div>
            )}
          </h4>
        );
      })}
    </Wrapper>
  );
};

export default Question;
const Wrapper = styled.div`
  font-size: ${(props) =>
    props.fontSizeTitle ? `${props.fontSizeTitle}px` : "22px"};
  ol {
    margin-left: 20px;
  }
`;
