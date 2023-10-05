import { useEffect, useState } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as PATH from "edu_lms/constants/path";
import styled from "styled-components";
import { displayDuration } from "edu_lms/constants/type";
import firework from "edu_lms/assets/images/fireworks.png";
import sad from "edu_lms/assets/images/sad.png";
import { AUDIO_ERROR, AUDIO_VICTORY } from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "../App/actions";
import dayjs from "edu_lms/libs/dayjs";
import OverviewQuestionSet from "./OverviewQuestionSet";
import { APP_ID as HOC10_APP_ID } from "edu_lms/constants/type";

export default function ResultComplete({
  questions,
  limitedTime,
  setShowListAnswer,
  setStep,
  result,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [countAnswerCorrect, setCountAnswerCorrect] = useState(0);
  const [pass, setPass] = useState();
  const [isFirework, setStateFirework] = useState(false);
  const product = +process.env.REACT_APP_APP_ID;

  const timeEnd = dayjs.unix(result.time_end);
  const timeStart = dayjs.unix(result.time_start);

  const durationTime = dayjs.duration(timeEnd.diff(timeStart));
  useEffect(() => {
    localStorage.removeItem("history");
    localStorage.removeItem("timer");
    let countCorrect = 0;
    questions.map((question) => {
      if (question.isCorrect === true) {
        countCorrect = countCorrect + 1;
      }
    });
    setCountAnswerCorrect(countCorrect);
  }, []);

  useEffect(() => {
    countAnswerCorrect / questions?.length >= 0.7
      ? setPass(true)
      : setPass(false);
  }, [countAnswerCorrect]);

  useEffect(() => {
    if (pass) {
      dispatch(onDispatchSrcAudio(AUDIO_VICTORY));
      setStateFirework(true);
      setTimeout(() => {
        setStateFirework(false);
      }, 2000);
    } else {
      dispatch(onDispatchSrcAudio(AUDIO_ERROR));
    }
  }, [pass]);
  const handleShowListAnswer = () => {
    setShowListAnswer(true);
    setStep(3);
  };
  const currentURL = window.location.href;
  const handleBackPage = () => {
    if (currentURL.includes("bai-tap-ve-nha")) {
      history.push(PATH.ROUTE_PATH_QUESTION_SET_V2);
    } else {
      history.push(PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST);
    }
  };

  const handleShowScore = () => {
    if (currentURL.includes(PATH.ROUTE_PATH_QUESTION_SET_V2)) return;
    const totalScore = questions.reduce(function (sum, question) {
      return +(sum + question.score).toFixed(12);
    }, 0);

    return (
      <Point>
        Điểm số:&nbsp;
        <Number>
          {result.mark}/{totalScore}
        </Number>
      </Point>
    );
  };

  const selectedQuestions = questions.filter(
    (question) => !_.isNil(question.isCorrect)
  );
  const countSelectedAnswer = selectedQuestions.length;
  const percentDoing = `${countSelectedAnswer}/${questions?.length}`;
  const percentage = (countSelectedAnswer / questions?.length) * 100;

  return (
    <>
      <div className="d-md-flex justify-content-center h-100 mt-5">
        <div className="d-none d-md-block">
          <img src={pass ? firework : sad} alt="icon" className="mt-4" />
          {isFirework && (
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          )}
        </div>
        <div className="ml-3 mr-1 text-center">
          <p className="font-weight-bold monkey-fz-25 ">
            {handleShowScore()}
            <div className=" mt-2 mb-3 monkey-fz-20">
              Số câu đúng:&nbsp;
              <Number className="mr-1">{countAnswerCorrect}&nbsp;/</Number>
              <Number className="mr-2">{questions.length}</Number>
            </div>
          </p>
          <h2 className="mt-3 mb-3 font-weight-bold monkey-fz-20">
            <span>Thời gian làm bài: </span>
            <span className="text-danger">
              {displayDuration(durationTime)}s
            </span>
          </h2>
          {pass ? (
            <h1 className="text-center font-weight-bold monkey-fz-20">
              Chúc mừng bạn. Hãy tiếp tục luyện tập các bộ đề khác nhé!
            </h1>
          ) : (
            <h1 className="text-center font-weight-bold  monkey-fz-20">
              Hãy tiếp tục luyện tập nhé!
            </h1>
          )}
          <div className="mt-3">
            <Button
              className="btn btn-success m-2"
              onClick={() => handleShowListAnswer()}
            >
              <span>Xem đáp án</span>
            </Button>
            {product === HOC10_APP_ID && (
              <Button
                className="btn btn-info m-2"
                onClick={() => handleBackPage()}
              >
                <span>Danh mục đề thi</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <OverviewQuestionSet
        questions={questions}
        showCorrectAnswer={true}
        limitedTime={limitedTime}
        isComplete={true}
        percentDoing={percentDoing}
        percentage={percentage}
      />
    </>
  );
}

const Button = styled.button`
  width: 150px;
  border-radius: 12px;
  color: white;
`;
const Number = styled.span`
  color: #ff7707;
`;
const Point = styled.div`
  font-size: 36px;
`;
