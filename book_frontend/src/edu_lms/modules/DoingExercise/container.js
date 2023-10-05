import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import PopupActiveQuestionSet from "edu_lms_v2/modules/MockTest/PopupActiveQuestionSet";
import LoginWrapper from "edu_lms_v2/modules/Login/LoginWrapper";
import ForgotPassword from "edu_lms_v2/modules/ForgotPassword";
import PopupLoginSuccess from "edu_lms_v2/modules/Login/PopupLoginSuccess";
import { getListQuestion, postHistoryExam } from "../../services/question";
import Footer from "./Footer";
import Header from "./Header";
import DoingExerciseWrapper from "./DoingExerciseWrapper";
import {
  onFormatDataGameConfig,
  getQuestionSetTitle,
  getQuestionsShuffle,
  sendErrorToTelegram,
  getLevelExercise,
  skipActivityExercise,
  LEVEL_EXERCISE,
} from "./selection";
import OverviewQuestionSet from "./OverviewQuestionSet";
import ResultComplete from "./ResultComplete";
import ReportError from "./ReportError";
import PopupConfirmSubmit from "./PopupConfirmSubmit";
import PopupTimeUp from "./PopupTimeUp";
import { DRAFT, PLAY_MODE } from "edu_lms/constants/type";
import { TYPE_GAME } from "edu_lms_v2/libraries/hoc10Game/constants";
import ResultQuestion from "edu_lms_v2/modules/MockTest/ResultQuestion";
import { setEventGTM } from "edu_lms/constants/googleTagManager";
import { HOC10_CLICK_LAM_LAI, HOC10_CLICK_XEM_KET_QUA, HOC10_PRACTICE_NOW, PLAY_MOCK_TEST, SUBMIT_TEST } from "edu_lms/constants/eventNameGTM";
import {
  DEFAULT_VALUE_LEVEL,
  getRandomQuestionWrong,
  onGetPlayMode,
  QUESTION_DISTANCE,
  TOTAL_QUESTIONS_CORRECT,
} from "./const";
import { getActExercise, getTitleExercise } from "edu_lms/services/exercise";
import PopupShowResult from "./components/PopupShowResult";
import { onDispatchSetStateDoingInfo, onDispatchUpdateMatrixBookContent } from "./actions";
import { onResultUserInfo } from "../selection";

