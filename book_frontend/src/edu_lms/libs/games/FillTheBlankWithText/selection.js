import { TYPE_SPLIT, TYPE_SPLIT_MUL_ANSWER } from "edu_lms/constants/type";
import _ from "lodash";

export function onDataConfig(data, iconList) {
  const result = data.map((question, index) => {
    const questionItem = question.answers.map((item) => {
      const icon_list = iconList?.icons?.filter(
        (icon) => icon.icon_id === item.answer_id
      )[0];
      const answer_result = _.split(item.answer_result, TYPE_SPLIT);
      const answer_text = _.split(item.answer_text, TYPE_SPLIT);
      const answer_id = _.join(_.split(item.answer_id, "."), "-");
      return {
        ...item,
        iconList: icon_list,
        answer_result: answer_result,
        answer_text: answer_text,
        new_answer_id: answer_id,
        status: [],
      };
    });
    return { ...question, answers: questionItem };
  });
  return result;
}

export function onDataConvert(dataAnswers, dataForm, isSensitive) {
  const resultData = dataAnswers.answers.map((answerItem) => {
    let data = [];
    dataForm.forEach((valueItem) => {
      if (answerItem.new_answer_id === valueItem.id) {
        if (
          answerItem.answer_result.length === 1 &&
          answerItem.answer_result[0]
        ) {
          answerItem.answer_result.forEach((item, index) => {
            const isCorrect = isSensitive
              ? item
                  .split(TYPE_SPLIT_MUL_ANSWER)
                  .includes(valueItem.value[index])
              : item
                  .toLowerCase()
                  .split(TYPE_SPLIT_MUL_ANSWER)
                  .includes(valueItem.value[index]);

            data = {
              ...data,
              ...answerItem,
              status: isCorrect ? [1] : [2],
            };
          });
        }
        if (answerItem.answer_result.length > 1) {
          let newData = [];
          if (answerItem.answer_index == 1) {
            let listAnswer = [];
            answerItem.answer_result.forEach((item, index) => {
              listAnswer.push(
                isSensitive
                  ? [...item.split(TYPE_SPLIT_MUL_ANSWER)]
                  : [...item.toLowerCase().split(TYPE_SPLIT_MUL_ANSWER)]
              );
            });

            answerItem.answer_result.forEach((item, index) => {
              if (listAnswer.includes(valueItem.value[index])) {
                newData = [...newData, { ...data, ...answerItem, status: 1 }];
                listAnswer.splice(
                  listAnswer.findIndex(
                    (element) => element == valueItem.value[index]
                  ),
                  1
                );
              } else {
                newData = [...newData, { ...data, ...answerItem, status: 2 }];
              }
            });
          } else {
            answerItem.answer_result.forEach((item, index) => {
              const checkSensitive = isSensitive
                ? item
                    .split(TYPE_SPLIT_MUL_ANSWER)
                    .includes(valueItem.value[index])
                : item
                    .toLowerCase()
                    .split(TYPE_SPLIT_MUL_ANSWER)
                    .includes(valueItem.value[index]);

              newData = [
                ...newData,
                { ...data, ...answerItem, status: checkSensitive ? 1 : 2 },
              ];
            });
          }

          const result = Object.values(
            newData.reduce((a, c) => {
              (
                a[c.answer_id] ||
                (a[c.answer_id] = {
                  status: [],
                })
              ).status.push(c.status);
              return a;
            }, {})
          );
          data = result[0];
        }
      }
    });
    return { ...answerItem, ...data };
  });
  return resultData;
}
