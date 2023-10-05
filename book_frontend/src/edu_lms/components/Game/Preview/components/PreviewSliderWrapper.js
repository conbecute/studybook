import React, { useRef } from "react";
import Slider from "react-slick";

import CardNotFlip from "./CardNotFlip";
import CardFlip from "./CardFlip";

const PreviewSliderWrapper = ({
  data,
  iconList,
  typeGame,
  typeQuestion,
  typeAnswer,
  typeButton,
  fontSizeQuestion,
  fontSizeAnswer,
}) => {
  const sliderRef = useRef();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="preview-slider-wrapper quicksand-medium">
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => {
          if (typeGame === 2) {
            return (
              <CardFlip
                data={item}
                key={index}
                index={index + 1}
                iconList={iconList}
                typeQuestion={typeQuestion}
                typeAnswer={typeAnswer}
                fontSizeQuestion={fontSizeQuestion}
                fontSizeAnswer={fontSizeAnswer}
              />
            );
          } else {
            return (
              <CardNotFlip
                data={item}
                key={index}
                index={index + 1}
                iconList={iconList}
                typeQuestion={typeQuestion}
                typeAnswer={typeAnswer}
                typeButton={typeButton}
              />
            );
          }
        })}
      </Slider>
    </div>
  );
};
export default PreviewSliderWrapper;
