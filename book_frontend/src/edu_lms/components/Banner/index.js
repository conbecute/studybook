import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTogglePopupSuccess,
  onDispatchTypePopup,
} from "../../modules/App/actions";
import { TYPE_POPUP_ACTIVE_BOOK } from "../../constants/type";
import * as TEXT from "../../constants/text";
import TitleComponent from "../title";
import { Link, useHistory } from "react-router-dom";
import * as PATH from "../../constants/path";

const BannerWrapper = styled.div`
  background-image: url(${(props) => props.url});
  width: 100%;
  min-height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 58px;
  position: relative;
`;

export const BannerComponent = ({
  path_home,
  src,
  url,
  valueButton,
  pathUrl,
  onDispatchShowPopupActivateBook,
  onDispatchTogglePopupSuccess,
  values = [],
  description,
  styleUI,
  disableButton,
  onDispatchTypePopup,
  styleContentMobile = true,
  onlyBanner = false,
}) => {
  const history = useHistory();
  const onToTheBookGage = () => {
    const access_token = localStorage.getItem("token");
    if (pathUrl) {
      history.push(pathUrl);
    } else {
      if (access_token) {
        onDispatchShowPopupActivateBook(true);
        onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
      } else {
        const dataSuccess = {
          status: true,
          title: [TEXT.TITLE_POPUP_NOTIFICATION],
          url: PATH.ROUTE_PATH_SIGN_IN,
          labelButton: TEXT.TITLE_SIGN_IN,
          icon: "fa-exclamation",
          close: true,
        };
        onDispatchTogglePopupSuccess(dataSuccess);
      }
    }
  };

  return (
    <BannerWrapper url={url}>
      {!onlyBanner && (
        <div className="container-fluid container-lg">
          <div className="row ">
            {path_home && (
              <div className="col-md-5 col-12 d-none d-md-block d-lg-block d-xl-block">
                <div
                  className={`${
                    styleContentMobile ? "banner-content-mobile" : ""
                  } image_banner_home text-center pt-4 pb-4`}
                >
                  <img src={src} alt="#" className="w-100" />
                </div>
              </div>
            )}
            <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
              <div className="pt-4 pb-4">
                {values.map((item, index) => (
                  <TitleComponent
                    title={item}
                    key={index}
                    className={`${
                      styleUI ? "monkey-color-violet" : "monkey-color-white"
                    } monkey-f-header text-center monkey-fz-40 text-uppercase`}
                  />
                ))}
                {!description && (
                  <p className="text-center monkey-mt-30 monkey-mb-15">
                    {!disableButton && (
                      <Link
                        className={`${
                          styleUI
                            ? "monkey-bg-violet monkey-color-white hvr-registration-white"
                            : "monkey-bg-white monkey-color-violet hvr-registration-br-white"
                        } btn  rounded-pill p-2 monkey-f-bold text-uppercase pr-3 pl-3`}
                        to={PATH.ROUTE_PATH_GENERAL}
                      >
                        Xem ngay
                      </Link>
                    )}
                  </p>
                )}

                {description && (
                  <div className="text-center monkey-color-violet monkey-mt-40 monkey-fz-28">
                    {description}
                  </div>
                )}
              </div>
            </div>
            {path_home && (
              <div
                className={`${
                  styleContentMobile ? "banner-content-mobile" : ""
                } col-md-5 col-12 d-block d-md-none d-lg-none d-xl-none`}
              >
                <div className="image_banner_home text-center pb-4">
                  <img src={src} alt="#" className="w-100" />
                </div>
              </div>
            )}
            {!path_home && (
              <div className={`${styleUI ? "col-md-4" : "col-md-5"} col-12`}>
                <div className="image_banner_home text-center pt-4 pb-4">
                  <img src={src} alt="#" className="w-100" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BannerWrapper>
  );
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupActivateBook,
      onDispatchTogglePopupSuccess,
      onDispatchTypePopup,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(BannerComponent);
