export function onFormatDataGameConfig(data, constScale) {
  const listAnswer = data.game_config.answer?.couple_of_icon.map((answer) => {
    const dataIcon = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id == answer.icon_id_answer
    );
    const dataObject =
      data.background_list.backgroundList[0].value[0].touch.filter(
        (object) => object.name == "object-" + answer.icon_object_id
      );
    return { ...answer, icon: dataIcon, object: dataObject };
  });

  let formatDataListAnser = [];
  if (listAnswer !== undefined) {
    listAnswer.forEach((answer) => {
      let touchVector = JSON.parse(answer.object[0].touch_vector);
      formatDataListAnser.push({
        url: answer.icon[0].props[0].audio[0].path,
        left:
          (touchVector[0].x + (touchVector[1].x - touchVector[0].x) / 2) *
            constScale -
          30,
        top: touchVector[0].y * constScale - 20,
      });
    });
  }
  return formatDataListAnser;
}
export function onGetBackgroundImage(data) {
  const backgroundImage = data.icon_list[0].icons.filter(
    (icon) => icon.icon_id == data.game_config.back_ground.icon_id
  );
  return backgroundImage[0].path;
}
