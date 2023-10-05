import _ from "lodash";

export const MATCH_IMAGE_IMAGE = 1;
export const MATCH_TEXT_TEXT = 4;
export const MATCH_IMAGE_TEXT = 5;

export const HORIZONTAL_DISPLAY = 1;
export const VERTICAL_DISPLAY = 2;

export const HEIGHT_CANVAS = 150;
export const ELEMENT_HEIGHT = 148;
export const MATCH_POINT_QUESTION = 0;
export const MATCH_POINT_ANSWER = HEIGHT_CANVAS;

export const OBJECT_CHANGE_STATE = 3;
export const OBJECT_NEW_STATE = [0, 6];

export const addIsCorrect = (data, arrListCorrect) => {
  return data.map((item) => {
    let flag = false;
    for (const i of arrListCorrect) {
      if (_.includes(i, item.icon_id)) flag = true;
    }
    return flag ? { ...item, isCorrect: true } : { ...item, isCorrect: false };
  });
};

export const getCoorItem = (id, elements) => {
  for (const i of elements) {
    if (id === i.id) return i;
  }
};
