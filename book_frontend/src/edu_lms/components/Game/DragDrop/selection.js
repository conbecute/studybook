import styled from "styled-components";
import { COLOR_BLACK, COLOR_GRAY, COLOR_BLUE } from "../../../constants/type";

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

  const formattedOrderQuestions = data.game_config.question.map(question => {
    const matchQuestion = newData.find(item => item.icon_id_question === question.icon_id);
    return matchQuestion
  })
  return formattedOrderQuestions;
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
    const resultFilterIcon = data?.icon_list[0]?.icons.filter(
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

export function onChangeStatus(data, id) {
  const result = data.map((item) => {
    if (item.icon_id == id) {
      item.status = true;
    }
    return { ...item };
  });
  return result;
}

export function onTitleQuestion(data, isShowTitle) {
  let result;
  if (isShowTitle) {
    result = data?.icon_list[0]?.icons.filter(
      (item) =>
        String(item?.icon_id).replace(/\s+/g, "") ===
        String(data.game_config?.back_ground?.icon_id).replace(/\s+/g, "")
    );
  } else {
    result = data?.icon_list[0]?.icons.filter(
      (item) =>
        String(item?.icon_id).replace(/\s+/g, "") ===
        String(data.game_config?.question_title?.icon_id).replace(/\s+/g, "")
    );
  }

  return result;
}
export const WrapperDragDroExercises = styled.div`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  display: flex;
  justify-content: center;
  margin: auto;
  overflow: scroll;
`;

export const BoxWrapper = styled.div`
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 150px);
  display: grid;
  grid-gap: 0.5rem;
  text-align: center;
`;

export const TextName = styled.div`
  border: 1px solid ${COLOR_BLACK};
  padding: 15px;
  border-radius: 35px;
  display: inline-block;
  min-width: 100px;
`;
export const BoxItemWrapper = styled.div`
  color: #000;
  cursor: grab;
  margin-bottom: 15px;
`;

export const BoxWrapperDustbin = styled.div`
  margin: 0 10px;
  position: relative;
  z-index: 30;
  .box-body {
    position: relative;
    z-index: 23;
    display: flex;
    justify-content: center;
    align-items: center;
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

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  .fa {
    width: 30px;
    height: 30px;
    background-color: ${COLOR_GRAY};
    color: #fff;
    border-radius: 50%;
    :hover {
      background-color: ${COLOR_BLUE};
    }
  }
`;
