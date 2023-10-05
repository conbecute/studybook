import React from "react";
import TextComponent from "edu_lms/components/TextComponent";
import {
  DRAW_LINE,
  EQUATION,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";
import { formatText } from "../constant";

export default function DrawRegion({ question }) {
  return (
    <div>
      <p className="pt-3">
        <span className=" font-weight-bold pr-3">Bước 1</span> (Vẽ đường thẳng
        bằng cách kéo thả hai điểm)
      </p>
      <div className="mb-3">
        {question[0].coefficient.map((item, index) => (
          <div key={index} className="d-flex position-relative">
            <h4 className="pl-3 pt-2 position-relative">
              {DRAW_LINE}
              {question[0]?.coefficient?.length !== EQUATION ? (
                <>
                  <span className="position-absolute">{index + 1}</span>
                  &nbsp;&nbsp;:
                </>
              ) : (
                ":"
              )}
            </h4>
            <div className="question-equation">
              <TextComponent data={formatText(item)} />
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
