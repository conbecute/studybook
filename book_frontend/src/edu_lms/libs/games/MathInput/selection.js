export function onFormatData(data) {
  let formatData = data.game_config.data.map((question) => {
    let dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == question.question
    );
    return { ...question, icon: dataIcon };
  });
  return formatData;
}
export function formatResultAnswer(data) {
  let arrayResult = [];
  data.game_config.data.forEach((listAnswer) => {
    // let indexAnwer = 0;
    listAnswer.answers.forEach((answers) => {
      // indexAnwer = indexAnwer + 1;
      answers.forEach((answer) => {
        if (answer.type === "input") {
          arrayResult.push({
            question_id: listAnswer.question,
            result: answer.answer_text,
            index: answer.index,
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
