import { onResultUserInfo } from "edu_lms/modules/selection";
import store from "edu_lms/redux/configureStore";
import {
  FACEBOOK_TYPE,
  PHONE_TYPE,
  GMAIL_TYPE,
  USER_CRM,
  LIST_IP_INTERNAL,
  LIST_EMAIL_INTERNAL,
} from "./type";

export const setEventGTM = (trackEvent) => {
  if (handleCheckIpInternal() || handleCheckEmailInternal()) return;

  let event = { ...trackEvent };
  if (localStorage.getItem("user_id")) {
    event.userId = localStorage.getItem("user_id");
  }
  window.dataLayer.push(event);
};

export const setTypeLogin = (type) => {
  switch (type) {
    case USER_CRM:
      return "username";
    case PHONE_TYPE:
      return "phone";
    case GMAIL_TYPE:
      return "google";
    case FACEBOOK_TYPE:
      return "facebook";
    default:
      return "username";
  }
};

const handleCheckEmailInternal = () => {
  const userInfo = onResultUserInfo();

  for (const item of LIST_EMAIL_INTERNAL) {
    if (userInfo?.email?.endsWith(item)) return true;
  }

  return false;
};

const handleCheckIpInternal = () => {
  const ipAddress = store.getState().app.userLocation?.ip;

  return LIST_IP_INTERNAL.includes(ipAddress);
};
