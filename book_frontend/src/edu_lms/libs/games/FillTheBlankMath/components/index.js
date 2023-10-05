import React, { forwardRef, useEffect, useState } from "react";
import { Fragment } from "react";
import _ from "lodash";
import FillTheBlankWithTextWrapper from "./TextWrapper";
import { onDataConfig, onDataConvert } from "../selection";
import { onResultIcon } from "edu_lms/components/Game/selection";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { AUDIO_ERROR, AUDIO_SUCCESS } from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";

const FillTheBlankWithText = (
  {
    data,
    dataDefault,
    iconList,
    alert,
    onPlaying,
    onComplete,
    showCorrectAnswer,
    isReadOnly,
  },
  ref
) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [dataInput, setDataInput] = useState([]);
  const dataGame = data;
  const dispatch = useDispatch();
  const srcAudio = useSelector((state) => state.app.srcAudio);
  useEffect(() => {
    let countQuestion = dataGame.length;
    setDataInput(Array(countQuestion).fill([]));
  }, dataGame);
  useEffect(() => {
    const dataConfig = onDataConfig(dataGame, iconList);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);
    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion].question,
      iconList[0].icons
    );
    setStateTitleQuestion(resultQuestion);
    return () => {
      // onDispatchDataAlert(AlertDefault);
    };
  }, [dataGame, indexQuestion]);

  const onHandleForm = (result, dataForm) => {
    let isCorrect = 1;
    let input = dataInput;
    let question = dataGame[indexQuestion];
    const dataConvert = onDataConvert(dataAnswers, result);
    let resultStatus = [];
    _.forEach(dataConvert, function (item) {
      resultStatus = [...resultStatus, ...item.status];
    });
    setStateDataAnswers({ ...dataAnswers, answers: dataConvert });

    const isStatus = resultStatus.includes(2);
    if (!isStatus) {
      isCorrect = 2;
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_SUCCESS));
    } else {
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_ERROR));
    }
    const dataSave = {
      history: dataForm,
      isCorrect: isCorrect,
      resultStatus: resultStatus,
    };
    onComplete(dataSave);
    setStateButtonReset(!isButtonReset);

    question.result = isStatus ? 0 : 1;
    input[indexQuestion] = question;
    setDataInput([...input]);
  };
  const handlePlaying = () => {
    onPlaying(false);
  };
  const onClickAudio = (src) => {
    if (src) {
      dispatch(onDispatchSrcAudio(src !== srcAudio ? src : ""));
    }
  };

  return (
    <Fragment>
      {!(indexQuestion >= dataConfig.length) && (
        <Fragment>
          <Title
            titleQuestion={titleQuestion}
            typeQuestion={dataDefault?.game_config?.type_question}
            typeText={dataDefault?.game_config?.type_text}
            fontSize={dataDefault?.game_config?.font_size}
            onClickAudio={onClickAudio}
          />
          <FillTheBlankWithTextWrapper
            dataDefault={dataAnswers}
            data={dataAnswers.answers}
            indexQuestion={indexQuestion}
            dataConfig={dataConfig}
            typeText={dataDefault?.game_config?.type_text}
            alert={alert}
            typeAnswer={dataDefault?.game_config?.type_answer}
            fontSize={dataDefault?.game_config?.font_size}
            onHandleForm={onHandleForm}
            ref={ref}
            handlePlaying={handlePlaying}
            historyForm={dataDefault?.history}
            resultStatus={dataDefault?.resultStatus}
            onPlaying={onPlaying}
            isReadOnly={isReadOnly}
            showCorrectAnswer={showCorrectAnswer}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default forwardRef(FillTheBlankWithText);
