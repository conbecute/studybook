import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  onResultAnswerIcon,
  onResultIcon,
} from "../../../components/Game/selection";
import QuestionWrapper from "./QuestionWrapper";
import NavBar from "./NavBar";
import Header from "./Header";
import styles from "../listQuizDetail.module.scss";
import { ROUTE_PATH_V3_TRAINING } from "edu_lms/constants/path";

const ListQuizDetailWrapper = ({
  dataQuizDetail,
  titleQuiz,
  resetQuiz,
  onSubmit,
  onExitQuiz,
  handleDispatchResetQuestion,
}) => {
  const history = useHistory();
  const isOpenTraining = useSelector(
    (state) => state.app.trainingConfig.isOpenTraining
  );
  const [dataQuiz, setStateDataQuiz] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [isMenu, setStateMenu] = useState(true);
  const [quickPlayMode, setQuickPlayMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dataConvert = dataQuizDetail?.game_config?.data?.map(
      (item, index) => {
        const resultAnswers = onResultAnswerIcon(
          item.answers,
          dataQuizDetail?.icon_list[0]?.icons,
          1
        );
        const resultQuestion = onResultIcon(
          item.question,
          dataQuizDetail?.icon_list[0]?.icons
        );
        return {
          ...item,
          answers: resultAnswers,
          question: resultQuestion,
          status: index !== 0 ? 0 : 1,
          id: item.question,
          disabled: index !== 0 ? false : true,
        };
      }
    );
    setStateDataQuiz(dataConvert);
  }, [dataQuizDetail]);
  !isOpenTraining && history.push(ROUTE_PATH_V3_TRAINING);
  useEffect(() => {
    if (resetQuiz) {
      const dataConvert = dataQuizDetail?.game_config?.data?.map(
        (item, index) => {
          const resultAnswers = onResultAnswerIcon(
            item.answers,
            dataQuizDetail?.icon_list[0]?.icons,
            1
          );
          const resultQuestion = onResultIcon(
            item.question,
            dataQuizDetail?.icon_list[0]?.icons
          );
          return {
            ...item,
            answers: resultAnswers,
            question: resultQuestion,
            status: index !== 0 ? 0 : 1,
            id: item.question,
            disabled: index !== 0 ? false : true,
          };
        }
      );
      setStateDataQuiz(dataConvert);
      setStateIndexQuestion(0);
      handleDispatchResetQuestion();
    }
  }, [resetQuiz]);

  const onNextQuestion = (data) => {
    setStateIndexQuestion(indexQuestion + 1);
    const newData = dataQuiz.map((item, index) => {
      if (index === indexQuestion + 1) {
        item.status = 1;
      } else {
        item.status = 0;
      }
      return { ...item };
    });
    setStateDataQuiz(newData);
  };

  const onHandleAnswer = (data, id) => {
    const resultQuestion = dataQuiz.map((item) => {
      if (item.id === id) {
        item.answers.map((itemAnswer) => {
          if (itemAnswer.answer_id === data.answer_id) {
            itemAnswer.status = 1;
            item.disabled = true;
          } else {
            itemAnswer.status = 0;
          }
          return { ...itemAnswer };
        });
      }
      return { ...item };
    });
    setStateDataQuiz(resultQuestion);

    if (quickPlayMode && indexQuestion < dataQuiz.length - 1) {
      onNextQuestion();
    }
  };

  const onHandleDot = (index, data) => {
    setStateIndexQuestion(index);
    const newData = dataQuiz.map((item) => {
      if (item.id === data.id) {
        item.status = 1;
      } else {
        item.status = 0;
      }
      return { ...item };
    });
    setStateDataQuiz(newData);
  };

  const onNavBar = () => {
    setStateMenu(!isMenu);
  };

  const toggleQuickPlayMode = () => {
    setQuickPlayMode((_quickPlayMode) => !_quickPlayMode);
  };

  return (
    <div className="list_quiz_detail_wrapper monkey-bg-light-gray">
      <div
        className={`d-flex justify-content-center align-items-center ${styles.question}`}
        style={{
          position: "fixed",
          width: "100%",
          height: "auto",
          paddingLeft: `${isMenu ? "200px" : 0}`,
          transition: "padding 0.5s linear",
        }}
      >
        {dataQuiz && (
          <>
            <Header
              data={dataQuiz}
              title={titleQuiz}
              isMenu={isMenu}
              onSubmit={onSubmit}
              onExitQuiz={onExitQuiz}
              onNavBar={onNavBar}
              indexQuestion={indexQuestion}
              onNextQuestion={onNextQuestion}
              total={dataQuiz.length}
              currentQuestion={dataQuiz[indexQuestion]}
              quickPlayMode={quickPlayMode}
              toggleQuickPlayMode={toggleQuickPlayMode}
              submitted={submitted}
              setSubmitted={setSubmitted}
              onHandleDot={onHandleDot}
            />
            <NavBar
              data={dataQuiz}
              onHandleDot={onHandleDot}
              isMenu={isMenu}
              submitted={submitted}
            />
            <QuestionWrapper
              title={titleQuiz}
              data={dataQuiz[indexQuestion]}
              index={indexQuestion + 1}
              dataQuizDetail={dataQuizDetail?.game_config}
              fontSizeAnswer={dataQuizDetail?.game_config?.font_size_answer}
              fontSizeTitle={dataQuizDetail?.game_config?.font_size}
              typeText={dataQuizDetail.game_config?.type_text}
              onHandleAnswer={onHandleAnswer}
              submitted={submitted}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default ListQuizDetailWrapper;
