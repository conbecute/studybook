import React, { Fragment } from "react";
import TitleComponent from "../../../components/title";
import TextContentComponent from "../../../components/TextContent";
import { isMobile } from "react-device-detect";
import { COLOR_BLUE_2 } from "../../../constants/type";
export const SectionInfoItem = ({ data, number, index }) => {
  return (
    <div className="mb-3">
      {index === 0 && (
        <div
          style={{
            width: "70px",
            height: "4px",
            backgroundColor: COLOR_BLUE_2,
            margin: "20px auto 60px",
            borderRadius: "15px",
          }}
        ></div>
      )}

      <div className="row">
        {!isMobile && number % 2 != 0 && (
          <div className="col-md-5">
            <img style={{ width: "100%" }} src={data.src} alt="#" />
          </div>
        )}
        <div className="col-md-7 d-flex align-items-center">
          <div className={`${isMobile ? "mb-4" : ""}`}>
            <TitleComponent
              title={data.title}
              className="text-left monkey-color-violet text-uppercase monkey-fz-34 mb-2"
            />
            <TextContentComponent
              content={data.content}
              className="text-left line-height-1-5"
            />
          </div>
        </div>
        {isMobile && (
          <div className="col-md-5">
            <img
              style={{ width: "100%" }}
              className="mb-5"
              src={data.src}
              alt="#"
            />
          </div>
        )}
        {!isMobile && number % 2 == 0 && (
          <div className="col-md-5">
            <img style={{ width: "100%" }} src={data.src} alt="#" />
          </div>
        )}
      </div>
    </div>
  );
};
export default SectionInfoItem;
