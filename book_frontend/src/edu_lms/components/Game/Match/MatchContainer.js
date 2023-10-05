import React, { useState, useEffect, Fragment } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import { postHistoryGame } from "../../../services/readingBook";
import {
  onFormatDataAnswer,
  onFormatData,
  onFormatDataQuestion,
} from "../DragDrop/selection";
import { onNumberOffsetX, onNumberOffsetY } from "./selection";
import FooterMatch from "./components/FooterMatch";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertErrorEnglish,
  AlertSuccessEnglish,
  AlertErrorValidate,
} from "../selection";
import MatchWrapper from "./components";
import { TYPE_ENGLISH } from "../../../constants/type";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../modules/General/actions";

const MatchContainer = ({
  data,
  dataDefault,
  objectId,
  alert,
  onDispatchDataAlert,
  languageBook,
  onDispatchIsClickRefresh,
  onDispatchIsClickSubmitAnswer,
}) => {
  const numberSizeImage = 183;
  const numberSizeText = 60;
  const numberSizeMatchWrapper = 800;
  const [dataAnswer, setStateDataAnswer] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState([]);
  const [isDislabeled, setStateDislabled] = useState(true);
  const [dataInput, setDataInput] = useState({});

  const [styleBox, setStyleBox] = useState({
    sizeHeight:
      Number(data.game_config?.type_display) == 2
        ? numberSizeText
        : numberSizeImage,
    sizeWidth:
      Number(data.game_config?.type_display) == 2 ? "300" : numberSizeImage,
  });
  const [canvas, setStateCanvas] = useState("");
  const [point, setStatePoint] = useState([]);
  const [numberPoint, setStateNumberPoint] = useState(0);
  const [NumberBox, setStateNumberBox] = useState(0);
  const [idBox, setStateIdBox] = useState([]);
  const [isDislabeledResult, setStateDislabeledResult] = useState(true);
  const [disabledBoxItem, setStateDisabledBoxItem] = useState(false);
  const [countCorrect, setCountCorrect] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setStyleBox({
      sizeHeight:
        Number(data.game_config?.type_display) == 2
          ? numberSizeText
          : numberSizeImage,
      sizeWidth:
        Number(data.game_config?.type_display) == 2 ? "300" : numberSizeImage,
    });
  }, [data]);

  useEffect(() => {
    let input = { ...dataDefault.game_config };
    setDataInput(input);
  }, [dataDefault]);

  useEffect(() => {
    if (dataInput?.results) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataInput),
      };
      postHistoryGame(dataPost);
    }
  }, [dataInput]);

  useEffect(() => {
    const newData = onFormatData(data);
    const dataQuestionConfig = onFormatDataQuestion(newData, data, 1);
    const dataAnswerConfig = onFormatDataAnswer(data, 1);
    const resultAnswer = dataQuestionConfig.map((item) => [
      ...item.id_answer,
      item.icon_id,
    ]);
    const dataQuestion = dataQuestionConfig.map((item, index) => {
      const result = resultAnswer.filter((itemAnswer) =>
        _.includes(itemAnswer, item.icon_id)
      )[0];
      return { ...item, result_answer: result };
    });
    const dataAnswer = dataAnswerConfig.map((item, index) => {
      const result = resultAnswer.filter((itemAnswer) =>
        _.includes(itemAnswer, item.icon_id)
      )[0];
      return { ...item, result_answer: result };
    });
    setStateDataAnswer(dataAnswer);
    setStateDataQuestion(dataQuestion);

    setTimeout(() => {
      let box = document.querySelector("#cover-canvas");
      const canvas = new fabric.Canvas("canvas-match", {
        height: box.clientHeight,
        width: box.clientWidth,
      });
      setStateCanvas(canvas);
    }, 200);

    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data]);

  const onAction = (e, id, number, type = 1) => {
    const numberTop = number === 1 ? 20 : 320;
    const numberOffsetX = onNumberOffsetX(
      number,
      e,
      numberTop,
      Number(data.game_config?.type_display),
      dataQuestion.length / 2,
      type,
      numberSizeMatchWrapper
    );
    const numberOffsetY = onNumberOffsetY(
      number,
      e,
      numberTop,
      Number(data.game_config?.type_display),
      dataQuestion.length / 2,
      type,
      numberSizeMatchWrapper
    );
    const dataPoint = [
      ...point,
      { id: type, x: numberOffsetX, y: numberOffsetY },
    ];

    const newIdBox = [...idBox, id];
    setStateDislabled(false);
    const objects = canvas.getObjects("line");
    if (objects.length > 0) {
      objects.forEach((item) => {
        const array_1 = _.split(item.id, ",");
        if (_.includes(array_1, id)) {
          canvas.remove(item);
        }
      });
    }
    if (numberPoint + 1 === 2) {
      if (number !== NumberBox) {
        const isIdPoint = dataPoint.filter((item) => item.id === 2);

        let newDataPoint = [];
        if (isIdPoint.length > 0) {
          dataPoint.forEach((item) => {
            if (item.id === 1) {
              newDataPoint = [...newDataPoint, item["x"] + 180, item["y"]];
            } else {
              newDataPoint = [...newDataPoint, item["x"], item["y"]];
            }
          });
        } else {
          dataPoint.forEach((item) => {
            newDataPoint = [...newDataPoint, item["x"], item["y"]];
          });
        }
        const converDataPoint = _.reject(newDataPoint, _.isNil);
        canvas.add(
          new fabric.Line([...converDataPoint], {
            stroke: "blue",
            strokeWidth: 2,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: "default",
            id: _.join(newIdBox, ","),
          })
        );
        canvas.renderAll();
        if (canvas.getObjects("line").length === dataAnswer.length) {
          setStateDislabeledResult(false);
        } else {
          setStateDislabeledResult(true);
        }
        setStateNumberPoint(0);
        setStatePoint([]);
        setStateIdBox([]);
      } else {
        setStatePoint([...point, dataPoint]);
      }
    } else {
      setStateNumberBox(number);
      setStatePoint(dataPoint);
      setStateIdBox(newIdBox);
      setStateNumberPoint(numberPoint + 1);
    }
  };

  const onResetData = () => {
    setShowAlert(false);
    setCountCorrect(0);
    onDispatchIsClickRefresh(true);
    const dataLine = canvas.getObjects("line");
    dataLine.forEach((item) => {
      canvas.remove(item);
    });

    canvas.renderAll();
    const dataAnswrDefault = dataAnswer.map((item) => ({ ...item, status: 0 }));
    const dataQuestionDefault = dataQuestion.map((item) => ({
      ...item,
      status: 0,
    }));
    setStateDataAnswer(dataAnswrDefault);
    setStateDataQuestion(dataQuestionDefault);
    setStateDislabled(true);
    setStateDislabeledResult(true);
    setStateDisabledBoxItem(false);
    onDispatchDataAlert(AlertDefault);
  };

  const onCheckAnswer = () => {
    setShowAlert(true);
    onDispatchIsClickSubmitAnswer(true);
    if (isDislabeledResult) {
      onDispatchDataAlert(AlertErrorValidate);
    } else {
      const dataLine = canvas
        .getObjects("line")
        .map((item) => _.split(item.id, ","));

      setDataInput({ ...dataInput, results: dataLine });
      const dataQuestionConfig = dataQuestion.map((item) => {
        const data = dataLine.filter((itemLine) =>
          _.isEmpty(_.xor(item.result_answer, itemLine))
        );
        data[0]?.length > 0 ? (item.status = 1) : (item.status = 2);
        return { ...item };
      });
      const dataAnswerConfig = dataAnswer.map((item) => {
        const data = dataLine.filter((itemLine) =>
          _.isEmpty(_.xor(item.result_answer, itemLine))
        );
        data[0]?.length > 0 ? (item.status = 1) : (item.status = 2);
        return { ...item };
      });

      let count = 0;
      dataQuestionConfig.map((_item, _index) => {
        if (_item.status == 1) {
          count++;
        }
      });
      setCountCorrect(count);
      setStateDataQuestion(dataQuestionConfig);
      setStateDataAnswer(dataAnswerConfig);
      setStateDisabledBoxItem(true);
      const isStatus = _.filter(dataAnswerConfig, function (o) {
        return o.status !== 1;
      });
      const alert =
        isStatus.length > 0
          ? languageBook == TYPE_ENGLISH
            ? AlertErrorEnglish
            : AlertError
          : languageBook == TYPE_ENGLISH
          ? AlertSuccessEnglish
          : AlertSuccess;
      onDispatchDataAlert(alert);
    }
  };

  return (
    <Fragment>
      <MatchContainerWrapper>
        <MatchWrapper
          dataQuestion={dataQuestion}
          dataAnswer={dataAnswer}
          styleBox={styleBox}
          disabledBoxItem={disabledBoxItem}
          onAction={onAction}
          typeGame={Number(data.game_config?.type_game)}
          typeDisplay={Number(data.game_config?.type_display)}
          typeDisplayContent={data.game_config?.type_question}
          columnTitleLeft={data.game_config?.column_title_left}
          columnTitleRight={data.game_config?.column_title_right}
          fontSizeContent={data.game_config?.font_size_content}
          numberSizeMatchWrapper={numberSizeMatchWrapper}
        />
      </MatchContainerWrapper>
      <FooterMatch
        isDislabeled={isDislabeled}
        isDislabeledResult={isDislabeledResult}
        disabledBoxItem={disabledBoxItem}
        dataAnswer={dataAnswer}
        onResetData={onResetData}
        onCheckAnswer={onCheckAnswer}
        countCorrect={countCorrect}
        totalQuestion={dataAnswer.length}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
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
      onDispatchIsClickRefresh,
      onDispatchIsClickSubmitAnswer,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);

const MatchContainerWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
  height: 92%;
  .answer-wrapper,
  .question-wrapper {
    z-index: 12;
    position: relative;
    .box-item {
      &:hover {
        background-color: rgba(102, 217, 255, 0.2) !important;
      }
    }
  }
  .canvas-container {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    z-index: 11;
  }
`;