export default function ExerciseContainer(props) {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const matrixBookContent = useSelector((state) => state.doingExerciseReducers.matrixBookContent);
  const doingInfo = useSelector((state) => state.doingExerciseReducers.doingInfo);
  const playMode = onGetPlayMode(window.location.pathname);
  const gameRef = useRef();
  const QuestionsRef = useRef();
  const { id, studentId } = useParams();
  const [catchError, setCatchError] = useState(false);
  const [questionListResponse, setQuestionListResponse] = useState({});
  const [originQuestions, setOriginQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isButtonNext, setIsButtonNext] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showPopupConfirmSubmit, setPopupConfirmSubmit] = useState(false);
  const [showPopupTimeUp, setShowPopupTimeUp] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [result, setResult] = useState({});
  const [showListAnswer, setShowListAnswer] = useState(false);
  const [step, setStep] = useState(1);
  const [totalLevel, setTotalLevel] = useState(null);
  const [showPopupSuggestions, setShowPopupSuggestions] = useState(false);
  const [questionReportError, setQuestionReportError] = useState([]);
  const [levelQuestions, setLevelQuestions] = useState(DEFAULT_VALUE_LEVEL);
  const [showPopupResult, setShowPopupResult] = useState(false);
  const [limitTotalQuestion, setLimitTotalQuestion] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questionWrong, setQuestionWrong] = useState([]);
  const [getNewQuestion, setGetNewQuestion] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showPopupForgotPw, setShowPopupForgotPw] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showRequiredLogin, setShowRequiredLogin] = useState(!token);
  const [isActiveForgotPw, setActiveForgotPw] = useState(false);
  const userInfo = onResultUserInfo();

  let percentDoing;
  let resultQuestion;
  let percentage = 0;
  let isReadOnly;
  if (playMode === PLAY_MODE.EXAM || playMode === PLAY_MODE.PRACTICE) {
    const selectedQuestions = questions.filter(
      (question) => !_.isNil(question.isCorrect)
    );
    const countSelectedAnswer = selectedQuestions.length;
    percentDoing = `${countSelectedAnswer}/${questions?.length}`;
    percentage = (countSelectedAnswer / questions?.length) * 100;
  }

  if (playMode === PLAY_MODE.PRACTICE_V2) {
    isReadOnly = activeQuestionIndex + 1 !== questions.length;
    
    if (!_.isEmpty(questions)) {
      const selectedQuestions = questions.filter((item) => item?.isCorrect);
      const countSelectedAnswer = selectedQuestions.length;
      percentage = (countSelectedAnswer / TOTAL_QUESTIONS_CORRECT) * 100;
    }
    percentDoing = `${_.round(percentage, 2)}%`;
    resultQuestion = `${TOTAL_QUESTIONS_CORRECT}/${questions.length}`;
  }
  useEffect(() => {
    setTimeStart(dayjs().unix());
    const token = localStorage.getItem("token");
    const guest_id = localStorage.getItem("guest_id");
    if (studentId) {
      const decodeStudentId = window.atob(studentId);
      const studentInfo = { id: decodeStudentId };
      localStorage.setItem("student_info", JSON.stringify(studentInfo));
    }
    if (!token && !guest_id) {
      localStorage.setItem("guest_id", uuidv4());
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const eventPracticeNow = localStorage.getItem('event_practice_now');
      
      if (eventPracticeNow) {
        setEventGTM(JSON.parse(eventPracticeNow));
      }

      localStorage.removeItem('event_practice_now');
      dispatch(onDispatchSetStateDoingInfo({...doingInfo, timeStart: 0, clickShare: false, clickExit: false, sourceFromPractice: false }));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const data = {question_set_id: id};
    onGetData(data, playMode);
    onGetTitle();
  }, [id]);

  useEffect(() => {
    const arrQuestionDone = questions.filter((question) => question?.isCorrect);
    const countDone = arrQuestionDone.length;
    const total = questions.length;
    setIsDone(countDone === total);
  }, [questions]);

  const handleTrackingEvent = (completed) => {
    const totalRightQuestion = questions.filter((q) => q.isCorrect);
    const totalQuestionWrong = questions.filter(q => !q.isCorrect);
    
    const data = {
      event: HOC10_PRACTICE_NOW,
      time_on_page: Math.round(Date.now() / 1000) - doingInfo.timeStart,
      click_share_or_not: doingInfo.clickShare ? 'yes' : 'no',
      click_exit_or_not: doingInfo.clickExit ? 'yes' : 'no',
      completed_or_not: completed ? 'yes' : 'no',
      source: doingInfo.sourceFromPractice ? 'practice_now' : 'direct_link',
      verified_account_or_not: !!userInfo?.email_verified ? 'yes' : 'no',
      book_id: questionListResponse.book_id,
      book_name: questionListResponse.book_name,
      knowledge_id: questionListResponse.id,
      knowledge_name: questionListResponse.title,
      total_answer: questions.length,
      total_right_answer: totalRightQuestion.length,
      proportion_of_right_answer: (totalRightQuestion.length / questions.length) * 100,
      list_wrong_answer_type: totalQuestionWrong.map(q => q.activity_id).toString(),
    }
    
    localStorage.setItem('event_practice_now', JSON.stringify(data));
  }

  const onGetTitle = () => {
    const data = { book_content_id: id };
    getTitleExercise(data).then((res) => {
      if (res.data.status === "success") {
        const data = res.data.data[id];
        setQuestionListResponse(data);
        setMatrixBookContent(data);
      }
    });
  };

  const setMatrixBookContent = (data = {}) => {
    let dataFormat = {
      level_1: Math.round(data.level_1 * TOTAL_QUESTIONS_CORRECT / 100),
      level_2: Math.round(data.level_2 * TOTAL_QUESTIONS_CORRECT / 100),
      level_3: Math.round(data.level_3 * TOTAL_QUESTIONS_CORRECT / 100),
      level_4: Math.round(data.level_4 * TOTAL_QUESTIONS_CORRECT / 100),
    };

    const remainder = TOTAL_QUESTIONS_CORRECT - dataFormat.level_1 - dataFormat.level_2 - dataFormat.level_3 - dataFormat.level_4;

    dataFormat = {
      ...dataFormat,
      level_1: dataFormat.level_1 + remainder,
    };

    let limitQuestionOfLevel = {};
    for (const key in dataFormat) {
      limitQuestionOfLevel[key] = dataFormat[key] * 2;
    }

    setLimitTotalQuestion(limitQuestionOfLevel);
    dispatch(onDispatchUpdateMatrixBookContent(dataFormat));
  };
  
  const handleGetDataExamMode = ({ question_set_id }) => {
    setLoading(true);
    getListQuestion({ question_set_id })
      .then((res) => res.data)
      .then((res) => {
        setQuestionListResponse(res.data);
        const onError = (_data) => {
          const content = `Lỗi format data bộ đề ID ${_data?.questionId} lỗi câu số ${_data?.index} activity ID ${_data?.activityId}  activity name ${_data?.activityName} `;
          sendErrorToTelegram(content, _data?.activityId);
        };
        const originData = res.data?.list_question || [];
        const formattedQuestions = onFormatDataGameConfig(originData, onError);
        setQuestionReportError(originData);

        const isRandom = res.data?.random;
        const questionsShuffle = getQuestionsShuffle(formattedQuestions, id);
        setOriginQuestions(isRandom ? questionsShuffle : formattedQuestions);
        setQuestions(isRandom ? questionsShuffle : formattedQuestions);
      })
      .finally(() => setLoading(false));
  };

  const handleGetDataPracticeMode = (params) => {
    const levelExercise = params?.level || getLevelExercise(matrixBookContent);
    const skipActivity = skipActivityExercise(questions);
    const data = {
      book_content_id: id,
      level: levelExercise,
      activity_ids: skipActivity,
      limit: 1,
      game_id: `${TYPE_GAME.MTC_003},${TYPE_GAME.CKB_001},${TYPE_GAME.MTC_BG},${TYPE_GAME.MAT_BG},${TYPE_GAME.MAT_001},${TYPE_GAME.MathInput},${TYPE_GAME.Graph_001},${TYPE_GAME.Graph_002},${TYPE_GAME.SROI_001},${TYPE_GAME.FIB_Math},${TYPE_GAME.FIB_001},${TYPE_GAME.FIB_003},${TYPE_GAME.FIB_BG},${TYPE_GAME.WordFinding},${TYPE_GAME.SQC_001},${TYPE_GAME.DAD_Text},${TYPE_GAME.DAD_Image}`,
    };
    getActExercise(data)
      .then((res) => res.data)
      .then((res) => {
        setTotalLevel(res.data.total);
        setLevelQuestions(levelExercise);
        const onError = (_data) => {
          const content = `Lỗi format data bộ đề ID ${_data?.questionId} lỗi câu số ${_data?.index} activity ID ${_data?.activityId}  activity name ${_data?.activityName} `;
          sendErrorToTelegram(content, _data?.activityId);
        };
        const originData = res.data?.list_question || [];
        const formattedQuestions = onFormatDataGameConfig(originData, onError);
        setQuestionReportError(originData);

        setQuestions((questions) => [...questions, ...formattedQuestions]);
      });

      handleTrackingEvent(false);
  };

  const onGetData = (data, playMode) => {
    if (playMode === PLAY_MODE.EXAM || playMode === PLAY_MODE.PRACTICE) {
      handleGetDataExamMode(data);
    }
    
    if (playMode === PLAY_MODE.PRACTICE_V2) {
      const totalQuestionByLevel = questions.filter(
        (question) => Number(question.level) === currentLevel
      ).length;

      if ((_.isNumber(totalLevel) && totalQuestionByLevel >= totalLevel) || !getNewQuestion) {
        const _question = getRandomQuestionWrong(questionWrong);
        const formattedQuestions = onFormatDataGameConfig([_question]);
        setQuestions((questions) => [...questions, ...formattedQuestions]);
        return;
      }

      handleGetDataPracticeMode(data);
    }
  }

  const setEventPlayMockTest = (isSubmit) => {
    if (questionSetTitle.includes(DRAFT)) return;

    setEventGTM({
      event: PLAY_MOCK_TEST,
      mock_test_name: questionSetTitle,
      grade_name: gradeName,
      subject_name: subjectName,
      type_exam: limitedTime,
      click_submit: isSubmit,
    });
  };

  const handleScrollQuestions = (currentQuestion) => {
    const displayNumberQuestion = Math.round(
      window.innerWidth / QUESTION_DISTANCE
    );
    const scrollIncrease =
      (currentQuestion - displayNumberQuestion) * QUESTION_DISTANCE;

    if (currentQuestion >= displayNumberQuestion) {
      QuestionsRef.current.questions.scroll(scrollIncrease, 0);
    }
  };

  const onChangeQuestion = (index) => {
    gameRef.current && gameRef.current.handleReset && gameRef.current.handleReset();

    activeQuestionIndex !== index &&
      gameRef.current?.onNextQuestion &&
      gameRef.current?.onNextQuestion();

    setActiveQuestionIndex(index);
    setIsButtonNext(questions[index]?.isCorrect);
    handleScrollQuestions(index + 1);

    if (catchError) {
      onRefresh();
      setCatchError(false);
    }
  };

  const onNextQuestion = () => {
    if (playMode === PLAY_MODE.EXAM || playMode === PLAY_MODE.PRACTICE) {
      let index = activeQuestionIndex + 1;
      if (index > questions.length - 1) {
        onSubmitExam();
      } else {
        onChangeQuestion(index);
      }

      gameRef.current &&
        gameRef.current.handleReset &&
        gameRef.current.handleReset();
    }

    if (playMode === PLAY_MODE.PRACTICE_V2) {
      if (percentage === 100) {
        postHistoryQuestion(3);
        setShowPopupResult(true);
      } else {
        if (!isReadOnly) {
          onGetData({}, playMode);
        }
        onChangeQuestion(activeQuestionIndex + 1);
        gameRef.current &&
          gameRef.current.handleReset &&
          gameRef.current.handleReset();
      }

      handleTrackingEvent(percentage === 100);
    }
  };

  const handleCheckAnswer = () => {
    setActiveQuestionIndex(activeQuestionIndex);
    if (!gameRef.current) return;
    gameRef.current.handleCheck();
  };

  const onComplete = (data) => {
    updateTotalQuestionOfLevel(data.isCorrect);

    const newQuestions = questions.map((question, _index) =>
      _index === activeQuestionIndex ? { ...question, ...data } : question
    );
    const arrFinishedQuestion = newQuestions.filter(
      (question) => question?.isCorrect
    );
    const historyData = { id_questions_set: id, data: newQuestions };
    localStorage.setItem("history", JSON.stringify(historyData));

    postHistoryQuestion(arrFinishedQuestion.length > 1 ? 2 : 1, newQuestions);
    setQuestions(newQuestions);
    setIsButtonNext(true);
  };

  const updateTotalQuestionOfLevel = (isCorrect) => {
    if (!isCorrect) {
      handleWrongDoing();
      return;
    } 

    const question = questions[questions.length - 1];
    const _currentLevel = `level_${question.level}`;
    const data = {
      ...matrixBookContent,
      [_currentLevel]: matrixBookContent[_currentLevel] - 1,
    }

    //change status level
    if (getLevelExercise(data) !== currentLevel) {
      setGetNewQuestion(true);
      setQuestionWrong([]);
      setCurrentLevel(getLevelExercise(data));
    } else {
      const newQuestionWrong = questionWrong.filter((item) => item.activity_id !== question.activity_id);
      setQuestionWrong(newQuestionWrong);
    }

    dispatch(onDispatchUpdateMatrixBookContent(data));
  }

  const handleWrongDoing = () => {
    const question = questions[questions.length - 1];
    const findDuplicateQuestion = questionWrong.find((item) => item.activity_id === question.activity_id);
    const totalQuestionOfLevel = questions.filter(
      (question) => +question.level === currentLevel
    );

    if (!findDuplicateQuestion) {
      setQuestionWrong([...questionWrong, question]);
    }

    if (totalQuestionOfLevel.length > limitTotalQuestion[`level_${currentLevel}`]) {
      setGetNewQuestion(false);
    }
  }

  const onPlaying = () => {
    setIsButtonNext(false);
  };

  const postHistoryQuestion = (type, newQuestions) => {
    let countCorrect = 0;
    let totalScore = 0;
    const historyQuestions = newQuestions || questions;
    const data = historyQuestions.map((question) => {
      const score = isNaN(question.score) ? 0 : Number(question.score);
      let status_answer = 1;
      if (question.isCorrect === true) {
        countCorrect = countCorrect + 1;
        totalScore = +(totalScore + score).toFixed(12);
        status_answer = 2;
      }

      if (question.isCorrect === false) {
        status_answer = 3;
      }
      const result = {
        activity_id: question?.activity_id,
        status_answer: status_answer,
      };
      return result;
    });

    let dataResult = {
      question_set_id: id,
      data: JSON.stringify(data),
      time_start: timeStart,
      time_end: dayjs().unix(),
      total_question: questions.length,
      total_correct: countCorrect,
      mark: totalScore,
      type: type,
      guest_id: localStorage.getItem("guest_id"),
      result_detail: JSON.stringify(questions),
    };

    const rawStudentInfo = localStorage.getItem("student_info");
    const user_class_room_id = JSON.parse(rawStudentInfo)?.id;
    dataResult = { ...dataResult, user_class_room_id };

    if (playMode === PLAY_MODE.PRACTICE_V2) {
      dataResult = { ...dataResult, book_content_id: id, question_set_id: null };
    }

    setResult(dataResult);
    postHistoryExam(dataResult);
  };

  const onSubmitExam = () => {
    const questionCompleted = questions.filter(
      (question) => question.isCorrect
    );
    const percentCompleted = questionCompleted.length / questions.length;
    let currentTime = localStorage.getItem("timer");
    currentTime = JSON.parse(currentTime);
    const timeDone =
      limitedTime * 60 - (currentTime.minute * 60 + currentTime.second);

    setEventPlayMockTest(true);
    postHistoryQuestion(3);
    localStorage.removeItem("history");
    localStorage.removeItem("timer");
    setTimeEnd(dayjs().unix());
    setIsComplete(true);
    setStep(2);
    setShowPopupTimeUp(false);
    setPopupConfirmSubmit(false);
    setEventGTM({
      event: SUBMIT_TEST,
      test_name: questionSetTitle,
      test_grade: gradeName,
      test_subject: subjectName,
      test_duration: timeDone,
      stop_at: `Câu ${activeQuestionIndex + 1}`,
      completed: `${percentCompleted.toFixed(2) * 100}%`,
    });
  };

  const onConfirmSubmit = () => {
    const arrQuestionDone = questions.filter((question) => question.isCorrect !== undefined);
    const countDone = arrQuestionDone.length;
    const total = questions.length;
    setIsDone(countDone === total);
    setPopupConfirmSubmit(true);
  };

  const onTimeUp = () => {
    setShowPopupTimeUp(true);
    setPopupConfirmSubmit(false);
    localStorage.removeItem("history");
    localStorage.removeItem("timer");
  };

  const onRefresh = () => {
    localStorage.removeItem("history");
    localStorage.removeItem("timer");
    setTimeStart(dayjs().unix());
    setIsButtonNext(false);
    // onGetData({
    //   question_set_id: id,
    // });
  };

  const handleReplay = () => {
    setQuestions([]);
    setQuestionWrong([]);
    setShowPopupResult(false);
    setActiveQuestionIndex(0);
    setIsButtonNext(false);
    setCurrentLevel(1);
    handleGetDataPracticeMode ({ level: LEVEL_EXERCISE.level_1 });
    onGetTitle();
    setEventGTM({event: HOC10_CLICK_LAM_LAI})
  };

  const toggle = () => {
    setShowPopupSuggestions(!showPopupSuggestions);
  };

  const activeQuestion = questions[activeQuestionIndex];
  const activeQuestionReportError = playMode === PLAY_MODE.PRACTICE_V2 ? activeQuestion : questionReportError[activeQuestionIndex];
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTrackingError = () => {
    const { activity_id, activity_name } = activeQuestion;
    const content = `Lỗi bộ đề activity ID ${activity_id} activity name ${activity_name} `;
    sendErrorToTelegram(content, activity_id);
  };

  const {
    status,
    title,
    public_title,
    grade_name: gradeName,
    subject_name: subjectName,
    limited_time: limitedTime,
  } = questionListResponse;
  const questionSetTitle = getQuestionSetTitle({
    playMode,
    status,
    title,
    public_title,
  });

  const handleShowDetailResult = () => {
    setShowPopupResult(false);
    setStep(3);
    setLevelQuestions("");
    setEventGTM({event: HOC10_CLICK_XEM_KET_QUA})
  };

  const onLoginSuccess = () => {
    setShowLogin(false);
    setShowLoginSuccess(true);
  };

  const onActiveForgotPw = () => {
    setShowLogin(false);
    setShowPopupForgotPw(true);
    setActiveForgotPw(true)
  };
  return (
    <>
      <Header
        subjectName={questionListResponse?.subject_name}
        gradeName={questionListResponse?.grade_name}
        title={questionListResponse?.title}
        setEventPlayMockTest={setEventPlayMockTest}
        step={step}
        id={id}
        isPlayModeExamV2={playMode === PLAY_MODE.PRACTICE_V2}
      />
      <PopupShowResult
        show={showPopupResult}
        handleClose={() => setShowPopupResult(false)}
        handleReplay={handleReplay}
        resultQuestion={resultQuestion}
        handleShowDetailResult={handleShowDetailResult}
      />
      {playMode === PLAY_MODE.PRACTICE_V2 &&
      <>
        <PopupActiveQuestionSet
          show={showRequiredLogin}
          setShow={setShowRequiredLogin}
          setShowLogin={setShowLogin}
        />
        <LoginWrapper
          show={showLogin}
          onHide={() => setShowLogin(false)}
          onLoginSuccess={onLoginSuccess}
          onActiveForgotPw={onActiveForgotPw}
          showPopupForgotPw={showPopupForgotPw}
          setShowPopupForgotPw={setShowPopupForgotPw}
        />
        <ForgotPassword
        isActiveForgotPw={isActiveForgotPw}
        setActiveForgotPw={setActiveForgotPw}
        setLoginModalShow={setShowLogin}
        isPopupLogin={true}
      />
        <PopupLoginSuccess
          show={showLoginSuccess}
          onHide={() => {
            setShowLoginSuccess(false);
          }}
          path={""}
          redirect={false}
        />
        </>
        }
      <>
        <PopupConfirmSubmit
          show={showPopupConfirmSubmit}
          setShow={setPopupConfirmSubmit}
          onSubmitExam={onSubmitExam}
          isComplete={isDone}
        />
        <PopupTimeUp show={showPopupTimeUp} onSubmitExam={onSubmitExam} />
        <Wrapper className="d-flex justify-content-around">
          {step === 1 ? (
            <>
              <Sentry.ErrorBoundary
                fallback={
                  <div className="w-100">
                    <p className="text-center monkey-fz-24 font-weight-bold mt-5">
                      Đang cập nhật...
                    </p>
                  </div>
                }
                onError={handleTrackingError}
              >
                <DoingExerciseWrapper
                  data={activeQuestion}
                  hasAnsweredChecking={
                    playMode === PLAY_MODE.PRACTICE ||
                    playMode === PLAY_MODE.PRACTICE_V2
                  }
                  onComplete={onComplete}
                  onPlaying={onPlaying}
                  ref={gameRef}
                  isComplete={isComplete}
                  toggle={toggle}
                  showPopupSuggestions={showPopupSuggestions}
                  isReadOnly={isReadOnly || ( isButtonNext && playMode === PLAY_MODE.PRACTICE_V2)}
                  token={token}
                />
              </Sentry.ErrorBoundary>
              <OverviewQuestionSet
                questions={questions}
                activeQuestionIndex={activeQuestionIndex}
                onChangeQuestion={onChangeQuestion}
                hasAnsweredChecking={
                  playMode === PLAY_MODE.PRACTICE ||
                  playMode === PLAY_MODE.PRACTICE_V2
                }
                ref={QuestionsRef}
                onTimeUp={onTimeUp}
                limitedTime={limitedTime}
                isComplete={false}
                percentDoing={percentDoing}
                percentage={percentage}
                playMode={playMode}
              />
              <Footer
                isButtonNext={isButtonNext}
                onNextQuestion={onNextQuestion}
                handleCheckAnswer={handleCheckAnswer}
                onConfirmSubmit={onConfirmSubmit}
                isDone={isDone}
                isModeExam={playMode === PLAY_MODE.EXAM}
                isLastQuestion={activeQuestionIndex === questions?.length - 1}
                onRefresh={onRefresh}
                toggle={toggle}
              />
            </>
          ) : step === 2 ? (
            <ResultComplete
              questions={questions}
              timeEnd={timeEnd}
              timeStart={timeStart}
              limitedTime={limitedTime}
              setShowListAnswer={setShowListAnswer}
              setStep={setStep}
              result={result}
            />
          ) : (
            <ResultQuestion
              showListAnswer={showListAnswer}
              setShowListAnswer={setShowListAnswer}
              listQuestion={questions}
              limitedTime={limitedTime}
              result={result}
              originQuestions={originQuestions}
            />
          )}
        </Wrapper>
      </>

      <ReportError
        activeQuestionReportError={activeQuestionReportError}
        typeQuestion={playMode}
        bookContentId={playMode === PLAY_MODE.PRACTICE_V2 ? id : ''}
      />
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 58px);
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column-reverse;
    height: calc(100vh - 200px);
  }
`;
