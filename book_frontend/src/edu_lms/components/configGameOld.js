import _ from "lodash";
import { TYPE_TEXT } from "../constants/type";
import FillTheBlankWithNumber from "./Game/FillTheBlankWithNumber";
import FillTheBlankWithImages from "./Game/FillTheBlankWithImages";
import FillTheBlankWithCompare from "./Game/FillTheBlankWithCompare";
import FillTheBlankWithNumberRandom from "./Game/FillTheBlankWithNumberRandom";
import FillTheBlankWithDropdown from "./Game/FillTheBlankWithDropdown";
import FillTheBlankDynamically from "./Game/FillTheBlankDynamically";
import FillTheBlankMath from "./Game/FillTheBlankMath";
import Sequence from "./Game/Sequence";
import MultipleChoice from "./Game/MultipleChoice";
import DragDropShowAnswer from "./Game/DragDropShowAnswer";
import GameContainer from "./Game/index";
import PronunciationExercises from "./Game/PronunciationExercises_2";
import FillTheBlank from "./Game/FillTheBlank";
import MatchContainer from "./Game/Match/MatchContainer";
import MultipleChoiceCheckbox from "./Game/MultipleChoiceCheckbox";
import PreviewContainer from "./Game/Preview";
import WordFindingContainer from "./Game/WordFinding";
import WordFinding2Container from "./Game/WordFinding2";

import SenFindingContainer from "./Game/SenFinding";
import DragDropContainer from "./Game/DragDrop/container";
import KaraokeContainer from "./Game/Karaoke/KaraokeContainer";
import ColorContainer from "./Game/Color/ColorContainer";
import MatchBackGroundContainer from "./Game/MatchBackGround/MatchBackGroundContainer";
import MultipleChoiceBackGroundContainer from "./Game/MultipleChoiceBackGround/MultipleChoiceBackGroundContainer";
import AudioBackGroundContainer from "./Game/AudioBackGround/AudioBackGroundContainer";
import FindingCorrectMistakesContainer from "./Game/FindingCorrectMistakes";
import MultipleChoiceBackGroundTvContainer from "./Game/MultipleChoiceBackGroundTv/MultipleChoiceBackGroundTvContainer";
import DragAndDropContainer from "./Game/DragAndDrop/DragAndDropContainer";
import DragAndDropImageContainer from "./Game/DragAndDropImage/DragAndDropImageContainer";
import MathInputContainer from "./Game/MathInput/MathInputContainer";
import WordSearchContainer from "./Game/WordSearch/WordSearchContainer";
import DragAndDropBackGroundContainer from "./Game/DragAndDropBackGround/DragAndDropBackGroundContainer";
import DragAndDropBackGroundTvContainer from "./Game/DragAndDropBackGroundTv/DragAndDropBackGroundTvContainer";
import DragDropGraph from "./Game/Graph/DragDropGraph";
import FillTheBlankGraph from "./Game/Graph/FillTheBlankGraph";
import GraphSROIBook from "edu_lms_v2/modules/GameOnBook/GraphSROI";

export const TypeGame = {
  FILL_THE_BLANK_WITH_NUMBER: "FILL_THE_BLANK_WITH_NUMBER",
  FILL_THE_BLANK_WITH_IMAGES: "FILL_THE_BLANK_WITH_IMAGES",
  FILL_THE_BLANK_WITH_COMPARE: "FILL_THE_BLANK_WITH_COMPARE",
  FILL_THE_BLANK_WITH_NUMBER_RANDOM: "FILL_THE_BLANK_WITH_NUMBER_RANDOM",
  SEQUENCE: 438,
  MULTIPLE_CHOICE: 439,
  MULTIPLE_CHOICE_CHECKBOX: 436,
  PRONUNCIATION_EXERCISES: 446,
  DRAG_DROP_EXERCISES: "DRAG_DROP_EXERCISES",
  MATCH: 429,
  FILL_THE_BLANK: 431,
  FILL_THE_BLANK_TABLE: 437,
  FILL_THE_BLANK_MATH: 471,
  FILL_THE_BLANK_WITH_DROPDOWN: 458,
  FILL_THE_BLANK_DYNAMICALLY: 461,
  DRAG_DROP: 429,
  DRAG_DROP_2: 430,
  DRAG_DROP_3: 466,
  DRAG_DROP_SHOW_ANSWER: 453,
  PREVIEW: 448,
  WORD_FINDING: 449,
  WORD_FINDING_2: 468,
  SEND_FINDING: 450,
  KARAOKE: 467,
  COLOR: 462,
  MATCHING_BACKGROUND: 463,
  MULTIPLE_CHOICE_BACKGROUND: 464,
  AUDIO_BACKGROUND: 470,
  FIND_CORRECT_MISTAKES: 475,
  MULTIPLE_CHOICE_BACKGROUND_TV: 474,
  DRAG_DROP_TEXT: 476,
  DRAG_DROP_IMAGE: 477,
  DRAG_DROP_BACK_GROUND: 10004,
  DRAG_DROP_BACK_GROUND_TV: 10005,
  DRAG_DROP_GRAPH: 10006,
  FILL_THE_BLANK_GRAPH: 10007,
  MATH_INPUT: 1482,
  WORD_SEARCH: 1483,
  REGION_OF_THE_INEQUALITY: 1000013,
};

