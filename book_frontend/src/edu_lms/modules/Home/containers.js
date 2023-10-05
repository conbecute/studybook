import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Slider from "react-slick";

import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import BannerComponent from "../../components/Banner";
import HomeWrapper from "./components/index";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";

const settingSlider = {
  dots: true,
  autoplay: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
  touchMove: true,
  arrows: false,
  className: "slider-banner-home",
  dotsClass: "slick-thumb slick-dots dot-banner-home",
};

export class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isToken = localStorage.getItem("token") ? true : false;
    return (
      <Fragment>
        <Slider {...settingSlider}>
          <BannerComponent
            pathUrl={
              isToken ? PATH.ROUTE_PATH_TRAINING_TEST : PATH.ROUTE_PATH_SIGN_IN
            }
            valueButton={
              isToken
                ? TEXT.LABEL_BUTTON_BANNER_HOME_2
                : TEXT.LABEL_BUTTON_BANNER_HOME_1
            }
            styleUI={true}
            path_home={true}
            src={LINK.IMAGE_BANNER_HOME}
            url={LINK.BACKGROUND_BANNER_RELEASE}
            values={[TEXT.TITLE_BANNER_HOME_1_1, TEXT.TITLE_BANNER_HOME_2_1]}
            onlyBanner={true}
          />
          <BannerComponent
            pathUrl={
              isToken ? PATH.ROUTE_PATH_TRAINING_TEST : PATH.ROUTE_PATH_SIGN_IN
            }
            valueButton={
              isToken
                ? TEXT.LABEL_BUTTON_BANNER_HOME_2
                : TEXT.LABEL_BUTTON_BANNER_HOME_1
            }
            styleUI={true}
            path_home={true}
            src={LINK.IMAGE_BANNER_HOME}
            url={LINK.BACKGROUND_BANNER_HOME}
            values={[TEXT.TITLE_BANNER_HOME_1_1, TEXT.TITLE_BANNER_HOME_2_1]}
          />
          <BannerComponent
            src={LINK.IMAGE_BANNER_HOME_1}
            url={LINK.BACKGROUND_BANNER_HOME_1}
            path_home={true}
            values={[TEXT.TITLE_BANNER_HOME_3, TEXT.TITLE_BANNER_HOME_4]}
            styleContentMobile={false}
          />
        </Slider>
        <HomeWrapper />
      </Fragment>
    );
  }
}

export default connect(null, null)(HomeContainer);
