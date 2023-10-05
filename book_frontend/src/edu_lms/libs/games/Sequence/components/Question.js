import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import TextComponent from "edu_lms/components/TextComponent";
import { URL_AUDIO } from "./../../../../constants/type";

export default function Question({ data, dataGameConfig }) {
  return (
    <Wrapper
      className="question p-3 mb-4 quicksand-bold"
      fontSizeTitle={dataGameConfig?.font_size_title}
    >
      {data.map((item, index) => {
        return (
          <h4 key={index} className="w-100">
            <TextComponent
              typeText={dataGameConfig?.type_text}
              fontSize={dataGameConfig?.font_size_title}
              data={String(item.props[0]?.text) || ""}
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
}

const Wrapper = styled.div`
  font-size: ${(props) =>
    props.fontSizeTitle ? `${props.fontSizeTitle}px` : "22px"};
  ol {
    margin-left: 20px;
  }
`;
