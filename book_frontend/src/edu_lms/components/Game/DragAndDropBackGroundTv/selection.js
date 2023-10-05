export function formatListDataAnswer(data) {
  const listAnswer = data.game_config.answer?.couple_of_icon.map((answer) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == answer.icon_id_answer
    );
    const dataTouch =
      data.background_list.backgroundList[0].value[0].touch.filter(
        (touch) => touch.name === `object-${answer.index}`
      );
    return {
      ...answer,
      icon: dataIcon,
      type: answer.icon_id_question,
      touch: JSON.parse(dataTouch[0].touch_vector),
    };
  });
  return listAnswer;
}
export function formatListDataQuestion(data) {
  const listQuestion = data.game_config.question.map((question) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == question.icon_id
    );
    const dataTouch =
    data.background_list.backgroundList[0].value[0].touch.filter(
      (touch) => touch.name === `object-${question.index}`
    );

    return { ...question, icon: dataIcon, touch: JSON.parse(dataTouch[0]?.touch_vector) };
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

export function formatDefaultListDataQuestion(data) {
  const listQuestion = data.game_config.question.map((question) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == question.icon_id
    );
    const dataTouch =
    data.background_list.backgroundList[0].value[0].touch.filter(
      (touch) => touch.name === `object-${question.index}`
    );

    return { ...question, icon: dataIcon, touch: JSON.parse(dataTouch[0]?.touch_vector) };
  });
  const listDataQuestion = listQuestion.map((question) => {
    return { ...question, accepts: ["fail1234"], lastDroppedItem: [] };
  });
  return listDataQuestion;
}

export function formatQuestionTitle(data) {
  const dataIcon = data.icon_list[0]?.icons.filter(
    (icon) => icon.icon_id == data.game_config.title_question?.icon_id
  );
  return dataIcon;
}

export function totalAnswer(dataAnswer) {
  let countAnswer = 0;
  dataAnswer.game_config.answer?.couple_of_icon.map((answer) => {
    if (answer.icon_id_question !== 'fail') {
      countAnswer ++;
    }
  });
  return countAnswer;
}
