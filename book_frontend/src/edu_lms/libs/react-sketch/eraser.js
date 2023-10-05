/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "./fabrictool";

class Eraser extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = false;
    this._canvas.defaultCursor = "pointer";
    canvas.selection = false;
    canvas.forEachObject((o) => {
      o.selectable = o.evented = true;
    });
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    this.isDown = true;
    let activeObj = canvas.getActiveObject();
    if (activeObj) {
      canvas.remove(activeObj);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  doMouseUp(o) {
    this.isDown = false;
  }
}

export default Eraser;
