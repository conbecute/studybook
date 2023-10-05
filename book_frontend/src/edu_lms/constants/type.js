export const FACEBOOK_TYPE = 1;
export const GMAIL_TYPE = 2;
export const PHONE_TYPE = 3;
export const USER_CRM = 5;
export const APP_ID = 68;
export const TUTORING_APP_ID = 69;
export const TYPE_POPUP_ACTIVE_BOOK = 1;
export const TYPE_POPUP_PDF = 2;
export const TYPE_POPUP_SUPPORT = 3;
export const TYPE_POPUP_QUESTION = 4;
export const TYPE_POPUP_EXAM_EXERCISES = 5;
export const TYPE_POPUP_TEST_RESULTS = 6;
export const TYPE_POPUP_TEACHING_INFORMATION = 7;
export const TYPE_POPUP_ADD_FORM_DASHBOARD = 8;
export const TYPE_POPUP_OTP = 9;
export const TYPE_POPUP_CHANGE_PW = 10;
export const TYPE_POPUP_REPORT_ERROR = 11;
export const TYPE_POPUP_REQUIRED_LOGIN = 12;
export const TYPE_POPUP_BUY_BOOK = 13;
export const SHOW_SUPPORT_BOOK = 1;
export const HIDDEN_SUPPORT_BOOK = 2;
export const SHOW_PAGINATE = 9;
export const SHOW_PAGINATE_SLIDE_LIBRARY = 6;
export const SHOW_PAGINATE_TOPICS_QUESTION_WAREHOUSE = 10;
export const JOB_STUDENT = 2;
export const JOB_TEACHER = 1;
export const JOB_PARENTS = 3;
export const FEMALE = 1;
export const WIDTH_BUTTON = "150px";
export const WIDTH_BOOK_DEFAULT = 573;
export const COLOR_BLUE = "#92c83e";
export const COLOR_BLUE_2 = "#0066b2";
export const COLOR_GREEN = "#00c2f3";
export const COLOR_GREEN_2 = "#548607";
export const COLOR_ORANGE_LIGHT = "#ffbe88";

export const COLOR_GRAY = "#939598";
export const COLOR_GRAY_2 = "#ddd";
export const COLOR_RED = "#ee202e";
export const COLOR_WHITE = "#fff";
export const COLOR_BLACK = "#000";
export const COLOR_ORANGE = "#ff7707";
export const COLOR_BLACK_READING_BOOK = "#2A404F";

export const MALE = 2;
export const ACTIVE_NOTIFICATION = 2;
export const NOT_ACTIVE_NOTIFICATION = 1;
export const SEND_OTP_PW_BY_PHONE = 1;
export const SEND_OTP_PW_BY_EMAIL = 2;
export const BOOK_INTRO = 1;
export const ASC_DESC = 1;
export const DESC_ASC = 2;
export const APP_ID_MOBILE = 68;
export const APP_ID_WEB = 2;
export const EDUCATION_TEACHER = 6;
export const GRADE_ID_DEFAULT = 4;
export const LIST_PROVINCE_ALL = 0;

// document type
export const BOOK_DOCUMENT_PDF = 2;
export const BOOK_DOCUMENT_POWERPOINT = 3;
export const BOOK_DOCUMENT_POWERPOINT_PDF = 4;
export const BOOK_DOCUMENT_COURSEWARE = 5;
export const PDF_ENGLISH_COURSEWARE = 11;
export const POWERPOINT_ENGLISH_COURSEWARE = 12;
export const AUDIO_SBT_ENGLISH_COURSEWARE = 13;
export const AUDIO_SKG_ENGLISH_COURSEWARE = 14;
export const VIDEO_ENGLISH_COURSEWARE = 15;
export const BOOK_DOCUMENT_POWERPOINT_TEACHER = 16;
export const ZIP_ENGLISH_COURSEWARE = 17;

// worksheet type
export const WORKSHEET_PDF = 1;
export const WORKSHEET_VIDEO = 2;
export const WORKSHEET_AUDIO = 3;
export const WORKSHEET_WORD = 4;
export const WORKSHEET_PPT = 5;
export const WORKSHEET_ZIP = 6;

