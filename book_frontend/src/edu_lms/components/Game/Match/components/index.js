import { Fragment } from "react";
import VerticalForm from "./VerticalForm";
import HorizontalForm from "./HorizontalForm";
import VerticalFormNumberThree from "./VerticalFormNumberThree";

const MatchWrapper = ({
  dataQuestion,
  dataAnswer,
  styleBox,
  disabledBoxItem,
  typeGame,
  typeDisplay,
  typeDisplayContent,
  columnTitleLeft,
  columnTitleRight,
  onAction,
  fontSizeContent,
  numberSizeMatchWrapper,
}) => {
  return (
    <Fragment>
      {typeDisplay === 2 && (
        <VerticalForm
          dataQuestion={dataQuestion}
          dataAnswer={dataAnswer}
          styleBox={styleBox}
          onAction={onAction}
          typeGame={typeGame}
          typeDisplay={typeDisplay}
          typeDisplayContent={typeDisplayContent}
          columnTitleLeft={columnTitleLeft}
          columnTitleRight={columnTitleRight}
          disabledBoxItem={disabledBoxItem}
          classNameQuestion=""
          marginBottom={"120"}
          classMarginBottom="mb-5"
          fontSizeContent={fontSizeContent}
        />
      )}
      {typeDisplay === 1 && (
        <HorizontalForm
          dataQuestion={dataQuestion}
          dataAnswer={dataAnswer}
          styleBox={styleBox}
          onAction={onAction}
          typeGame={typeGame}
          typeDisplay={typeDisplay}
          typeDisplayContent={typeDisplayContent}
          disabledBoxItem={disabledBoxItem}
          classNameQuestion="d-flex justify-content-center"
          marginBottom={"120"}
          classMarginBottom="mr-3 ml-3"
          fontSizeContent={fontSizeContent}
        />
      )}
      {typeDisplay === 3 && (
        <VerticalFormNumberThree
          dataQuestion={dataQuestion}
          dataAnswer={dataAnswer}
          styleBox={styleBox}
          onAction={onAction}
          typeGame={typeGame}
          typeDisplay={typeDisplay}
          typeDisplayContent={typeDisplayContent}
          disabledBoxItem={disabledBoxItem}
          classNameQuestion=""
          marginBottom="0"
          classMarginBottom="mb-1"
          numberSizeMatchWrapper={numberSizeMatchWrapper}
          fontSizeContent={fontSizeContent}
        />
      )}
    </Fragment>
  );
};

export default MatchWrapper;
