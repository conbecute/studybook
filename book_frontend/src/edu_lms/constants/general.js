import store from "../redux/configureStore";
import { onDispatchResetApp } from "../modules/App/actions";

export const TYPE_TEXT_BOOKS = 1;
export const TYPE_TEXT_BOOKS_USED = 2;
export const TYPE_TEXT_BOOKS_TEACHER = 3;
export const TYPE_TEXT_BOOKS_TEST_3710 = 6;
export const TYPE_TEXT_BOOKS_DOCUMENT = 7;
export const TYPE_TEXT_BOOKS_INTRO = 8;
export const TYPE_BAN_GOP_Y_XA_HOI = 9;
export const TYPE_BAN_IN_THU = 10;
export const TYPE_BAN_MAU = 11;
export const TYPE_TEXT_WORK_BOOKS = 5;
export const TYPE_INTRODUCE = 5;
export const TYPE_TUTORIAL = 6;
export const IMAGE_DEFAULT = `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/default-image.jpg`;

export const cleanLocalStorage = () => {
  const introHidden = localStorage.getItem("doc-sach-hidden-intro") ? 1 : 0;
  const recentBookHidden = localStorage.getItem("dataRecentBook");
  const guestId = localStorage.getItem("guest_id");
  const dontShowAlertEvents = sessionStorage.getItem(
    "dontShowAlertEvents"
  );
  localStorage.clear();
  if (introHidden) {
    localStorage.setItem("doc-sach-hidden-intro", introHidden);
  }

  if (recentBookHidden) {
    localStorage.setItem("dataRecentBook", recentBookHidden);
  }

  if (guestId) {
    localStorage.setItem("guest_id", guestId);
  }

  if (dontShowAlertEvents) {
    sessionStorage.setItem(
      "dontShowAlertEvents",
      dontShowAlertEvents
    );
  }

  // Reset redux state
  store.dispatch(onDispatchResetApp());
};
