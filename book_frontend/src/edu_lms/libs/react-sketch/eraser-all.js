/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "./fabrictool";

class EraserAll extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = false;
    this._canvas.defaultCursor = "pointer";
    canvas.selection = false;
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    this.isDown = true;
    let objects = canvas.getObjects();
    if (objects) {
      objects.forEach((obj) => {
        obj.__removed = true;
        let objState = obj.toJSON();
        obj.__originalState = objState;
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  doMouseUp(o) {
    this.isDown = false;
  }
}

export default EraserAll;
