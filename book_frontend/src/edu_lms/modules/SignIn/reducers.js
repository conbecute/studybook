import * as TYPES from "../../constants/actionsType";

let initialState = {
  user_id: "",
  user_info: {
    avatar: "",
    job_id: "",
    full_name: "",
    birth_day: "",
    gender_id: 1,
    email: "",
    phone: "",
    province_id: "",
    district_id: "",
    ward_id: "",
    school_id: "",
    show_change_pw: false,
    notification: 1,
    list_grade_subject: [
      {
        grade_id: "",
        subjects: [],
      },
    ],
    role_id: 0,
  },
};

let signInReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_INFO:
      const user_info = { ...state.user_info, ...action.data };
      return { ...state, user_info };
    case TYPES.PA_DATA_EMAIL:
      const email = { ...state.email, ...action.email };
      return { ...state, email };
    case TYPES.PA_DATA_PHONE:
      const phone = { ...state.phone, ...action.phone };
      return { ...state, phone };
    case TYPES.PA_DATA_PROFILE:
      return { ...state, ...action.data };

    default:
      return state;
  }
};
export default signInReducers;
