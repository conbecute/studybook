import React, { useState } from "react";

import { IMAGE_DEFAULT } from "../../constants/general";
import { RELEASE_BOOK_IDS } from "../../constants/type";

import { urlImages } from "../../constants/urlApi";
import { Tooltip } from "reactstrap";

const ImageComponent = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div className={`${props.classImage} ? ${props.classImage} : '' `}>
      <img src={props.src ? urlImages + props.src : IMAGE_DEFAULT} alt="#" />
      {RELEASE_BOOK_IDS.includes(props.bookId) && (
        <>
          <i
            id={"Tooltip-" + props.bookId}
            style={{
              position: "absolute",
              top: `10px`,
              right: `10px`,
              zIndex: "499",
              backgroundColor: `#ee202e`,
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
            className={`fa-pencil-square-o fa cursor monkey-color-white monkey-fz-18`}
            aria-hidden="true"
          />

          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={"Tooltip-" + props.bookId}
            toggle={toggle}
            style={{ fontSize: "13px" }}
          >
            Đã cập nhật bài tập tương tác
          </Tooltip>
        </>
      )}
    </div>
  );
};
export default ImageComponent;
