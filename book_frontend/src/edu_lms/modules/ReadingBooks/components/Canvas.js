import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import {
  INNER_WIDTH,
  COLOR_GREEN,
  TYPE_OBJECTS,
  TYPE_REFERENCE,
} from "../../../constants/type";
import "./style.css";

const Canvas = ({
  data,
  isShowStationPoint,
  idName,
  onQuestionGame,
  pageId,
  scaleBook,
}) => {
  const [positionData, setStatePositionData] = useState([]);

  useEffect(() => {
    const canvas = new fabric.Canvas(idName, {
      height: window.innerHeight,
      width: window.innerWidth,
    });
    let positionDataIcon = [];
    if (data.length > 0) {
      data.forEach((item) => {
        if (item.status) {
          const rect = new fabric.Polygon(JSON.parse(item.touch_vector), {
            stroke: "transparent",
            fill: "transparent",
            selectable: false,
            hoverCursor: "pointer",
            id: item.id,
            typeObject: item.type,
          });

          const toucheVector = JSON.parse(item.touch_vector);

          positionDataIcon.push({
            top: toucheVector[1].y,
            left: toucheVector[1].x,
          });

          canvas.add(rect);
          canvas.renderAll();
        }

        canvas.setZoom(scaleBook);
      });

      canvas.on("mouse:over", (e) => {
        if (e.target) {
          e.target.set("fill", "rgba(102, 217, 255, 0.2)");
          canvas.renderAll();
        }
      });

      canvas.on("mouse:out", (e) => {
        if (e.target) {
          e.target.set("fill", "transparent");
          canvas.renderAll();
        }
      });

      canvas.on("mouse:down", (e) => {
        if (e.target && e.button === 1) {
          onQuestionGame(e.target.get("id"), {
            objectType: e.target.get("typeObject"),
            pageId,
          });
        }
      });

      let positionData = [];

      if (canvas.getObjects().length > 0) {
        canvas.getObjects().forEach((item, i) => {
          const data = {
            left: positionDataIcon[i].left,
            top: positionDataIcon[i].top,
            type: item.id,
            width: item.width,
            typeObject: item.typeObject,
          };
          positionData = [...positionData, data];
        });
      }
      setStatePositionData(positionData);
    }

    return () => {
      canvas.dispose();
    };
  }, [data, idName, onQuestionGame, pageId, scaleBook]);

  return (
    <>
      <div id="icon-action">
        {isShowStationPoint &&
          positionData.length > 0 &&
          positionData.map((item, index) => {
            return (
              <div key={index}>
                {item.typeObject != TYPE_REFERENCE && (
                  <i
                    style={{
                      position: "absolute",
                      top: `${item.top * scaleBook + 5}px`,
                      left: `${item.left * scaleBook - 25}px`,

                      zIndex: "9999",
                      backgroundColor: `${
                        TYPE_OBJECTS.filter(
                          (ele) => ele.type === item.typeObject
                        )[0]
                          ? COLOR_GREEN
                          : ""
                      }`,
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      onQuestionGame(item.type, {
                        objectType: item.typeObject,
                        pageId,
                      });
                    }}
                    className={`${
                      TYPE_OBJECTS.filter(
                        (ele) => ele.type === item.typeObject
                      )[0]?.icon
                    } fa cursor monkey-color-white monkey-fz-12`}
                    aria-hidden="true"
                  />
                )}

                {item.typeObject == TYPE_REFERENCE && (
                  <button
                    onClick={(e) => {
                      onQuestionGame(item.type, {
                        objectType: item.typeObject,
                        pageId,
                      });
                    }}
                    style={{
                      position: "absolute",
                      top: `${item.top * onResultNumberTop() + 5}px`,
                      left: `${item.left * onResultNumberTop() - 145}px`,
                      zIndex: "9999",
                      width: "140px",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                    className="btn button-bg-reference monkey-fz-12 monkey-border-blue button-color-reference pt-2 pb-2 pl-0 pr-0"
                  >
                    <i className="fa fa-link pr-2" />
                    Link tham khảo
                  </button>
                )}
              </div>
            );
          })}
      </div>
      <canvas id={idName} />
    </>
  );
};

export default Canvas;

function onResultNumberTop() {
  let result = 1.0809996;
  if (window.innerWidth <= INNER_WIDTH.DESKTOP) {
    result = 0.93666;
  }
  if (window.innerWidth <= INNER_WIDTH.LAPTOP) {
    result = 0.83666;
  }
  if (window.innerWidth <= INNER_WIDTH.IPAD) {
    result = 0.8709;
  }
  if (window.innerWidth <= INNER_WIDTH.MOBILE) {
    result = 0.64069;
  }
  return result;
}