//worksheet category
export const WORKSHEET_ELEARNING_DOCUMENT = 1;
export const WORKSHEET_BOOK_DOCUMENT = 2;
export const WORKSHEET_TRANING_DOCUMENT = 3;

export const LOCAL_STORAGE_KEY_USER_INFO = "user_info";
export const TYPE_GAME = 1;
export const TYPE_VIDEO = 2;
export const TYPE_AUDIO = 3;
export const TYPE_IMAGE_TEXT = 4;
export const TYPE_REFERENCE = 5;
export const TYPE_VIETNAMESE = 1;
export const TYPE_ENGLISH = 2;
export const TYPE_TEXT = "text";
export const TYPE_LATEX = "latex";
export const TYPE_SUCCESS = 2;
export const TYPE_INCORRECT = 3;

export const DRAW_POINTER = "pointer";
export const DRAW_TEXT = "text";
export const DRAW_PENCIL = "pencil";
export const DRAW_LINK = "link";
export const DRAW_BRUSH = "brush";
export const DRAW_SIZE = "size";
export const DRAW_COLOR = "color";
export const DRAW_TRASH = "trash";

export const TYPE_DRAW_TEXT = 1;
export const TYPE_DRAW_LINK = 2;
export const TYPE_DRAW_PENCIL = 3;

export const UNREAD_NOTI = 2;
export const READ_NOTI = 1;
export const LIMIT_NOTI = 15;
export const PAGE_DEFAULT = 1;

export const TOTAL_CLASSROOM_PER_PAGE = 12;
export const TOTAL_EXERCISE_PER_PAGE = 2;

export const ROLE_CREATED_ROOM = 1;
export const ROLE_SUB_ADMIN = 2;
export const ROLE_STUDENT = 3;
export const ROLE_TEACHER = 4;

export const TOTAL_SUBJECT = 9;
export const CLASS_NEWS = 1;
export const TOATAL_NEWS = 23;
export const TOTAL_EXERCISE = 10;
export const CHECK_LANGUAGE = 1;

export const GAME_TYPE = {
  oneGame: 1,
  multipleGame: 2,
};
export const CTA_POPUP_TYPE = {
  yesNo: 1,
  rangeOneGame: 2,
  rangeMutipleGame: 3,
  finalReport: 4,
};
export const CHECK_ANSWER_GAME = {
  weak: 50,
  average: 80,
  pretty: 99,
  good: 100,
};
export const ALERT_GAME = {
  error: "error",
  rather: "rather",
  medium: "medium",
  success: "success",
};
export const TYPE_GAME_MAT_BG = {
  heightImage: 600,
  defaultHeight: 150,
  widthLaptop: 1100,
  thePoint: 4,
};
export const DRAFT = "DRAFT";
export const LIST_IP_INTERNAL = ["222.252.28.108", "222.252.17.100"];
export const LIST_EMAIL_INTERNAL = ["@monkey.edu.vn", "@hoc10.com"];

export const ANSWER_STATUS = { DEFAULT: 0, CORRECT: 1, WRONG: 2 };
export const ANSWER_GAME_GRAPH_002 = { CORRECT: 3, WRONG: 0, DEFAULT: 2 };
export const TYPE_DISPLAY_GAME_SQC = { HORIZONTAL: 1, DEFAULT: 2, VERTICAL: 3 };
export const ANSWER_GAME_SEN_FINDING = { CORRECT: 2, WRONG: 3, DEFAULT: 0 };
export const ANSWER_GAME_WORD_FINDING = {
  CORRECT: 2,
  WRONG: 3,
  DEFAULT: 4,
  CHECK_ANSWER: 0,
};

