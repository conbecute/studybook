import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { reorder } from "edu_lms/components/selection";
import {
  ANSWER_STATUS,
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  RESULT,
} from "edu_lms/constants/type";
import SequenceWrapper from "./components/index";
import { onDataConfig } from "./selection";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";

const Sequence = (
  { dataGame, isReadOnly, onPlaying, showCorrectAnswer, onComplete },
  ref
) => {
  const dispatch = useDispatch();
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState([]);
  const [resultAnswers, setStateResultAnswers] = useState([]);
  const [inputData, setInputData] = useState({});
  const [stateResult] = useState(dataGame.game_config.data);

  const data = dataGame?.game_config?.data
    ? {
        ...dataGame,
        game_config: {
          ...dataGame.game_config,
          answer: dataGame?.game_config?.data[0]?.answer,
          type_display: dataGame?.game_config?.data[0]?.type_display,
        },
      }
    : {
        ...dataGame,
        game_config: {
          ...dataGame.game_config,
          data: [
            {
              answer: dataGame.game_config.answer,
              question: dataGame.game_config.question[0],
              type_display: dataGame.game_config.type_display,
            },
          ],
        },
      };
  useEffect(() => {
    setInputData({ ...data.game_config, results: { data: [], status: null } });

    const dataQuestionConfig = Object.values(
      data.game_config.data[0].question
    ).map((item) => {
      const resultFilterIcon = data?.icon_list[0]?.icons.filter(
        (icon) => icon.icon_id == item
      )[0];
      return { ...resultFilterIcon };
    });

    const dataAnswersConfig = onDataConfig(
      data.game_config.answer,
      data.icon_list[0].icons,
      Number(data.game_config.type_display[0])
    );

    const _resultAnswers = dataAnswersConfig.map((itemAnswer) => {
      const resultFilterIcon = _.orderBy(
        itemAnswer,
        [
          function (o) {
            return Number(o.index);
          },
        ],
        ["asc"]
      );
      return [...resultFilterIcon];
    });
    setStateResultAnswers(_resultAnswers);
    setStateDataAnswers(data.dataAnswers ?? dataAnswersConfig);
    setStateDataQuestion(dataQuestionConfig);
  }, [dataGame]);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };
  const onDragEnd = (result) => {
    onPlaying(false);
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    if (source.droppableId == destination.droppableId) {
      const items = reorder(
        dataAnswers[source.droppableId.match(/\d+/)[0]],
        source.index,
        destination.index
      );
      if (source.droppableId == "droppable_1") {
        setStateDataAnswers([dataAnswers[0], items]);
      } else {
        setStateDataAnswers(_.compact([items, dataAnswers[1]]));
      }
      return;
    }

    const _result = move(
      dataAnswers[source.droppableId.match(/\d+/)[0]],
      dataAnswers[destination.droppableId.match(/\d+/)[0]],
      source,
      destination
    );
    setStateDataAnswers([_result.droppable_0, _result.droppable_1]);
  };

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onCheckAnswers();
    },
  }));
  const onCheckAnswers = () => {
    onPlaying(false);
    let isCorrect = RESULT._TRUE;
    let result = [];
    dataAnswers.forEach((data, i) => {
      const array = data.map((item, j) => {
        if (Number(item.index) === Number(resultAnswers[i][j]?.index)) {
          item.status = ANSWER_STATUS.CORRECT;
        } else {
          item.status = ANSWER_STATUS.WRONG;
        }
        return { ...item };
      });
      result = [...result, array];
    });

    let isCheckStatus = [];
    result.forEach((item) => {
      const resultFilter = _.filter(item, function (o) {
        return o.status !== ANSWER_STATUS.CORRECT;
      });
      isCheckStatus = [...isCheckStatus, ...resultFilter];
    });
    isCheckStatus.length > 0 && (isCorrect = RESULT._FALSE);
    setInputData({
      ...inputData,
      results: {
        ...inputData.results,
        data: resultAnswers[0],
        status:
          isCheckStatus.length > 0
            ? ANSWER_STATUS.CORRECT
            : ANSWER_STATUS.WRONG,
      },
    });

    const newResult = stateResult?.map((item, index) => {
      if (index == 0) {
        const status =
          isCheckStatus.length > 0
            ? ANSWER_STATUS.CORRECT
            : ANSWER_STATUS.WRONG;
        return { ...item, status };
      }

      return item;
    });
    let answerNumber = 0;
    newResult?.forEach(
      (item) =>
        item?.status === ANSWER_STATUS.WRONG &&
        (answerNumber = answerNumber + 1)
    );
    const audioStatus =
      isCorrect === RESULT._FALSE ? AUDIO_ERROR : AUDIO_SUCCESS;
    showCorrectAnswer && dispatch(onDispatchSrcAudio(audioStatus));
    onComplete({
      isCorrect: isCorrect,
      dataAnswers: dataAnswers,
    });
  };

  return (
    <SequenceWrapper
      dataGameConfig={data?.game_config}
      dataAnswers={dataAnswers}
      dataQuestion={dataQuestion}
      onDragEnd={onDragEnd}
      showCorrectAnswer={showCorrectAnswer}
      isReadOnly={isReadOnly}
      data={data}
    />
  );
};
export default forwardRef(Sequence);
