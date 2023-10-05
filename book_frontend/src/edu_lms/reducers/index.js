import { combineReducers } from "redux";
import app from "../modules/App/reducers";
import generalReducer from "../modules/General/reducers";
import listBookReducer from "../modules/ListBook/reducers";
import signInReducers from "../modules/SignIn/reducers";
import forgotPasswordReducers from "../modules/ForgotPassword/reducers";
import verifyOtpReducers from "../modules/VerifyOtpPw/reducers";
import updateInfoInReducers from "../modules/UpdateInformation/reducers";
import introduceReducer from "../modules/Introduce/reducers";
import tutorialReducer from "../modules/Tutorial/reducers";
import educationReducer from "../modules/EducationProgram/reducers";
import coursewareReducer from "../modules/ElectronicCourseware/reducers";
import readingBookReducers from "../modules/ReadingBooks/reducers";
import listQuestion from "../components/ListQuestion/reducers";
import educationTeacherReducer from "../modules/EducationTeacher/reducers";
import updateListQuiz from "../modules/ListQuiz/reducers";
import dashboardReducer from "../modules/Dashboard/reducers";
import slideReducer from "../modules/SlideLibrary/reducers";
import readingSlideReducer from "../modules/ReadingSlideLibrary/reducers";
import questionWareHouseSlideReducer from "../modules/QuestionSet/reducers";
import questionReducer from "../modules/Question/reducers";
import questionSetReducer from "../modules/QuestionSet/reducers";
import notiReducer from "edu_lms_v2/modules/Notification/reducers";
import teachingReducer from "edu_lms_v2/modules/TeachingManager/reducers";
import mockTestReducers from "edu_lms_v2/modules/MockTest/reducers";
import doingExerciseReducers from "edu_lms/modules/DoingExercise/reducers";

const rootReducer = combineReducers({
  app,
  generalReducer,
  listBookReducer,
  signInReducers,
  forgotPasswordReducers,
  verifyOtpReducers,
  updateInfoInReducers,
  introduceReducer,
  tutorialReducer,
  educationReducer,
  coursewareReducer,
  readingBookReducers,
  listQuestion,
  educationTeacherReducer,
  updateListQuiz,
  dashboardReducer,
  slideReducer,
  readingSlideReducer,
  questionWareHouseSlideReducer,
  questionReducer,
  questionSetReducer,
  notiReducer,
  teachingReducer,
  mockTestReducers,
  doingExerciseReducers
});
export default rootReducer;
