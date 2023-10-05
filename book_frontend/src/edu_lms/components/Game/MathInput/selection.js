import _ from "lodash";

export function onFormatData(data) {
  let formatData = data.game_config.data.map((question) => {
    let dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == question.question
    );

    for (const answers of question.answers) {
      for (const answer of answers) {
        for (const key in answer) {
          if(_.isNumber(answer[key]) || _.isString(answer[key])) {
            answer[key] = answer[key].toString();
          }
        }
      }
    }
    return { ...question, icon: dataIcon };
  });
  return formatData;
}

export function formatResultAnswer(data) {
  let arrayResult = [];
  data.game_config.data.forEach((listAnswer) => {
    listAnswer.answers.forEach((answers) => {
      answers.forEach((answer) => {
        if (answer.type === "input") {
          arrayResult.push({
            question_id: listAnswer.question,
            result: answer.answer_text.toString(),
            index: answer.index,
            answerIndex: answer.answer_index,
            value: "",
            border: "gray",
          });
        }
      });
    });
  });
  return arrayResult;
}
export function formatQuestionTitle(data) {
  const dataIcon = data.icon_list[0]?.icons.filter(
    (icon) => icon.icon_id == data.game_config.question_title?.icon_id
  );
  return dataIcon;
}
