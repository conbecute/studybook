import { Modal } from "react-bootstrap";
import firework from "edu_lms/assets/images/fireworks.png";
import { setEventGTM } from "edu_lms/constants/googleTagManager";
import { HOC10_CONGRATS_SCREEN } from "edu_lms/constants/eventNameGTM";
import { useEffect } from "react";

export default function PopupShowResult({
  show,
  handleClose,
  handleReplay,
  resultQuestion,
  handleShowDetailResult,
}) {
  useEffect(() => {
    if (show) {
      localStorage.setItem('timeStartEventCongrats', Math.round(Date.now() / 1000))
    } else {
      const timeStart = localStorage.getItem('timeStartEventCongrats');
      const data = {
        event: HOC10_CONGRATS_SCREEN,
        time_on_screen: Math.round(Date.now() / 1000) - timeStart
      }
  
      setEventGTM(data);
    }
  }, [show])
  
  return (
    <Modal show={show} onHide={handleClose} centered animation="true" size="md">
      <Modal.Header className="border-0 pb-0" closeButton>
        <p className="w-100 text-center monkey-fz-20 monkey-f-header pl-4">
          Chúc mừng bạn đã hoàn thành!
        </p>
      </Modal.Header>
      <Modal.Body className="border-0 text-center p-0">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <img src={firework} alt="icon" className="mt-4" />
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
          <p className="monkey-fz-24 mt-4 font-weight-bold">
            {/* Kết quả: <span className="pl-2 monkey-f-header monkey-color-orange">{resultQuestion}</span> */}
          </p>
        </div>
        <div className="my-3">
          <button className="btn-sub py-2 px-4" onClick={handleShowDetailResult}>
            Xem kết quả
          </button>
          <button
            onClick={handleReplay}
            type="submit"
            className="btn-pr py-2 px-5 ml-3"
          >
            Làm lại
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
