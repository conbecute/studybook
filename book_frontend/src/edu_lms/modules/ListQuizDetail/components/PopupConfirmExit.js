import { Modal } from "react-bootstrap";
import styles from "../listQuizDetail.module.scss";
import danger_img from "edu_lms_v2/assets/img/img-error.svg";

export default function PopupConfirmExit({ show, onHide, onSubmit }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.modalDialog}
      backdrop="static"
    >
      <Modal.Body className="p-4 text-center">
        <div className="img-wrapper my-3">
          <img src={danger_img} alt="Nội dung" className="d-inline" />
        </div>
        <p className="h4 font-weight-bold">Bạn có muốn thoát bài thi?</p>
        <div className="justify-content-center mt-5 mb-3">
          <button className={`mr-3 ${styles.buttonOrange}`} onClick={onHide}>
            Quay lại
          </button>
          <button
            type="button"
            className={styles.buttonOrange}
            onClick={onSubmit}
          >
            Xác nhận
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
