export const settingSlider = {
  dots: false,
  autoplay: true,
  infinite: false,
  touchMove: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
        slidesToScroll: 1,
      },
    },
  ],
};
