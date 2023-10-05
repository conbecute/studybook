import React from "react";
import { Modal } from "react-bootstrap";

export default function FromReference(props) {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton className="header-bg-reference">
          <Modal.Title
            className="monkey-color-violet modal-title quicksand-bold w-100 text-center pl-3"
            style={{
              fontSize: `${
                props?.data?.font_size ? props?.data?.font_size : 20
              }px`,
            }}
          >
            <span>{props.data.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-0 pr-0 pt-1 pb-1">
          {props?.data?.data?.map((item, index) => (
            <div className="form-group form-check border-2 pt-3 pb-3 d-flex align-items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(item?.link, "_blank");
                }}
                className="btn button-link-reference pr-3 pl-3"
                style={{
                  fontSize: `${
                    props?.data?.font_size ? props?.data?.font_size : 18
                  }px`,
                }}
              >
                Link
              </button>
              <label
                className="form-check-label quicksand-medium pl-3"
                style={{
                  fontSize: `${
                    props?.data?.font_size ? props?.data?.font_size : 18
                  }px`,
                }}
              >
                {item?.title}
              </label>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
