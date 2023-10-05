export function formatDataConfig(data) {
  let dataAnswerConfigFormat = [];
  data.game_config.data.forEach((answerConfig) => {
    let dataFormatAnswer = [];
    answerConfig.answers.forEach((anwser) => {
      let dataFormatIcon = [];
      var answer = anwser;
      data.icon_list[0].icons.forEach((icon) => {
        if (icon.icon_id === anwser.answer_id) {
          dataFormatIcon.push({ answer: answer, icon: icon });
        }
      });
      dataFormatAnswer.push(dataFormatIcon);
    });
    let questionFormat = [];
    data.icon_list[0].icons.forEach((icon) => {
      if (icon.icon_id === answerConfig.question) {
        questionFormat.push(icon);
      }
    });
    dataAnswerConfigFormat.push({
      answer: dataFormatAnswer,
      question: questionFormat,
    });
  });
  return dataAnswerConfigFormat;
}
