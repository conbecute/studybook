import { APP_ID } from "edu_lms/constants/type";
import AxiosService from "../axiosService";

const urlListProvince = "list-province?";
const urlListSchoolByProvince = "list-school-by-province?";
const urlUpdateUserSchool = "update-user-school";
const urlUpdateInfo = "v3/mobile/account/update-info?lang=vi-VN";
const urlUpdateInfoV2 = "v2/mobile/account/update-info?lang=vi-VN";
const urlUpdateTeachingInformation = "update-grade-subject";
const urlCreateAccountTeacher = "create-account-teacher";
const urlUpdateUserSchool2 = "v1/update-user-school";
const urlVerifyPhone = "v1/check-exits-phone";
const urlVerifyEmail = "v1/check-exits-email?";

export const getDataUrlListProvince = (parentId) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlListProvince}parent_id=${parentId}`
  );
};
export const getDataUrlListSchoolByProvince = (provinceId, gradeId) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlListSchoolByProvince}province_id=${provinceId}&grade_id=${gradeId}`
  );
};

export const postUpdateUserSchool = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlUpdateUserSchool}`,
    data
  );
};

export const postUpdateUserEmail = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlUpdateInfo}`,
    data
  );
};
export const postUpdateTeachingInformation = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlUpdateTeachingInformation}`,
    data
  );
};

export const getCreateAccountTeacher = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlCreateAccountTeacher}`,
    data
  );
};

export const postUpdateUserInformation = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlUpdateUserSchool2}`,
    data
  );
};

export const postUpdateUserEmailPhone = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlUpdateInfoV2}`,
    data
  );
};

export const postVerifyPhone = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlVerifyPhone}`,
    data
  );
};

export const postVerifyEmail = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlVerifyEmail}app_id=${APP_ID}&is_web=1&lang=vi-VN`,
    data
  );
};
