import React, { forwardRef, useEffect, useState } from "react";
import { Fragment } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import FillTheBlankWithTextWrapper from "./components";
import { onDataConfig, onDataConvert } from "./selection";
import { onResultIcon } from "edu_lms/components/Game/selection";
import Title from "./components/Title";
import { AUDIO_ERROR, AUDIO_SUCCESS } from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";

const FillTheBlankWithText = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const dispatch = useDispatch();
  const srcAudio = useSelector((state) => state.app.srcAudio);
  const dataGame = data?.game_config?.data;
  const dataDefault = data;
  const iconList = data?.icon_list[0];
  const [dataConfig, setStateDataConfig] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");
  const [dataInput, setDataInput] = useState([]);

  useEffect(() => {
    let countQuestion = dataGame.length;
    setDataInput(Array(countQuestion).fill([]));
  }, [dataGame]);

  useEffect(() => {
    const dataConfig = onDataConfig(dataGame, iconList);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);
    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion].question,
      iconList?.icons
    );
    setStateTitleQuestion(resultQuestion);
  }, [dataGame, indexQuestion]);

  useEffect(() => {
    if (_.isEmpty(titleQuestion?.props)) return;

    if (titleQuestion?.props[0]?.audio[0]?.path) {
      onClickAudio(
        `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${titleQuestion?.props[0]?.audio[0]?.path}`
      );
    }
  }, [titleQuestion]);

  const onHandleForm = (result, dataForm, isSensitive) => {
    let isCorrect = 1;
    let input = dataInput;
    let question = dataGame[indexQuestion];
    const dataConvert = onDataConvert(dataAnswers, result, isSensitive);
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
      dataForm: dataForm,
      isCorrect: isCorrect,
      resultStatus: resultStatus,
    };
    onComplete(dataSave);
    setStateButtonReset(!isButtonReset);

    question.result = isStatus ? 0 : 1; // 1: correct, 0: incorrect
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
        <div className="mb-5">
          <Title
            dataDefault={dataDefault}
            titleQuestion={titleQuestion}
            typeQuestion={dataDefault?.game_config?.type_question}
            typeText={dataDefault?.game_config?.type_text}
            fontSize={dataDefault?.game_config?.font_size}
            onClickAudio={onClickAudio}
          />
          <FillTheBlankWithTextWrapper
            dataDefault={dataAnswers}
            dataAnswers={dataAnswers.answers}
            indexQuestion={indexQuestion}
            typeText={dataDefault?.game_config?.type_text}
            typeAnswer={dataDefault?.game_config?.type_answer}
            fontSize={dataDefault?.game_config?.font_size}
            sensitive={dataDefault?.game_config?.sensitive}
            onHandleForm={onHandleForm}
            ref={ref}
            handlePlaying={handlePlaying}
            historyForm={dataDefault?.dataForm}
            resultStatus={dataDefault?.resultStatus}
            showCorrectAnswer={showCorrectAnswer}
            isReadOnly={isReadOnly}
          />
        </div>
      )}
    </Fragment>
  );
};

export default forwardRef(FillTheBlankWithText);
