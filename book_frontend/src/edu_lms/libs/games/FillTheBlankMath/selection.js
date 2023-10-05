import { TYPE_SPLIT, TYPE_SPLIT_MUL_ANSWER } from "edu_lms/constants/type";
import _, { isInteger } from "lodash";

export function onDataConfig(data, iconList) {
  const result = data?.map((question, index) => {
    const questionItem = question.answers.map((item) => {
      const icon_list = iconList[0].icons.filter(
        (icon) => icon.icon_id === item.answer_id
      )[0];
      const answer_result = _.split(item.answer_result, TYPE_SPLIT_MUL_ANSWER);
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

export function onDataConvert(dataAnswers, dataForm) {
  let correctIndexQuestions = [];
  const resultData = dataAnswers.answers.map((answerItem) => {
    let data = [];
    dataForm.forEach((valueItem) => {
      if (answerItem.new_answer_id === valueItem.id) {
        let newData = [];
        let tempData = [];
        let countCorrect = 0;
        let maxCorrect = 0;
        answerItem.answer_result.forEach((item, index) => {
          let answer = item.split(TYPE_SPLIT);
          countCorrect = 0;
          tempData = [];
          answer.forEach((itemAnswer, indexAnswer) => {
            if (answerItem.answer_index) {
              if (
                itemAnswer.toLowerCase() == valueItem.value[indexAnswer] &&
                !correctIndexQuestions
                  .filter((value) => value.index == answerItem.answer_index)[0]
                  ?.correctIndex?.includes(index)
              ) {
                countCorrect++;
                tempData = [...tempData, { ...data, ...answerItem, status: 1 }];
              } else {
                tempData = [...tempData, { ...data, ...answerItem, status: 2 }];
              }
            } else {
              if (itemAnswer.toLowerCase() == valueItem.value[indexAnswer]) {
                countCorrect++;
                tempData = [...tempData, { ...data, ...answerItem, status: 1 }];
              } else {
                tempData = [...tempData, { ...data, ...answerItem, status: 2 }];
              }
            }
          });
          if (countCorrect >= maxCorrect) {
            newData = tempData;
            maxCorrect = countCorrect;
          }
          if (countCorrect == answer.length && answerItem.answer_index) {
            let exist = correctIndexQuestions.findIndex(
              (value) => value.index == answerItem.answer_index
            );
            if (exist > -1) {
              if (!correctIndexQuestions[exist].correctIndex.includes(index)) {
                correctIndexQuestions[exist].correctIndex.push(index);
              }
            } else {
              correctIndexQuestions.push({
                index: answerItem.answer_index,
                correctIndex: [index],
              });
            }
          }
        });

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
    });
    return { ...answerItem, ...data };
  });
  return resultData;
}