export const onResultGameComponent = (data, objectId, isPopupTestGame = false) => {
  switch (data.game_id) {
    case TypeGame.FILL_THE_BLANK_WITH_NUMBER:
      return (
        <GameContainer data={data.game}>
          <FillTheBlankWithNumber data={data.game} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_WITH_IMAGES:
      return (
        <GameContainer data={data.game}>
          <FillTheBlankWithImages data={data.game} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_WITH_COMPARE:
      return (
        <GameContainer data={data.game}>
          <FillTheBlankWithCompare data={data.game} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_WITH_NUMBER_RANDOM:
      return (
        <GameContainer data={data.game}>
          <FillTheBlankWithNumberRandom data={data.game} />
        </GameContainer>
      );
    case TypeGame.SEQUENCE:
      return (
        <GameContainer data={data}>
          <Sequence dataGame={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.MULTIPLE_CHOICE:
      return (
        <GameContainer data={data}>
          <MultipleChoice data={data} dataDefault={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.MULTIPLE_CHOICE_CHECKBOX:
      return (
        <GameContainer data={data}>
          <MultipleChoiceCheckbox
            data={data}
            dataDefault={data}
            objectId={objectId}
          />
        </GameContainer>
      );
    case TypeGame.PRONUNCIATION_EXERCISES:
      return (
        <GameContainer data={data}>
          <PronunciationExercises data={data} />
        </GameContainer>
      );
    case TypeGame.MATCH:
      return (
        <GameContainer data={data} isShowTitle="true">
          <MatchContainer data={data} dataDefault={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.KARAOKE:
      return (
        <GameContainer data={data}>
          <KaraokeContainer data={data} />
        </GameContainer>
      );
    case TypeGame.COLOR:
      return (
        <GameContainer data={data}>
          <ColorContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.MATCHING_BACKGROUND:
      return (
        <GameContainer data={data}>
          <MatchBackGroundContainer
            data={data}
            dataDefault={data}
            objectId={objectId}
          />
        </GameContainer>
      );
    case TypeGame.MULTIPLE_CHOICE_BACKGROUND:
      return (
        <GameContainer data={data}>
          <MultipleChoiceBackGroundContainer
            data={data}
            dataDefault={data}
            objectId={objectId}
          />
        </GameContainer>
      );
    case TypeGame.MULTIPLE_CHOICE_BACKGROUND_TV:
      return (
        <GameContainer data={data}>
          <MultipleChoiceBackGroundTvContainer data={data} />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_TEXT:
      return (
        <GameContainer data={data}>
          <DragAndDropContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_IMAGE:
      return (
        <GameContainer data={data}>
          <DragAndDropImageContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_BACK_GROUND:
      return (
        <GameContainer data={data}>
          <DragAndDropBackGroundContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_BACK_GROUND_TV:
      return (
        <GameContainer data={data}>
          <DragAndDropBackGroundTvContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_GRAPH:
      return (
        <GameContainer data={data}>
          <DragDropGraph data={data} />
        </GameContainer>
      );
    case TypeGame.REGION_OF_THE_INEQUALITY:
      return (
        <GameContainer data={data}>
          <GraphSROIBook data={data} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_GRAPH:
      return (
        <GameContainer data={data}>
          <FillTheBlankGraph data={data} />
        </GameContainer>
      );
    case TypeGame.MATH_INPUT:
      return (
        <GameContainer data={data}>
          <MathInputContainer data={data} />
        </GameContainer>
      );
    case TypeGame.WORD_SEARCH:
      return (
        <GameContainer data={data}>
          <WordSearchContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.AUDIO_BACKGROUND:
      return (
        <GameContainer data={data}>
          <AudioBackGroundContainer data={data} />
        </GameContainer>
      );

    case TypeGame.FILL_THE_BLANK:
    case TypeGame.FILL_THE_BLANK_TABLE:
      return (
        <GameContainer data={data}>
          <FillTheBlank data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_MATH:
      return (
        <GameContainer data={data}>
          <FillTheBlankMath data={data} />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_WITH_DROPDOWN:
      return (
        <GameContainer data={data}>
          <FillTheBlankWithDropdown
            data={data}
            dataDefault={data}
            objectId={objectId}
          />
        </GameContainer>
      );
    case TypeGame.FILL_THE_BLANK_DYNAMICALLY:
      return (
        <GameContainer
          data={data}
          textQuestion={_.includes(data?.game_config?.type_question, TYPE_TEXT)}
        >
          <FillTheBlankDynamically data={data} objectId={objectId} isPopupTestGame={isPopupTestGame}/>
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_3:
    case TypeGame.DRAG_DROP:
    case TypeGame.DRAG_DROP_2:
      return (
        <GameContainer data={data}>
          <DragDropContainer
            data={data}
            dataDefault={data}
            objectId={objectId}
          />
        </GameContainer>
      );
    case TypeGame.DRAG_DROP_SHOW_ANSWER:
      return (
        <GameContainer data={data}>
          <DragDropShowAnswer data={data} />
        </GameContainer>
      );
    case TypeGame.PREVIEW:
      return (
        <GameContainer data={data}>
          <PreviewContainer data={data} />
        </GameContainer>
      );
    case TypeGame.WORD_FINDING:
      return (
        <GameContainer data={data}>
          <WordFindingContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.WORD_FINDING_2:
      return (
        <GameContainer data={data}>
          <WordFinding2Container data={data} />
        </GameContainer>
      );
    case TypeGame.SEND_FINDING:
      return (
        <GameContainer data={data}>
          <SenFindingContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    case TypeGame.FIND_CORRECT_MISTAKES:
      return (
        <GameContainer data={data}>
          <FindingCorrectMistakesContainer data={data} objectId={objectId} />
        </GameContainer>
      );
    default:
      return null;
  }
};
