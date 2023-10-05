import styled from "styled-components";
import _ from "lodash";
import Answer from "./Answer";
import { URL_IMAGE_QUESTION } from "../../../constants/type";
import { TypeGameMultipleChoice } from "../../../components/Game/selection";
import TextComponent from "../../../components/TextComponent";
import styles from "../listQuizDetail.module.scss";

const QuestionWrapper = ({
  data,
  index,
  title,
  dataQuizDetail,
  fontSizeTitle,
  fontSizeAnswer,
  typeText,
  onHandleAnswer,
  submitted,
}) => {
  return (
    <QuestionBody>
      <div className="question-content position-relative">
        <QuestionResult>
          {_.includes(
            dataQuizDetail?.type_question,
            TypeGameMultipleChoice.TEXT
          ) && (
            <p
              className={`mb-2 h5 ${styles.query}`}
              style={{
                fontSize: fontSizeTitle ? `${fontSizeTitle}px` : "25px",
              }}
            >
              Câu {index}:{" "}
              {
                <TextComponent
                  typeText={typeText}
                  data={String(data?.question?.props[0]?.text)}
                />
              }
            </p>
          )}
          {_.includes(
            dataQuizDetail?.type_question,
            TypeGameMultipleChoice.IMAGE
          ) &&
            data?.question?.path !== "" && (
              <img
                src={`${URL_IMAGE_QUESTION}${data?.question?.path}`}
                alt="#"
                className="w-100"
              />
            )}
        </QuestionResult>
        <div className="question-body">
          <Answer
            data={data?.answers}
            idQuestion={data?.id}
            typeAnswer={dataQuizDetail?.type_answer}
            typeText={dataQuizDetail?.type_text}
            onHandleAnswer={onHandleAnswer}
            submitted={submitted}
            fontSizeAnswer={fontSizeAnswer}
          />
        </div>
      </div>
    </QuestionBody>
  );
};
export default QuestionWrapper;

const QuestionBody = styled.div`
  .question-content {
    background-color: #fff;
    width: 100%;
    max-height: 80vh;
    overflow-y: scroll;
  }
  .question-footer {
    position: absolute;
    right: 15px;
    top: 0;
  }
  width: 90%;
  height: 100%;
  margin-top: 100px;
`;
const QuestionResult = styled.div`
  margin-bottom: 3rem;
  @media (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;
