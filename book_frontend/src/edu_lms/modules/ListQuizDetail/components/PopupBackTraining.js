import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import danger_img from "edu_lms_v2/assets/img/img-error.svg";
import styled from "styled-components";
import * as PATH from "edu_lms/constants/path";

export default function PopupBackTraining({
  show,
  setShow,
  onHide,
  submitted,
}) {
  const history = useHistory();
  const handleClose = () => {
    setShow(false);
  };

  const onBackPage = () => {
    history.push(PATH.ROUTE_PATH_V3_TRAINING);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={true}
      className="monkey-color-black"
    >
      <Modal.Header closeButton className="border-0">
        <p className="h3 w-100 text-center">Chú ý</p>
      </Modal.Header>
      <Modal.Body className="border-0 text-center p-0">
        <div className="d-flex justify-content-center mb-3">
          <img src={danger_img} alt="danger" />
        </div>
        <p className="monkey-fz-18 mb-3">
          Thầy cô chưa hoàn thành bài kiểm tra tập huấn, thầy cô có chắc chắn
          muốn thoát không?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        <a href={`${PATH.ROUTE_PATH_V3_TRAINING}#ketqua`}>
          <Button className="btn-sub" onClick={onBackPage}>
            Thoát
          </Button>
        </a>
        <Button className="btn-pr" onClick={handleClose}>
          Tiếp tục làm
        </Button>
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
