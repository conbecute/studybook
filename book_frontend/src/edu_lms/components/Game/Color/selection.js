import _ from "lodash";

export function getListColor(data) {
  let listColor = [
    {
      id: "red",
      url: "red_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "blue",
      url: "blue_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "green",
      url: "green_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "yellow",
      url: "yellow_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "brown",
      url: "brown_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "orange",
      url: "orange_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "black",
      url: "black_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "white",
      url: "white_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "pink",
      url: "pink_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "purple",
      url: "purple_dọc.png",
      marginBottom: "-120px",
    },
    {
      id: "silver",
      url: "silver_dọc_C0C0C0.png",
      marginBottom: "-120px",
    },
    {
      id: "gold",
      url: "gold_dọc_FFD700.png	",
      marginBottom: "-120px",
    },
  ];

  return listColor.filter((color) => _.includes(data, color.id));
}

export function formatDataAnswer(data) {
  let dataFormat = data.game_config.data;
  dataFormat.map((answers) => {
    var index = 0;
    answers.list_answer.map((answer) => {
      answer.fill = "gray";
      index = index + 1;
      answer.index = index;
      return { ...answer };
    });
    const iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id === answers.question_id
    );
    answers.icon = iconId;
    return { ...answers };
  });
  return dataFormat;
}

export function formatDataListAnswer(data) {
  const formatDataAnswer = data.game_config?.data.map((question) => {
    question.list_answer.map((answer) => {
      answer.list_color_answer.map((color) => {
        // const iconId = data.icon_list[0].icons.filter(
        //   (icon) => icon.icon_id === color.answer_id
        // );
        let iconId;
        data.icon_list[0].icons.forEach((icon) => {
          if (icon.icon_id === color[0].answer_id) {
            iconId = icon;
            return true;
          }
        });
        color.url = iconId.path;
        return { ...color };
      });
      const iconId = data.icon_list[0].icons.filter(
        (icon) => icon.icon_id === answer.answer
      );
      answer.url = iconId[0].path;
      return { ...answer };
    });
    const iconId = data.icon_list[0].icons.filter(
      (icon) => icon.icon_id === question.question_id
    );
    question.icon = iconId;
    return { ...question };
  });
  return formatDataAnswer;
}
