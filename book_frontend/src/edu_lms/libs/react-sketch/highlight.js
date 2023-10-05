import colorString from "color-string";
import FabricCanvasTool from "./fabrictool";

class Highlight extends FabricCanvasTool {
  configureCanvas(props) {
    this._canvas.isDrawingMode = true;
    this._canvas.freeDrawingBrush.width = 20;

    const rgbArray = colorString.get.rgb(props.lineColor);
    if (rgbArray) {
      rgbArray[3] = 0.5;
      const rgbColor = colorString.to.rgb(rgbArray);
      this._canvas.freeDrawingBrush.color = rgbColor;
    } else {
      this._canvas.freeDrawingBrush.color = props.lineColor;
    }
  }
}

export default Highlight;
