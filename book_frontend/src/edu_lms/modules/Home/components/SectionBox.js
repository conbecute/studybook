import { Fragment } from "react";
import SectionBoxItem from "./SectionBoxItem";
import * as PATH from "../../../constants/background";

export const SectionBox = (props) => {
  return (
    <div className="section_box_wrapper position-relative">
      <img
        className="w-100"
        style={{ position: "absolute", bottom: "-26%" }}
        src={PATH.BACKGROUND_HOME_1}
        alt="#"
      />
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            {props.data.map((item, index) => {
              return <SectionBoxItem key={index} index={index} data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionBox;
