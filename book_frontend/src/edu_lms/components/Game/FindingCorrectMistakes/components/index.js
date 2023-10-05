import React, { Fragment, useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import _ from "lodash";
import { useSelector } from "react-redux";

import { onChangeColor } from "../selection";
import TitleQuestion from "../components/TitleQuestion";
import { TypeQuestion } from "../selection";

import {
  COLOR_RED,
  COLOR_GRAY,
  COLOR_BLUE,
  URL_AUDIO,
} from "../../../../constants/type";
import { BOOK_LANGUAGE } from "./../../../../constants/type";

const WordFindingWrapper = ({
  data,
  isDisabled,
  typeQuestion,
  typeText,
  typeAnswer,
  fontSize,
  onActiveText,
  handleSubmit,
  setValue,
  getValues,
  register,
}) => {
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const [audio, setAudio] = useState({
    audio: new Audio(""),
  });
  const [listStatusAudio, setlistStatusAudio] = useState([]);

  const formatText = (str) => {
    return str
      ?.replace("|1|", "")
      ?.replace("|2|", "")
      ?.replace("|3|", "")
      ?.replace("|4|", "")
      ?.replace("|5|", "")
      ?.replace("|6|", "")
      ?.replace("|7|", "")
      ?.replace("|8|", "")
      ?.replace("|9|", "")
      ?.replace("|10|", "");
  };

  const onChangeValue = (e, name) => {
    setValue(name, e?.target?.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  audio.audio.onended = function () {
    resetStatusAudio(null);
  };

  const resetStatusAudio = (i) => {
    let listStatus = [];
    data?.answers.map((value, index) => {
      if (index == i) {
        listStatus[index] = true;
      } else {
        listStatus[index] = false;
      }
    });
    setlistStatusAudio(listStatus);
  };
  const toggleChange = (e) => {
    let index = e.target.getAttribute("index");
    resetStatusAudio(index);
    audio?.audio?.pause();
    let url = URL_AUDIO + data?.answers[index]?.props[0]?.audio[0]?.path;
    setAudio({
      url,
      audio: new Audio(url),
      isPlaying: false,
    });
  };

  useEffect(() => {
    resetStatusAudio(null);
  }, [data?.answers]);

  useEffect(() => {
    if (audio?.audio) {
      audio?.audio
        ?.play()
        .then(() => audio.audio.play())
        .catch((e) => console.log(e));
    }
  }, [audio]);

  return (
    <div>
      <TitleQuestion
        data={data?.question}
        typeQuestion={typeQuestion}
        typeText={typeText}
        fontSize={fontSize}
      />
      <form onSubmit={handleSubmit}>
        <div className="find-words-body p-3 quicksand-medium">
          {data?.answers.map((item, index) => {
            return (
              <div className="d-inline-flex justify-content-between w-100 pt-2 pb-2 game-finding-correct-answer">
                <div className="d-inline-flex">
                  {_.includes(typeAnswer, TypeQuestion.AUDIO) &&
                    item?.props[0]?.audio[0]?.path && (
                      <div>
                        {listStatusAudio[index] ? (
                          <i
                            index={index}
                            onClick={toggleChange}
                            style={{
                              color: "red",
                              fontSize: "30px",
                              cursor: "pointer",
                            }}
                            className="fa fa-pause-circle"
                          ></i>
                        ) : (
                          <i
                            index={index}
                            onClick={toggleChange}
                            style={{
                              color: "dodgerblue",
                              fontSize: "30px",
                              cursor: "pointer",
                            }}
                            className="fa fa-play-circle"
                          ></i>
                        )}
                      </div>
                    )}
                  <div key={index} className="d-flex flex-wrap">
                    {item?.answer_text.map((itemText, indexText) => {
                      return (
                        <div key={indexText}>
                          <span
                            className={`${onChangeColor(
                              itemText.status
                            )} pl-1 pr-1 cursor rounded-pill hvr-registration`}
                            style={{
                              fontSize: fontSize ? `${fontSize}px` : "",
                              borderStyle: "solid",
                              lineHeight: "1.5",
                              borderWidth: "2px",
                              pointerEvents: `${
                                isDisabled ? "none" : "inherit"
                              }`,
                            }}
                            onClick={() =>
                              onActiveText(itemText, item.answer_id)
                            }
                          >
                            {formatText(itemText.value)}
                          </span>
                          <span>&nbsp;</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {item.input.show && (
                  <ContentEditable
                    index={item.answer_id}
                    autoComplete="off"
                    style={{
                      fontSize: fontSize ? `${fontSize}px` : "",
                      width: "auto",
                      border: `1px solid ${onColorBorder(item.input.status)}`,
                      borderRadius: "5px",
                      maxWidth: "30%",
                    }}
                    className="form-control h-100"
                    html={getValues(item.answer_id) || ""}
                    name={item.answer_id}
                    placeholder={`${
                      BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                        ?.correct_placeholder
                    }`}
                    onChange={(e) => onChangeValue(e, item.answer_id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default WordFindingWrapper;

function onColorBorder(status) {
  let result = COLOR_GRAY;
  if (status === 1) {
    result = COLOR_BLUE;
  }
  if (status === 2) {
    result = COLOR_RED;
  }
  return result;
}
