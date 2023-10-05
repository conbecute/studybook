import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import ReactAudioPlayer from "react-audio-player";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import {
  TYPE_ENGLISH,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import { formatDataListAnswer, getListColor } from "./selection";
import FooterColor from "./components/FooterColor";
import { postHistoryGame } from "../../../services/readingBook";
import {
  AlertDefault,
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
} from "../selection";
import ButtonReset from "../DragDrop/component/ButtonReset";
import SuccessComponent from "../component/SuccessComponent";

const ColorContainer = ({
  data,
  alert,
  objectId,
  onDispatchDataAlert,
  languageBook,
}) => {
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [listColor, setStateListColor] = useState([]);
  const [listAnwser, setStateListAnwser] = useState([]);
  const [srcAudio, setStateAudio] = useState("");
  const [isReview, setStateReview] = useState(true);
  const [currentColor, setStateCurrentColor] = useState("");
  const [inputData, setInputData] = useState({});
  const [countCorrect, setCountCorrect] = useState(0);
  useEffect(() => {
    let countQuestion = data.game_config.data.length;
    setInputData({
      ...data.game_config,
      results: Array(countQuestion).fill([]),
    });
  }, [data]);

  useEffect(() => {
    if (checkComplete(inputData.results)) {
      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(inputData),
      };
      postHistoryGame(dataPost);
    }
  }, [inputData]);

  const checkComplete = (array) => {
    if (!array) {
      return false;
    }

    return !array?.some((item) => item.length == 0);
  };

  const changeColor = (colorId) => {
    listColor.map((color) => {
      if (color.id === colorId) {
        color.marginBottom = "-50px";
      } else {
        color.marginBottom = "-120px";
      }
    });
    setStateCurrentColor(colorId);
    setStateListColor(listColor);
  };

  const changeImage = (answerId) => {
    const dataConfig = listAnwser.map((answer, keyAnswer) => {
      if (answer.answer === answerId) {
        answer.list_color_answer.map((color) => {
          if (color[0].color_id === currentColor) {
            listAnwser[keyAnswer].url = color.url;
          }
          return { ...color };
        });
      }
      return { ...answer };
    });
    setStateListAnwser(dataConfig);
  };

  const onNextQuestion = () => {
    setStateIndexQuestion(indexQuestion + 1);
    setStateReview(true);
    onDispatchDataAlert(AlertDefault);
  };

  const onReview = () => {
    let isStatus = true;
    listAnwser.forEach((answer) => {
      const checkAnswer = answer.list_color_answer.filter(
        (checkAnser) => checkAnser.url === answer.url
      );
      if (checkAnswer.length === 0) {
        answer.list_color_answer.map((answer) => {
          if (answer[0].is_correct) {
            isStatus = false;
            return false;
          }
        });
      } else {
        if (!checkAnswer[0][0]?.is_correct) {
          isStatus = false;
          return false;
        }
      }
    });
    let input = _.cloneDeep(inputData);
    input.results[indexQuestion] = {
      data: listAnwser,
      status: isStatus,
    };
    setInputData(input);
    data.game_config.data[indexQuestion].result = isStatus ? 2 : 3;

    if (isStatus) {
      setCountCorrect((pre) => pre + 1);
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertSuccessEnglish);
      } else {
        onDispatchDataAlert(AlertSuccess);
      }
    } else {
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertErrorEnglish);
      } else {
        onDispatchDataAlert(AlertError);
      }
    }
    setStateReview(false);
  };

  const onResetDataQuiz = () => {
    data.game_config.data.map((answer) => {
      answer.result = "";
      return { ...answer };
    });
    setStateIndexQuestion(0);
    onDispatchDataAlert(AlertDefault);
  };

  const onResetData = () => {
    let dataListAnswer = formatDataListAnswer(data);
    let dataFormat = dataListAnswer[indexQuestion].list_answer;
    setStateListAnwser(dataFormat);
    onDispatchDataAlert(AlertDefault);
  };

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  useEffect(() => {
    if (indexQuestion < data.game_config.data.length) {
      let dataListColor = getListColor(data.game_config.list_color);
      setStateListColor(dataListColor);
      let dataListAnswer = formatDataListAnswer(data);
      setStateAudio(
        dataListAnswer[indexQuestion]?.icon[0]?.props[0]?.audio[0]?.path
      );
      let dataFormat = dataListAnswer[indexQuestion].list_answer;
      setStateListAnwser(dataFormat);
    }
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data, indexQuestion]);

  return (
    <Fragment>
      {indexQuestion >= data.game_config.data.length ? (
        <SuccessComponent
          totalQuestion={data.game_config.data.length}
          countCorrect={countCorrect}
          languageBook={languageBook}
          onResetData={onResetDataQuiz}
        />
      ) : (
        <ColorContainerWrapper>
          <div className="wrapContainer">
            <div className="wrapTitleQuestion">
              <ButtonReset
                className="buttonReset"
                onResetData={onResetData}
                isDislabeled={false}
              />
            </div>
            <div className="wrapQuestion">
              <ReactAudioPlayer
                src={`${URL_AUDIO}${srcAudio}`}
                autoPlay={false}
                controls
              />
            </div>
            <div className="wrapContent">
              {listAnwser.map((answer, index) => (
                <img
                  onClick={() => {
                    changeImage(answer.answer);
                  }}
                  width="220px"
                  key={index}
                  height="auto"
                  src={`${URL_IMAGE_QUESTION}${answer.url}`}
                />
              ))}
            </div>
            <div className="wrapChoose">
              {listColor.map((item, index) => (
                <img
                  onClick={() => {
                    changeColor(item.id);
                  }}
                  key={index}
                  height="auto"
                  src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/game/${item.url}`}
                  className="wrapChooseColor"
                  style={{ marginBottom: item.marginBottom }}
                />
              ))}
            </div>
          </div>
          <FooterColor
            indexQuestion={indexQuestion}
            data={data.game_config.data}
            isDisabled={true}
            isReview={isReview}
            onReview={onReview}
            alert={alert}
            languageBook={languageBook}
            onNextQuestion={onNextQuestion}
            handleDispatchDataAlert={handleDispatchDataAlert}
          />
        </ColorContainerWrapper>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorContainer);

const ColorContainerWrapper = styled.div`
  .wrapContainer {
    margin-top: 70px !important;
  }
  .wrapQuestion {
    display: flex;
    justify-content: center;
  }
  .wrapTitleQuestion {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-top: -60px;
  }
  .buttonReset {
    position: absolute;
    right: 50px;
  }
  .wrapContent {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
  }
  .wrapChoose {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapChooseColor {
    width: 50px;
    // margin-bottom: -120px;
  }
`;
