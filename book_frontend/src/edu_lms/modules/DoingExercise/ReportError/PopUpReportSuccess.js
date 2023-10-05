import React from "react";
import { Modal } from "react-bootstrap";
import * as TEXT from "edu_lms/constants/text";
import styled from "styled-components";
import { URL_IMAGE } from "edu_lms/constants/type";

export default function PopUpReportSuccess(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="title-report-error-question">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="quicksand-bold w-100 text-center"
        >
          <span>{TEXT.TITLE_POPUP_REPORT_SUCCESS}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <WrapContent className="mt-0">
          <ImageStyle
            src={`${URL_IMAGE}upload/web_book/icon1-01.png`}
            alt="thank"
            width="200px"
            height="200px"
          />
          <p className="quicksand-medium">{TEXT.TEXT_POPUP_REPORT_SUCCESS_1}</p>
          <p className="quicksand-medium">{TEXT.TEXT_POPUP_REPORT_SUCCESS_2}</p>
        </WrapContent>
      </Modal.Body>
    </Modal>
  );
}

const IStyle = styled.i`
  margin-right: 10px;
  font-size: 24px;
`;

const ImageStyle = styled.img`
  margin: 0 auto;
`;
const WrapContent = styled.p`
  margin: 30px 0px;
  font-size: 18px;
  text-align: center;
`;
