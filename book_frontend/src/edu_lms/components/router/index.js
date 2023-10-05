import React from "react";
import { Route, Redirect } from "react-router";
import * as PATH from "../../constants/path";
import SignInContainer from "../../modules/SignIn/container";
import SignUpContainer from "../../modules/SignUp/container";
import ForgotPasswordContainer from "../../modules/ForgotPassword/container";
import NotFoundContainer from "../../modules/NotFound/containers";
import TutorialContainer from "../../modules/Tutorial/container";
import ListBookContainer from "../../modules/ListBook/container";
import UpdateInformationContainer from "../../modules/UpdateInformation/container";
import BookDetailContainer from "../../modules/BookDetail/container";
import ProgrammerContainer from "../../modules/ProgrammeGDPT/contatiner";
import IntroduceContainer from "../../modules/Introduce/contatiner";
import EducationTeacherContainer from "../../modules/EducationTeacher/contatiner";
import JobContainer from "../../modules/Job/container";
import VerifyOtpPwContainer from "../../modules/VerifyOtpPw/container";
import ChangePwContainer from "../../modules/ChangePw/container";
import ContactContainer from "../../modules/Contact/container";
import TermsOfUseContainer from "../../modules/TermsOfUse";
import PrivacyPolicyContainer from "../../modules/PrivacyPolicy";
import ReadingBooksContainer from "../../modules/ReadingBooks/containers";
import BookIntroduceContainer from "../../modules/BookInstruction/container";
import TrainingTestContainer from "../../modules/TrainingTest/containers";
import ListQuizContainer from "../../modules/ListQuiz/containers";
import ListQuizDetailContainer from "../../modules/ListQuizDetail/containers";
import DashboardContainer from "../../modules/Dashboard/container";
import AdminGradeContainer from "../../modules/Dashboard/Page/AdminGrade/container";
import AdminStudentContainer from "../../modules/Dashboard/Page/AdminStudent/container";
import AdminTeacherContainer from "../../modules/Dashboard/Page/AdminTeacher/container";
import AdminDepartmentEducationContainer from "../../modules/Dashboard/Page/AdminDepartmentEducation/container";
import AdminSchoolContainer from "../../modules/Dashboard/Page/AdminSchool/container";
import Dashboard from "../../modules/Dashboard/components/Dashboard";
import ResultQuizProvinceContainer from "../../modules/Dashboard/Page/ResultQuizProvince/container";
import ResultQuizDistrictContainer from "../../modules/Dashboard/Page/ResultQuizDistrict/container";
import ResultQuizSchoolContainer from "../../modules/Dashboard/Page/ResultQuizSchool/container";
import ResultQuizTeacherContainer from "../../modules/Dashboard/Page/ResultQuizTeacher/container";
import ResultQuizDetailContainer from "../../modules/Dashboard/Page/ResultQuizDetail/container";
import AdminDetailContainer from "../../modules/Dashboard/Page/AdminDetail/container";
import SlideLibraryContainer from "../../modules/SlideLibrary/container";
import ReadingSlideLibraryContainer from "../../modules/ReadingSlideLibrary/containers";
import QuestionContainer from "../../modules/Question/container";
import ExerciseContainer from "../../modules/DoingExercise/container";
import Home from "../../../edu_lms_v2/modules/Home/index";

