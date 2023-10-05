import { COLOR_WHITE, COLOR_BLUE, COLOR_RED } from "../../../constants/type";

export function onNumberOffsetX(
  number,
  e,
  numberTop,
  typeDisplay,
  numberData,
  type,
  numberSizeMatchWrapper
) {
  let result = 0;
  if (typeDisplay === 1) {
    switch (number) {
      case 1:
        result = e.target.offsetLeft + e.target.offsetWidth / 2;
        break;
      case 2:
        result = e.target.offsetLeft + e.target.offsetWidth / 2;
        break;
      default:
        result = 0;
    }
  }
  if (typeDisplay === 2) {
    switch (number) {
      case 1:
        result = e.target.offsetLeft + e.target.offsetWidth;
        break;
      case 2:
        result = e.target.offsetLeft + e.target.offsetWidth + 240;
        break;
      default:
        result = 0;
    }
  }
  if (typeDisplay === 3) {
    switch (number) {
      case 1:
        result =
          type === 1
            ? e.target.offsetLeft + e.target.offsetWidth
            : e.target.offsetLeft +
              numberSizeMatchWrapper -
              e.target.offsetWidth;
        break;
      case 2:
        result = e.target.offsetLeft + e.target.offsetWidth * 1.7;
        break;
      default:
        result = 0;
    }
  }
  return result;
}

export function onNumberOffsetY(
  number,
  e,
  numberTop,
  typeDisplay,
  numberData,
  type,
  numberSizeMatchWrapper
) {
  let result = 0;
  if (typeDisplay === 1) {
    switch (number) {
      case 1:
        result = e.target.offsetTop + numberTop + e.target.offsetHeight;
        break;
      case 2:
        result = numberTop;
        break;
      default:
        result = 0;
    }
  }
  if (typeDisplay === 2) {
    switch (number) {
      case 1:
        result = e.target.offsetTop + e.target.offsetHeight / 2;
        break;
      case 2:
        result = e.target.offsetTop + e.target.offsetHeight / 2;
        break;
      default:
        result = 0;
    }
  }
  if (typeDisplay === 3) {
    switch (number) {
      case 1:
        result = e.target.offsetTop + e.target.offsetHeight / 2;
        break;
      case 2:
        result =
          e.target.offsetTop + e.target.offsetHeight / 2 + numberData * 40;
        break;
      default:
        result = 0;
    }
  }
  return result;
}

export function onChangeBackground(status, color = COLOR_WHITE) {
  switch (status) {
    case 1:
      return COLOR_BLUE;
    case 2:
      return COLOR_RED;
    default:
      return color;
  }
}
