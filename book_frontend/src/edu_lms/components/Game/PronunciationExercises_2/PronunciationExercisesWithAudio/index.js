import React, { Fragment } from "react";
import PronunciationExercisesWithAudioNotSlick from "./PronunciationExercisesWithAudioNotSlick";
import PronunciationExercisesWithAudioSlick from "./PronunciationExercisesWithAudioSlick";
const PronunciationExercisesWithAudio = ({ data, typeAnswer, typeGame }) => {
  return onShowGameWithAnswer(typeAnswer, data, typeGame);
};

export default PronunciationExercisesWithAudio;

function onShowGameWithAnswer(type, data, typeGame, typeText) {
  switch (Number(type)) {
    case 1:
      return (
        <PronunciationExercisesWithAudioNotSlick
          data={data}
          typeGame={typeGame}
        />
      );
    case 2:
      return (
        <PronunciationExercisesWithAudioSlick
          data={data}
          typeGame={typeGame}
          typeText={typeText}
        />
      );
    default:
      return;
  }
}
