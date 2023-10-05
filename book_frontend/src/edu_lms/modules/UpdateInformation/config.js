export const DATA_MENU_INFO_TEACHER = {
  1: {
    icon: "fa-info-circle",
    value: "Thông tin cơ bản",
  },
  2: {
    icon: "fa-location-arrow",
    value: "Trường học",
  },
  3: {
    icon: "fa-book",
    value: "Giảng dạy",
  },
  4: {
    icon: "fa-phone",
    value: "Thông tin Liên lạc",
  },
  // 5: {
  //   icon: "fa-cog",
  //   value: "Cài đặt",
  // },
};
export const DATA_MENU_INFO = {
  1: {
    icon: "fa-info-circle",
    value: "Thông tin cơ bản",
  },
  2: {
    icon: "fa-location-arrow",
    value: "Trường học",
  },
  3: {
    icon: "fa-phone",
    value: "Thông tin Liên lạc",
  },
  // 4: {
  //   icon: "fa-cog",
  //   value: "Cài đặt",
  // },
};

export const onLevelSchool = (id) => {
  switch (id) {
    case 1:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return 1;
      break;
    case 2:
    case 9:
    case 10:
    case 11:
    case 12:
      return 2;
      break;
    default:
      return 3;
  }
};

export const TypeSchool = [
  { id: 1, label: "Trường Tiểu học", value: "type_school_1" },
  { id: 2, label: " Trường THCS", value: "type_school_2" },
  { id: 3, label: "Trường THPT", value: "type_school_3" },
  { id: 4, label: "Trường Tiểu học - THCS", value: "type_school_4" },
  { id: 5, label: "Trường THCS - THPT", value: "type_school_5" },
  { id: 6, label: "Trường Tiểu học - THCS - THPT", value: "type_school_6" },
  { id: 7, label: "Trường PTDTNT", value: "type_school_7" },
  { id: 8, label: "Trường PTDTBT", value: "type_school_8" },
  { id: 9, label: "Trường GDTX", value: "type_school_9" },
  { id: 10, label: "Trường trung cấp", value: "type_school_10" },
];

export const onValueOptionDefault = (data, id) => {
  const result = data.filter((item) => item.id === id);
  return result.length > 0 ? result[0] : "";
};

export const onListGradeSubject = (data) => {
  let result = null;
  if (data) {
    result = Object.values(
      data.reduce((a, c) => {
        (
          a[c.grade_id] ||
          (a[c.grade_id] = { grade_id: c.grade_id, subjects: [] })
        ).subjects.push(c.subject_id);
        return a;
      }, {})
    );
  }
  return result;
};

export const onValueOptionTeachingInformation = (
  listGradeSubject,
  listTeachingInformation,
  listGradeAll,
  listSubjectAll
) => {
  const dataConfig = listGradeSubject.map((gradeSubjectItem) => {
    const valueClass = listGradeAll.filter(
      (item) => item.id === gradeSubjectItem.grade_id
    )[0];
    let valueSubjects = [];
    gradeSubjectItem?.subjects.forEach((subjectItem) => {
      const resultData = listSubjectAll.filter(
        (item) => item.id === subjectItem
      )[0];
      valueSubjects = [...valueSubjects, resultData];
    });

    return { valueClass, valueSubjects };
  });
  return dataConfig;
};
