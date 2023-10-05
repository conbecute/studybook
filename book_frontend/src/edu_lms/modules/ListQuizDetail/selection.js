import _ from "lodash";
import * as TYPE from "../../constants/type";

export const onChangeBgColorWhenActive = (item) => {
  const result = _.filter(item.answers, function (o) {
    return o.status !== 0;
  });
  let resultColor;
  if (result.length > 0) {
    resultColor = TYPE.COLOR_BLUE;
  } else {
    resultColor = TYPE.COLOR_GRAY;
  }
  return resultColor;
};
