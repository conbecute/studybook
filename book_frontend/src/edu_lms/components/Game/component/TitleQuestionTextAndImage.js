import renderHTML from "react-render-html";
import _ from "lodash";
import { URL_IMAGE_QUESTION } from "../../../constants/type";
import { TypeGameMultipleChoice } from "../selection";
import { formattedFontSize } from "../WordFinding/components";
const TitleQuestionTextAndImage = ({ text, urlImage, dataGameConfig }) => {
  const { type_question: typeQuestion, font_size: fontSize } = dataGameConfig;
  return (
    <div className="title pr-3 pl-4 quicksand-bold">
      {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
        text &&
        (fontSize,
        (
          <h4
            className="mb-3"
            style={{ fontSize: formattedFontSize(fontSize) }}
          >
            {renderHTML(text)}
          </h4>
        ))}
      {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && urlImage && (
        <div className="question-image mb-3 text-center">
          <img src={`${URL_IMAGE_QUESTION}${urlImage}`} alt="#" />
        </div>
      )}
    </div>
  );
};
export default TitleQuestionTextAndImage;
