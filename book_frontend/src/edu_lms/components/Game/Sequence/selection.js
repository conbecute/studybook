import { onResultConfigData } from "../selection";

export function onDataConfig(dataAnswers, iconList, typeDisplay) {
  const dataAddStatus = onResultConfigData(dataAnswers, iconList, 1);
  let resultDataAnswerDefault = [];
  if (typeDisplay < 3) {
    resultDataAnswerDefault = [...resultDataAnswerDefault, dataAddStatus];
  }
  if (typeDisplay === 3) {
    let array_1 = [];
    let array_2 = [];
    dataAddStatus.forEach((item, index) => {
      if (index % 2) {
        array_1 = [...array_1, item];
      } else {
        array_2 = [...array_2, item];
      }
    });
    resultDataAnswerDefault = [array_2, array_1];
  }
  return resultDataAnswerDefault;
}
