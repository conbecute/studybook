import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import * as TEXT from "../../constants/text";
import { FONTSIZES } from "../../constants/type";

export default function TextInputModal(props) {
  const inputEl = useRef();
  const [text, setText] = useState("");

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const handleSubmit = () => {
    props.onSubmit(text);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{ fontSize: 16, marginTop: 16, width: "50%" }}
          id="contained-modal-title-vcenter"
        >
          {TEXT.TITLE_POPUP_TOOL_ENTER_TEXT}
        </Modal.Title>
        <div style={{ margin: 10 }}>
          <span className="d-flex align-items-center" style={{ fontSize: 16 }}>
            FontSize:
            <div className="ml-3" style={{ width: 80 }}>
              <Select
                defaultValue={FONTSIZES[4]}
                options={FONTSIZES}
                name="number"
                onChange={({ value }) => {
                  props.setFontSize(value);
                }}
              />
            </div>
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="m-1" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              rows={6}
              ref={inputEl}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>{TEXT.TEXT_ADD}</Button>
      </Modal.Footer>
    </Modal>
  );
}
