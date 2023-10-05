import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import _, { words } from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import ReactAudioPlayer from "react-audio-player";
import { formatDataConfig } from "./selection";
import FooterComponent from "./components/FooterComponent";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../constants/type";

const KaraokeContainer = ({ data, alert, onDispatchDataAlert }) => {
  const [srcAudio, setStateDataAudio] = useState("");
  const [isPlay, setStateIsPlay] = useState(false);
  const [fontSizeCustom, setStateFrontSize] = useState(
    data.game_config.font_size
  );
  const [sumCountWords, setStateCountSumWords] = useState(1);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [dataAnswerConfigFormat, setStateDataAnswerConfigFormat] = useState([]);
  const onHandleQuestion = (index) => {
    setStateIndexQuestion(index);
    setStateClicked(1);
    setStateWordNumber(1);
  };
  const onPlayAudio = (src) => {
    setStateDataAudio(src);
    setStateIsPlay(true);
    if (
      clicked == 1 ||
      clicked == sumCountWords ||
      clicked == sumCountWords + 1
    ) {
      setStateClicked(1);
    } else {
      setStateClicked(clicked);
    }
  };

  const [dataAnswer, setStateDataAnswer] = useState([]);
  const [dataAnswerConst, setStateDataAnswerConst] = useState([]);

  const [dataSyncText, setStateDataSyncText] = useState([]);

  const [clicked, setStateClicked] = useState(1);
  const [wordNumber, setStateWordNumber] = useState(1);

  useEffect(() => {
    var dataAnswerConfigFormat = formatDataConfig(data);
    let dataAnswerConfig = dataAnswerConfigFormat[indexQuestion];
    setStateDataAnswerConfigFormat(dataAnswerConfigFormat);
    let synDataText = JSON.parse(
      dataAnswerConfig?.question[0]?.props[0]?.audio[0]?.sync_data
    );
    setStateDataSyncText(synDataText);

    let positionAnswer = JSON.parse(dataAnswerConfig.question[0].tracing);

    let getDataAnswer = [];
    dataAnswerConfig.answer.forEach((answerConfig, key) => {
      getDataAnswer.push({
        text: answerConfig[0].icon.props[0].text,
        before: "",
        after: answerConfig[0].icon.props[0].text,
        currentWord: "",
        top:
          (720 / 500) * positionAnswer.position[key].vertical_axis_px -
          10 +
          "px",
        left:
          (720 / 500) * positionAnswer.position[key].horizontal_axis_px -
          5 +
          "px",
      });
    });

    setStateDataAnswer(getDataAnswer);
    setStateDataAnswerConst(getDataAnswer);

    let timeOutSyncText = [];
    dataSyncText.map((synText) => {
      timeOutSyncText.push(synText.e - synText.s);
    });

    let conditionCheckClick = [];
    let start = 0;
    let sumWords = 0;
    let conditionResetClick = [];
    dataAnswerConst.forEach((anwser, key) => {
      let words = anwser.text.trim().split(" ");
      let lengthWords = words.length;
      sumWords = sumWords + lengthWords;
      conditionCheckClick.push({ start: start, end: lengthWords + start });
      if (key == dataAnswerConst.length - 1) {
        conditionResetClick.push(lengthWords + start + 2);
      } else {
        conditionResetClick.push(lengthWords + start);
      }
      start = start + lengthWords;
    });

    setStateCountSumWords(sumWords);

    let timeout;

    if (isPlay) {
      if (clicked <= sumWords + 2) {
        timeout = setTimeout(() => {
          if (_.includes(conditionResetClick, clicked)) {
            setStateWordNumber(1);
          } else {
            setStateWordNumber(wordNumber + 1);
          }
          setStateClicked(clicked + 1);
        }, timeOutSyncText[clicked - 1]);

        for (let i = 0; i < conditionCheckClick.length; i++) {
          let start = conditionCheckClick[i]["start"];
          let end =
            i == conditionCheckClick.length - 1
              ? conditionCheckClick[i]["end"] + 2
              : conditionCheckClick[i]["end"];

          if (clicked > start && clicked <= end) {
            let text = dataAnswer[i].text;
            let words = text.trim().split(" ");
            let before = words.slice(0, wordNumber - 1).join(" ") + " ";
            let after = " " + words.slice(wordNumber, words.length).join(" ");
            let currentWord = words[wordNumber - 1];
            const data = {};
            data.text = text;
            data.before = before.includes("##")
              ? before.replace("##", " ")
              : before;
            data.after = after.includes("##")
              ? after.replace("##", " ")
              : after;
            data.currentWord = currentWord === "##" ? " " : currentWord;
            dataAnswer[i] = data;
            if (i !== 0) {
              dataAnswer[i - 1] = dataAnswerConst[i - 1];
            }
          }
        }

        setStateDataAnswer(dataAnswer);
      } else {
        dataAnswer[conditionCheckClick.length - 1] =
          dataAnswerConst[conditionCheckClick.length - 1];
        setStateDataAnswer(dataAnswer);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [clicked, isPlay, indexQuestion]);

  return (
    <Fragment>
      <KaraokeContainerWrapper>
        <div style={{ textAlign: "center" }}>
          <ReactAudioPlayer
            src={`${URL_AUDIO}${dataAnswerConfigFormat[indexQuestion]?.question[0]?.props[0]?.audio[0]?.path}`}
            autoPlay={isPlay}
            controls
            onPause={() => setStateIsPlay(false)}
            onPlay={onPlayAudio}
          />
        </div>
        <div className="wrapContainer quicksand-medium">
          <img
            height="auto"
            src={`${URL_IMAGE_QUESTION}${dataAnswerConfigFormat[indexQuestion]?.question[0]?.path}`}
            className="w-100"
          />

          {dataAnswer.map((anwser, index) => {
            return (
              <p
                style={{
                  position: "absolute",
                  top: `${anwser.top}`,
                  left: `${anwser.left}`,
                  fontSize: `${fontSizeCustom}`,
                }}
                key={index}
              >
                <span>
                  {anwser.before.includes("##")
                    ? anwser.before.replaceAll("##", "")
                    : anwser.before}
                  <span style={{ color: "red" }}>
                    {anwser.currentWord === "##" ? "" : anwser.currentWord}
                  </span>
                  {anwser.after.includes("##")
                    ? anwser.after.replaceAll("##", "")
                    : anwser.after}
                </span>
              </p>
            );
          })}
        </div>

        <FooterComponent
          data={dataAnswerConfigFormat}
          indexQuestion={indexQuestion}
          onHandleQuestion={onHandleQuestion}
        ></FooterComponent>
      </KaraokeContainerWrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  return {
    alert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(KaraokeContainer);

const KaraokeContainerWrapper = styled.div`
  .wrapContainer {
    position: relative;
    text-align: center;
    width: 720px;
    margin: 10px auto;
  }
`;
