import * as PATH from "../../constants/path";
import { REG_EXP_EMAIL, REG_EXP_NUMBER } from "../../constants/type";

export const ACCOUNT = {
  ACCOUNT_DEFAULT: 0,
  ACCOUNT_PROVINCE: 1,
  ACCOUNT_DISTRICT: 2,
  ACCOUNT_SCHOOL: 3,
  ACCOUNT_TEACHER: 4,
};

export const dataTheadTable = {
  1: {
    value: "Danh sách kết quả tập huấn giáo viên của Sở",
    data: [
      "Tên phòng",
      "Tổng số Trường",
      "Tổng số GV",
      "Tổng số KQKT",
      "SL bài chưa đạt",
      "SL bài đạt",
      "SL bài khá",
      "SL bài giỏi",
    ],
  },
  2: {
    value: "Danh sách kết quả tập huấn giáo viên của Phòng",
    data: [
      "Tên Trường",
      "Tổng số GV",
      "Tổng số KQKT",
      "SL bài chưa đạt",
      "SL bài đạt",
      "SL bài khá",
      "SL bài giỏi",
    ],
  },
  3: {
    value: "Danh sách kết quả tập huấn giáo viên của Trường",
    data: [
      "Họ tên",
      "Email",
      "SDT",
      "SL khóa tập huấn",
      "SL bài chưa đạt",
      "SL bài đạt",
      "SL bài khá",
      "SL bài giỏi",
    ],
  },
  4: {
    value: "Kết quả kiểm tra tập huấn",
    data: ["Khóa tập huấn", "Kết quả cao nhất", "Điểm số", "Xếp loại"],
  },
};
export const FormSearch = {
  1: {
    value: "Tìm tên Phòng",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Tên Phòng",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
    ],
  },
  2: {
    value: "Tìm tên trường",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Tên trường",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
    ],
  },
  3: {
    value: "Tìm kiếm giáo viên",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Họ tên",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "email",
        placeholder: "Email",
        error: true,
        pattern: REG_EXP_EMAIL,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "phone",
        placeholder: "Số điện thoại",
        error: true,
        pattern: REG_EXP_NUMBER,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
    ],
  },
  4: {
    value: "Tìm kiếm tập huấn",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "quizName",
        placeholder: "Khóa tập huấn",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
    ],
  },
};
export const pathResultQuiz = {
  2: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_DISTRICT,
  3: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_SCHOOL,
  4: PATH.ROUTE_PATH_DASHBOARD_RESULT_QUIZ_TEACHER,
};

export const pathAdmin = {
  2: PATH.ROUTE_PATH_DASHBOARD_ADMIN_SCHOOL,
  3: PATH.ROUTE_PATH_DASHBOARD_ADMIN_TEACHER,
  // 4 : PATH.ROUTE_PATH_DASHBOARD_ADMIN_TEACHER
};

export const dataTheadTableAdmin = {
  1: {
    value: "Danh sách phòng của sở",
    data: [
      "Tên phòng",
      "Email phòng",
      "STK trường",
      "STK giáo viên",
      "Trạng thái",
      "Hoạt động",
    ],
  },
  2: {
    value: "Danh sách trường của phòng",
    data: [
      "Tên trường",
      "Email trường",
      "STK giáo viên",
      "Trạng thái",
      "Hoạt động",
    ],
  },
  3: {
    value: "Danh sách giáo viên của trường",
    data: ["Họ tên", "Email", "SDT", "Trạng thái", "Hoạt động"],
  },
};

export const formSearchAdmin = {
  1: {
    value: "Tìm kiếm Phòng",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Tên Phòng",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "email",
        placeholder: "Email",
        error: true,
        pattern: REG_EXP_EMAIL,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
      {
        key: "select",
        type: "",
        value: "",
        name: "status",
        placeholder: "Trạng thái",
        error: false,
        pattern: "",
        required: false,
        options: [
          {
            value: 1,
            label: "Hoạt động",
          },
          {
            value: 0,
            label: "Không hoạt động",
          },
        ],
        menuPlacement: "bottom",
      },
    ],
  },
  2: {
    value: "Tìm kiếm Trường",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Tên Trường",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "email",
        placeholder: "Email",
        error: true,
        pattern: REG_EXP_EMAIL,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
      {
        key: "select",
        type: "",
        value: "",
        name: "status",
        placeholder: "Trạng thái",
        error: false,
        pattern: "",
        required: false,
        options: [
          {
            value: 1,
            label: "Hoạt động",
          },
          {
            value: 0,
            label: "Không hoạt động",
          },
        ],
        menuPlacement: "bottom",
      },
    ],
  },
  3: {
    value: "Tìm kiếm giáo viên",
    data: [
      {
        key: "text",
        type: "text",
        value: "",
        name: "fullName",
        placeholder: "Họ tên",
        error: false,
        pattern: "",
        valueError: "",
        className: "",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "email",
        placeholder: "Email",
        error: true,
        pattern: REG_EXP_EMAIL,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
      {
        key: "text",
        type: "text",
        value: "",
        name: "phone",
        placeholder: "Số điện thoại",
        error: true,
        pattern: REG_EXP_NUMBER,
        valueError: "Sai định dạng",
        className: "position-relative",
        required: false,
      },
    ],
  },
};

export const VALUE_BUTTON = {
  1: "Thêm phòng",
  2: "Thêm trường",
  3: "Thêm giáo viên",
};