export const FORMAT_GAME_WORD_FINDING = /[&\/\\#,+()$~%.":*?<>{}]/g;

export const RESULT = {
  _FALSE: 1,
  _TRUE: 2,
};

export const PLAY_MODE = {
  PRACTICE: 1,
  EXAM: 2,
  PRACTICE_V2: 3,
};

export const TYPE_EVENT_READING_BOOK = {
  menu: 1,
  tools: 2,
  guide: 3,
  touchPoint: 4,
  practice: 5,
};

export const roles = [
  {
    id: ROLE_CREATED_ROOM,
    name: "Admin",
  },
  {
    id: ROLE_SUB_ADMIN,
    name: "Admin",
  },
  {
    id: ROLE_STUDENT,
    name: "Học sinh",
  },
  {
    id: ROLE_TEACHER,
    name: "Giáo viên",
  },
];

export const typeImport = [
  {
    id: ROLE_TEACHER,
    title: "Thêm giáo viên",
  },
  {
    id: ROLE_STUDENT,
    title: "Thêm học sinh",
  },
];

export const TYPE_RANK = {
  1: "Giỏi",
  2: "Khá",
  3: "Đạt",
  4: "Chưa đạt",
};
export const THUMB_IMAGE = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/image/photo_2021-06-08_17-17-26.jpg`;
export const URL_IMAGE = `${process.env.REACT_APP_MEDIA_URL_APP}`;

const REACT_APP_MEDIA_URL_APP_LIVE = "https://hvegjijo7jobj.vcdn.cloud/";
export const URL_IMAGE_READING_BOOK = REACT_APP_MEDIA_URL_APP_LIVE;

const REACT_APP_URL_IMAGE_QUESTION_LIVE =
  "https://hvegjijo7jobj.vcdn.cloud/upload/cms_platform/images/hdr/";
export const ULR_IMAGE_LOGO_HOC10 =
  "https://monkeymedia.vcdn.com.vn/E_Learning/thumb/IMAGE_2022-12-28_10:39:24.jpg";
export const URL_IMAGE_QUESTION = REACT_APP_URL_IMAGE_QUESTION_LIVE;
export const URL_IMAGE_QUESTION_TEST_GAME =
  process.env.REACT_APP_URL_IMAGE_QUESTION;
export const URL_AUDIO = `${process.env.REACT_APP_MEDIA_URL_APP}upload/cms_platform/audio/`;
export const URL_VIDEO = `${process.env.REACT_APP_MEDIA_URL_APP}upload/cms_platform/video/`;
export const TYPE_SPLIT = "##";
export const TYPE_SPLIT_MUL_ANSWER = "|";
export const TEXT_SPLIT = "aaa";
export const AUDIO_ACTION = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/click.mp3`;
export const AUDIO_ERROR = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/wrong_sound.wav`;
export const AUDIO_SUCCESS = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/answer_ding.mp3`;
export const AUDIO_DRAG = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/audio_drag.mp3`;
export const AUDIO_VICTORY = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/victory.mp3`;
export const Game_BG_MUSIC = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/mp3/gameMudic.wav`;
export const INNER_WIDTH = {
  DESKTOP: 1440,
  LAPTOP: 1366,
  IPAD: 1110,
  MOBILE: 500,
  TABLET: 768,
};
export const RELEASE_BOOK_IDS = [
  45, 43, 47, 55, 50, 52, 80, 81, 82, 54, 174, 177, 176, 178,
];
export const TYPE_CUSTOM_NEXT_SLIDER_UPDATE_INFO = {
  full_name: 0,
  birth_day: 0,
  gender_id: 0,
  job_id: 0,
  province_id: 1,
  district_id: 1,
  ward_id: 1,
  school_id: 1,
  list_grade_subject: 2,
  email: 3,
  phone: 3,
};
export const TYPE_CALCULATION = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVIDE: "/",
  EQUAL: "/",
};
export const TYPE_COMPARISON_MATH = {
  LESS_THAN: "<",
  GREATER_THAN: ">",
  NOT_EQUAL_TO: "!=",
  EQUAL_TO: "=",
  LESS_THAN_OR_EQUAL_TO: "<=",
  GREATER_THAN_OR_EQUAL_TO: ">= ",
};
export const COMPARISON_MATH = [
  { type: 1, value: "<" },
  { type: 2, value: ">" },
  // { type: 3, value: "!=" },
  { type: 4, value: "=" },
  // { type: 5, value: "<=" },
  // { type: 6, value: ">=" },
];

export const TYPE_LIST_JOB = [
  {
    id: 1,
    value: "job_1",
    label: "Giáo viên",
  },
  // {
  //   id: 3,
  //   value: "job_3",
  //   label: "Phụ huynh",
  // },
  {
    id: 2,
    value: "job_2",
    label: "Học sinh",
  },
];
export const TYPE_LEVEL = [
  {
    id: 1,
    value: "level_1",
    label: "Cấp 1",
  },
  {
    id: 2,
    value: "level_2",
    label: "Cấp 2",
  },
  {
    id: 3,
    value: "level_3",
    label: "Cấp 3",
  },
];

export const TYPE_OBJECTS = [
  {
    type: TYPE_GAME,
    icon: "fa-pencil-square-o",
  },
  {
    type: TYPE_VIDEO,
    icon: "fa-play-circle",
  },
  {
    type: TYPE_AUDIO,
    icon: "fa-volume-up",
  },
  {
    type: TYPE_IMAGE_TEXT,
    icon: "fa-file-image-o",
  },
  {
    type: TYPE_REFERENCE,
    icon: "fa-link",
  },
];

export const BOOK_LANGUAGE = [
  {
    id: TYPE_VIETNAMESE,
    language: "vi",
    buttonStart: "Bắt đầu",
    buttonMore: "Bắt đầu",
    buttonCheck: "Kiểm tra",
    buttonContinue: "Tiếp theo",
    buttonRefresh: "Làm lại",
    buttonClose: "Kết thúc",
    answer: "Đáp án",
    question: "Câu hỏi",
    msgCorrect: "Bạn trả lời đúng!",
    msgError: "Bạn trả lời sai!",
    msgRefresh: "Làm lại",
    showResult: "Bạn đã trả lời đúng:",
    editShowResult: " câu đúng",
    correctPosition: " vị trí đúng",
    menu: "Mục lục",
    correct_placeholder: "đáp án đúng",
    congratulation: "Chúc mừng bạn!",
    sorry: "Hãy tiếp tục luyện tập nhé!",
    showGraph: "Xem đồ thị",
    yourCorrect: "Bạn đúng:",
    yourSelected: "Bạn lựa chọn:",
    totalCorrect: "Đáp án đúng của bài:",
  },
  {
    id: TYPE_ENGLISH,
    language: "en",
    buttonStart: "Start",
    buttonMore: "See more",
    buttonCheck: "Check",
    buttonContinue: "Next",
    buttonRefresh: "Refresh",
    buttonClose: "Close",
    answer: "Suggested answers",
    question: "Questions",
    msgCorrect: "Correct!",
    msgError: "Try again!",
    msgRefresh: "Refresh",
    showResult: "Correct answer(s):",
    editShowResult: " correct answer(s)",
    correctPosition: " correct position(s)",
    menu: "Table of contents",
    correct_placeholder: "Correct answer(s)",
    congratulation: "Well done!",
    sorry: "Keep on practicing!",
    showGraph: "Show graph",
    yourCorrect: "Your correct answer(s):",
    yourSelected: "Your selected answer(s):",
    totalCorrect: "Total correct answer(s):",
  },
];
export const REG_EXP_EMAIL =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
export const REG_EXP_NUMBER =
  /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/;
export const OPTIONS_FILE = [
  { id: BOOK_INTRO, label: "Video", value: "file_0", type: BOOK_INTRO },
  {
    id: BOOK_DOCUMENT_PDF,
    label: "PDF",
    value: "file_1",
    type: BOOK_DOCUMENT_PDF,
  },
  {
    id: BOOK_DOCUMENT_POWERPOINT,
    label: "Powerpoint",
    value: "file_2",
    type: BOOK_DOCUMENT_POWERPOINT,
  },
];
export const OPTIONS_FILE_EDUCATION_TEACHER = [
  {
    id: EDUCATION_TEACHER,
    label: "Video",
    value: "file_0",
    type: EDUCATION_TEACHER,
  },
  { id: BOOK_INTRO, label: "PDF", value: "file_1", type: BOOK_INTRO },
  {
    id: BOOK_DOCUMENT_POWERPOINT_TEACHER,
    label: "Powerpoint",
    value: "file_2",
    type: BOOK_DOCUMENT_POWERPOINT_TEACHER,
  },
];

export const FONTSIZES = [
  { value: 8, label: "8" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 22, label: "22" },
  { value: 24, label: "24" },
  { value: 26, label: "26" },
  { value: 32, label: "32" },
  { value: 48, label: "48" },
  { value: 96, label: "96" },
];

export const LINEWIDTHS = [
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 8, label: "8" },
  { value: 12, label: "12" },
  { value: 20, label: "20" },
];

export const DEFAULT_OPTION_GRADE_IN_INTRODUCE = {
  id: 0,
  name: "All",
  value: "all",
  label: "Tất cả lớp",
};

export const OPTIONS_GRADE_IN_INTRODUCE = [
  DEFAULT_OPTION_GRADE_IN_INTRODUCE,
  { id: 4, name: "Lớp 1", value: "lop1", label: "Lớp 1" },
  { id: 5, name: "Lớp 2", value: "lop2", label: "Lớp 2" },
  { id: 9, name: "Lớp 6", value: "lop6", label: "Lớp 6" },
];

export const OPTIONS_GRADE = [
  { id: 4, name: "Lớp 1", value: "lop1", label: "Lớp 1" },
  { id: 5, name: "Lớp 2", value: "lop2", label: "Lớp 2" },
  { id: 6, name: "Lớp 3", value: "lop3", label: "Lớp 3" },
  { id: 9, name: "Lớp 6", value: "lop6", label: "Lớp 6" },
  { id: 10, name: "Lớp 7", value: "lop7", label: "Lớp 7" },
  { id: 13, name: "Lớp 10", value: "lop10", label: "Lớp 10" },
];

export const SELECTQUESTIONS = [
  {
    value: "mutiple",
    label: "Trắc nghiệm nhiều đáp án",
  },
  {
    value: "one",
    label: "Trắc nghiệm một đáp án",
  },
];

export const SELECTRANKS = [
  { value: 1, label: "Nhận biết" },
  { value: 2, label: "Thông hiểu" },
  { value: 3, label: "Vận dụng" },
  { value: 4, label: "Vận dụng cao" },
];

export const ICON_BOOK =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

export const OPTIONS_FILE_COURSEWARE = [
  {
    id: 0,
    label: "Tất cả",
    value: "file_0",
    type: 0,
  },
  {
    id: WORKSHEET_PDF,
    label: "PDF",
    value: WORKSHEET_PDF,
    type: WORKSHEET_PDF,
  },
  {
    id: WORKSHEET_VIDEO,
    label: "Video",
    value: WORKSHEET_VIDEO,
    type: WORKSHEET_VIDEO,
  },
  {
    id: WORKSHEET_AUDIO,
    label: "Audio",
    value: WORKSHEET_AUDIO,
    type: WORKSHEET_AUDIO,
  },
  {
    id: WORKSHEET_WORD,
    label: "Word",
    value: WORKSHEET_WORD,
    type: WORKSHEET_WORD,
  },
  {
    id: WORKSHEET_PPT,
    label: "Ppt",
    value: WORKSHEET_PPT,
    type: WORKSHEET_PPT,
  },
  {
    id: WORKSHEET_ZIP,
    label: "Zip",
    value: WORKSHEET_ZIP,
    type: WORKSHEET_ZIP,
  },
];

export const OPTIONS_FILE_SUBJECTS_COURSEWARE = [
  { id: 1, label: "Tiếng Anh", value: "file_1", type: 1 },
  { id: 2, label: "Môn khác", value: "file_0", type: 2 },
];

export const CHARACTOR = {
  a: 60,
  ă: 60,
  â: 60,
  b: 60,
  c: 52,
  d: 60,
  đ: 60,
  e: 60,
  ê: 60,
  f: 30,
  g: 60,
  h: 60,
  i: 25,
  j: 25,
  k: 52,
  l: 25,
  m: 87,
  n: 60,
  o: 60,
  ô: 60,
  ơ: 60,
  p: 60,
  q: 60,
  r: 35,
  s: 52,
  t: 30,
  u: 60,
  ư: 60,
  v: 52,
  w: 77,
  x: 52,
  y: 52,
  z: 52,
  A: 70,
  Ă: 70,
  Â: 70,
  B: 70,
  C: 77,
  D: 77,
  Đ: 77,
  E: 70,
  Ê: 70,
  F: 65,
  G: 82,
  H: 77,
  I: 30,
  J: 55,
  K: 70,
  L: 60,
  M: 87,
  N: 77,
  O: 82,
  Ô: 82,
  Ơ: 82,
  P: 70,
  Q: 82,
  R: 77,
  S: 70,
  T: 65,
  U: 77,
  Ư: 77,
  V: 70,
  W: 100,
  X: 70,
  Y: 70,
  Z: 65,
  0: 65,
  1: 35,
  2: 55,
  3: 70,
  4: 65,
  5: 65,
  6: 65,
  7: 65,
  8: 65,
  9: 65,
};
export const TIME_OUT_LOGOUT = 3600000;
// export const TIME_OUT_LOGOUT = 300000;
export const CODE_NOT_LOGIN = 302;
export const CODE_NOT_ACCESS_BOOK = 303;

export const GRADETEST3710 = [
  { id: 6, name: "Lớp 3", value: "lop3 ", label: "Lớp 3" },
  { id: 10, name: "Lớp 7", value: "lop7 ", label: "Lớp 7" },
  { id: 13, name: "Lớp 10", value: "lop10 ", label: "Lớp 10" },
];

export function getGradeIdTest3710(gradeId) {
  if (gradeId === "6") {
    return [{ id: 6, name: "Lớp 3", value: "lop3 ", label: "Lớp 3" }];
  }
  if (gradeId === "10") {
    return [{ id: 10, name: "Lớp 7", value: "lop7 ", label: "Lớp 7" }];
  }
  if (gradeId === "13") {
    return [{ id: 13, name: "Lớp 10", value: "lop10 ", label: "Lớp 10" }];
  }
  return [
    { id: 6, name: "Lớp 3", value: "lop3 ", label: "Lớp 3" },
    { id: 10, name: "Lớp 7", value: "lop7 ", label: "Lớp 7" },
    { id: 13, name: "Lớp 10", value: "lop10 ", label: "Lớp 10" },
  ];
}

export const MENU_INTRO = 1;
export const MENU_STUDENT = 2;
export const MENU_TEACHER = 3;
export const MENU_SUPPORT = 4;
export const MOBILE_MENU_EXERCISE = 5;
export const MENU_KNOWLEDGE = 6;

export const GENDER = [
  { id: 1, value: 1, label: "Nữ" },
  { id: 2, value: 2, label: "Nam" },
];

export const GRADES = {
  all: 0,
  cap1: 1,
  cap2: 2,
  cap3: 3,
  lop1: 4,
  lop2: 5,
  lop3: 6,
  lop4: 7,
  lop5: 8,
  lop6: 9,
  lop7: 10,
  lop8: 11,
  lop9: 12,
  lop10: 13,
  lop11: 14,
  lop12: 15,
};

export const grades = [
  // { value: 0, label: "Tất cả lớp" },
  { value: GRADES.lop1, label: "Lớp 1" },
  { value: GRADES.lop2, label: "Lớp 2" },
  { value: GRADES.lop3, label: "Lớp 3" },
  { value: GRADES.lop4, label: "Lớp 4" },
  { value: GRADES.lop5, label: "Lớp 5" },
  { value: GRADES.lop6, label: "Lớp 6" },
  { value: GRADES.lop7, label: "Lớp 7" },
  { value: GRADES.lop8, label: "Lớp 8" },
  { value: GRADES.lop9, label: "Lớp 9" },
  { value: GRADES.lop10, label: "Lớp 10" },
  { value: GRADES.lop11, label: "Lớp 11" },
  { value: GRADES.lop12, label: "Lớp 12" },
];

export const listSubject = [
  { id: 32, title: "Tiếng Việt", levelSchool: 1 },
  { id: 33, title: "Toán", levelSchool: 1 },
  { id: 34, title: "Đạo đức", levelSchool: 1 },
  { id: 35, title: "Tự nhiên xã hội", levelSchool: 1 },
  { id: 36, title: "Âm nhạc", levelSchool: 1 },
  { id: 37, title: "Mĩ thuật", levelSchool: 1 },
  { id: 38, title: "Giáo dục thể chất", levelSchool: 1 },
  { id: 39, title: "Tiếng Anh", levelSchool: 1 },
  { id: 40, title: "Hoạt động trải nghiệm", levelSchool: 1 },
  { id: 41, title: "Tin học", levelSchool: 1 },
  { id: 69, title: "Công nghệ", levelSchool: 1 },
  { id: 42, title: "Ngữ văn", levelSchool: 2 },
  { id: 43, title: "Toán", levelSchool: 2 },
  { id: 44, title: "Khoa học tự nhiên", levelSchool: 2 },
  { id: 45, title: "Lịch sử và Địa lí", levelSchool: 2 },
  { id: 46, title: "Giáo dục công dân", levelSchool: 2 },
  { id: 47, title: "Tin học", levelSchool: 2 },
  { id: 48, title: "Công nghệ", levelSchool: 2 },
  { id: 49, title: "Tiếng Anh", levelSchool: 2 },
  { id: 50, title: "Âm nhạc", levelSchool: 2 },
  { id: 51, title: "Mĩ thuật", levelSchool: 2 },
  { id: 52, title: "Giáo dục thể chất", levelSchool: 2 },
  { id: 53, title: "Hoạt động trải nghiệm, hướng nghiệp", levelSchool: 2 },
  { id: 54, title: "Ngữ văn", levelSchool: 3 },
  { id: 55, title: "Toán", levelSchool: 3 },
  { id: 56, title: "Vật lí", levelSchool: 3 },
  { id: 57, title: "Lịch sử và Địa lí", levelSchool: 3 },
  { id: 58, title: "Mĩ thuật", levelSchool: 1 },
  { id: 59, title: "Âm nhạc", levelSchool: 3 },
  { id: 60, title: "Công nghệ", levelSchool: 3 },
  { id: 61, title: "Tin học", levelSchool: 3 },
  { id: 62, title: "Sinh học", levelSchool: 3 },
  { id: 63, title: "Hoá học", levelSchool: 3 },
  { id: 64, title: "Giáo dục kinh tế và pháp luật", levelSchool: 3 },
  { id: 65, title: "Giáo dục thể chất", levelSchool: 3 },
  { id: 66, title: "Hoạt động trải nghiệm, hướng nghiệp", levelSchool: 3 },
  { id: 67, title: "Tiếng Anh", levelSchool: 3 },
  { id: 68, title: "Giáo dục quốc phòng và an ninh", levelSchool: 3 },
  { id: 72, title: "Lịch sử", levelSchool: 3 },
  { id: 73, title: "Địa lí", levelSchool: 3 },
  { id: 999, title: "Giới thiệu chung", levelSchool: 1 },
];

export const SUBJECTS_ID = {
  tieng_viet: 32,
  toan_cap1: 33,
  dao_duc_cap1: 34,
  tu_nhien_xa_hoi_cap1: 35,
  am_nhac_cap1: 36,
  mi_thuat_cap1: 37,
  giao_duc_the_chat_cap1: 38,
  tieng_anh_cap1: 39,
  hoat_dong_trai_nghiem_cap1: 40,
  tin_hoc_cap1: 41,
  cong_nghe_cap1: 69,
  lich_su_va_dia_li_cap_1: 78,
  khoa_hoc_cap1: 77,
  ngu_van_cap2: 42,
  toan_cap2: 43,
  khoa_hoc_tu_nhien_cap2: 44,
  lich_su_va_dia_li_cap2: 45,
  giao_duc_cong_dan_cap2: 46,
  tin_hoc_cap2: 47,
  cong_nghe_cap2: 48,
  tieng_anh_cap2: 49,
  am_nhac_cap2: 50,
  mi_thuat_cap2: 51,
  giao_duc_the_chat_cap2: 52,
  hoat_dong_trai_nghiem_cap2: 53,
  ngu_van_cap3: 54,
  toan_cap3: 55,
  vat_ly_cap3: 56,
  lich_su_va_dia_li_cap3: 57,
  mi_thuat_cap3: 58,
  am_nhac_cap3: 59,
  cong_nghe_cap3: 60,
  tin_hoc_cap3: 61,
  sinh_hoc_cap3: 62,
  hoa_hoc_cap3: 63,
  giao_duc_kinh_te_va_phap_luat_cap3: 64,
  giao_duc_the_chat_cap3: 65,
  hoat_dong_trai_nghiem_cap3: 66,
  tieng_anh_cap3: 67,
  giao_duc_quoc_phong_an_ninh_cap3: 68,
  lich_su_cap3: 72,
  dia_li_cap3: 73,
};

export const bookTypes = [
  { id: 1, title: "textbook" },
  { id: 5, title: "supplementary_book" },
  { id: 3, title: "teacher_book" },
];

export const VERIFY_EMAIL = 1;

export const PRIMARY_SCHOOL = [
  GRADES.lop1,
  GRADES.lop2,
  GRADES.lop3,
  GRADES.lop4,
  GRADES.lop5,
];
export const API_SUCCESS = "success";

export const gradeOptions = [
  {
    value: 4,
    label: "Khối lớp 1",
    name: "Lớp 1",
  },
  {
    value: 5,
    label: "Khối lớp 2",
    name: "Lớp 2",
  },
  {
    value: 6,
    label: "Khối lớp 3",
    name: "Lớp 3",
  },
  {
    value: 7,
    label: "Khối lớp 4",
    name: "Lớp 4",
  },
  {
    value: 8,
    label: "Khối lớp 5",
    name: "Lớp 5",
  },
  {
    value: 9,
    label: "Khối lớp 6",
    name: "Lớp 6",
  },
  {
    value: 10,
    label: "Khối lớp 7",
    name: "Lớp 7",
  },
  {
    value: 11,
    label: "Khối lớp 8",
    name: "Lớp 8",
  },
  {
    value: 12,
    label: "Khối lớp 9",
    name: "Lớp 9",
  },
  {
    value: 13,
    label: "Khối lớp 10",
    name: "Lớp 10",
  },
  {
    value: 14,
    label: "Khối lớp 11",
    name: "Lớp 11",
  },
  {
    value: 15,
    label: "Khối lớp 12",
    name: "Lớp 12",
  },
];

export const schoolYearOptions = [
  {
    id: 1,
    value: "2021-2022",
    label: "Năm học 2021-2022",
  },
];
export const displayDuration = ({ $d }) => {
  return `${$d.hours > 0 ? `${$d.hours}:` : ""}${
    $d.minutes > 9 ? $d.minutes : `0${$d.minutes}`
  }:${$d.seconds > 9 ? $d.seconds : `0${$d.seconds}`}`;
};

export const UPDATE_COUNT_SHARE = 1;
export const UPDATE_COUNT_COPY = 2;
export const PRACTIVE = 1;
export const MOCKTEST = 2;
export const EMAIL_VERIFIED = 1;

export const DEFAULT_PROVICE = { value: "", label: "Tất cả tỉnh, thành phố" };
export const DEFAULT_DISTRICT = { value: "", label: "Tất cả quận, huyện" };
export const DEFAULT_WARD = { value: "", label: "Tất cả xã, phường, thị trấn" };
export const DEFAULT_SCHOOL = { value: "", label: "Tất cả trường" };

export const PUBLISH_QUIZ_TRAINING = 1;
export const TIME_FINISH_TRAINING = 1661965199000; // 23h59 31/08/2022
export const TIME_START_TRAINING = 1661360399000; // 23h59 24/08/2022

export const MODE_FILTER_DISABLED = 1;
export const MODE_FILTER_HIDE = 2;
