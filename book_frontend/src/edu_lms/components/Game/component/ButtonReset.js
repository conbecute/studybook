import { connect } from "react-redux";
import { BOOK_LANGUAGE } from "../../../constants/type";

const ButtonReset = ({ onResetData, languageBook }) => {
  return (
    <button
      className="btn monkey-bg-blue monkey-color-white"
      onClick={onResetData}
    >
      {BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.buttonRefresh}
    </button>
  );
};

const mapStateToProps = (state) => {
  const { languageBook } = state.readingBookReducers;
  return {
    languageBook,
  };
};

export default connect(mapStateToProps)(ButtonReset);
