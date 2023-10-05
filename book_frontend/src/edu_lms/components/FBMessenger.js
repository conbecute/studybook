import MessengerCustomerChat from "react-messenger-customer-chat";
import { useLocation, matchPath } from "react-router-dom";
import _ from "lodash";
import * as PATH from "edu_lms/constants/path";
import { setEventGTM } from "edu_lms/constants/googleTagManager";
import { CLICK_CHATBOX } from "edu_lms/constants/eventNameGTM";

export default function FBMessenger() {
  const location = useLocation();
  const currentPath = location.pathname;

  const blacklistRoutes = [
    // doc sach
    `${PATH.ROUTE_PATH_READING_BOOKS}/:name/:bookType/:id/:pageId`,
    `${PATH.ROUTE_PATH_READING_BOOKS}/:name/:bookType/:id`,
    // lam bai luyen tap
    `${PATH.ROUTE_PATH_EXERCISE}/:id`,
    // lam bai luyen thi
    `${PATH.ROUTE_PATH_V3_STUDENT_MOCK_TEST}:id`,
    // lam bai kiem tra tap huan
    `${PATH.ROUTE_PATH_LIST_QUIZ_DETAIL}/:gradeId/:subjectId/:quizId`,
  ];

  const isHidden = !_.isEmpty(
    blacklistRoutes.filter((path) =>
      matchPath(currentPath, {
        path,
        exact: true,
        strict: false,
      })
    )
  );

  return (
    process.env.REACT_APP_ENVIROMENT === "production" &&
    process.env.REACT_APP_API_FB_PAGE_ID &&
    process.env.REACT_APP_API_FB_APP_ID &&
    !isHidden && (
      <MessengerCustomerChat
        pageId={process.env.REACT_APP_API_FB_PAGE_ID}
        appId={process.env.REACT_APP_API_FB_APP_ID}
        language="vi_VN"
        themeColor="#ff7707"
        // shouldShowDialog={true}
        onCustomerChatDialogShow={() => setEventGTM({ event: CLICK_CHATBOX })}
      />
    )
  );
}
