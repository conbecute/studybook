import React, { Fragment } from "react";
import _ from "lodash";
import classNames from "classnames";
import {
  LABEL_ANSWER,
  TypeGameMultipleChoice,
} from "../../../components/Game/selection";
import { URL_IMAGE_QUESTION } from "../../../constants/type";
import TextComponent from "../../../components/TextComponent";
import styles from "../listQuizDetail.module.scss";

const Answer = ({
  data,
  idQuestion,
  typeAnswer,
  typeText,
  onHandleAnswer,
  submitted,
  fontSizeAnswer,
}) => {
  return (
    <Fragment>
      {data?.map((item, index) => {
        return (
          <div style={{ width: "fit-content" }}>
            <div
              onClick={() => {
                !submitted && onHandleAnswer(item, idQuestion);
              }}
              key={index}
              className={classNames(`mb-3 cursor d-flex align-items-center`, {
                [styles.check_answer_correct]: submitted && item.is_correct,
              })}
            >
              <div>
                <div
                  className={classNames(
                    `border d-flex justify-content-center align-items-center answer_normal ml-2 ${styles.answer}`,
                    {
                      [styles.answer_selected]: !submitted && item.status !== 0,
                      [styles.answer_correct]: submitted && item.is_correct,
                      [styles.answer_wrong]:
                        submitted && !item.is_correct && item.status !== 0,
                    }
                  )}
                >
                  {LABEL_ANSWER[index]}
                </div>
              </div>

              {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
                <div
                  className={`${styles.textAnswer}`}
                  style={{
                    fontSize: fontSizeAnswer ? `${fontSizeAnswer}px` : "25px",
                  }}
                >
                  <TextComponent
                    typeText={typeText}
                    data={String(item?.props[0]?.text)}
                  />
                </div>
              )}

              {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) &&
                item.path !== "" && (
                  <img
                    src={`${URL_IMAGE_QUESTION}${item.path}`}
                    alt="#"
                    style={{ height: "90px" }}
                  />
                )}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Answer;
