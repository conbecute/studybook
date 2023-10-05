import React, { Fragment } from "react";
import SectionInfoItem from "./SectionInfoItem";

export const SectionInfo = (props) => {
  return (
    <div className="section_info_wrapper">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            {props.data.map((item, index) => {
              return (
                <SectionInfoItem
                  key={index}
                  index={index}
                  number={index + 1}
                  data={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionInfo;
