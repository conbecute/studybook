import { Modal } from "react-bootstrap";
import styled from "styled-components";
import timeUpImg from "edu_lms_v2/assets/img/dongho-02.svg";

export default function PopupTimeUp({ show, onSubmitExam }) {
  return (
    <Modal show={show} centered={true} className="monkey-color-black">
      <Modal.Header className="border-0 justify-content-center">
        <p className="h3">Hết giờ</p>
      </Modal.Header>
      <Modal.Body className="border-0 text-center p-0">
        <div className="d-flex justify-content-center mb-3">
          <img src={timeUpImg} width="150" height="150" />
        </div>
        <p>Đã hết giờ, vui lòng nộp bài</p>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        <Button
          variant="primary"
          className="monkey-bg-orange border-0 btn-pr"
          onClick={() => onSubmitExam()}
        >
          Nộp bài
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 7px;
  color: white;
`;
