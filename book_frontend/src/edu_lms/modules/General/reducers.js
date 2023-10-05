import * as TYPES from "../../constants/actionsType";
let initialState = {
  bookId: 0,
  gradeIdTextBook: 4,
  gradeIdBookUsed: 4,
  gradeIdBookTeacher: 4,
  gradeIdBookTest3710:
    localStorage.getItem("grade_id_book_test") === "all"
      ? 6
      : localStorage.getItem("grade_id_book_test"),
  gradeIdBookDocument: 4,
  gradeIdReferenceBook: 4,
  gradeIdWorkbook: 5,
  showTestBook3710: false,
  listBookInUse: [],
  listTextbooks: [],
  listBookTeacher: [],
  listBookTest3710: [],
  listBookDocument: [],
  listWorkbook: [],
  referenceBooks: [],
  listSubjectActive: [],
  bookInfo: {
    bookName: "",
    bookType: "",
    bookGrade: "",
    bookSubject: "",
    bookThumb: "",
    timeStart: 0,
    count_click_cursor: 0,
    count_click_pencil: 0,
    count_click_brush: 0,
    count_add_text: 0,
    count_add_hyperlink: 0,
    count_add_line: 0,
    count_add_rectangle: 0,
    count_add_circle: 0,
    count_click_delete: 0,
    count_click_delete_all: 0,
    count_select_color: 0,
    count_zoom_in: 0,
    count_zoom_out: 0,
    count_zoom_back_100: 0,
    count_change_page: 0,
    count_show_tools: 0,
    count_open_book_instructions: 0,
    count_open_table_of_contents: 0,
  },
  isClickSubmitAnswer: false,
  isClickRefresh: false,
  isClickDownImg: false,
  isPlayMusic: false,
};

let generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_CAROUSEL_LIST_BOOKS_IN_USE:
      return { ...state, listBookInUse: action.data.list_book_used };
    case TYPES.PA_DATA_CAROUSEL_BOOKS_IN_USE:
      return { ...state, listBookInUse: action.data.list_book };
    case TYPES.PA_DATA_CAROUSEL_LIST_TEXTBOOKS:
      return { ...state, listTextbooks: action.data.list_book };
    case TYPES.PA_DATA_CAROUSEL_LIST_BOOKS_TEACHER:
      return { ...state, listBookTeacher: action.data.list_book };
    case TYPES.PA_DATA_CAROUSEL_LIST_BOOKS_TEST_3710:
      return { ...state, listBookTest3710: action.data.list_book };
    case TYPES.PA_DATA_CAROUSEL_LIST_BOOKS_DOCUMENT:
      return { ...state, listBookDocument: action.data.data };
    case TYPES.PA_DATA_SHOW_BOOK_TEST_3710:
      return { ...state, showTestBook3710: action.data.data };
    case TYPES.PA_DATA_CAROUSEL_LIST_REFERENCE_BOOKS:
      return { ...state, referenceBooks: action.data };
    case TYPES.PA_DATA_CAROUSEL_LIST_WORK_BOOK:
      return { ...state, listWorkbook: action.data.list_book };
    case TYPES.PA_DATA_GRADE_ID_TEXT_BOOK:
      return { ...state, gradeIdTextBook: action.gradeId };
    case TYPES.PA_DATA_GRADE_ID_BOOK_IN_USE:
      return { ...state, gradeIdBookUsed: action.gradeId };
    case TYPES.PA_DATA_GRADE_ID_BOOK_TEACHER:
      return { ...state, gradeIdBookTeacher: action.gradeId };
    case TYPES.PA_DATA_GRADE_ID_BOOK_TEST_3710:
      return { ...state, gradeIdBookTest3710: action.gradeId };
    case TYPES.PA_DATA_GRADE_ID_BOOK_DOCUMENT:
      return { ...state, gradeIdBookDocument: action.gradeId };
    case TYPES.PA_DATA_GRADE_ID_WORK_BOOK:
      return { ...state, gradeIdWorkbook: action.gradeId };
    case TYPES.PA_ADD_BOOK_ID:
      return { ...state, bookId: action.bookId };
    case TYPES.PA_DATA_LIST_SUBJECT_ACTIVE:
      const listSubjectActive = action.data.map((item, index) => {
        const value = item.id;
        const label = item.title;
        return { ...item, value, label };
      });
      return { ...state, listSubjectActive: listSubjectActive };
    case TYPES.PA_BOOK_INFO:
      return { ...state, bookInfo: { ...state.bookInfo, ...action.data } };
    case TYPES.PA_IS_CLICK_SUBMIT_ANSWER:
      return { ...state, isClickSubmitAnswer: action.data };
    case TYPES.PA_IS_CLICK_REFRESH:
      return { ...state, isClickRefresh: action.data };
    case TYPES.PA_CLICK_DOWN_IMG:
      return { ...state, isClickDownImg: action.data };
    case TYPES.PA_PLAY_BACKGROUND_MUSIC:
      return { ...state, isPlayMusic: action.data };
    case TYPES.PA_INCREASE_BOOK_TOOL:
      return {
        ...state,
        bookInfo: {
          ...state.bookInfo,
          [action.data]: state.bookInfo[action.data] + 1,
        },
      };
    default:
      return state;
  }
};
export default generalReducer;
