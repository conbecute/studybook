import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import { LIST_KEY_CALCULATOR } from './config';

addStyles();

const KeyCalculatorButton = ({ keyCalculator, onClick, backgroundColor }) => {
  return (
    <button
      className="key"
      onClick={() => onClick(keyCalculator.keyValue)}
      style={{
        backgroundColor: keyCalculator.keyValue !== "none" ? backgroundColor : "none",
      }}
    >
      {keyCalculator.picture ? (
        <img
          width={keyCalculator.font || "30px"}
          height={"15px"}
          style={{ marginBottom: "-5px" }}
          src={keyCalculator.picture}
          alt=""
        />
      ) : (
        <StaticMathField style={{fontSize: keyCalculator?.fontSize}}>{keyCalculator.label}</StaticMathField>
      )}
    </button>
  );
};

export default function MathQuillComponent(props) {
  const [latex, setLatex] = useState("");
  const [mathField, setMathField] = useState(null);

  const handleClickKeyCalculator = (str) => {
    if (str === "\\mathbb{N}") {
      str = "\\N"
    }
    if (str === "\\mathbb{C}") {
      str = "\\C"
    }
    if (str === "\\mathbb{Z}") {
      str = "\\Z"
    }
    if (str === "\\mathbb{Q}") {
      str = "\\Q"
    }
    if (str === "\\mathbb{R}") {
      str = "\\R"
    }

    mathField.write(str);
    mathField.focus();
    setLatex(mathField.latex());
  };

  const insertMathQuill = () => {
    props.insertMathQuill(latex);
    setLatex(mathField.latex())
  };

  const onClose = () => {
    setLatex("");
  };

  const setValueLatex = (value) => {
    setLatex(value.replace(/mathbb{N}/g, "N").replace(/mathbb{Q}/g, "Q").replace(/mathbb{Z}/g, "Z").replace(/mathbb{R}/g, "R").replace(/mathbb{C}/g, "C").replace(/not\\subset/g, "nsubset").replace(/not\\supset/g, "nsupset").replace(/not\\subseteq/g, "nsubseteq").replace(/not\\supseteq/g, "nsupseteq"))
  }

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
          className="monkey-color-violet modal-title quicksand-bold"
        >
          <span>Chèn công thức toán học</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="modal-body-report-error"
        style={{ margin: "10px 10px 10px 10px" }}
      >
        <EditableMathField
          latex={latex}
          onChange={(_mathField) => {
            setValueLatex(_mathField.latex());
          }}
          mathquillDidMount={(_mathField) => {
            setMathField(_mathField);
          }}
        />

        <div className="list-math-suggestion">
          <div className="keypad-inner">
            {LIST_KEY_CALCULATOR.map((keyCalculatorArea, areaIdx) => (
              <div key={areaIdx} className={`column ${keyCalculatorArea.colClass}`}>
                {
                  keyCalculatorArea.keys.map((keyCalculator, index) => (
                    <KeyCalculatorButton
                      key={index}
                      keyCalculator={keyCalculator}
                      onClick={handleClickKeyCalculator}
                      backgroundColor={keyCalculatorArea.bgColor}
                    />
                  ))
                }
              </div>
            ))}
          </div>
        </div>
        <div className="footer d-flex justify-content-between">
          <button
            onClick={insertMathQuill}
            type="button"
            className="btn btn-success"
          >
            Thêm
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Huỷ
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
