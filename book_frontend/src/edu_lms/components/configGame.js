import FillTheBlankWithNumber from "./Game/FillTheBlankWithNumber";
import FillTheBlankWithImages from "./Game/FillTheBlankWithImages";
import FillTheBlankWithCompare from "./Game/FillTheBlankWithCompare";
import FillTheBlankWithNumberRandom from "./Game/FillTheBlankWithNumberRandom";
import DragDropShowAnswer from "./Game/DragDropShowAnswer";
import GameContainer from "./Game/index";
import PronunciationExercises from "./Game/PronunciationExercises_2";
import FillTheBlank from "./Game/FillTheBlank";
import PreviewContainer from "./Game/Preview";
import WordFinding2Container from "./Game/WordFinding2";

import SenFindingContainer from "./Game/SenFinding";
import DragDropContainer from "./Game/DragDrop/container";
import KaraokeContainer from "./Game/Karaoke/KaraokeContainer";
import ColorContainer from "./Game/Color/ColorContainer";
import AudioBackGroundContainer from "./Game/AudioBackGround/AudioBackGroundContainer";
import FindingCorrectMistakesContainer from "./Game/FindingCorrectMistakes";
import MultipleChoiceBackGroundTvContainer from "./Game/MultipleChoiceBackGroundTv/MultipleChoiceBackGroundTvContainer";
import WordSearchContainer from "./Game/WordSearch/WordSearchContainer";
import DragAndDropBackGroundContainer from "./Game/DragAndDropBackGround/DragAndDropBackGroundContainer";
import DragAndDropBackGroundTvContainer from "./Game/DragAndDropBackGroundTv/DragAndDropBackGroundTvContainer";

import * as GameOnBook from "edu_lms_v2/libraries/gameOnBook";
import { TYPE_GAME } from "edu_lms_v2/libraries/hoc10Game/constants";

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
    case TYPE_GAME.SQC_001:
      return <GameOnBook.SQC_001 activity={data} bookId={objectId} />;
    case TYPE_GAME.MTC_003:
      return <GameOnBook.MTC_003 activity={data} bookId={objectId} />;
    case TYPE_GAME.CKB_001:
      return <GameOnBook.CKB_001 activity={data} bookId={objectId} />;
    case TypeGame.PRONUNCIATION_EXERCISES:
      return (
        <GameContainer data={data}>
          <PronunciationExercises data={data} />
        </GameContainer>
      );
    case TYPE_GAME.MAT_001:
      return <GameOnBook.MAT_001 activity={data} bookId={objectId} />;
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
    case TYPE_GAME.MAT_BG:
      return <GameOnBook.MAT_BG activity={data} bookId={objectId} />;
    case TYPE_GAME.MTC_BG:
      return <GameOnBook.MTC_BG activity={data} bookId={objectId} />;
    case TypeGame.MULTIPLE_CHOICE_BACKGROUND_TV:
      return (
        <GameContainer data={data}>
          <MultipleChoiceBackGroundTvContainer data={data} />
        </GameContainer>
      );
    case TYPE_GAME.DAD_Image:
    case TYPE_GAME.DAD_Text:
      return <GameOnBook.DAD activity={data} bookId={objectId} />;
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
    case TYPE_GAME.Graph_001:
      return <GameOnBook.Graph001 activity={data} bookId={objectId} />;
    case TYPE_GAME.SROI_001:
      return <GameOnBook.SROI_001 activity={data} bookId={objectId} />;
    case TYPE_GAME.Graph_002:
      return <GameOnBook.Graph002 activity={data} bookId={objectId} />;
    case TYPE_GAME.MathInput:
      return <GameOnBook.MathInput activity={data} bookId={objectId} />;
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

    case TYPE_GAME.FIB_001:
      return <GameOnBook.FIB_001 activity={data} bookId={objectId} />;
    case TypeGame.FILL_THE_BLANK_TABLE:
      return (
        <GameContainer data={data}>
          <FillTheBlank data={data} objectId={objectId} />
        </GameContainer>
      );
    case TYPE_GAME.FIB_Math:
      return <GameOnBook.FIBMath activity={data} bookId={objectId} />;
    case TYPE_GAME.FIB_003:
      return <GameOnBook.FIB_003 activity={data} bookId={objectId} />;
    case TYPE_GAME.FIB_BG:
      return <GameOnBook.FIB_BG activity={data} bookId={objectId} />;
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
    case TYPE_GAME.WordFinding:
      return <GameOnBook.WordFinding activity={data} bookId={objectId} />;
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
