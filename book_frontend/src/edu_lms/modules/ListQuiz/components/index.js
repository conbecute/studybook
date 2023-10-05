import React, { Fragment, useState, useEffect } from "react";
import ExamExercisesBoxWrapper from "./ExamExercisesBoxWrapper";
import { useLocation } from "react-router-dom";
import * as PATH from "edu_lms/constants/path";
import {
  onDispatchQuizDetail,
  onDispatchResultQuestion,
  onDispatchResetQuestion,
} from "edu_lms/modules/ListQuiz/actions";
import {
  getListQuizDetail,
  getResultQuiz,
} from "edu_lms/services/listQuiz/index";
import { useHistory } from "react-router-dom";

const ListQuizWrapper = ({
  listExamExercises,
  isValueNull,
  provinceId,
  onPopupExamExercises,
  onUpdateTeachingInformation,
}) => {
  const [listQuiz, setListQuiz] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const onNextQuestion = (data) => {
    history.push({
      pathname: `${PATH.ROUTE_PATH_LIST_QUIZ_DETAIL}`,
      state: {
        urlGradeId: location?.state?.urlGradeId,
        urlSubjectId: location?.state?.urlSubjectId,
      },
    });
  };
  return (
    <div className="exam_exercises_wrapper monkey-bg-light-gray mt-5">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="mt-5 mb-5">
              <button
                onClick={() => onNextQuestion(listQuiz)}
                className="btn btn-pr"
              >
                Làm bài
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListQuizWrapper;
