import React from "react";
import { Modal } from "react-bootstrap";
import * as TEXT from "../../../constants/text";
import styled from "styled-components";
import "./style.css";
import { URL_IMAGE } from "../../../constants/type";

export default function PopUpReportSuccess(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="title-report-error">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="monkey-color-violet quicksand-bold"
        >
          <IStyle className="fa fa-info-circle" aria-hidden="true" />
          <span>{TEXT.TITLE_POPUP_REPORT_SUCCESS}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WrapContent>
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
  margin-top: -45px;
`;
const WrapContent = styled.p`
  margin: 30px 20px;
  font-size: 18px;
  text-align: center;
`;
