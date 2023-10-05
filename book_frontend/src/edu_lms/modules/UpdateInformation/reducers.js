import * as TYPES from "../../constants/actionsType";

let initialState = {
  listProvince: [],
  listDistrict: [],
  listWard: [],
  listSchool: [],
  listSchoolByProvince: [],
  listTeachingInformation: [],
  numberActiveSlider: 0,
  listSubjectAll: [],
};

let updateInfoInReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_PROVINCE:
      const listProvince = action.data.map((item, index) => {
        const value = `province_${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listProvince };
    case TYPES.PA_DATA_PISTRICT:
      const listDistrict = action.data.map((item, index) => {
        const value = `district_${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listDistrict };
    case TYPES.PA_DATA_WARD:
      const listWard = action.data.map((item, index) => {
        const value = `ward_${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listWard };
    case TYPES.PA_DATA_SCHOOL:
      const listSchool = action.data.map((item, index) => {
        const value = `school_${index + 1}`;
        const label = item.name;
        return { ...item, value, label };
      });
      return { ...state, listSchool };
    case TYPES.PA_DATA_SCHOOL_BY_PROVINCE:
      return { ...state, listSchoolByProvince: action.data };
    case TYPES.PA_DATA_ACTIVE_SLIDER_UPDATE_INFO:
      return { ...state, numberActiveSlider: action.value };
    case TYPES.PA_DATA_ACTIVE_TEACHING_INFORMATION:
      const data = [...state.listTeachingInformation, action.data];
      const result = Object.values(
        data.reduce((a, c) => {
          a[c.id] || (a[c.id] = { id: c.id, listSubjects: c.listSubjects });
          return a;
        }, {})
      );
      return {
        ...state,
        listTeachingInformation: result,
      };
    case TYPES.PA_DATA_ACTIVE_LIST_SUBJECT_ALL:
      return { ...state, listSubjectAll: action.data };
    default:
      return state;
  }
};
export default updateInfoInReducers;
