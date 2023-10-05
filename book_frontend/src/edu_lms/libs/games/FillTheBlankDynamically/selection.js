import { TYPE_SPLIT_MUL_ANSWER } from "edu_lms/constants/type";
import { comparePositionOrder } from 'edu_lms/components/Game/FillTheBlankDynamically/selection';

export function onDataConfig(data, iconList) {
  const result = data.data.map((question, index) => {
    const questionItem = iconList[0].icons.filter(
      (icon) => icon.icon_id == question.question
    )[0];

    let tracing = JSON.parse(questionItem?.tracing);
    if (tracing.position) {
      tracing.position = [...tracing.position].sort(comparePositionOrder);
    }
    questionItem.parseTracing = tracing;
    return { ...question, answers: question.answers, objects: questionItem };
  });
  result.fontSize = data.font_size;
  result.version = data.version;
  return result;
}
