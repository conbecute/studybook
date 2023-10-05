import _ from "lodash";

export const MY_QUESTION = "my-question";
export const HOC10_QUESTION = "hoc10-question";

export const getQuestionId = (question) => {
  const questionId =
    (!_.isEmpty(question?.game_config?.data) &&
      question?.game_config?.data[0].question) ||
    (!_.isEmpty(question?.data?.game_config?.data) &&
      question?.data?.game_config?.data[0].question) ||
    (!_.isEmpty(question?.game_config?.data) &&
      question?.game_config?.data[0].title) ||
    !_.isEmpty(
      question?.game_config?.data && question?.game_config?.data[0].question
    ) ||
    question?.game_config?.title_question?.icon_id ||
    question?.game_config?.question_title?.icon_id ||
    question?.game_config?.title_question?.icon_id;

  return questionId;
};
