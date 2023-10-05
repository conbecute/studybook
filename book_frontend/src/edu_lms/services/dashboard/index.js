import AxiosService from "../axiosService";

const listAccountProvince = "list-account-province?";
const listAccountSchool = "list-account-school?";
const listAccountTeacher = "list-account-teacher?";
const listResultQuiz = "list-result-quiz?";
const dataUpdateContact = "create-account-contact";

export const getListAccountProvince = (
  id,
  name = "",
  email = "",
  status = ""
) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listAccountProvince}province_id=${id}&name=${name}&email=${email}&status=${status}`
  );
};

export const getListAccountSchool = (
  province_id,
  district_id,
  name = "",
  email = "",
  status = ""
) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listAccountSchool}province_id=${province_id}&district_id=${district_id}&name=${name}&email=${email}&status=${status}`
  );
};

export const getListAccountTeacher = (
  province_id,
  district_id,
  school_id,
  name = "",
  email = "",
  phone = ""
) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listAccountTeacher}province_id=${province_id}&district_id=${district_id}&school_id=${school_id}&name=${name}&email=${email}&phone=${phone}`
  );
};
export const getListResultQuiz = (
  province_id,
  district_id,
  school_id,
  user_id
) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listResultQuiz}province_id=${province_id}&district_id=${district_id}&school_id=${school_id}&user_id=${user_id}`
  );
};

export const postDataUpdateContact = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${dataUpdateContact}`,
    data
  );
};
