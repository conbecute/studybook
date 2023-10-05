import React, { useState, useEffect } from "react";
import PreviewNotSliderWrapper from "./components/PreviewNotSliderWrapper";
import PreviewSliderWrapper from "./components/PreviewSliderWrapper";
import Preview from "./Preview.module.scss";

const PreviewContainer = ({ data }) => {
  const [dataDefault, setStateDataDefault] = useState([]);

  useEffect(() => {
    setStateDataDefault(data?.game_config?.answer?.couple_of_icon);
  }, [data]);
  return (
    <div
      className={`preview-container ${Preview.gamePreview}`}
      style={{ height: "95%", overflowX: "auto" }}
    >
      {onShowGame(
        Number(data.game_config?.type_display),
        dataDefault,
        data?.icon_list[0]?.icons,
        Number(data.game_config?.type_game),
        data.game_config?.type_question,
        data.game_config?.type_answer,
        data.game_config?.text_button,
        data.game_config?.font_size_question,
        data.game_config?.font_size_answer
      )}
    </div>
  );
};
export default PreviewContainer;

function onShowGame(
  typeDisplay,
  dataDefault,
  iconList,
  typeGame,
  typeQuestion,
  typeAnswer,
  textButton,
  fontSizeQuestion,
  fontSizeAnswer
) {
  switch (typeDisplay) {
    case 2:
      return (
        <PreviewSliderWrapper
          data={dataDefault}
          iconList={iconList}
          typeGame={typeGame}
          typeQuestion={typeQuestion}
          typeAnswer={typeAnswer}
          textButton={textButton}
          fontSizeQuestion={fontSizeQuestion}
          fontSizeAnswer={fontSizeAnswer}
        />
      );
    case 1:
      return (
        <PreviewNotSliderWrapper
          data={dataDefault}
          iconList={iconList}
          typeGame={typeGame}
          typeQuestion={typeQuestion}
          typeAnswer={typeAnswer}
          textButton={textButton}
        />
      );
    default:
      return "";
  }
}
