import * as types from "../../constants/actionsType";

export const onDispatchBooksInUse = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_BOOKS_IN_USE,
    data,
  };
};
export const onDispatchTextbooks = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_TEXTBOOKS,
    data,
  };
};
export const onDispatchBooksTeacher = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_BOOKS_TEACHER,
    data,
  };
};
export const onDispatchBooksTest3710 = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_BOOKS_TEST_3710,
    data,
  };
};
export const onDispatchBooksDocument = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_BOOKS_DOCUMENT,
    data,
  };
};
export const onDispatchListSubjectActive = (data) => {
  return {
    type: types.PA_DATA_LIST_SUBJECT_ACTIVE,
    data,
  };
};
export const onDispatchWorkBooks = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_WORK_BOOK,
    data,
  };
};
export const onDispatchReferenceBooks = (data) => {
  return {
    type: types.PA_DATA_CAROUSEL_LIST_REFERENCE_BOOKS,
    data,
  };
};

export const onDispatchGradeIdTextBook = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_TEXT_BOOK,
    gradeId,
  };
};

export const onDispatchGradeIdBooksInUse = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_BOOK_IN_USE,
    gradeId,
  };
};
export const onDispatchGradeIdBookTeacher = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_BOOK_TEACHER,
    gradeId,
  };
};
export const onDispatchGradeIdBookTest3710 = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_BOOK_TEST_3710,
    gradeId,
  };
};
export const onDispatchGradeIdBookDocument = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_BOOK_DOCUMENT,
    gradeId,
  };
};
export const onDispatchSubjectIdBookDocument = (subjectId) => {
  return {
    type: types.PA_DATA_SUBJECT_ID_BOOK_DOCUMENT,
    subjectId,
  };
};
export const onDispatchGradeIdWorkBooks = (gradeId) => {
  return {
    type: types.PA_DATA_GRADE_ID_WORK_BOOK,
    gradeId,
  };
};
export const onDispatchAddBookId = (bookId) => {
  return {
    type: types.PA_ADD_BOOK_ID,
    bookId,
  };
};
export const onDispatchBookInfo = (data) => {
  return {
    type: types.PA_BOOK_INFO,
    data,
  };
};
export const onDispatchIsClickSubmitAnswer = (data) => {
  return {
    type: types.PA_IS_CLICK_SUBMIT_ANSWER,
    data,
  };
};
export const onDispatchIsClickRefresh = (data) => {
  return {
    type: types.PA_IS_CLICK_REFRESH,
    data,
  };
};
export const onDispatchClickDownImg = (data) => {
  return {
    type: types.PA_CLICK_DOWN_IMG,
    data,
  };
};
export const onDispatchPlayMusic = (data) => {
  return {
    type: types.PA_PLAY_BACKGROUND_MUSIC,
    data,
  };
};
export const onDispatchIncreaseBookTool = (data) => {
  return {
    type: types.PA_INCREASE_BOOK_TOOL,
    data,
  };
};
