import React from "react";
import classNames from "classnames";
import { onResultUserInfo } from "edu_lms/modules/selection";

export default function ExerciseFooter({
  titleBook = "",
  currentMenu,
  doingExercise,
}) {
  return (
    <div className="exercise">
      {currentMenu.page_primary ? (
        <button
          onClick={doingExercise}
          className={classNames("btn-pr btn-exercises w-100 text-center", {
            "isAnimation": currentMenu.enough_data
          })}
          disabled={!currentMenu.enough_data}
        >
          {currentMenu.enough_data ? "Luyện tập ngay" : "Đang cập nhật"}
        </button>
      ) : (
        ""
      )}
      <div className="exercise-container position-relative">
        <img
          src="/assets/img/icon-reading-book-1.svg"
          alt="icon-reading-book-1"
          className="icon-1 position-absolute"
        />
        <img
          src="/assets/img/icon-reading-book-2.svg"
          alt="icon-reading-book-2"
          className="icon-2 position-absolute"
        />
        {titleBook && (
          <p className="pt-5 monkey-fz-16 text-white subject-name m-1">
            {titleBook}
          </p>
        )}
        {currentMenu.title && (
          <p className="titleExercise text-white">{currentMenu.title}</p>
        )}
        <div className="exercise-bg" />
      </div>
    </div>
  );
}
