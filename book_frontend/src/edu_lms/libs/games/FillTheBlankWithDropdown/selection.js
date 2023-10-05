import _ from "lodash";
import { TYPE_SPLIT } from "edu_lms/constants/type";

export function onDataConfigFib003(data, iconList) {
  const result = data.data.map((question, index) => {
    const questionItem = question.list_sentences.map((item) => {
      const icon_list = iconList[0].icons.filter(
        (icon) => icon.icon_id === item.sentence
      )[0];
      let i = 0;
      const blankAnswer = item?.blank_answer?.map((item) => {
        const answer = item.map((answerItem) => {
          const result = iconList[0].icons.filter(
            (icon) => icon.icon_id === answerItem.answer
          )[0];
          result.props[0].label = result.props[0]?.text;
          result.props[0].value = i;
          i++;
          return { ...answerItem, ...result.props[0] };
        });
        // return { ...item, ...answer, status: -1 };
        return { ...item, ...answer };
      });
      const answer_text = _.split(icon_list.props[0].text, TYPE_SPLIT);
      const resultDropdownQuestion = blankAnswer ? blankAnswer : [];
      return {
        ...item,
        iconList: icon_list,
        answer_text: answer_text,
        blank_answer: resultDropdownQuestion,
        status: [],
      };
    });
    return { ...question, answers: questionItem };
  });

  result.font_size = data.font_size;
  result.color = data.color;
  result.type_question = data.type_question;
  result.type_answer = data.type_answer;
  result.type_text = data.type_text;

  return result;
}
