import { onResultConfigData } from "edu_lms/components/Game/selection";
import { TYPE_DISPLAY_GAME_SQC } from "edu_lms/constants/type";

export function onDataConfig(dataAnswers, iconList, typeDisplay) {
  const dataAddStatus = onResultConfigData(dataAnswers, iconList, 1);
  let resultDataAnswerDefault = [];
  if (typeDisplay < TYPE_DISPLAY_GAME_SQC.VERTICAL) {
    resultDataAnswerDefault = [...resultDataAnswerDefault, dataAddStatus];
  }
  if (typeDisplay === TYPE_DISPLAY_GAME_SQC.VERTICAL) {
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
