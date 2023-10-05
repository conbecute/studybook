import styled from "styled-components";
import { Link } from "react-router-dom";
import * as TEXT from "../../../constants/text";
import TitleComponent from "../../../components/title";
import { isMobile } from "react-device-detect";
import backgroundSelection from "../../../assets/images/banner-selection-home-02.png";
import backgroundSelectionMobile from "../../../assets/images/banner-selection-home-mobile-01.svg";

import imgSelection from "../../../assets/images/img-banner-selection-01.png";
import * as PATH from "../../../constants/path";

const SectionBannerWrapper = styled.div`
  background-image: url(${(props) => props.url});
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 0;
  background-position: center;
  min-height: 400px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
`;

const SectionBanner = (props) => {
  return (
    <SectionBannerWrapper
      url={isMobile ? backgroundSelectionMobile : backgroundSelection}
    >
      <div className="container-fluid container-xl">
        <div className="row">
          {isMobile && (
            <div className="col-12">
              <img className="w-100" src={imgSelection} alt="#" />
            </div>
          )}

          <div className="col-12 col-md-12 col-lg-5">
            <div className="text-center">
              <TitleComponent
                className="monkey-color-violet monkey-f-header  text-uppercase monkey-fz-40 mb-2"
                title={TEXT.TITLE_SECTION_BANNER_1}
              />
              <TitleComponent
                className="monkey-color-violet monkey-f-header text-uppercase monkey-fz-40 mb-4"
                title={TEXT.TITLE_SECTION_BANNER_4}
              />

              <div className="mt-5">
                <Link
                  to={PATH.ROUTE_PATH_SIGN_UP}
                  style={{ width: "140px" }}
                  className="btn monkey-bg-violet monkey-color-white hvr-registration-bc-violet rounded-pill mr-3 monkey-f-bold  text-uppercase"
                >
                  {TEXT.TITLE_SIGN_OUT}
                </Link>
                <Link
                  style={{ width: "140px" }}
                  to={PATH.ROUTE_PATH_SIGN_IN}
                  className="btn monkey-bc-violet hvr-registration-white monkey-color-violet rounded-pill monkey-f-bold text-uppercase"
                >
                  {TEXT.TITLE_SIGN_IN}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionBannerWrapper>
  );
};
export default SectionBanner;
