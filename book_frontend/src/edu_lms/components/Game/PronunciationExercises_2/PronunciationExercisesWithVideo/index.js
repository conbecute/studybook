import React, { Fragment, useRef } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { URL_VIDEO } from "../../../../constants/type";
import styled from "styled-components";

const PronunciationExercisesWithVideo = ({ data }) => {
  const sliderRef = useRef();
  const settings = {
    centerMode: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <WrapperVideo>
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => (
          <ReactPlayer
            width="100%"
            height="100%"
            key={index}
            pip={true}
            controls={true}
            url={`${URL_VIDEO}${item.path}`}
          />
        ))}
      </Slider>
    </WrapperVideo>
  );
};

export default PronunciationExercisesWithVideo;

const WrapperVideo = styled.div`
  margin-top: 10px;
  .slick-next {
    display: block;
    position: absolute;
    right: 10px;
  }
  .slick-prev {
    left: 10px;
  }
  video {
    margin: 0 auto;
    max-height: 90vh;
  }

  @media only screen and (max-height: 767px) {
    width: 100% !important;
    .slick-slider.slick-initialized {
      margin: 0 auto;
    }
    video {
      max-height: 70vh;
    }
  }
`;
