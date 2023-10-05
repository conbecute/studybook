import { TYPE_SPLIT_MUL_ANSWER, ANSWER_STATUS } from "../../../constants/type";

export const comparePositionOrder = (position1, position2) => {
  if (position1.order < position2.order) return -1;
  if (position1.order > position2.order) return 1;
  return 0;
}

export function onDataConfig(data, iconList) {
  const result = data.data.map((question, index) => {
    const questionItem = iconList[0].icons.filter(
      (icon) => icon.icon_id == question.question
    )[0];

    let tracing = JSON.parse(questionItem.tracing);
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

export function onDataConvert(dataAnswers, dataForm) {
  dataAnswers.answers.forEach((value, index, array) => {
    if (!Array.isArray(value.answer_result)) {
      array[index].answer_result = value.answer_result.split(
        TYPE_SPLIT_MUL_ANSWER
      );
    }
  });

  const resultData = [];
  dataAnswers.answers.forEach((answerItem, index) => {
    let data = [];
    if (!answerItem.index) {
      if (answerItem.answer_result.includes(dataForm[index])) {
        data = { ...data, ...answerItem, status: ANSWER_STATUS.CORRECT };
      } else {
        data = { ...data, ...answerItem, status: ANSWER_STATUS.WRONG };
      }
      resultData[index] = { ...answerItem, ...data };
    }
  });

  let correctAnswer = JSON.parse(JSON.stringify(dataAnswers.answers));

  for (let i = 0; i < dataForm.length; i++) {
    let data = [];
    if (correctAnswer[i].index) {
      if (correctAnswer[i].answer_result.includes(dataForm[i])) {
        data = { ...data, ...dataAnswers.answers[i], status: ANSWER_STATUS.CORRECT };

        for (let j = 0; j < correctAnswer.length; j++) {
          if (
            correctAnswer[j]?.index &&
            correctAnswer[j]?.index == correctAnswer[i].index
          ) {
            let position_j = correctAnswer[j]?.answer_result.indexOf(
              dataForm[i]
            );
            if (position_j > -1) {
              correctAnswer[j]?.answer_result.splice(position_j, 1);
            }
          }
        }
      } else {
        data = { ...data, ...dataAnswers.answers[i], status: ANSWER_STATUS.WRONG };
      }
      resultData[i] = { ...dataAnswers.answers[i], ...data };
    }
  }
  return resultData;
}

export const getCorrectWrongInputAnswers = (dataAnswerSystem, dataInputFromUser) => {
  const listAnswerSystem = dataAnswerSystem.map(answer => ({
    ...answer,
    result: answer.answer_result.split(TYPE_SPLIT_MUL_ANSWER)
  }));

  const swapInputAreaWithIndex = {};
  const correctInputs = { noSwap: [], hasSwap: [] };

  const countIndexAnswers = {};
  listAnswerSystem.forEach(answer => {
    countIndexAnswers[answer.index] = (countIndexAnswers[answer.index] || 0) + 1;
  });

  listAnswerSystem.forEach((answer, i) => {
    if (!answer.index || countIndexAnswers[answer.index] === 1) {
      // Case input in game don't have index/ or only index (FIB_BG - input no swap)
      if (answer.result.includes(dataInputFromUser[i])) {
        correctInputs.noSwap.push({ arrIndex: i, value: dataInputFromUser[i] });
      }
    } else {
      // Case input has same index (FIB_BG - input has swap)
      const swapIndex = answer.index;
      if (!Object.keys(swapInputAreaWithIndex).includes(swapIndex)) {
        swapInputAreaWithIndex[swapIndex] = {
          results: [{ text: answer.result, arrIndex: i }],
          values: [{ text: dataInputFromUser[i], arrIndex: i }],
        };
      } else {
        swapInputAreaWithIndex[swapIndex] = {
          results: [
            ...swapInputAreaWithIndex[swapIndex].results,
            { text: answer.result, arrIndex: i },
          ],
          values: [
            ...swapInputAreaWithIndex[swapIndex].values,
            { text: dataInputFromUser[i], arrIndex: i },
          ],
        };
      }
    }
  });

  // Check FIB_BG has swap results, values ---> calculate correctInputs<<hasSwap>>
  Object.values(swapInputAreaWithIndex).forEach((inputArea) => {
    const resultsTemp = [...inputArea.results];
    inputArea.values.forEach((value) => {
      const indexResultCompare = resultsTemp.findIndex((result) =>
        result.text.includes(value.text)
      );
      if (indexResultCompare > -1) {
        correctInputs.hasSwap.push({ arrIndex: value.arrIndex, value: value.text });
        resultsTemp.splice(indexResultCompare, 1);
      }
    });
  });

  const correctInputAnswers = [...correctInputs.noSwap, ...correctInputs.hasSwap];
  return dataAnswerSystem.map((answer, i) => {
    const isCorrect = correctInputAnswers.some(correctInput => correctInput.arrIndex === i);
    return {
      ...answer,
      arrIndex: i,
      status: isCorrect ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG
    }
  });
}
