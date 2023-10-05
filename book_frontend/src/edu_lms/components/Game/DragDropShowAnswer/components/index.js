import React, { useState, useEffect, Fragment } from "react";
import { DndProvider } from "react-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactAudioPlayer from "react-audio-player";
import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import BoxItem from "./BoxItem";
import Dustbin from "./Dustbin";
import _ from "lodash";
import {
  WrapperDragDroExercises,
  BoxWrapper,
  onFormatData,
  onFormatDataQuestion,
  onFormatDataAnswer,
  onChangeStatus,
} from "../selection";
import { AlertSuccessDefault, styleCssGrid } from "../../selection";
import { AUDIO_SUCCESS } from "../../../../constants/type";
import ButtonReset from "./ButtonReset";
import { AlertSuccess, AlertError, AlertDefault } from "../../selection";
import AlertComponent from "../../component/AlertComponent";

const DragDropImageAndText = ({ data, alert, onDispatchDataAlert }) => {
  const [dataAnswer, setStateDataAnswer] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState([]);
  const [isDislabeled, setSStateDislabeled] = useState(true);
  const [isButtonCheck, setStateButtonCheck] = useState(true);
  const [srcAudio, setStateSrcAudio] = useState("");

  useEffect(() => {
    // const dataConfig = _.intersectionBy(data.game_config.answer.couple_of_icon, 'icon_id_question');
    const newData = onFormatData(data);
    const dataQuestionConfig = onFormatDataQuestion(newData, data).map(
      (item) => ({ ...item, result: 0 })
    );
    const dataAnswerConfig = onFormatDataAnswer(data);
    setStateDataAnswer(dataAnswerConfig);
    setStateDataQuestion(dataQuestionConfig);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data]);

  const onSpliceData = (id) => {
    if (isDislabeled) {
      setSStateDislabeled(false);
    }
    const data = onChangeStatus(dataAnswer, id);
    setStateDataAnswer(data);
  };
  const onDustbin = (id, result) => {
    const data = onChangeStatus(dataQuestion, id, result);
    setStateDataQuestion(data);
    setStateSrcAudio(AUDIO_SUCCESS);
    setTimeout(function () {
      setStateSrcAudio("");
    }, 1000);
  };
  const onResetData = () => {
    const dataAnswerDefault = dataAnswer.map((item) => ({
      ...item,
      status: false,
    }));
    const dataQuestionDefault = dataQuestion.map((item) => ({
      ...item,
      status: false,
      result: 0,
    }));
    setStateDataAnswer(dataAnswerDefault);
    setStateDataQuestion(dataQuestionDefault);
    setStateButtonCheck(true);
    setSStateDislabeled(true);
    onDispatchDataAlert(AlertDefault);
  };
  const onCheckAnswers = () => {
    setStateButtonCheck(false);
    const result = dataQuestion.filter((item) => item.result === 2);
    if (result.length > 0) {
      onDispatchDataAlert(AlertError);
    } else {
      onDispatchDataAlert(AlertSuccessDefault);
    }
  };
  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };
  const disabledButtonCheck = dataQuestion.filter((item) => item.result === 0);
  const numberGrid = onResultNumberGrid(dataAnswer.length / 2);

  return (
    <Fragment>
      <WrapperDragDroExercises>
        <div className="w-100">
          <DndProvider backend={HTML5Backend}>
            <BoxWrapper>
              {dataAnswer.map((item, index) => {
                return (
                  <BoxItem
                    key={index}
                    item={item}
                    onSpliceData={onSpliceData}
                    typeAnswers={data?.game_config?.type_answer}
                  />
                );
              })}
            </BoxWrapper>
            <div style={{ ...styleCssGrid(numberGrid) }}>
              {dataQuestion.map((item, index) => {
                return (
                  <Dustbin
                    data={item}
                    key={index}
                    onDustbin={onDustbin}
                    isDislabeled={isDislabeled}
                    isButtonCheck={isButtonCheck}
                    typeQuestion={data?.game_config?.type_question}
                  />
                );
              })}
            </div>
          </DndProvider>
        </div>
      </WrapperDragDroExercises>
      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
      <ButtonReset
        isButtonCheck={isButtonCheck}
        onCheckAnswers={onCheckAnswers}
        onResetData={onResetData}
        disabledButtonCheck={disabledButtonCheck.length > 0 ? false : true}
        isDislabeled={false}
      />
      <AlertComponent
        alert={alert}
        handleDispatchDataAlert={handleDispatchDataAlert}
      />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropImageAndText);

function onResultNumberGrid(number) {
  if (number >= 3) {
    return 3;
  } else {
    return 4;
  }
}
