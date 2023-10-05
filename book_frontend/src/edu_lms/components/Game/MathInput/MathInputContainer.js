import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import "./style.css";
import MathInputContainerWrapper from "./components";
import {
  onFormatData,
  formatResultAnswer,
  formatQuestionTitle,
} from "./selection";

const MathInputContainer = ({ data, alert, languageBook }) => {
  const [listQuestion] = useState(onFormatData(data));
  const [resultAnswer, setResultAnswer] = useState(formatResultAnswer(data));
  const [questionTitle] = useState(formatQuestionTitle(data));
  const [fontSizeQuestion] = useState(
    data.game_config.font_size_question
      ? data.game_config.font_size_question
      : "30px"
  );
  const [fontSizeAnswer] = useState(
    data.game_config.font_size_answer
      ? data.game_config.font_size_answer
      : "30px"
  );
  const [typeQuestion] = useState(data.game_config.type_question);

  return (
    <>
      <MathInputContainerWrapper
        data={data}
        listQuestion={listQuestion}
        resultAnswer={resultAnswer}
        setResultAnswer={setResultAnswer}
        questionTitle={questionTitle}
        fontSizeAnswer={fontSizeAnswer}
        fontSizeQuestion={fontSizeQuestion}
        typeQuestion={typeQuestion}
        alert={alert}
        languageBook={languageBook}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MathInputContainer);
