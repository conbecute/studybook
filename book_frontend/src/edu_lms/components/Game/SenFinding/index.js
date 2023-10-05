import React, { useState, useEffect, Fragment } from "react";
import WordFindingWrapper from "./components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { onResultAnswerIcon } from "../selection";
import { onDispatchIsClickSubmitAnswer } from "../../../modules/General/actions";
import { useDispatch } from "react-redux";
import { ANSWER_GAME_SEN_FINDING } from "../../../constants/type";
import { postHistoryGame } from "../../../services/readingBook";
import { AlertDefault, AlertErrorValidate } from "../selection";
import { onDispatchDataAlert } from "../../ListQuestion/actions";

const SenFindingContainer = ({
  data,
  objectId,
  onDispatchIsClickSubmitAnswer,
}) => {
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState();
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [isDisabled, setStateDisabled] = useState(false);
  const [inputData, setInputData] = useState({});
  const [countCorrect, setCountCorrect] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [totalChoose, setTotalChoose] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let input = _.cloneDeep(data.game_config);
    input.data[0].results = {
      data: [],
      status: 0,
    };

    setInputData(input);
    const dataAnswersConfig = data.game_config.data.map((dataParagraphItem) => {
      const dataParagraph = onResultAnswerIcon(
        dataParagraphItem.paragraph,
        data?.icon_list[0]?.icons,
        1,
        "sentence_id"
      );
      return { ...dataParagraphItem, paragraph: dataParagraph };
    });
    const dataQuestionConfig = data?.icon_list[0]?.icons.filter(
      (icon) => icon.icon_id === data.game_config?.question?.icon_id
    )[0];
    setStateDataQuestion(dataQuestionConfig);
    setStateDataAnswers(dataAnswersConfig);
    dispatch(onDispatchDataAlert(AlertDefault));
  }, [data]);

  const onActiveText = (answerId) => {
    const newData = dataAnswers.map((dataItem) => {
      const dataParagraph = dataItem.paragraph.map((item) => {
        if (item.sentence_id === answerId) {
          item.status = item.status ? 0 : 1;
        }
        return { ...item };
      });
      return { ...dataItem, paragraph: dataParagraph };
    });
    setStateDataAnswers(newData);
    setSelected(true);
  };

  const onResetData = () => {
    const dataConfig = data.game_config.data.map((dataParagraphItem) => {
      const dataParagraph = onResultAnswerIcon(
        dataParagraphItem.paragraph,
        data?.icon_list[0]?.icons,
        1,
        "sentence_id"
      );
      return { ...dataParagraphItem, paragraph: dataParagraph };
    });
    setStateDataAnswers(dataConfig);
    setStateButtonReset(false);
    setStateDisabled(false);
    dispatch(onDispatchDataAlert(AlertDefault));
    setSelected(false);
    setShowAlert(false);
    setCountCorrect(0);
  };
  const onCheckAnswers = () => {
    setStateButtonReset(true);
    if (isSelected) {
      let correct = 0;
      let miss = 0;
      onDispatchIsClickSubmitAnswer(true);
      const dataConfig = dataAnswers.map((data) => {
        const dataParagraph = data.paragraph.map((item) => {
          if (item.correct) {
            if (item.status !== 0) {
              item.status = 2;
              correct++;
            }
            if (item.status === 0) {
              item.status = 4;
              miss++;
            }
          } else {
            if (item.status !== 0) {
              item.status = 3;
            }
          }
          return { ...item };
        });
        return { ...data, paragraph: dataParagraph };
      });

      let status = true;
      let choose = 0;
      dataConfig[0]?.paragraph.forEach((_item, _index) => {
        if (
          parseInt(_item.status) !== ANSWER_GAME_SEN_FINDING.DEFAULT &&
          parseInt(_item.status) !== ANSWER_GAME_SEN_FINDING.CORRECT &&
          status
        ) {
          status = false;
        }
        if (
          parseInt(_item.status) === ANSWER_GAME_SEN_FINDING.CORRECT ||
          parseInt(_item.status) === ANSWER_GAME_SEN_FINDING.WRONG
        ) {
          choose = choose + 1;
        }
      });
      setTotalChoose(choose);
      setCountCorrect(correct);
      setTotalQuestion(miss + correct);
      let input = _.cloneDeep(inputData);
      input.data[0].results.data = dataConfig[0].paragraph;
      input.data[0].results.status = status ? 1 : 0;
      let dataPost = {
        objectId: objectId,
        gameId: data.game_id,
        data: JSON.stringify(input),
      };
      postHistoryGame(dataPost);
      setInputData(input);

      setStateDataAnswers(dataConfig);
      setStateDisabled(true);
    } else {
      dispatch(onDispatchDataAlert(AlertErrorValidate));
    }
    setShowAlert(true);
  };
  const handleDispatchDataAlert = () => {
    dispatch(onDispatchDataAlert(AlertDefault));
  };

  return (
    <Fragment>
      <WordFindingWrapper
        dataAnswers={dataAnswers}
        dataQuestion={dataQuestion}
        isButtonReset={isButtonReset}
        isDisabled={isDisabled}
        dataGameConfig={data.game_config}
        onActiveText={onActiveText}
        onCheckAnswers={onCheckAnswers}
        onResetData={onResetData}
        handleDispatchDataAlert={handleDispatchDataAlert}
        countCorrect={countCorrect}
        totalQuestion={totalQuestion}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        totalChoose={totalChoose}
        isSelected={isSelected}
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
export default connect(null, mapDispatchToProps)(SenFindingContainer);
