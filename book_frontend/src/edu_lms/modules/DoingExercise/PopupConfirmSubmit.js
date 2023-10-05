import { Modal } from "react-bootstrap";
import danger_img from "edu_lms_v2/assets/img/img-error.svg";
import styled from "styled-components";

export default function PopupConfirmSubmit({
  show,
  setShow,
  onSubmitExam,
  isComplete,
}) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      className="monkey-color-black"
    >
      <Modal.Header closeButton className="border-0">
        <p className="h3 w-100 text-center">Chú ý</p>
      </Modal.Header>
      <Modal.Body className="border-0 text-center p-0">
        <div className="d-flex justify-content-center mb-3">
          <img src={danger_img} />
        </div>
        <p>
          {isComplete
            ? "Bạn có chắc chắn muốn nộp bài không"
            : "Bạn chưa hoàn thành bài thi. Bạn có muốn nộp bài không?"}
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        <Button className="border-0 btn-pr" onClick={handleClose}>
          Đóng
        </Button>
        <Button className="btn-sub " onClick={() => onSubmitExam()}>
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
`;
