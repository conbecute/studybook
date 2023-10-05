/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "./fabrictool";

const fabric = require("fabric").fabric;

class Text extends FabricCanvasTool {
  configureCanvas() {
    this._canvas.isDrawingMode = this._canvas.selection = false;
    this._canvas.defaultCursor = "text";
  }
}

export default Text;
