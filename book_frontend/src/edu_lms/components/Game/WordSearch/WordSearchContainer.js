import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";

import { AlertDefault } from "../selection";
import { AUDIO_SUCCESS, AUDIO_VICTORY } from "../../../constants/type";
import "./style.css";
import TitleQuestion from "./components/TitleQuestion";
import {
  formatQuestionTitle,
  formatDataAnswer,
  formatDataResult,
  formatShowDataResultImage,
  formatShowDataListResult,
} from "./selection";
import ButtonReset from "./components/ButtonReset";
import ReactAudioPlayer from "react-audio-player";
import Top from "./components/Top";
import Left from "./components/Left";
import LeftAndRight from "./components/LeffAndRight";
import { postHistoryGame } from "../../../services/readingBook";
import { GameContentWrapper } from "./styles";

const SearchWordContainer = ({
  data,
  onDispatchDataAlert,
  languageBook,
  gameId,
  objectId,
}) => {
  const [isFirework, setFirework] = useState(false);

  const [girds, setGirds] = useState(formatDataAnswer(data.game_config.answer));

  const [words] = useState(formatDataResult(data));
  const [wordsCorrect, setWordCorrect] = useState([]);

  const [chooseWord, setChooseWord] = useState([]);
  const [questionTitle] = useState(formatQuestionTitle(data));
  const [fontSizeTitle] = useState(data.game_config.fontSizeTitle);
  const [fontSizeAnswer] = useState(
    data.game_config.font_size_answer
      ? data.game_config.font_size_answer.replace("px", "")
      : 20
  );
  const [fontSizeAnswerPx] = useState(data.game_config.font_size_answer);
  const [fontSizeResult] = useState(data.game_config.font_size_result);
  const [templateType] = useState(data.game_config.template_type);
  const [listImage] = useState(formatShowDataResultImage(data));
  const [listResult] = useState(formatShowDataListResult(data));

  const [typeResult] = useState(data.game_config.type_result);
  const [srcAudio, setStateSrcAudio] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [lengthRow, setLengthRow] = useState(0);

  const reverseString = (str) => {
    return [...str].reverse().join("");
  };

  const checkPosition = (listPosition) => {
    let startPositionCheck = 0;
    let statusCheck = true;
    listPosition.forEach((check, _check) => {
      if (_check !== 0) {
        if (check - 1 !== startPositionCheck) {
          statusCheck = false;
          return false;
        }
      }
      startPositionCheck = check;
    });
    return statusCheck;
  };

  const checkPositionCell = (listPosition) => {
    let startPositionCheck = 0;
    let statusCheck = true;
    listPosition.forEach((check, _check) => {
      if (_check !== 0) {
        if (check !== startPositionCheck + lengthRow) {
          statusCheck = false;
          return false;
        }
      }
      startPositionCheck = check;
    });
    return statusCheck;
  };

  const checkPositionCross = (listPosition) => {
    let startPositionCheck = 0;
    let statusCheck = true;
    listPosition.forEach((check, _check) => {
      if (_check !== 0) {
        if (check !== startPositionCheck + lengthRow - 1) {
          statusCheck = false;
          return false;
        }
      }
      startPositionCheck = check;
    });
    return statusCheck;
  };
  const chooseCell = (iRow, iCell) => {
    const dataGirds = { ...girds };
    if (dataGirds[iRow][iCell].status == 1) {
      dataGirds[iRow][iCell].status = 0;
      dataGirds[iRow][iCell].check = false;
    } else {
      dataGirds[iRow][iCell].status = 1;
      dataGirds[iRow][iCell].check = true;
    }

    setGirds(Object.values(dataGirds));
    let dataChooseWord = [];
    let text = "";
    Object.values(dataGirds).forEach((row, _iRow) => {
      row.forEach((cell, _iCell) => {
        if (cell.status === 1) {
          dataChooseWord.push({
            text: cell.text,
            row: _iRow,
            cell: _iCell,
            position: row.length * _iRow + _iCell + 1,
          });
          setLengthRow(row.length);
          text += cell.text;
        }
      });
    });

    let listPosition = [];
    dataChooseWord.forEach((position, _indexPosition) => {
      listPosition.push(position.position);
    });

    let checkPointPosition = checkPosition(listPosition);
    let checkPointPositionCell = checkPositionCell(listPosition);
    let checkPointPositionCross = checkPositionCross(listPosition);

    setChooseWord(dataChooseWord);

    let revertText = reverseString(text);

    if (
      (words.includes(text) || words.includes(revertText)) &&
      (checkPointPosition || checkPointPositionCell || checkPointPositionCross)
    ) {
      setStateSrcAudio(AUDIO_SUCCESS);
      const dataGirds = { ...girds };
      dataChooseWord.forEach((word) => {
        dataGirds[word.row][word.cell].status = 3;
        setGirds(Object.values(dataGirds));
      });
      setFirework(true);
      setTimeout(() => {
        setFirework(false);
        const dataGirds = { ...girds };
        dataChooseWord.forEach((word) => {
          dataGirds[word.row][word.cell].status = 2;
          dataGirds[word.row][word.cell].check = false;
          setGirds(Object.values(dataGirds));
        });
      }, 1000);

      setWordCorrect([...wordsCorrect, text]);

      if (wordsCorrect.length === words.length - 1) {
        setStateSrcAudio(AUDIO_VICTORY);
        const endTime = new Date();
        const playTime = endTime - startTime;

        let dataPost = {
          objectId: objectId,
          gameId: data.game_id,
          data: {
            playTime,
          },
        };
        postHistoryGame(dataPost);
      }

      setChooseWord([]);
      if (wordsCorrect.length !== words.length - 1) {
        setTimeout(function () {
          setStateSrcAudio("");
        }, 1000);
      }
    }
  };

  const onResetData = () => {
    const listGirds = { ...girds };
    Object.values(listGirds).map((gird) => {
      gird.map((word) => {
        word.status = 0;
        return { word };
      });
      return { ...gird };
    });

    setStartTime(new Date());
    setGirds(Object.values(listGirds));
    setChooseWord([]);
    setWordCorrect([]);
    onDispatchDataAlert(AlertDefault);
  };

  return (
    <GameContentWrapper>
      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
      <TitleQuestion
        questionTitle={questionTitle}
        fontSizeTitle={fontSizeTitle}
      />
      {templateType === "1" && (
        <Top
          listResult={listResult}
          wordsCorrect={wordsCorrect}
          fontSizeResult={fontSizeResult}
          typeResult={typeResult}
          girds={girds}
          fontSizeAnswer={fontSizeAnswer}
          fontSizeAnswerPx={fontSizeAnswerPx}
          isFirework={isFirework}
          onChooseCell={chooseCell}
        />
      )}
      {templateType === "2" && (
        <Left
          listResult={listResult}
          wordsCorrect={wordsCorrect}
          fontSizeResult={fontSizeResult}
          typeResult={typeResult}
          girds={girds}
          fontSizeAnswer={fontSizeAnswer}
          fontSizeAnswerPx={fontSizeAnswerPx}
          isFirework={isFirework}
          onChooseCell={chooseCell}
        />
      )}
      {templateType === "4" && (
        <LeftAndRight
          listResult={listResult}
          wordsCorrect={wordsCorrect}
          fontSizeResult={fontSizeResult}
          typeResult={typeResult}
          girds={girds}
          fontSizeAnswer={fontSizeAnswer}
          fontSizeAnswerPx={fontSizeAnswerPx}
          isFirework={isFirework}
          onChooseCell={chooseCell}
          listImage={listImage}
        />
      )}
      <WrapperButtonReset>
        <ButtonReset
          isDislabeled={false}
          languageBook={languageBook}
          onResetData={onResetData}
          className=""
        />
      </WrapperButtonReset>
    </GameContentWrapper>
  );
};

const WrapperButtonReset = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
`;

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchWordContainer);
