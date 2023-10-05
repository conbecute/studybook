import styled from "styled-components";
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_WHITE,
  COLOR_RED,
} from "../../../constants/type";
import { styleDisplayFlex } from "../selection";
export function onFormatData(data) {
  let newData = [];
  data.game_config.answer.couple_of_icon.forEach(function (item) {
    var existing = newData.filter(function (v, i) {
      return v.icon_id_question == item.icon_id_question;
    });
    if (existing.length) {
      var existingIndex = newData.indexOf(existing[0]);
      newData[existingIndex].icon_id_answer = newData[
        existingIndex
      ].icon_id_answer.concat(item.icon_id_answer);
    } else {
      if (typeof item.icon_id_answer == "string")
        item.icon_id_answer = [item.icon_id_answer];
      newData.push(item);
    }
  });
  return newData;
}

export function onFormatDataAnswer(data, type = 2) {
  const newData = data.game_config.order_answer.map((item) => {
    const resultFilterIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == item.icon_id
    )[0];
    return { ...resultFilterIcon, status: type === 1 ? 0 : false };
  });
  return newData;
}
export function onFormatDataQuestion(newData, data, type = 2) {
  const resultData = newData.map((item) => {
    const resultFilterIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id === item.icon_id_question
    )[0];
    return {
      ...resultFilterIcon,
      id_answer: item.icon_id_answer,
      status: type === 1 ? 0 : false,
    };
  });
  return resultData;
}

export function onChangeStatus(data, id, result = 0) {
  const newData = data.map((item) => {
    if (item.icon_id == id) {
      item.status = true;
      item.result = result === 0 ? 0 : result;
    }
    return { ...item };
  });
  return newData;
}

export function onTitleQuestion(data) {
  const srcImage = data.icon_list[0].icons.filter(
    (item) =>
      String(item?.icon_id).replace(/\s+/g, "") ===
      String(data.game_config.back_ground?.icon_id).replace(/\s+/g, "")
  );
  return srcImage;
}

export function onChangeBackground(isButtonCheck, result, start) {
  let color = COLOR_WHITE;
  if (start) {
    color = COLOR_GREEN;
  }
  if (!isButtonCheck) {
    switch (result) {
      case 1:
        color = COLOR_BLUE;
        break;
      case 2:
        color = COLOR_RED;
        break;
      default:
        color = COLOR_WHITE;
    }
  }
  return color;
}

export function onChangeColor(isButtonCheck, result, start) {
  let color = COLOR_BLACK;
  if (start) {
    color = COLOR_WHITE;
  }
  if (!isButtonCheck) {
    switch (result) {
      case 1:
      case 2:
        color = COLOR_WHITE;
        break;
      default:
        color = COLOR_BLACK;
    }
  }
  return color;
}

export const WrapperDragDroExercises = styled.div`
  width: 100%;
  height: 83%;
  overflow: auto;
`;

export const BoxWrapper = styled.div`
  margin: 0px auto 60px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 170px);
  display: grid;
  width: 95%;
  grid-gap: 0.5rem;
  text-align: center;
`;

export const TextName = styled.span`
  border: 1px solid ${COLOR_BLACK};
  padding: 15px;
  border-radius: 35px;
  display: block;
`;
export const BoxItemWrapper = styled.div`
  color: #000;
  cursor: grab;
`;

export const BoxWrapperDustbin = styled.div`
  margin: 0 10px 15px;
  position: relative;
  z-index: 30;
  .box-body {
    position: relative;
    z-index: 23;
    ${styleDisplayFlex()}
    img {
      position: absolute;
      z-index: 20;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .fa {
      z-index: 33;
      bottom: -30px;
      left: 50%;
      position: absolute;
    }
  }
`;
