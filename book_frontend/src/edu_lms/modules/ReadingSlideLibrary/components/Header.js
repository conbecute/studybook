import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "reactstrap";
import * as PATH from "../../../constants/path";
import "react-toastify/dist/ReactToastify.css";
import {
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../../App/actions";
import { INNER_WIDTH, URL_IMAGE } from "../../../constants/type";
import {
  postDownloadSlideLibrary,
  postUpdateSlideLibrary,
} from "../../../services/slide";

const Header = ({
  onShowPopupShare,
  onShowPopupPresent,
  title,
  url,
  slideId,
}) => {
  const [tooltipPresent, setTooltipPresent] = useState(false);
  const togglePresent = () => setTooltipPresent(!tooltipPresent);
  const [tooltipDownload, setTooltipDownload] = useState(false);
  const toggleDownload = () => setTooltipDownload(!tooltipDownload);
  const history = useHistory();
  const [isShowHeader, setStateShowHeader] = useState(true);
  const [isShowButton, setStateShowButton] = useState(false);
  const [showLoadingDownload, setStateShowLoadingDownload] = useState(false);
  const [fullCurrentUrl] = useState(window.location.href);

  useEffect(() => {
    if (window.innerWidth <= INNER_WIDTH.MOBILE) {
      handleLoading();
    }
  }, []);

  const onShowHeader = () => {
    setStateShowHeader(!isShowHeader);
  };
  const handleLoading = () => {
    setTimeout(function () {
      setStateShowHeader(false);
      setStateShowButton(true);
    }, 0);
  };

  const downloadFile = () => {
    setStateShowLoadingDownload(true);
    const data = {
      slideId: slideId,
      typeUpdate: 3,
    };
    postDownloadSlideLibrary(data)
      .then((res) => {
        if (res.data.status === "success") {
          const a = document.createElement("a");
          a.href = res.data.data.url;
          a.download = url.split("/").pop();
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          toast.success("Tải xuống bài giảng thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          postUpdateSlideLibrary(data)
            .then((res) => {})
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setStateShowLoadingDownload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const share = () => {
    const data = {
      slideId: slideId,
      typeUpdate: 2,
    };
    postUpdateSlideLibrary(data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const copyLink = () => {
    const data = {
      slideId: slideId,
      typeUpdate: 4,
    };
    postUpdateSlideLibrary(data)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    toast.success("Copy link thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Fragment>
      <ToastContainer />

      <NavWrapper>
        <Animated
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={isShowHeader}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 102, 178, 0.1)",
              padding: "15px",
            }}
            className="d-flex pl-3 pr-3 pt-1 pb-1 align-items-center justify-content-between"
          >
            <div
              onClick={() => history.push(PATH.ROUTE_PATH_SLIDE_LIBRARY)}
              className="cursor rounded-pill d-flex align-items-center"
            >
              <div>
                <p className="text-slide">
                  <IStyle
                    className="fa fa-reply-all monkey-fz-20 mr-2"
                    aria-hidden="true"
                  ></IStyle>{" "}
                  {title}
                </p>
                <p className="text-slide text-detail">(Bản xem nhanh)</p>
              </div>
            </div>

            <p className="text-uppercase monkey-fz-18 monkey-f-header">
              {/* {localStorage.getItem("title")} */}
            </p>

            {!isMobile ? (
              <div className="cursor" id="reading-support-tooltip">
                <div className="row wrapper-button">
                  <div className="dropdown">
                    <ButtonShare
                      type="button"
                      id="btnShare"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-share-alt" aria-hidden="true"></i>{" "}
                      Chia sẻ
                    </ButtonShare>
                    <div className="dropdown-menu" aria-labelledby="share">
                      <p
                        className="dropdown-item"
                        href="#"
                        onClick={() => share()}
                      >
                        <FacebookShareButton
                          url={fullCurrentUrl}
                          quote={title}
                          hashtag={"#hoc10.vn"}
                          description={title}
                          className="hoc10"
                        >
                          <FacebookIcon size={32} round /> Facebook
                        </FacebookShareButton>
                      </p>
                      <CopyToClipboard
                        text={fullCurrentUrl}
                        onCopy={() => copyLink()}
                      >
                        <span>
                          {" "}
                          <IconCopyLink
                            className="fa fa-link"
                            aria-hidden="true"
                          />{" "}
                          Copy link
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <button onClick={onShowPopupPresent} id="tooltip-present">
                    <i className="fa fa-play" aria-hidden="true"></i> Trình
                    chiếu
                  </button>

                  <Tooltip
                    isOpen={tooltipPresent}
                    target="tooltip-present"
                    toggle={togglePresent}
                  >
                    Trình chiếu bản xem nhanh
                  </Tooltip>

                  <button onClick={downloadFile} id="tooltip-download">
                    {showLoadingDownload ? (
                      <div className="loader"></div>
                    ) : (
                      <>
                        <i className="fa fa-download" aria-hidden="true"></i>{" "}
                        Tải xuống
                      </>
                    )}
                  </button>

                  <Tooltip
                    isOpen={tooltipDownload}
                    target="tooltip-download"
                    toggle={toggleDownload}
                  >
                    Tải xuống bản đầy đủ
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="cursor" id="reading-support-tooltip">
                <div className="row wrapper-button">
                  <div className="dropdown">
                    <ButtonShare
                      type="button"
                      id="btnShare"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-share-alt" aria-hidden="true"></i>
                    </ButtonShare>
                    <div className="dropdown-menu" aria-labelledby="share">
                      <p className="dropdown-item" href="#">
                        <FacebookShareButton
                          url={fullCurrentUrl}
                          quote={title}
                          hashtag={"#hoc10.vn"}
                          description={title}
                          className="hoc10"
                        >
                          <FacebookIcon size={32} round /> Facebook
                        </FacebookShareButton>
                      </p>

                      <CopyToClipboard
                        text={fullCurrentUrl}
                        onCopy={() => copyLink()}
                      >
                        <span>
                          {" "}
                          <IconCopyLink
                            className="fa fa-link"
                            aria-hidden="true"
                          />
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <button onClick={onShowPopupPresent}>
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </button>
                  <button onClick={downloadFile}>
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Animated>
        {isShowButton && (
          <Animated
            animationIn="fadeInDown"
            animationOut="fadeOutUp"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={isShowButton}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                position: "absolute",
                right: "0",
                top: `${isShowHeader ? "38px" : "0"}`,
                opacity: `${isShowButton ? "1" : "0"}`,
                transition: "all 0.5s linear",
              }}
            >
              <i
                onClick={onShowHeader}
                className={`${
                  isShowHeader ? "fa-rotate-180" : ""
                } fa fa-chevron-down monkey-fz-30 cursor`}
                aria-hidden="true"
                style={{
                  transition: "all 0.5s linear",
                }}
              ></i>
            </div>
          </Animated>
        )}
      </NavWrapper>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Header);

const NavWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  color: #fff;
`;

const ButtonShare = styled.button`
  color: #fff;
  border: none;
  background: #0066b2;
  padding: 10px 10px;
  border-radius: 20px;
  margin-right: 10px;
`;

const IconCopyLink = styled.i`
  background: #bb0000;
  color: #fff;
  padding: 8px 8px;
  border-radius: 50px;
  margin-left: 22px;
`;

const Span = styled.span`
  color: #0066b2;
  font-weight: bold;
`;

const IStyle = styled.span`
  color: #0066b2;
  font-weight: bold;
`;
