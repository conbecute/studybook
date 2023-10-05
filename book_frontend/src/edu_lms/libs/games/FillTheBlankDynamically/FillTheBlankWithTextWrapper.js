import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import {
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  URL_IMAGE_QUESTION_TEST_GAME,
  RESULT,
  COLOR_RED,
  COLOR_BLUE,
  ANSWER_STATUS
} from "edu_lms/constants/type";
import { GAME_VERSION } from "edu_lms/constants/game";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import InputPositionV1 from '../../../components/Game/FillTheBlankDynamically/components/InputPositionV1';
import { getCorrectWrongInputAnswers } from "../../../components/Game/FillTheBlankDynamically/selection";

const FillTheBlankWithTextWrapper = (
  {
    titleQuestion,
    typeQuestion,
    indexQuestion,
    data,
    dataConfig,
    onComplete,
    onPlaying,
    dataDynamically,
    showCorrectAnswer,
    isReadOnly,
  },
  ref
) => {
  const dispatch = useDispatch();
  const question = dataConfig[indexQuestion];
  const objects = question.objects;
  const [widthForm, setWidthForm] = useState(null);
  const [correctIndexInputs, setCorrectIndexInput] = useState([]);

  const div = useCallback((node) => {
    if (node !== null) {
      setWidthForm(node.getBoundingClientRect().width);
    }
  }, []);
  const [isEdit, setIsEdit] = useState(false);

  const results = data.map((result) => {
    const answers = result.answer_result.split("|");
    return {
      answers,
      index: result.index,
    };
  });

  useEffect(() => {
    objects.parseTracing.position?.map((position, index) => {
      setValue(`${index}`, dataDynamically?.history?.[index]);
    });
  }, [objects]);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const fontSize = Math.round((widthForm / 1106) * dataConfig.fontSize);
  const onSubmit = () => {};
  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      _handleComplete();
    },
  }));

  const _handleComplete = handleSubmit((dataForm) => {
    setIsEdit(false);
    let correctAnswerIndexInputs = [];

    if (dataConfig.version === GAME_VERSION.V1) {
      // Check correct wrong answer new version v1
      const resultAnswers = getCorrectWrongInputAnswers(data, Object.values(dataForm));
      correctAnswerIndexInputs = resultAnswers.filter(answer => answer.status === ANSWER_STATUS.CORRECT).map(answer => answer.arrIndex);
    } else {
      // Check correct wrong answer old version
      const dataInputSwap = {};
      results.forEach((result, ansIndex) => {
        if (!result.index) {
          if (result.answers.includes(dataForm[ansIndex])) {
            correctAnswerIndexInputs.push(ansIndex);
          }
        } else {
          const swapIndex = result.index;
          if (!Object.keys(dataInputSwap).includes(swapIndex)) {
            dataInputSwap[swapIndex] = [...result.answers];
          }
          const indexAnswerText = dataInputSwap[swapIndex].findIndex(
            (ans) => ans === dataForm[ansIndex]
          );
          if (indexAnswerText > -1) {
            correctAnswerIndexInputs.push(ansIndex);
            dataInputSwap[swapIndex].splice(indexAnswerText, 1);
          }
        }
      });
    }

    setCorrectIndexInput(correctAnswerIndexInputs);
    const isCorrect =
      correctAnswerIndexInputs.length === results.length
        ? RESULT._TRUE
        : RESULT._FALSE;
    if (isCorrect === RESULT._TRUE) {
      dispatch(onDispatchSrcAudio(showCorrectAnswer && AUDIO_SUCCESS));
    } else {
      dispatch(onDispatchSrcAudio(showCorrectAnswer && AUDIO_ERROR));
    }
    onComplete({
      isCorrect,
      correctIndexInputsHistory: correctAnswerIndexInputs,
      history: dataForm,
    });
  });
  const onChangeValue = (e) => {
    if (e.target.value.length === 0) {
      e.target.style.width = "40px";
    }
    if (e.target.value.length >= 1) {
      e.target.style.width = e.target.offsetWidth + 15 + "px";
    }
    onPlaying(false);
    setIsEdit(true);
  };

  const getColorAnswer = (index) => {
    if (!showCorrectAnswer || isEdit) {
      return "#000";
    }
    if (dataDynamically.allCorrectAnswers) {
      return COLOR_BLUE;
    }

    let correctIndexInputList = correctIndexInputs;
    if (!isEdit && dataDynamically.correctIndexInputsHistory) {
      correctIndexInputList = dataDynamically.correctIndexInputsHistory;
    }

    return correctIndexInputList.includes(index) ? COLOR_BLUE : COLOR_RED;
  };

  useEffect(() => {
    if (widthForm > 1107) {
      setWidthForm(1106);
    }
  }, [widthForm]);

  return (
      <div ref={div}>
        {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
          <div
            className=""
            style={{
              width: `${widthForm}px`,
              marginBottom: "75px",
              height: "auto",
              position: "relative",
            }}
          >
            <img
              src={`${URL_IMAGE_QUESTION_TEST_GAME}${titleQuestion?.path}`}
              alt="#"
              className="w-100"
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 5,
              }}
            >
              {objects.parseTracing.position?.map((position, index) => {
                if (dataConfig.version === GAME_VERSION.V1) {
                  return (
                    <InputPositionV1
                      key={index}
                      name={index}
                      position={position}
                      widthForm={widthForm}
                      fontSize={fontSize}
                      color={getColorAnswer(index)}
                      ref={register()}
                      onChange={onChangeValue}
                      disabled={isReadOnly}
                    />
                  );
                }

                return (
                  <input
                    key={index}
                    type="text"
                    autoComplete="off"
                    className="form-control monkey-fz-20 quicksand-medium"
                    style={{
                      fontSize: `${fontSize}px`,
                      height: "45px",
                      width: "auto",
                      position: "absolute",
                      border: "none",
                      color: getColorAnswer(index),
                      background: "transparent",
                      boxShadow: "none",
                      top: (widthForm / 500) * position.vertical_axis_px - 20,
                      left:
                        (widthForm / 500) * position.horizontal_axis_px - 12,
                    }}
                    name={index}
                    ref={register()}
                    placeholder="?"
                    onChange={onChangeValue}
                    disabled={isReadOnly}
                  />
                );
              })}
            </form>
          </div>
        )}
      </div>
  );
};

export default forwardRef(FillTheBlankWithTextWrapper);
