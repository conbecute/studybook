export function onFormatData(data) {
  return data.map((item) => ({
    ...item,
    color: "transparent",
    index: item.name.replace("object-", ""),
  }));
}

export function getPosition(index, data, positionLine) {
  let positionTop = data.game_config?.position_line_start_top;
  let positionBottom = data.game_config?.position_line_start_bottom;
  let positionRight = data.game_config?.position_line_start_right;
  let positionLeft = data.game_config?.position_line_start_left;
  let positionCenter = data.game_config?.position_line_start_center;

  if (positionTop) {
    let listPositionTop = positionTop.split(",");
    if (listPositionTop.includes(index)) {
      let positionX =
        positionLine[0].x + (positionLine[1].x - positionLine[0].x) / 2;
      let positionY = positionLine[0].y;
      return [positionX, positionY];
    }
  }
  if (positionBottom) {
    let listPositionBottom = positionBottom.split(",");
    if (listPositionBottom.includes(index)) {
      let positionX =
        positionLine[3].x + (positionLine[2].x - positionLine[3].x) / 2;
      let positionY = positionLine[2].y;
      return [positionX, positionY];
    }
  }
  if (positionRight) {
    let listPositionRight = positionRight.split(",");
    if (listPositionRight.includes(index)) {
      let positionX = positionLine[1].x;
      let positionY =
        positionLine[1].y + (positionLine[2].y - positionLine[1].y) / 2;
      return [positionX, positionY];
    }
  }
  if (positionLeft) {
    let listPositionLeft = positionLeft.split(",");
    if (listPositionLeft.includes(index)) {
      let positionX = positionLine[0].x;
      let positionY =
        positionLine[0].y + (positionLine[3].y - positionLine[0].y) / 2;
      return [positionX, positionY];
    }
  }
  if (positionCenter) {
    let listPositionCenter = positionCenter.split(",");
    if (listPositionCenter.includes(index)) {
      let positionX =
        positionLine[0].x + (positionLine[1].x - positionLine[0].x) / 2;
      let positionY =
        positionLine[0].y + (positionLine[2].y - positionLine[1].y) / 2;
      return [positionX, positionY];
    }
  }
}
