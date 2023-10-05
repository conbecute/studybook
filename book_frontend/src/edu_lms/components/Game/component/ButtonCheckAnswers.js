import { connect } from "react-redux";
import { BOOK_LANGUAGE } from "../../../constants/type";

const ButtonCheckAnswers = ({ onCheckAnswers, languageBook }) => {
  return (
    <button
      className="btn monkey-bg-blue monkey-color-white"
      onClick={onCheckAnswers}
    >
      {BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.buttonCheck}
    </button>
  );
};

const mapStateToProps = (state) => {
  const { languageBook } = state.readingBookReducers;
  return {
    languageBook,
  };
};

export default connect(mapStateToProps)(ButtonCheckAnswers);
