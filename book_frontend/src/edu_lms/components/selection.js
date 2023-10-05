export const removeAccents = (str) => {
  return str
    .replace(/\s+/g, " ")
    .trim()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    .replace(/Đ/g, "D")
	.replace(/\s/g, "-")
	.replace(/---/g, "-")
	.replace(/--/g, "-")
	.toLowerCase()
};

export const resultTitleGame = (data) => {
  const result = data.icons.filter((item) => item.icon_id === data.question);
  return result[0];
};

export const getData = (data) => {
  return data.map((item, index) => {
    return {
      id: `number-${item}`,
      content: item,
      order: item,
    };
  });
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export const onResultBackgroundColor = (index) => {
  switch (index) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
      return {
        backgroundColor: "#a9dfca",
        border: "1px solid #28ae7b",
      };
      break;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
      return {
        backgroundColor: "#ff99df",
        border: "1px solid #ff00af",
      };
      break;
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
      return {
        backgroundColor: "#6495ed",
        border: "1px solid #c1d5f7",
      };
      break;
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
      return {
        backgroundColor: "#d8afe5",
        border: "1px solid #d8afe5",
      };
      break;
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 97:
    case 98:
    case 99:
    case 100:
      return {
        backgroundColor: "#f299ac",
        border: "1px solid #df0030",
      };
      break;
  }
};
export const customStyles = {
  control: (base) => ({
    ...base,
    height: 44,
    borderRadius: 30,
  }),
};

export const styleLine = {
  width: "100%",
  border: "1px solid #ddd",
};

export const onChangeListGradeAll = (listGradeAll, grade_id) => {
  let result = listGradeAll.filter((item) => item.id < 9);
  switch (grade_id) {
    case 3:
      return listGradeAll.filter((item) => item.id >= 13);
      break;
    case 2:
      return listGradeAll.filter((item) => item.id > 8 && item.id <= 12);
      break;
    default:
      return result;
  }
};
