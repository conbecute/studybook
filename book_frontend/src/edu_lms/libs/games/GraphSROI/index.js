import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import classNames from "classnames";
import _ from "lodash";
import { dispatch } from "edu_lms/redux/configureStore";
import { useForm } from "react-hook-form";
import {
  ANSWER_STATUS,
  AUDIO_ERROR,
  AUDIO_SUCCESS,
  RESULT,
} from "edu_lms/constants/type";
import {
  DEFAULT_POINT_Q1,
  DEFAULT_POINT_Q2,
} from "edu_lms/components/Game/Graph/constant";
import { formatQuestion } from "edu_lms/components/Game/Graph/RegionGraph/selection";
import { resetValueForm, convertValueDataForm } from "./constant";
import {
  onCheckDataForm,
  checkResultRegion,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";
import { INNER_WIDTH } from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import Question from "./components/Question";
import Graph from "./components/Graph";
import CheckRegion from "./components/CheckRegion";
import DrawRegion from "./components/DrawRegion";
import Result from "edu_lms/components/Game/Graph/RegionGraph/Result";

const GraphSROI = (
  {
    isGameOnBook,
    data,
    isReadOnly,
    onPlaying,
    showCorrectAnswer,
    onComplete,
    onPlayEnded = () => {},
  },
  ref
) => {
  const { register, handleSubmit, getValues, reset } = useForm({});
  const [valueDataForm, setValueDataForm] = useState(
    data?.historyAnswer?.valueDataForm || {}
  );
  const [answerRegion, setAnswerRegion] = useState([]);
  const [coorPointA, setCoorPointA] = useState([...DEFAULT_POINT_Q1]);
  const [coorPointB, setCoorPointB] = useState([...DEFAULT_POINT_Q2]);
  const [showConclusion, setShowConclusion] = useState(false);
  const [checkInput, setCheckInput] = useState([]);
  const [showAnswers, setShowAnswers] = useState(data?.historyAnswer?.result);
  const [indexResetForm, setIndexResetForm] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isResetColorRegion, setIsResetColorRegion] = useState(false);

  const question = formatQuestion(data.game_config.data);
  const { dataInput, dataConvert } = convertValueDataForm(valueDataForm, data);
  const dataActive = question[0];

  useEffect(() => {
    if (dataInput.length !== ANSWER_STATUS.DEFAULT && indexResetForm !== null) {
      const newValueForm = resetValueForm(
        valueDataForm,
        indexResetForm,
        dataActive
      );
      setValueDataForm(newValueForm);
    }
  }, [indexResetForm]);

  useEffect(() => {
    let isFillValueForm = false;
    if (!_.includes(dataConvert, "") && !_.isEmpty(dataConvert)) {
      isFillValueForm = true;
    }
    setShowConclusion(isFillValueForm);
    isFillValueForm && onPlayEnded();
  }, [valueDataForm]);

  useEffect(() => {
    const history = data?.historyAnswer;
    setAnswerRegion(history?.resultRegions || []);
    setCheckInput(history?.dataInput || []);
    setShowAnswers(history?.result);
    setValueDataForm(history?.valueDataForm || {});
    setCoorPointA(history?.coorPointA || [...DEFAULT_POINT_Q1]);
    setCoorPointB(history?.coorPointB || [...DEFAULT_POINT_Q2]);
    setIsResetColorRegion(history?.isResetColorRegion);
  }, [data.game_config]);

  const resetData = () => {
    setAnswerRegion([]);
    setCheckInput([]);
    setShowAnswers(false);
    setValueDataForm({});
    setCoorPointA([...DEFAULT_POINT_Q1]);
    setCoorPointB([...DEFAULT_POINT_Q2]);
    reset();
    setIsDisabled(false);
    setIsResetColorRegion(false);
  };

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      checkRegion();
    },
    handleReset: () => {
      resetData();
    },
  }));

  const checkRegion = handleSubmit((valueForm) => {
    const dataForm = data?.historyAnswer?.dataForm || valueForm;
    isGameOnBook && setIsDisabled(true);
    setShowAnswers(true);
    onPlaying(true);
    setIsResetColorRegion(true);
    const resultRegions = checkResultRegion(dataActive, coorPointA, coorPointB);
    const lineRegion = resultRegions.map((item) => {
      if (_.includes(item, false)) {
        return ANSWER_STATUS.WRONG;
      }
      return ANSWER_STATUS.CORRECT;
    });
    setAnswerRegion(resultRegions);

    let result = null;
    let totalAnswer = 0;
    if (_.includes(lineRegion, ANSWER_STATUS.WRONG)) {
      result = ANSWER_STATUS.WRONG;
    } else {
      result = ANSWER_STATUS.CORRECT;
    }

    question.forEach((item, index) => {
      if (index === ANSWER_STATUS.DEFAULT) {
        return { ...item, result };
      }
      return item;
    });

    // step 2
    let dataInput = [];
    if (
      dataForm &&
      Object.values(dataForm).some((e) => e !== ANSWER_STATUS.DEFAULT)
    ) {
      let totalResult = 0;
      dataInput = onCheckDataForm(dataForm, dataActive, { checkData: true });
      setCheckInput(dataInput);
      dataInput?.forEach((item) => {
        item && totalResult++;
      });
    }
    let isCorrect = RESULT._FALSE;
    let audioStatus = AUDIO_ERROR;

    const answerResults = dataInput.map((item, index) => {
      if (item && lineRegion[index] === ANSWER_STATUS.CORRECT) {
        totalAnswer++;
        return ANSWER_STATUS.CORRECT;
      }
      return ANSWER_STATUS.WRONG;
    });
    if (
      !_.includes(answerResults, ANSWER_STATUS.WRONG) &&
      !_.includes(lineRegion, ANSWER_STATUS.WRONG)
    ) {
      audioStatus = AUDIO_SUCCESS;
      isCorrect = RESULT._TRUE;
    }
    showCorrectAnswer && dispatch(onDispatchSrcAudio(audioStatus));
    onComplete({
      isCorrect,
      historyAnswer: {
        ...data?.historyAnswer,
        resultRegions: resultRegions,
        coorPointA,
        coorPointB,
        dataInput,
        result: true,
        totalAnswer: totalAnswer,
        valueDataForm: valueDataForm,
        isResetColorRegion: true,
      },
    });
  });

  const handlePlaying = () => {
    const formValues = getValues();
    setValueDataForm(formValues);
    onPlaying(false);
    setShowAnswers(false);
    setIndexResetForm(null);
    setIsResetColorRegion(false);
  };

  return (
    <Form>
      <QuestionText
        className={classNames("position-relative pb-5 mb-5", {
          "pl-3": window.innerWidth > INNER_WIDTH.MOBILE,
        })}
      >
        <Question question={question} />
        <div className="row justify-content-center">
          {!data?.showResult && (
            <div
              className={
                isReadOnly
                  ? "col-lg-12 col-md-12 pl-3"
                  : "col-lg-7 col-md-7 pl-5"
              }
            >
              <DrawRegion question={question} isReadOnly={isReadOnly} />
              <CheckRegion
                showAnswers={showAnswers}
                question={question[0].coefficient}
                register={register}
                checkInput={checkInput}
                handlePlaying={handlePlaying}
                valueDataForm={valueDataForm}
                onComplete={onComplete}
                showCorrectAnswer={showCorrectAnswer}
                isReadOnly={isReadOnly}
                showConclusion={showConclusion}
                isDisabled={isDisabled}
              />
            </div>
          )}
          <div
            className={
              data?.showResult || isReadOnly
                ? "col-12 col-lg-12 col-md-12"
                : "col-lg-5 col-md-5"
            }
          >
            <Graph
              isReadOnly={isReadOnly}
              data={data}
              dataActive={dataActive}
              coorPointA={coorPointA}
              coorPointB={coorPointB}
              showCorrectAnswer={showCorrectAnswer}
              onPlaying={onPlaying}
              setShowAnswers={setShowAnswers}
              setIndexResetForm={setIndexResetForm}
              valueDataForm={valueDataForm}
              answerRegion={answerRegion}
              setAnswerRegion={setAnswerRegion}
              isDisabled={isDisabled}
              checkInput={checkInput}
              isResetColorRegion={isResetColorRegion}
              setIsResetColorRegion={setIsResetColorRegion}
            />
          </div>
          {isReadOnly && <Result question={question[0].coefficient} />}
        </div>
      </QuestionText>
    </Form>
  );
};
export default forwardRef(GraphSROI);

