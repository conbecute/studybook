/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "./fabrictool";

const fabric = require("fabric").fabric;

class IsoPartOfScreen extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    this._canvas.defaultCursor = "crosshair";
    canvas.forEachObject((o) => (o.selectable = o.evented = false));
    this._width = props.lineWidth;
    this._fill = props.fillColor;
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    canvas.remove(this.groupHide);
    this.isDown = true;
    let pointer = canvas.getPointer(o.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.rect = new fabric.Rect({
      left: this.startX,
      top: this.startY,
      originX: "left",
      originY: "top",
      width: pointer.x - this.startX,
      height: pointer.y - this.startY,
      stroke: "#606060",
      strokeWidth: this._width,
      fill: this.fill,
      transparentCorners: false,
      selectable: false,
      evented: false,
      strokeUniform: true,
      noScaleCache: false,
      angle: 0,
    });
    canvas.add(this.rect);
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);
    if (this.startX > pointer.x) {
      this.rect.set({ left: Math.abs(pointer.x) });
    }
    if (this.startY > pointer.y) {
      this.rect.set({ top: Math.abs(pointer.y) });
    }
    this.rect.set({ width: Math.abs(this.startX - pointer.x) });
    this.rect.set({ height: Math.abs(this.startY - pointer.y) });
    this.rect.setCoords();
    canvas.renderAll();
  }

  doMouseUp(o) {
    this.isDown = false;
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);
    const startX = this.startX < pointer.x ? this.startX : pointer.x;
    const startY = this.startY < pointer.y ? this.startY : pointer.y;
    const endX = this.startX < pointer.x ? pointer.x : this.startX;
    const endY = this.startY < pointer.y ? pointer.y : this.startY;
    this.above = new fabric.Rect({
      top: 0,
      left: 0,
      width: canvas.getWidth(),
      height: startY,
      fill: "#606060",
      stroke: "#606060",
      strokeWidth: this._width,
    });
    this.left = new fabric.Rect({
      top: startY,
      left: 0,
      width: startX,
      height: endY - startY,
      fill: "#606060",
      stroke: "#606060",
      strokeWidth: this._width,
    });
    this.right = new fabric.Rect({
      top: startY,
      left: endX,
      width: canvas.getWidth() - endX,
      height: endY - startY,
      fill: "#606060",
      stroke: "#606060",
      strokeWidth: this._width,
    });
    this.bottom = new fabric.Rect({
      top: endY,
      left: 0,
      width: canvas.getWidth(),
      height: canvas.getHeight() - endY,
      fill: "#606060",
      stroke: "#606060",
      strokeWidth: this._width,
    });
    this.groupHide = new fabric.Group(
      [this.above, this.left, this.right, this.bottom],
      {
        selectable: false,
        evented: false,
      }
    );
    canvas.remove(this.rect);
    canvas.add(this.groupHide);
  }
}

export default IsoPartOfScreen;
