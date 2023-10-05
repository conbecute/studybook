import { Modal } from "react-bootstrap";
import classNames from "classnames";
import styled from "styled-components";
import danger_img from "edu_lms_v2/assets/img/img-error.svg";

export default function PopupSubmitTraining({
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
        <p className="h3 w-100 text-center">{!isComplete && "Chú ý"}</p>
      </Modal.Header>
      <Modal.Body className="border-0 text-center p-0">
        <div className="d-flex justify-content-center mb-3">
          {!isComplete && <img src={danger_img} />}
        </div>
        <p className="monkey-fz-20 mb-3">
          {isComplete ? (
            "Thầy cô có chắc chắn muốn nộp bài không?"
          ) : (
            <span>
              Thầy cô chưa hoàn thành bài kiểm tra tập huấn <br /> Thầy cô có
              chắc chắn muốn nộp bài kiểm tra không?
            </span>
          )}
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        {isComplete ? (
          <>
            <Button
              className={classNames("", {
                "btn-sub": isComplete,
                "border-0 btn-pr": !isComplete,
              })}
              onClick={handleClose}
            >
              Đóng
            </Button>
            <Button
              className={classNames("", {
                "btn-pr": isComplete,
                "btn-sub": !isComplete,
              })}
              onClick={() => onSubmitExam()}
            >
              Nộp bài
            </Button>
          </>
        ) : (
          <>
            <Button
              className={classNames("", {
                "btn-pr": isComplete,
                "btn-sub": !isComplete,
              })}
              onClick={() => onSubmitExam()}
            >
              Nộp bài
            </Button>
            <Button
              className={classNames("", {
                "btn-sub": isComplete,
                "border-0 btn-pr": !isComplete,
              })}
              onClick={handleClose}
            >
              Đóng
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 7px;
  /* color: white; */
`;
