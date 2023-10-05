import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Present from "./Present";
import Slide from "./Slide";
import "./style.css";

const ReadingSlideLibraryWrapper = ({ dataSlide, title, url, slideId }) => {
  const [activeSlide, setStateActiveSlide] = useState([
    {
      image: dataSlide[0]?.background,
    },
  ]);
  const [activeIndexSlide, setStateActiveIndexSlide] = useState(1);
  const [showPresentModal, setStateShowPresentModal] = useState(false);

  useEffect(() => {
    setStateActiveSlide([
      {
        image: dataSlide[0]?.background,
      },
    ]);
  }, [dataSlide]);

  const onChangeSlide = (index) => {
    setStateActiveSlide([
      {
        image: dataSlide[index - 1]?.background,
      },
    ]);
    setStateActiveIndexSlide(index);
  };

  const onShowPopupShare = () => {};

  const onShowPopupPresent = () => {
    setStateShowPresentModal(true);
  };
  const handleClose = () => {
    setStateShowPresentModal(false);
  };

  return (
    <div>
      <Header
        slideId={slideId}
        url={url}
        title={title}
        onShowPopupShare={onShowPopupShare}
        onShowPopupPresent={onShowPopupPresent}
      />
      {showPresentModal && (
        <Present
          show={showPresentModal}
          activeIndexSlide={activeIndexSlide}
          onHide={handleClose}
          dataSlide={dataSlide}
          handleClose={handleClose}
        />
      )}
      <div className="container-fluid wrapper-slide">
        <div className="row">
          <div className="col-md-3 slide-left">
            {dataSlide.map((slide, index) => (
              <Slide
                key={index}
                slide={slide}
                index={index}
                onChangeSlide={onChangeSlide}
                activeIndexSlide={activeIndexSlide}
              />
            ))}
          </div>

          <div className="col-md-9 slide-right">
            <Detail activeSlide={activeSlide} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReadingSlideLibraryWrapper;
