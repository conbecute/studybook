import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import FormReportError from "./FormReportError";
import PopUpReportSuccess from "./PopUpReportSuccess";
import { postSaveReportErrorQuestion } from "edu_lms/services/reportErrorQuestion";
import { COLOR_ORANGE } from "edu_lms/constants/type";

const Icon = styled.i`
  position: fixed;
  font-size: 28px;
  cursor: pointer;
  z-index: 3;
  left: 20px;
  bottom: 20px;
  @media (max-width: 767px) {
    left: 10px;
    bottom: 15px;
  }
  &:hover {
    color: ${COLOR_ORANGE};
  }
  @media screen and (min-width: 767px) and (max-width: 992px) {
    width: 55px;
    height: 55px;
    left: 10px;
    bottom: 8px;
  }
`;

const ReportError = ({ activeQuestionReportError, typeQuestion, bookContentId }) => {
  const [showFormReportErrorModal, setShowFormReportErrorModal] =
    useState(false);
  const [showPopUpReportSuccessModal, setShowPopUpReportSuccessModal] =
    useState(false);
  const saveReportError = (data) => {
    const dataJson = {
      answer: data.answer,
      question: data.question,
      image: data.image,
      other_problems: data.other_problems,
      input_other_problems: data.input_other_problems,
    };
    let postData = {
      question_set_id: activeQuestionReportError?.question_set_id,
      activity_id: activeQuestionReportError?.activity_id,
      activity_name: activeQuestionReportError?.activity_name,
      activity_index: activeQuestionReportError?.order_index,
      email: data.email,
      phone: data.phone,
      data: JSON.stringify(dataJson),
      type: typeQuestion,
    };

    if (bookContentId) {
      postData = {...postData, book_content_id: bookContentId}
    }

    if (
      dataJson.answer ||
      dataJson.image ||
      dataJson.question ||
      dataJson.other_problems ||
      dataJson.input_other_problems !== ""
    ) {
      postSaveReportErrorQuestion(postData).catch((errors) => {
        console.log(errors);
      });
      setShowFormReportErrorModal(false);
      setShowPopUpReportSuccessModal(true);
    }
  };
  const handleClose = () => {
    setShowFormReportErrorModal(false);
    setShowPopUpReportSuccessModal(false);
  };
  const onReport = () => {
    setShowFormReportErrorModal(true);
  };
  return (
    <>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="reportbug-tooltip">Góp ý/Báo lỗi</Tooltip>}
      >
        <Icon
          className="fa fa-exclamation-triangle"
          aria-hidden="true"
          onClick={onReport}
        />
      </OverlayTrigger>
      {showFormReportErrorModal && (
        <FormReportError
          saveReportError={saveReportError}
          show={showFormReportErrorModal}
          onHide={handleClose}
        />
      )}
      {showPopUpReportSuccessModal && (
        <PopUpReportSuccess
          show={showPopUpReportSuccessModal}
          onHide={handleClose}
        />
      )}
    </>
  );
};

export default ReportError;
