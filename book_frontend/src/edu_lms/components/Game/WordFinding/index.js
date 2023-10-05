import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WordFindingWrapper from "./components";
import { onConfigData, formatResult } from "./selection";
import { onDispatchIsClickSubmitAnswer } from "../../../modules/General/actions";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  ANSWER_GAME_WORD_FINDING,
  FORMAT_GAME_WORD_FINDING,
} from "../../../constants/type";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { postHistoryGame } from "../../../services/readingBook";
import { AlertDefault, AlertErrorValidate } from "../selection";
const WordFindingContainer = ({
  data,
  objectId,
  onDispatchIsClickSubmitAnswer,
}) => {
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [isDisabled, setStateDisabled] = useState(false);
  const [inputData, setInputData] = useState({});
  const [countCorrect, setCountCorrect] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalChoose, setTotalChoose] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [isAlert, setAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const dataConfig = onConfigData(data);
    setInputData({ ...data.game_config });
    setStateDataAnswers(dataConfig);
    dispatch(onDispatchDataAlert(AlertDefault));
  }, [data]);

  const onActiveText = (data, answerId) => {
    const newData = dataAnswers.map((dataItem) => {
      dataItem.answers.map((item) => {
        if (item.answer_id === answerId) {
          item.answer_text.map((answerItem) => {
            if (answerItem.id === data.id) {
              answerItem.status = answerItem.status === 1 ? 0 : 1;
            }
            return { ...answerItem };
          });
        }
        return { ...item };
      });
      return { ...dataItem };
    });

    setSelected(true);
    setStateDataAnswers(newData);
  };

  const onResetData = () => {
    setAlert(false);
    setCountCorrect(0);
    setTotalQuestion(0);
    const dataConfig = onConfigData(data);
    dispatch(onDispatchDataAlert(AlertDefault));
    setStateDataAnswers(dataConfig);
    setStateButtonReset(false);
    setStateDisabled(false);
    setSelected(false);
  };
  const onCheckAnswers = () => {
    setAlert(true);
    if (isSelected) {
      let status = true;
      const resultAnswers = formatResult(dataAnswers[0]);
      onDispatchIsClickSubmitAnswer(true);
      let correct = 0;
      let totalChoose = 0;
      let miss = 0;
      const dataConfig = resultAnswers.map((answerItem, _indexAnswer) => {
        const newDataAnswer = answerItem.answers.map((data, _inputItem) => {
          data.answer_text.forEach((item) => {
            if (
              parseInt(item.status) !== ANSWER_GAME_WORD_FINDING.CHECK_ANSWER
            ) {
              totalChoose++;
            }
          });
          let newData;
          if (data.answer_result?.length > 0) {
            newData = data.answer_text.map((item) => {
              if (
                _.includes(
                  data.answer_result,
                  item.value.replace(FORMAT_GAME_WORD_FINDING, "")
                )
              ) {
                switch (item.status) {
                  case 0:
                    item.status = ANSWER_GAME_WORD_FINDING.DEFAULT;
                    miss++;
                    status = false;
                    break;
                  case 1:
                    item.status = ANSWER_GAME_WORD_FINDING.CORRECT;
                    correct++;
                    break;
                  default:
                    return false;
                }
              } else {
                if (item.status !== ANSWER_GAME_WORD_FINDING.CHECK_ANSWER) {
                  item.status = ANSWER_GAME_WORD_FINDING.WRONG;
                  status = false;
                }
              }
              return { ...item };
            });
          } else {
            newData = data.answer_text.map((item) => {
              if (item.status !== ANSWER_GAME_WORD_FINDING.CHECK_ANSWER) {
                item.status = ANSWER_GAME_WORD_FINDING.WRONG;
                status = false;
              }
              return { ...item };
            });
          }
          return { ...data, answer_text: newData };
        });
        return { ...answerItem, answers: newDataAnswer };
      });
      setStateDataAnswers(resultAnswers);
      setCountCorrect(correct);
      setTotalQuestion(miss + correct);
      let input = _.cloneDeep(inputData);
      input.data[0].answers[0].results = dataConfig[0].answers[0].answer_text;

      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(input),
      };
      setTotalChoose(totalChoose);
      postHistoryGame(dataPost);
      setStateButtonReset(true);
      setStateDisabled(true);
    } else {
      dispatch(onDispatchDataAlert(AlertErrorValidate));
    }
  };

  const handleDispatchDataAlert = () => {
    dispatch(onDispatchDataAlert(AlertDefault));
  };
  return (
    <Fragment>
      <WordFindingWrapper
        data={dataAnswers[0]}
        isButtonReset={isButtonReset}
        dataGameConfig={data.game_config}
        onActiveText={onActiveText}
        onCheckAnswers={onCheckAnswers}
        onResetData={onResetData}
        isDisabled={isDisabled}
        handleDispatchDataAlert={handleDispatchDataAlert}
        countCorrect={countCorrect}
        totalQuestion={totalQuestion}
        isAlert={isAlert}
        setAlert={setAlert}
        isSelected={isSelected}
        totalChoose={totalChoose}
      />
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchIsClickSubmitAnswer,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(WordFindingContainer);
