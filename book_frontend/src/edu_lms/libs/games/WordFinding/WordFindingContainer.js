import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { onConfigData } from "./selection";
import WordFindingWrapper from "./WordFindingWrapper";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";

const WordFindingContainer = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const dispatch = useDispatch();
  const srcAudio = useSelector((state) => state.app.srcAudio);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [inputData, setInputData] = useState({});
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const dataConfig = onConfigData(data);
    setInputData({ ...data.game_config });
    setStateDataAnswers(data.historyAnswer ?? dataConfig);
  }, [data]);

  useEffect(() => {
    handlePlayAudio(
      `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${dataAnswers[0]?.question?.props[0]?.audio[0]?.path}`
    );
  }, [dataAnswers[0]?.question?.props[0]?.audio[0]?.path]);

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onCheckAnswers();
    },
  }));
  const handlePlayAudio = (src) => {
    if (src) {
      dispatch(onDispatchSrcAudio(src !== srcAudio ? src : ""));
    }
  };
  const onActiveText = (data, answerId) => {
    onPlaying(false);
    const newData = dataAnswers.map((dataItem) => {
      dataItem.answers.map((item) => {
        if (item.answer_id === answerId) {
          item.answer_text.map((answerItem) => {
            if (answerItem.id === data.id) {
              answerItem.status = answerItem.status !== 0 ? 0 : 1;
            }
          });
        }
      });
      return { ...dataItem };
    });
    setStateDataAnswers(newData);
  };

  const onCheckAnswers = () => {
    let miss = 0;
    dataAnswers.map((answerItem, _indexAnswer) => {
      const dataAnswers = answerItem.answers.map((data, _inputItem) => {
        let newData;
        if (data.answer_result.length > 0) {
          newData = data.answer_text.map((item) => {
            if (
              _.includes(
                data.answer_result,
                item.value.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, "")
              )
            ) {
              switch (item.status) {
                case 0:
                  miss++;
                  setStatus(false);
                  break;
                case 1:
                  item.status = 2;
                  break;
                default:
                  return false;
              }
            } else {
              if (item.status !== 0) {
                item.status = 3;
                miss++;
                setStatus(false);
              }
            }
            return { ...item };
          });
        } else {
          newData = data.answer_text.map((item) => {
            if (item.status !== 0) {
              item.status = 3;
              miss++;
              setStatus(false);
            }
            return { ...item };
          });
        }
        return { ...data, answer_text: newData };
      });
      return { ...answerItem, answers: dataAnswers };
    });
    onComplete({
      historyAnswer: dataAnswers,
      isCorrect: miss === 0 ? 2 : 1,
    });
    setStateDataAnswers(dataAnswers);
  };

  return (
    <WordFindingWrapper
      data={dataAnswers[0]}
      dataGameConfig={data.game_config}
      onActiveText={onActiveText}
      onComplete={onComplete}
      isReadOnly={isReadOnly}
      onPlaying={onPlaying}
      showCorrectAnswer={showCorrectAnswer}
      handlePlayAudio={handlePlayAudio}
    />
  );
};

export default forwardRef(WordFindingContainer);
