import { Modal } from "react-bootstrap";
import styled from "styled-components";

export default function PopupConfirmDelete({
  show,
  setShow,
  confirmDelete,
  indexDelete,
}) {
  const handleClose = () => {
    setShow(false);
  };
  const handleConfirm = () => {
    confirmDelete(indexDelete);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="font-weight-bold w-100 text-center">
          <i
            className="fa fa-exclamation-triangle pr-3 monkey-color-orange"
            aria-hidden="true"
          ></i>
          Cảnh báo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Thay đổi của bạn sẽ không được lưu nếu tiếp tục thực hiện hành động này.
        Bạn có muốn tiếp tục không?
      </Modal.Body>
      <Modal.Footer className="justify-content-between px-5">
        <Button onClick={() => handleClose()} className="monkey-color-orange">
          Huỷ
        </Button>
        <Button
          onClick={() => handleConfirm()}
          className="monkey-bg-question monkey-color-white"
        >
          Tiếp tục
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Button = styled.button`
  width: 115px;
  height: 37px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
`;
