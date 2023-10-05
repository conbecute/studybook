import React, { useState, useEffect } from "react";
import _ from "lodash";
import PronunciationExercisesWithVideo from "./PronunciationExercisesWithVideo";
import PronunciationExercisesWithAudio from "./PronunciationExercisesWithAudio";
import { TypeGameMultipleChoice, onResultConfigData } from "../selection";
import styles from "./PronunciationExercises.module.scss";

const PronunciationExercises = ({ data }) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  useEffect(() => {
    const dataConfig = onResultConfigData(
      data.game_config?.answer,
      data.icon_list[0]?.icons
    );
    dataConfig.fontSize = data.game_config?.font_size;
    dataConfig.answer_number_in_a_row =
      data.game_config?.answer_number_in_a_row;
    setStateDataConfig(dataConfig);
  }, [data]);

  return (
    <div className={`h-100 ${styles["pronunciation__wrapper"]}`}>
      {onShowTypeGame(data.game_config, dataConfig)}
    </div>
  );
};

export default PronunciationExercises;

function onShowTypeGame(data, dataConfig) {
  if (_.includes(data.type_game, TypeGameMultipleChoice.VIDEO)) {
    return (
      <PronunciationExercisesWithVideo
        data={dataConfig}
        typeGame={data.type_game}
        typeAnswer={Number(data.type_answer)}
      />
    );
  } else {
    return (
      <PronunciationExercisesWithAudio
        data={dataConfig}
        typeAnswer={Number(data.type_answer)}
        typeGame={data.type_game}
        typeText={data?.type_text}
      />
    );
  }
}
