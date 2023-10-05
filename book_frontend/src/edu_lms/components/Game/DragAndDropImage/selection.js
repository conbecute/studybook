export function formatListDataAnswer(data) {
  const listAnswer = data.game_config.answer?.couple_of_icon.map((answer) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == answer.icon_id_answer
    );

    return { ...answer, icon: dataIcon, type: answer.icon_id_question };
  });
  return listAnswer;
}
export function formatListDataQuestion(data) {
  const listQuestion = data.game_config.question.map((question) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == question.icon_id
    );

    return { ...question, icon: dataIcon };
  });
  const listDataAccepts = [];
  listQuestion.forEach((question) => {
    listDataAccepts.push(question.icon_id);
  });
  const listDataQuestion = listQuestion.map((question) => {
    return { ...question, accepts: listDataAccepts, lastDroppedItem: [] };
  });

  return listDataQuestion;
}

export function formatQuestionTitle(data) {
  const dataIcon = data.icon_list[0]?.icons.filter(
    (icon) => icon.icon_id == data.game_config.title_question?.icon_id
  );
  return dataIcon;
}
