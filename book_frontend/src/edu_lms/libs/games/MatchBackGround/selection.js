export function getPosition(index, data, positionLine) {
  const positionTop = data.game_config?.position_line_start_top;
  const positionBottom = data.game_config?.position_line_start_bottom;
  const positionRight = data.game_config?.position_line_start_right;
  const positionLeft = data.game_config?.position_line_start_left;
  const positionCenter = data.game_config?.position_line_start_center;

  if (positionTop) {
    const listPositionTop = positionTop.split(",");
    if (listPositionTop.includes(index)) {
      const positionX =
        positionLine[0].x + (positionLine[1].x - positionLine[0].x) / 2;
      const positionY = positionLine[0].y;
      return [positionX, positionY];
    }
  }
  if (positionBottom) {
    const listPositionBottom = positionBottom.split(",");
    if (listPositionBottom.includes(index)) {
      const positionX =
        positionLine[3].x + (positionLine[2].x - positionLine[3].x) / 2;
      const positionY = positionLine[2].y;
      return [positionX, positionY];
    }
  }
  if (positionRight) {
    const listPositionRight = positionRight.split(",");
    if (listPositionRight.includes(index)) {
      const positionX = positionLine[1].x;
      const positionY =
        positionLine[1].y + (positionLine[2].y - positionLine[1].y) / 2;
      return [positionX, positionY];
    }
  }
  if (positionLeft) {
    const listPositionLeft = positionLeft.split(",");
    if (listPositionLeft.includes(index)) {
      const positionX = positionLine[0].x;
      const positionY =
        positionLine[0].y + (positionLine[3].y - positionLine[0].y) / 2;
      return [positionX, positionY];
    }
  }
  if (positionCenter) {
    const listPositionCenter = positionCenter.split(",");
    if (listPositionCenter.includes(index)) {
      const positionX =
        positionLine[0].x + (positionLine[1].x - positionLine[0].x) / 2;
      const positionY =
        positionLine[0].y + (positionLine[2].y - positionLine[1].y) / 2;
      return [positionX, positionY];
    }
  }
}