import ListBook from "edu_lms_v2/modules/ListBook/index";
import Register from "../../../edu_lms_v2/modules/Register";
import UpdateInformation from "../../../edu_lms_v2/modules/UpdateInformation";
import PrivacyPolicy from "../../../edu_lms_v2/modules/Contacts";
import Setting from "../../../edu_lms_v2/modules/Setting";
import BookIntro from "../../../edu_lms_v2/modules/BookIntro";
import Intro from "../../../edu_lms_v2/modules/Intro";
import SliderLibrary from "../../../edu_lms_v2/modules/SlideLibrary/index";
import OnePercentIntro from "../../../edu_lms_v2/modules/OnePercentIntro";
import Student from "../../../edu_lms_v2/modules/Student";
import Teacher from "../../../edu_lms_v2/modules/Teacher";
import ReadingSlide from "../../../edu_lms_v2/modules/ReadingSlide";
import LoginPage from "edu_lms_v2/modules/Login/LoginPage";
import FrequentQuestion from "../../../edu_lms_v2/modules/FrequentQuestion";
import Term from "edu_lms_v2/modules/Term";
import Privacy from "edu_lms_v2/modules/Privacy";
import { menu } from "edu_lms_v2/data/guide";
import Notification from "edu_lms_v2/modules/Notification";
import QuestionSetWrapper from "edu_lms_v2/modules/ControlDoingExercise";
import Training from "edu_lms_v2/modules/Training";
import { ListStudentDoingHomeWork } from "edu_lms_v2/modules/TeachingManager/ListStudentDoingHomeWork/ListStudentDoingHomeWork";
import TeacherExerciseList from "edu_lms_v2/modules/TeachingManager/ClassroomManager/ExerciseClassroom/ListExercise";
import StudentDoingExercise from "edu_lms_v2/modules/Student/DoingExercise";
import StudentDoingExercise2 from "edu_lms_v2/modules/Student/DoingExercise2";
import StudentDoingExercise3 from "edu_lms_v2/modules/Student/Doingexercise3";
import StudentDoingExercise4 from "edu_lms_v2/modules/Student/DoingExercise4";
import StudentDoingExercise5 from "edu_lms_v2/modules/Student/DoingExercise5";
import StudentDoingExercise6 from "edu_lms_v2/modules/Student/DoingExercise6";
import QuestionLibraryV2 from "edu_lms_v2/modules/QuestionLibraryV2";
import ResultQuestion from "edu_lms_v2/modules/MockTest/ResultQuestion";
import MockTest2 from "edu_lms_v2/modules/MockTest/MockTest2";
import MockTest from "edu_lms_v2/modules/MockTest";
import ListExerciseResultDetail from "edu_lms_v2/modules/TeachingManager/ClassroomManager/ListExerciseResultDetail";
import HistoryExam from "edu_lms_v2/modules/HistoryExam";
import ViewDetail from "edu_lms_v2/modules/DetailTraining/ViewDetail";
import ViewAllDetail from "edu_lms_v2/modules/DetailTraining/ViewAllDetail";
import News from "edu_lms_v2/modules/News";
import Classroom from "edu_lms_v2/modules/Classroom";
import ClassroomDetail from "edu_lms_v2/modules/Classroom/ClassroomDetail";
import { HistoryQuiz } from "edu_lms_v2/modules/Training/HistoryQuiz";
import UpdateInformationTraining from "edu_lms_v2/modules/Training/TrainingTest/UpdateInformation";
import { VerifyEmailWrapper } from "../../../edu_lms_v2/modules/VerifyEmailWrapper";
import TrackingLinkRedirect from "edu_lms_v2/modules/TrackingLinkRedirect";
import RedirectLink from "edu_lms_v2/modules/RedirectLink";
import TestGame from "edu_lms_v2/modules/TestGame";
import DashboardTraining from "edu_lms_v2/modules/DashBoardTraining";
import PublisherList from "edu_lms_v2/modules/PublisherList";
import { onResultUserInfo } from "edu_lms/modules/selection";
import DashboardEvent from "edu_lms_v2/modules/DashBoardEvent";
import Knowledge from "edu_lms_v2/modules/Blog/Knowledge/Knowledge ";
import KnowledgeSubject from "edu_lms_v2/modules/Blog/KnowledgeSubject";
import KnowledgeDetail from "edu_lms_v2/modules/Blog/ViewDetail/KnowledgeDetail";
import KnowledgeNewsPost from "edu_lms_v2/modules/Blog/KnowledgeNewsPost";
import OtherKnowledge from "edu_lms_v2/modules/Blog/OtherKnowledge";
import ViewDetailOther from "edu_lms_v2/modules/Blog/ViewDetailOther";

