import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as PATH from "edu_lms/constants/path";

export default function QuestionPopUp(props) {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(props.listQuestionSet)) {
      const questionValue = Object.values(props.listQuestionSet);
      setQuestion(questionValue);
    }
  }, [props.listQuestionSet]);

  const handleClick = (id) => {
    window.open(`${PATH.ROUTE_PATH_EXERCISE}/${id}`);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton className="header-bg-reference">
          <Modal.Title className="monkey-color-orange modal-title quicksand-bold w-100 text-center">
            <p className="d-flex justify-content-center">Danh sách bộ đề</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-0 pr-0 pt-1 pb-1">
          <div className="container">
            {question ? (
              question.map((ques, index) => (
                <div
                  className="text-left  mt-4 mb-3 monkey-fz-22 cursor"
                  key={ques.id}
                >
                  <p
                    className="font-weight-bold"
                    onClick={() => handleClick(ques.id)}
                  >
                    <span>Bộ đề&nbsp;{index + 1}:</span>
                    &ensp;
                    {ques.title}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-left mt-4 mb-3">
                <p className="font-weight-bold">Chưa có câu hỏi</p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
