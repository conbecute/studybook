export function formatQuestionTitle(data) {
  const dataIcon = data.icon_list[0]?.icons.filter(
    (icon) => icon.icon_id == data.game_config.question?.icon_id
  );
  return dataIcon;
}

export function formatDataAnswer(data) {
  let arrayListWord = [];
  data.forEach((icon) => {
    let arrayWord = [];
    let dataIcon = icon.icon_id.split("*");
    dataIcon.forEach((word) => {
      arrayWord.push({
        text: word,
        status: 0,
        check: false,
      });
    });
    arrayListWord.push(arrayWord);
  });
  return arrayListWord;
}

export function formatDataResult(data) {
  const dataResult = data.game_config.result.map((result) => {
    let iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == result.icon_id
    );
    return { ...result, icon: iconId };
  });
  let arrayWord = [];
  dataResult.forEach((word) => {
    arrayWord.push(word.icon[0].props[0].text.replace(" ", ""));
  });
  return arrayWord;
}
export function formatShowDataResult(data) {
  const dataResult = data.game_config.result.map((result) => {
    let iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == result.icon_id
    );
    return { ...result, icon: iconId };
  });
  let arrayWord = [];
  dataResult.forEach((word) => {
    arrayWord.push(word.icon[0].props[0].text);
  });
  return arrayWord;
}

export function formatShowDataListResult(data) {
  const dataResult = data.game_config.result.map((result) => {
    let iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == result.icon_id
    );
    return { ...result, icon: iconId };
  });
  let arrayResult = [];
  dataResult.forEach((word) => {
    arrayResult.push({
      text: word.icon[0].props[0].text,
      image: word.icon[0].path,
    });
  });
  return arrayResult;
}

export function formatShowDataResultImage(data) {
  const dataResult = data.game_config.result.map((result) => {
    let iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == result.icon_id
    );
    return { ...result, icon: iconId };
  });
  let arrayWord = [];
  dataResult.forEach((word) => {
    arrayWord.push({
      text: word.icon[0].props[0].text,
      image: word.icon[0].path,
    });
  });
  let imageLeft = arrayWord.slice(0, arrayWord.length / 2);
  let imageRight = arrayWord.slice(arrayWord.length / 2, arrayWord.length);

  return [imageLeft, imageRight];
}
