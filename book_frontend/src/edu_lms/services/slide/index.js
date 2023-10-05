import AxiosService from "../axiosService";

const listSlide = "list-slide?";

const getDetailSlide = "get-detail-slide?";

const postUpdateSlide = "update-slide";

const postDownloadSlide = "download-slide";

export const getListSlide = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listSlide}grade_id=${
      data.gradeId ? data.gradeId : ""
    }&subject_id=${data.subjectId ? data.subjectId : ""}&title=${data.title ? data.title : ""}&status=1&page=${
      data.page || 1
    }&limit=${data.limit || 6}`
  );
};

export const getDetailSlideLibrary = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${getDetailSlide}slide_id=${
      data.slide_id
    }&status=1&page=${data.page || 1}&limit=${data.limit || 9}`
  );
};

export const postUpdateSlideLibrary = (data) => {
  const axiosService = new AxiosService();
  data = {
    slide_id: data.slideId,
    type_update: data.typeUpdate,
  };
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${postUpdateSlide}`,
    data
  );
};

export const postDownloadSlideLibrary = (data) => {
  const axiosService = new AxiosService();
  data = {
    slide_id: data.slideId,
  };
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${postDownloadSlide}`,
    data
  );
};
