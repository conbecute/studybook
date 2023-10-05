import _ from "lodash";
import { onFormatDataGameConfig } from "edu_lms/modules/DoingExercise/selection";
import { postCreateQuestionByActivity } from "edu_lms/services/question";
import { converDataDefault } from "edu_lms_v2/modules/MockTest/ResultQuestion/selections";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { getQuestionId } from "../constant";

const ListAct = styled.div`
  overflow: auto;
  max-height: 60%;
  min-height: 40%;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
    white-space: nowrap;
  }
  i:hover {
    color: #ff7707;
  }
`;

export default function ListQuestionHoc10({
  listAct,
  titleNotFound,
  setActSelected,
  questionSetId,
  datalistQuestion,
  onGetData,
}) {
  const [answerOfQuestion, setAnswerOfQuestion] = useState([]);
  const [formatActs, setFormatActs] = useState([]);

  useEffect(() => {
    const formatListAct = onFormatDataGameConfig(listAct, () => {});

    setFormatActs(formatListAct);
    setAnswerOfQuestion(converDataDefault(formatListAct));
  }, [listAct]);

  const getTitleActivity = (question) => {
    const questionId = getQuestionId(question);
    const title = question.icon_list[0].icons.find(
      ({ icon_id }) => icon_id === questionId
    );

    // return (
    //   <MathpixLoader>
    //     <MathpixMarkdown text={title?.props[0].text || ""} />
    //   </MathpixLoader>
    // );
    return title?.props[0].text;
  };

  const createQuestionByActivity = (activity_id) => {
    const data = {
      activity_id,
      question_set_id: questionSetId,
      order: datalistQuestion.length + 1,
    };

    postCreateQuestionByActivity(data)
      .then((res) => {
        if (res.data.status === "success") {
          onGetData({ question_set_id: questionSetId });
          toast.success("Thêm câu hỏi thành công!");
        }
      })
      .catch(() => toast.error("Thêm câu hỏi thất bại!"));
  };

  return (
    <ListAct>
      {formatActs.map((act, index) => (
        <div
          key={index}
          className="d-flex cursor mt-2 px-2 rounded justify-content-between align-items-center border border-success"
          onClick={() =>
            setActSelected({ question: act, answer: answerOfQuestion[index] })
          }
        >
          <p style={{ maxWidth: "90%" }}>{getTitleActivity(act)}</p>
          <i
            className="fa fa-plus-square p-2"
            aria-hidden="true"
            onClick={() => createQuestionByActivity(act.activity_id)}
          />
        </div>
      ))}
      {_.isEmpty(formatActs) && (
        <p className="font-weight-bold">{titleNotFound}</p>
      )}
    </ListAct>
  );
}