const Form = styled.form`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-left: 15px;
  @media screen and (max-width: 1200px) {
    overflow-x: scroll;
  }
`;
const QuestionText = styled.div`
  font-size: 1.25rem;
  z-index: 1;
  .title-question {
    font-size: 24px;
  }
  h4 {
    span {
      top: 20px;
      right: 7px;
      font-size: 13px;
    }
  }
  .question-result {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    top: 0;
    z-index: 9;
    overflow: hidden;
  }
  .board-style {
    width: max-content;
    padding-top: 20px;
    margin: 0 auto;
    .graph {
      width: ${window.innerWidth > INNER_WIDTH.MOBILE ? "400px" : "100%"};
      height: ${window.innerWidth > INNER_WIDTH.MOBILE
        ? "400px"
        : `${window.innerWidth}px`};
    }
    .overlay {
      background-color: transparent;
      top: 0;
      z-index: 9;
    }
  }
  @media screen and (max-width: 1200px) and (min-width: 992px) {
    font-size: 18px;
    h4 {
      span {
        font-size: 15px;
      }
    }
    .question-equation {
      padding-top: 5px;
      div {
        font-size: 18px !important;
      }
    }
  }
  @media screen and (max-width: 992px) and (min-width: 768px) {
    font-size: 15px;
    h4 {
      span {
        font-size: 13px;
      }
    }
    .question-equation {
      padding-top: 5px;
      div {
        font-size: 15px !important;
      }
    }
  }
`;
