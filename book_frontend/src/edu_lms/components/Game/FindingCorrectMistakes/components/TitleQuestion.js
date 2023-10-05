import _ from "lodash";
import AudioPlayer from "react-h5-audio-player";
import ReactPlayer from "react-player";

import { TypeQuestion } from "../selection";
import {
  URL_IMAGE_QUESTION,
  URL_AUDIO,
  URL_VIDEO,
} from "../../../../constants/type";

const TitleQuestion = ({ data, typeQuestion, typeText, fontSize }) => {
  return (
    <div className="title pr-3 pl-3 quicksand-bold">
      {_.includes(typeQuestion, TypeQuestion.IMAGE) && data?.path && (
        <div className="question-image mb-3 text-center">
          <img src={`${URL_IMAGE_QUESTION}${data?.path}`} alt="#" />
        </div>
      )}
      {_.includes(typeQuestion, TypeQuestion.AUDIO) &&
        data?.props[0]?.audio[0]?.path && (
          <div style={{ width: "35%", margin: "auto" }}>
            <AudioPlayer
              src={`${URL_AUDIO}${data?.props[0]?.audio[0]?.path}`}
              autoPlay={false}
            />
          </div>
        )}
      {_.includes(typeQuestion, TypeQuestion.VIDEO) && data?.path && (
        <ReactPlayer
          width="60%"
          height="60%"
          pip={true}
          controls={true}
          className="mx-auto"
          url={`${URL_VIDEO}${data?.path}`}
        />
      )}
      {_.includes(typeQuestion, TypeQuestion.TEXT) && data?.props[0]?.text && (
        <h4
          className="mb-3"
          style={{ fontSize: fontSize ? `${fontSize}px` : "" }}
        >
          {" "}
          {data?.props[0]?.text}
        </h4>
      )}
    </div>
  );
};

export default TitleQuestion;
