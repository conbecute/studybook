import { useSelector } from "react-redux";
import { BOOK_LANGUAGE } from "./../../../../constants/type";

const FooterComponent = ({ onCheckAnswers, onResetData }) => {
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );

  return (
    <div>
      <button
        className="btn monkey-bg-blue monkey-color-white mr-3"
        onClick={onResetData}
      >
        {
          BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
            ?.buttonRefresh
        }
      </button>
      <button
        className="btn monkey-bg-blue monkey-color-white"
        onClick={onCheckAnswers}
      >
        {BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.buttonCheck}
      </button>
    </div>
  );
};

export default FooterComponent;
