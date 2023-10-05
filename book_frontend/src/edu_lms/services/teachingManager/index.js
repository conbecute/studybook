import AxiosService from "../axiosService";

const createClassroom = "create-class-room";
const deleteClassroom = "delete-class-room";
const deleteUserClassroom = "delete-user-class-room";
const getListClassroom = "get-class-room-by-user-id?";
const createUserClassroom = "create-user-class-room?";
const getInfoClassroom = "get-class-room-by-id?";
const getUserClassroom = "get-user-by-class-room-id?";
const importUserClassroomExcel = "import-user-class-room";
const getTeacherNewletter = "get-question-set-by-class-room-id?";
const getStudentExercises = "get-question-set-for-student?";
const assignHomeWork = "assign-question-set-to-class-room";
const getQuestionAndListUser = "get-question-and-list-user-by-id?";
const getExerciseByTeacher = "get-question-set-for-teacher?";
const getResultQuestionByClassroom = "get-result-question-by-class-room-id?";
const postUpdateCountShare = "update-question-set";
const postMatchUser = "assign-user-class-room-to-user-id";
const getClassroom = "get-class-room";
const chooseUserClassroom = "choose-user-class-room-id";
const uriAssignTeacherClassroom = "assign-teacher-to-classroom";
const reportResultQuiz = "report-result-quiz?";
export const postCreateClassroom = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${createClassroom}`,
    data
  );
};

export const postDeleteClassroom = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${deleteClassroom}`,
    data
  );
};

export const postDeleteUserClassroom = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${deleteUserClassroom}`,
    data
  );
};

export const getListClassroomById = ({
  page,
  limit,
  langId,
  appId,
  title,
  roleId,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getListClassroom}page=${page}&limit=${limit}&lang_id=${langId}&app_id=${appId}&title=${title}&role_id=${roleId}`
  );
};

export const postCreateUserClassroom = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${createUserClassroom}`,
    data
  );
};

export const getListStudentClassroom = ({ page, limit, roleId }) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getListClassroom}page=${page}&limit=${limit}&role_id=${roleId}`
  );
};

export const getInfoClassroomById = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getInfoClassroom}class_room_id=${data}`
  );
};

export const getListUserClassroomById = ({
  classroomId,
  roleId,
  limit,
  page,
  name,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getUserClassroom}class_room_id=${classroomId}&role_id=${roleId}&limit=${limit}&page=${page}&name=${name}`
  );
};

export const postCreateUserClassroomExcel = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${importUserClassroomExcel}`,
    data
  );
};
export const getStudentExer = ({
  limit,
  page,
  done,
  subjectId,
  gradeId,
  classroomId,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getStudentExercises}limit=${limit}&page=${page}&done=${done}&subject_id=${subjectId}&grade_id=${gradeId}&class_room_id=${classroomId}`
  );
};
export const getListExerciseById = ({
  classroomId,
  subjectId,
  limit,
  page,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getTeacherNewletter}class_room_id=${classroomId}&limit=${limit}&page=${page}&subject_id=${subjectId}`
  );
};

export const postAssignHomeWork = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${assignHomeWork}`,
    data
  );
};

export const getQuestionAndList = ({ data, classRoomQuestionSetId }) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getQuestionAndListUser}class_room_question_set_id=${classRoomQuestionSetId}`,
    data
  );
};
export const getListExerciseByTeacher = ({
  limit,
  page,
  subjectId,
  gradeId,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getExerciseByTeacher}limit=${limit}&page=${page}&subject_id=${subjectId}&grade_id=${gradeId}`
  );
};

export const getListExerciseResult = ({ classroomId, questionSetId }) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getResultQuestionByClassroom}class_room_id=${classroomId}&question_set_id=${questionSetId}`
  );
};

export const postCountShareFbAndCopyLink = (data) => {
  const axiosService = new AxiosService();
  data = {
    question_set_id: data.questionSetId,
    type_update: data.typeUpdate,
  };
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${postUpdateCountShare}`,
    data
  );
};

export const onPostMatchUserHoc10 = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${postMatchUser}`,
    data
  );
};

export const getAllClassroom = () => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${getClassroom}`
  );
};

export const onSelectedStudent = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${chooseUserClassroom}`,
    data
  );
};

export const assignTeacherClassroom = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${uriAssignTeacherClassroom}`,
    data
  );
};

export const getListResultTeacherTraining = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${reportResultQuiz}limit=${
      data.limit || 10
    }&page=${data.page || 1}&province_id=${data.province_id}&district_id=${
      data.district_id
    }&ward_id=${data.ward_id}&school_id=${data.school_id}&start_time=${
      data.start_time
    }&end_time=${data.end_time}`
  );
};