const env = process.env.REACT_APP_APP_ID;
const HOC10_APP_ID = "68";
const TUTORING_APP_ID = "69";
const userInfo = onResultUserInfo();

const commonRoutes = [
  {
    path: `${PATH.ROUTE_PATH_V3_SIGN_IN}`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <LoginPage match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_SIGN_IN,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_SIGN_IN}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_MY_STUDY,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <QuestionSetWrapper />,
  },
  {
    path: `${PATH.ROUTE_PATH_CLASSROOM}:idClassroom${PATH.ROUTE_PATH_EXERCISE_CLASSROOL}:questionSetId/:userId`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <HistoryExam match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_CLASSROOM,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Classroom />,
  },
  {
    path: `${PATH.ROUTE_PATH_CLASSROOM}:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ClassroomDetail match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_CLASSROOM}:idClassroom${PATH.ROUTE_PATH_EXERCISE_CLASSROOL}:questionSetId`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ListExerciseResultDetail match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_QUESTION_SET_V2,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <QuestionLibraryV2 />,
  },
  {
    path: `${PATH.ROUTE_PATH_EXERCISE}/:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ExerciseContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_PRACTIVE}/:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ExerciseContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST}:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ExerciseContainer match={match} />,
  },
];

const hoc10Routes = [
  ...commonRoutes,
  {
    path: PATH.ROUTE_PATH_SIGN_IN_V1,
    accept: true,
    exact: true,
    key: 1,
    showHeader: false,
    showFooter: false,
    main: () => <SignInContainer />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <MockTest />,
  },
  {
    path: PATH.ROUTE_PATH_SIGN_UP,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <SignUpContainer />,
  },
  {
    path: PATH.ROUTE_PATH_FORGOT_PASSWORD,
    accept: true,
    exact: true,
    key: 1,
    showHeader: false,
    showFooter: false,
    main: () => <ForgotPasswordContainer />,
  },
  {
    path: PATH.ROUTE_PATH_VERIFY_OTP_PW,
    accept: true,
    exact: true,
    key: 1,
    showHeader: false,
    showFooter: false,
    main: () => <VerifyOtpPwContainer />,
  },
  {
    path: PATH.ROUTE_PATH_CHANGE_PW,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <ChangePwContainer />,
  },
  {
    path: PATH.ROUTE_PATH_FORM_JOB,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <JobContainer />,
  },
  {
    path: PATH.ROUTE_PATH_EDUCATION_PROGRAM,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_BOOK_INTRO}`,
        }}
      />
    ),
  },

  {
    path: `${PATH.ROUTE_PATH_NEWS_TRAINING}:slug`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ViewDetail match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_NEWS_TRAINING,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ViewAllDetail match={match} />,
  },
  // {
  //   path: PATH.ROUTE_BLOG_KNOWLEDGE,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <Knowledge match={match} />,
  // },
  // {
  //   path: PATH.ROUTE_BLOG_KNOWLEDGE_OTHER,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <OtherKnowledge match={match} />,
  // },
  // {
  //   path: `${PATH.ROUTE_BLOG_KNOWLEDGE_OTHER}:slug`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <ViewDetailOther match={match} />,
  // },
  // {
  //   path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <Knowledge match={match} />,
  // },
  // {
  //   path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType/:classType/:subjectType/:slug`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <KnowledgeDetail match={match} />,
  // },
  // {
  //   path: `${PATH.ROUTE_BLOG_KNOWLEDGE_NEWS_POST}:slug`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <KnowledgeNewsPost match={match} />,
  // },
  // {
  //   path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType/:subjectType`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: ({ match }) => <KnowledgeSubject match={match} />,
  // },
  {
    path: PATH.ROUTE_BLOG_KNOWLEDGE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <Knowledge match={match} />,
  },
  {
    path: PATH.ROUTE_BLOG_KNOWLEDGE_OTHER,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <OtherKnowledge match={match} />,
  },
  {
    path: `${PATH.ROUTE_BLOG_KNOWLEDGE_OTHER}:slug`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => (
      <>
        <Redirect to={{ pathname: match.url.toLowerCase() }} />
        <ViewDetailOther match={match} />
      </>
    ),
  },
  {
    path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <Knowledge match={match} />,
  },
  {
    path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType/:classType/:subjectType/:slug`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => (
      <>
        <Redirect to={{ pathname: match.url.toLowerCase() }} />
        <KnowledgeDetail match={match} />
      </>
    ),
  },
  {
    path: `${PATH.ROUTE_BLOG_KNOWLEDGE_NEWS_POST}:slug`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <KnowledgeNewsPost match={match} />,
  },
  {
    path: `${PATH.ROUTE_BLOG_KNOWLEDGE}:levelType/:subjectType`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <KnowledgeSubject match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_NEWS,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <News match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_CONTACT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <ContactContainer />,
  },
  {
    path: PATH.ROUTE_PATH_TERMS_OF_USE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <TermsOfUseContainer />,
  },
  {
    path: PATH.ROUTE_PATH_PRIVACY_POLICY,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <PrivacyPolicyContainer />,
  },
  {
    path: PATH.ROUTE_PATH_V2_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_INTRO}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_BOOK_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_BOOK_INTRO}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_ONEPERCENT_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_ONEPERCENT_INTRO}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_LIST_BOOK,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_LIST_SLIDE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_SLIDE}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_FREQUENT_QUESTION,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_FREQUENT_QUESTION}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_CONTACT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_CONTACT}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_CONTACT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_CONTACT}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_TERM_OF_USE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_TERM_OF_USE}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_PRIVACY_POLICY,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_PRIVACY_POLICY}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_UPDATEINFORMATION,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_UPDATEINFORMATION}`,
        }}
      />
    ),
  },
  // {
  //   path: PATH.ROUTE_PATH_V2_REGISTER,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_REGISTER}`,
  //       }}
  //     />
  //   ),
  // },
  // {
  //   path: PATH.ROUTE_PATH_V2_TEACHER,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_TEACHER}`,
  //       }}
  //     />
  //   ),
  // },
  // {
  //   path: PATH.ROUTE_PATH_V2_STUDENT,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_STUDENT}`,
  //       }}
  //     />
  //   ),
  // },

  {
    path: PATH.ROUTE_PATH_V2_TEACHER,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_TEACHER}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_STUDENT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_STUDENT}`,
        }}
      />
    ),
  },
  // {
  //   path: PATH.ROUTE_PATH_V2_REGISTER,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_REGISTER}`,
  //       }}
  //     />
  //   ),
  // },
  // {
  //   path: PATH.ROUTE_PATH_V2_TEACHER,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_TEACHER}`,
  //       }}
  //     />
  //   ),
  // },
  // {
  //   path: PATH.ROUTE_PATH_V2_STUDENT,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => (
  //     <Redirect
  //       to={{
  //         pathname: `${PATH.ROUTE_PATH_V3_STUDENT}`,
  //       }}
  //     />
  //   ),
  // },
  {
    path: PATH.ROUTE_PATH_GENERAL,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_BOOK_USED,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_LIST_BOOK_GRADE3,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
          search: "?block=1&grade=6&subject=32",
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_LIST_BOOK_GRADE7,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
          search: "?block=2&grade=10&subject=42",
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_V2_LIST_BOOK_GRADE10,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
          search: "?block=3&grade=13&subject=54",
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_LIST_BOOK,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ListBookContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_LIST_BOOK_TEACHER,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_LIST_BOOK_TEST_3710,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <ListBookContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_LIST_BOOK_DOCUMENT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_LIST_WORK_BOOK,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: `${PATH.ROUTE_PATH_BOOK_DETAIL}/:name/:bookType/:id/:pageId`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <BookDetailContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_READING_BOOKS}/:name/:bookType/:id/:pageId`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ReadingBooksContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_READING_BOOKS}/:name/:bookType/:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ReadingBooksContainer match={match} />,
  },

  {
    path: `${PATH.ROUTE_PATH_READING_SLIDE_LIBRARY}/:name/:id`,
    accept: true,
    key: 2,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ReadingSlideLibraryContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_READING_SLIDE_LIBRARY}/:id`,
    accept: true,
    key: 2,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ReadingSlideLibraryContainer match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_BOOK_INSTRUCTION}/:name/:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <BookIntroduceContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_TUTORIAL,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <TutorialContainer />,
  },
  {
    path: `${PATH.ROUTE_PATH_LIST_STUDENT_DOING_HOMEWORK}:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <ListStudentDoingHomeWork />,
  },
  {
    path: PATH.ROUTE_INSTRUCTION_ACTIVATED_BOOK,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_FREQUENT_QUESTION}`,
          search: `?q=${menu[1].item[0].slug}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_BOOK_ACTIVATION_INSTRUCTIONS,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_FREQUENT_QUESTION}`,
          search: `?q=${menu[1].item[0].slug}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_PROGRAMME_GDPT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <ProgrammerContainer />,
  },
  {
    path: PATH.ROUTE_PATH_INTRODUCE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <IntroduceContainer />,
  },
  {
    path: PATH.ROUTE_PATH_EDUCATION_TEACHER,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <EducationTeacherContainer />,
  },

  {
    path: PATH.ROUTE_PATH_SLIDE_LIBRARY,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <SlideLibraryContainer />,
  },
  {
    path: PATH.ROUTE_PATH_VERIFY_EMAIL,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <VerifyEmailWrapper />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST_5,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <ResultQuestion />,
  },

  {
    path: `${PATH.ROUTE_PATH_QUESTION}/:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <QuestionContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_TRAINING_TEST,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <TrainingTestContainer />,
  },
  {
    path: PATH.ROUTE_PATH_TRAINING_TEST_2,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <TrainingTestContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_LIST_QUIZ,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <ListQuizContainer />,
  },
  {
    path: PATH.ROUTE_PATH_LIST_HISTORY_QUIZ,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <HistoryQuiz />,
  },
  {
    path: `${PATH.ROUTE_PATH_LIST_QUIZ_DETAIL}/:gradeId/:subjectId/:quizId`,
    accept: true,
    key: 2,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ListQuizDetailContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_ELECTRONIC_COURSEWARE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_UPDATE_INFORMATION,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <UpdateInformationContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_UPDATE_PASSWORD,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <UpdateInformationContainer match={match} />,
  },
  {
    path: PATH.ROUTE_PATH_DOWNLOAD,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
          search: "?block=3&grade=13&subject=61",
        }}
      />
    ),
  },
  // TODO: Remove these dashboard routers
  // BEGIN: Dashboard
  {
    path: PATH.ROUTE_PATH_DASHBOARD,
    accept: true,
    key: 2,
    exact: false,
    showHeader: true,
    showFooter: true,
    main: (props) => <DashboardContainer {...props} />,
    routes: [
      {
        path: PATH.ROUTE_PATH_DASHBOARD,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],
        main: () => <Dashboard />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_PROVINCE,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1],
        main: () => <ResultQuizProvinceContainer />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_DISTRICT,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2],

        main: ({ match }) => <ResultQuizDistrictContainer match={match} />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_SCHOOL,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2],
        main: ({ match }) => <ResultQuizSchoolContainer match={match} />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_TEACHER,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: ({ match }) => <ResultQuizTeacherContainer match={match} />,
      },
      {
        path: `${PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_DISTRICT}/:provinceId/:districtId/:schoolId/:userId/:roleId`,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2],

        main: ({ match }) => <ResultQuizDetailContainer match={match} />,
      },
      {
        path: `${PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_SCHOOL}/:provinceId/:districtId/:schoolId/:userId/:roleId`,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: ({ match }) => <ResultQuizDetailContainer match={match} />,
      },
      {
        path: `${PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_TEACHER}/:provinceId/:districtId/:schoolId/:userId/:roleId`,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: ({ match }) => <ResultQuizDetailContainer match={match} />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_DEPARTMENT_EDUCATION,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1],

        main: () => <AdminDepartmentEducationContainer />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_SCHOOL,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2],

        main: () => <AdminSchoolContainer />,
      },
      {
        path: `${PATH.ROUTE_PATH_DASHBOARD_ADMIN_SCHOOL}/:provinceId/:districtId/:schoolId/:userId/:roleId`,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2],

        main: () => <AdminDetailContainer />,
      },
      {
        path: `${PATH.ROUTE_PATH_DASHBOARD_ADMIN_TEACHER}/:provinceId/:districtId/:schoolId/:userId/:roleId`,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: () => <AdminDetailContainer />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_GRADE,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: () => <AdminGradeContainer />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_TEACHER,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: () => <AdminTeacherContainer />,
      },
      {
        path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_STUDENT,
        accept: true,
        key: 2,
        exact: true,
        showHeader: false,
        showFooter: false,
        roleId: [1, 2, 3],

        main: () => <AdminStudentContainer />,
      },
    ],
  },
  // END: Dashboard
  {
    title: "Giới thiệu",
    path: PATH.ROUTE_PATH_V3_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Intro />,
  },
  {
    path: PATH.ROUTE_PATH_V3_LIST_BOOK,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: false,
    main: () => <ListBook />,
  },
  // {
  //   path: `${PATH.ROUTE_PATH_ELECTRONIC_COURSEWARE_V2}:grade/:subject`,
  //   accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => <ListBook />,
  // },
  {
    path: `${PATH.ROUTE_PATH_ELECTRONIC_COURSEWARE_V2}:grade/:subject/video/:slugvideo`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <ListBook />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Student />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <StudentDoingExercise />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE_2,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <StudentDoingExercise2 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE_3,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <StudentDoingExercise3 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE_4,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <StudentDoingExercise4 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE_5,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <StudentDoingExercise5 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_DOING_EXERCISE_6,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <StudentDoingExercise6 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST_2,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <MockTest2 />,
  },
  {
    path: PATH.ROUTE_PATH_V3_TEACHER,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Teacher />,
  },
  {
    path: PATH.ROUTE_PATH_V3_REGISTER,
    accept: true,
    key: 1,
    showHeader: false,
    showFooter: false,
    main: () => <Register />,
  },
  {
    path: PATH.ROUTE_PATH_V3_UPDATEINFORMATION,
    accept: !(userInfo?.test_book_3_7_10 && !userInfo?.is_user_hoc10),
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <UpdateInformation />,
  },
  {
    path: PATH.ROUTE_PATH_V3_TEACHER_LIST_EXERCISE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <TeacherExerciseList />,
  },
  {
    path: PATH.ROUTE_PATH_V2_NOTIFICATION,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Notification />,
  },

  {
    path: PATH.ROUTE_PATH_V3_CONTACT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <PrivacyPolicy />,
  },
  {
    path: PATH.ROUTE_PUBLISHER_LIST,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <PublisherList />,
  },
  {
    path: PATH.ROUTE_PATH_LIST_HISTORY_QUIZ,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <UpdateInformationTraining />,
  },
  {
    path: PATH.ROUTE_PATH_V3_TERM_OF_USE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Term />,
  },
  {
    path: PATH.ROUTE_PATH_V3_PRIVACY_POLICY,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Privacy />,
  },
  {
    path: PATH.ROUTE_PATH_V3_TRAINING,
    accept: !(userInfo?.test_book_3_7_10 && !userInfo?.is_user_hoc10),
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_DASHBOARD_TRAINING,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <DashboardTraining />,
  },
  {
    path: PATH.ROUTE_DASHBOARD_EVENT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <DashboardEvent />,
  },
  {
    path: PATH.ROUTE_PATH_V2_SETTING,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Setting />,
  },
  {
    path: PATH.ROUTE_PATH_V3_ONEPERCENT_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <OnePercentIntro />,
  },
  // {
  //   path: PATH.ROUTE_PATH_V2_AUTHOR_INTRO,
  // accept: true,
  //   key: 1,
  //   exact: true,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => <AuthorIntro />,
  // },
  // {
  //   path: `${PATH.ROUTE_PATH_V2_AUTHOR_DEATAIL}:id`,
  // accept: true,
  //   key: 1,
  //   exact: false,
  //   showHeader: true,
  //   showFooter: true,
  //   main: () => <AuThor />,
  // },
  {
    path: PATH.ROUTE_PATH_V3_BOOK_INTRO,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <BookIntro />,
  },
  {
    path: PATH.ROUTE_PATH_V3_LIST_SLIDE,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <SliderLibrary />,
  },

  {
    path: `${PATH.ROUTE_PATH_V2_READING_SLIDE}/:title/:id`,
    accept: true,
    key: 2,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ReadingSlide match={match} />,
  },
  {
    path: `${PATH.ROUTE_PATH_V3_FREQUENT_QUESTION}`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: ({ match }) => <FrequentQuestion match={match} />,
  },
  {
    title: "Trang chủ",
    path: PATH.ROUTE_PATH_V2_HOME,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_PATH_V3_LIST_BOOK}`,
        }}
      />
    ),
  },
  {
    path: PATH.ROUTE_PATH_TRACKING_LINK_REDIRECT,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <TrackingLinkRedirect />,
  },
  {
    path: `${PATH.ROUTE_PATH_TRACKING_LINK_REDIRECT}${PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST}`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <MockTest />,
  },
  {
    path: PATH.ROUTE_REDIRECT_LINK_GRADE_4,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <RedirectLink />,
  },
  {
    path: PATH.ROUTE_REDIRECT_LINK_GRADE_8,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <RedirectLink />,
  },
  {
    path: PATH.ROUTE_REDIRECT_LINK_GRADE_11,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: () => <RedirectLink />,
  },
  {
    path: PATH.ROUTE_TEST_GAME,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <TestGame />,
  },
  {
    path: "",
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <NotFoundContainer />,
  },
];

const tutoringRoutes = [
  ...commonRoutes,
  {
    path: `${PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST}:id/:studentId`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: false,
    main: ({ match }) => <ExerciseContainer match={match} />,
  },
  {
    path: PATH.ROUTE_TUTORING_HOMEWORK,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <MockTest />,
  },
  {
    path: PATH.ROUTE_TUTORING_HOME,
    accept: true,
    key: 2,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <Classroom />,
  },
  {
    path: `${PATH.ROUTE_PATH_LIST_STUDENT_DOING_HOMEWORK}:id`,
    accept: true,
    key: 1,
    exact: true,
    showHeader: false,
    showFooter: true,
    main: () => <ListStudentDoingHomeWork />,
  },
  {
    path: PATH.ROUTE_PATH_V3_TRAINING,
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => (
      <Redirect
        to={{
          pathname: `${PATH.ROUTE_TUTORING_HOME}`,
        }}
      />
    ),
  },
  {
    path: "",
    accept: true,
    key: 1,
    exact: true,
    showHeader: true,
    showFooter: true,
    main: () => <NotFoundContainer />,
  },
];

const routers = {
  [HOC10_APP_ID]: hoc10Routes,
  [TUTORING_APP_ID]: tutoringRoutes,
};

export default routers[env];
