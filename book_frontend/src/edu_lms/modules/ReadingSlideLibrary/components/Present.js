import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import styled from "styled-components";
import { URL_IMAGE } from "../../../constants/type";
import "./style.css";

const ImgWrapper = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex !important;
  justify-content: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Icon = styled.i`
  font-size: 35px;
  color: #6dcff6;
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
  background: transparent;
  border: none;
`;

export default function Present(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: props.activeIndexSlide - 1,
  };

  return (
    <Modal {...props} dialogClassName="present-modal">
      <Modal.Body className="modal-body-report-error">
        <Button onClick={() => props.handleClose()}>
          <Icon className="fa fa-times-circle-o" aria-hidden="true"></Icon>
        </Button>
        <Slider {...settings}>
          {props.dataSlide.map((slide, index) => (
            <ImgWrapper>
              <Image
                key={index}
                src={`${process.env.REACT_APP_MEDIA_URL_APP}${slide.background}`}
                alt=""
              />
            </ImgWrapper>
          ))}
        </Slider>
      </Modal.Body>
    </Modal>
  );
}
