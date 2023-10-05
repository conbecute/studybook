import React, { useContext } from "react";
import { useAccordionToggle, AccordionContext } from "react-bootstrap";
import * as TYPE from "../../../constants/type";

const AccordionToggle = ({
  eventKey,
  callback,
  value,
  icon,
  data,
  onAccordionToggle,
}) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    onAccordionToggle(data);
    return callback && callback(eventKey);
  });

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <span
      style={{
        backgroundColor: isCurrentEventKey ? TYPE.COLOR_GREEN : "lavender",
        color: isCurrentEventKey ? TYPE.COLOR_WHITE : TYPE.COLOR_BLACK,
      }}
      onClick={decoratedOnClick}
      className="w-100 cursor pt-2 pb-2 pr-3 pl-3 text-left rounded-0 hvr-registration monkey-color-black d-flex justify-content-between align-items-center"
    >
      <span>
        <i className={`${icon} fa  monkey-fz-20 mr-3`} aria-hidden="true"></i>{" "}
        {value}
      </span>
      <i
        className={`${
          isCurrentEventKey ? "fa-rotate-90" : ""
        } fa fa-angle-right`}
        aria-hidden="true"
      ></i>
    </span>
  );
};
export default AccordionToggle;
