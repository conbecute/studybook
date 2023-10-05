import React from "react";

const Slide = ({ slide, index, onChangeSlide, activeIndexSlide }) => {
  return (
    <div
      className="row slide-page"
      style={{
        backgroundColor:
          activeIndexSlide === slide.index
            ? "rgba(0, 102, 178, 0.1)"
            : "transparent",
      }}
    >
      <label>{index + 1}</label>
      <img
        onClick={() => onChangeSlide(slide.index)}
        width="70%"
        src={`${process.env.REACT_APP_MEDIA_URL_APP}${slide.background}`}
        alt=""
      />
    </div>
  );
};

export default Slide;
