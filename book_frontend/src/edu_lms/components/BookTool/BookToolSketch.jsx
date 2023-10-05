import React, { useRef, useState } from "react";
import { SketchField, Tools } from "../../libs/react-sketch";
import TextInputModal from "./TextInputModal";

const BookToolSketch = ({ bookTool, saveCanvasObjects, draw }) => {
  const sketchEl = useRef(null);
  const [fontSize, setFontSize] = useState(18);
  const [showTextInputModal, setShowTextInputModal] = useState(false);
  const [textPosition, setTextPosition] = useState({
    left: 0,
    top: 0,
  });

  const handleClose = () => setShowTextInputModal(false);
  const handleShow = () => setShowTextInputModal(true);

  const objects = draw && draw.data ? JSON.parse(draw.data) : [];

  const saveObjects = (_objects) => {
    const objects = _objects || sketchEl.current._fc?.getObjects();
    saveCanvasObjects(objects);
  };

  const addText = (text) => {
    if (text) {
      sketchEl.current?.addText(text, {
        left: textPosition.left - 10,
        top: textPosition.top - 10,
        fontSize,
        fill: bookTool.lineColor,
      });
      saveObjects();
    }
  };

  const addLink = (link) => {
    if (link) {
      sketchEl.current?.addLink(link, {
        left: textPosition.left - 10,
        top: textPosition.top - 10,
        fontSize,
        link,
      });
      saveObjects();
    }
  };

  return (
    <div
      className="position-absolute w-100 h-100"
      style={{ pointerEvents: bookTool.drawType === Tools.None && "none" }}
    >
      <SketchField
        ref={sketchEl}
        width="100%"
        height="100%"
        tool={bookTool.drawType || Tools.Pencil}
        lineColor={bookTool.lineColor}
        lineWidth={bookTool.lineWidth}
        defaultValue={{ objects }}
        cursor="crosshair"
        onMouseUp={(e) => {
          if (
            [
              Tools.Pencil,
              Tools.Highlight,
              Tools.Line,
              Tools.Rectangle,
              Tools.Circle,
              Tools.HideOfPart,
              Tools.IsoPartOfScreen,
            ].includes(bookTool.drawType)
          ) {
            saveObjects();
          }
          if ([Tools.Text, Tools.Link].includes(bookTool.drawType)) {
            setTextPosition({
              left: e.pointer?.x,
              top: e.pointer?.y,
            });
            if (!e.target?.text) handleShow();
          }
          if (bookTool.drawType === Tools.EraserAll) {
            saveObjects([]);
          }
          if (e.target?.text && e.target?.text.indexOf("http") !== -1) {
            window.open(e.target?.text, "_blank");
          }
        }}
        onObjectRemoved={() => {
          saveObjects();
        }}
      />
      {showTextInputModal && (
        <TextInputModal
          show={showTextInputModal}
          onHide={handleClose}
          onSubmit={bookTool.drawType === Tools.Link ? addLink : addText}
          setFontSize={setFontSize}
        />
      )}
    </div>
  );
};

export default BookToolSketch;
