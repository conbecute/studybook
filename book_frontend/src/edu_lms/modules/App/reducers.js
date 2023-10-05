import * as TYPES from "../../constants/actionsType";
import * as PATH from "../../constants/path";
import * as TEXT from "../../constants/text";
import {
  APP_ID as HOC10_APP_ID,
  TIME_FINISH_TRAINING,
  TIME_START_TRAINING,
  TUTORING_APP_ID,
} from "edu_lms/constants/type";
import { getOpenTrainingInfo } from "../../../edu_lms_v2/utils/training";

const product = process.env.REACT_APP_APP_ID;

const configTutoring = {
  showMenu: false, // show menu page assign list student
  showCores: false, // show cores page detail result doing exercises
  showSubject: false, // show subject on header doing exercises
  showGrade: false, // show grade on header doing exercises
  createQuestionSet: false, // button create question set page hoc-lieu-cua-toi
  editQuestionSet: false, // button edit question set page hoc-lieu-cua-toi
};

const configHoc10 = {
  showMenu: true, // show menu page assign list student
  showCores: true, // show cores page detail result doing exercises
  showSubject: true, // show subject on header doing exercises
  showGrade: true, // show grade on header doing exercises
  createQuestionSet: true, // button create question set page hoc-lieu-cua-toi
  editQuestionSet: true, // button edit question set page hoc-lieu-cua-toi
};

let config = {};

if (Number(product) === HOC10_APP_ID) config = configHoc10;
if (Number(product) === TUTORING_APP_ID) config = configTutoring;

const { isOpenTraining, isBeforeTraining, isAfterTraining } =
  getOpenTrainingInfo(TIME_START_TRAINING, TIME_FINISH_TRAINING);

let initialState = {
  isShowLoading: false,
  statusModal: false,
  typePopup: 1,
  srcAudio: "",
  dataPopupPdf: {
    title: "",
    url: "",
  },
  dataSuccess: {
    status: false,
    title: TEXT.TITLE_POPUP_SUCCESS,
    url: PATH.ROUTE_PATH_BOOK_USED,
    labelButton: TEXT.BUTTON_ACCESS_TO_THE_SOFT_BOOK_STORE,
  },
  listGrade: [],
  listGradeAll: [],
  listBookType: [
    { id: 1, name: "Sách giáo khoa" },
    { id: 2, name: "Sách tham khảo" },
  ],
  statusTour: false,
  currentStep: 1,
  userLocation: {},
  config,
  trainingConfig: {
    isOpenTraining,
    isBeforeTraining,
    isAfterTraining,
  },
};

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_SHOW_POPUP_LOADING:
      const isShowLoading = action.payload.status;
      return { ...state, isShowLoading };
    case TYPES.PA_SHOW_POPUP_ACTIVATE_BOOK:
      const statusModal = action.payload.status;
      return { ...state, statusModal };
    case TYPES.PA_SHOW_POPUP_SUCCESS:
      const dataSuccess = action.dataSuccess;
      return { ...state, dataSuccess };
    case TYPES.PA_LIST_GRADE:
      const listGrade = action.data.map((item, index) => {
        const value = `lop${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listGrade };
    case TYPES.PA_LIST_GRADE_ALL:
      const listGradeAll = action.data.map((item, index) => {
        const value = `lop${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listGradeAll };
    case TYPES.PA_LIST_BOOK_TYPE:
      const listBookType = action.data;
      return { ...state, listBookType };
    case TYPES.PA_DATA_SHOW_POPUP_PDF:
      const dataPopupPdf = action.data;
      return { ...state, dataPopupPdf };
    case TYPES.PA_DATA_TYPE_POPUP:
      const typePopup = action.typePopup;
      return { ...state, typePopup };
    case TYPES.PA_DATA_REACT_TOUR:
      const statusTour = action.data;
      return { ...state, statusTour };
    case TYPES.PA_CURRENT_STEP:
      const currentStep = action.data;
      return { ...state, currentStep };
    case TYPES.PA_SET_SRC_AUDIO:
      const srcAudio = action.data;
      return { ...state, srcAudio };
    case TYPES.PA_SET_IP_ADDRESS:
      const ipAddress = action.data;
      return { ...state, ipAddress };
    case TYPES.PA_UPDATE_TRAINING_CONFIG:
      const trainingConfig = action.data;
      return { ...state, trainingConfig };
    case TYPES.PA_RESET_APP:
      return { ...initialState };
    case TYPES.PA_SET_USER_LOCATION:
      const userLocation = action.data;
      return { ...state, userLocation };
    case TYPES.PA_IS_BOOK_ENGLISH:
      const isBookEnglish = action.payload.data;
      return { ...state, isBookEnglish };
    default:
      return state;
  }
};
export default myReducer;
