import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "turn.js";

const Turn = (props) => {
  let refPage = useRef("");
  useEffect(() => {
    if (refPage) {
      $(refPage).turn(Object.assign({}, props.options));
    }
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      if (refPage) {
        $(refPage).turn("destroy").remove();
      }
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [props.options]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      $(refPage).turn("previous");
    }
    if (event.keyCode === 39) {
      $(refPage).turn("next");
    }
  };
  return (
    <div
      className={props.className}
      style={Object.assign({}, props.style)}
      ref={(el) => {
        refPage = el;
      }}
    >
      {props.children}
    </div>
  );
};
export default Turn;
