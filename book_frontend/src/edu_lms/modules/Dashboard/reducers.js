import * as TYPES from "../../constants/actionsType";
import * as PATH from "../../constants/path";

let initialState = {
  dataNavDashboard: [
    {
      id: "dashboard-1",
      value: "Tập huấn",
      icon: "fa-table",
      index: "0",
      data: {
        1: [
          {
            value: "Kết quả tập huấn",
            path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_PROVINCE,
            status: false,
            id: "nav-item-1",
          },
        ],
        2: [
          {
            value: "Kết quả tập huấn",
            path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_DISTRICT,
            status: false,
            id: "nav-item-2",
          },
        ],
        3: [
          {
            value: "Kết quả tập huấn",
            path: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_SCHOOL,
            status: false,
            id: "nav-item-3",
          },
        ],
      },
    },
    {
      id: "dashboard-2",
      value: "Admin",
      icon: "fa-user",
      index: "1",
      data: {
        1: [
          {
            value: "Phòng",
            path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_DEPARTMENT_EDUCATION,
            id: "province-1",
            status: false,
          },
        ],
        2: [
          {
            value: "Trường",
            path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_SCHOOL,
            id: "district-1",
            status: false,
          },
        ],
        3: [
          // {
          //   value: "Lớp học",
          //   path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_GRADE,
          //   id: "school-1",
          //   status: false,
          // },
          {
            value: "Giáo viên",
            path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_TEACHER,
            id: "school-2",
            status: false,
          },
          // {
          //   value: "Học sinh",
          //   path: PATH.ROUTE_PATH_DASHBOARD_ADMIN_STUDENT,
          //   id: "school-3",
          //   status: false,
          // },
        ],
      },
    },
  ],
  numberIndex: "",
  listAccountProvince: [],
  listAccountSchool: [],
  listAccountTeacher: [],
  listResultQuiz: [],
};

let dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_NUMBER_INDEX:
      return { ...state, numberIndex: action.index };
    case TYPES.PA_DATA_LIST_ACCOUNT_PROVINCE:
      return { ...state, listAccountProvince: action.data };
    case TYPES.PA_DATA_LIST_ACCOUNT_SCHOOL:
      return { ...state, listAccountSchool: action.data };
    case TYPES.PA_DATA_LIST_ACCOUNT_TEACHER:
      return { ...state, listAccountTeacher: action.data };
    case TYPES.PA_DATA_LIST_RESULT_QUIZ:
      return { ...state, listResultQuiz: action.data };
    default:
      return state;
  }
};
export default dashboardReducer;
