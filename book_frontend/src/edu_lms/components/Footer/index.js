import styled from "styled-components";
import { Link } from "react-router-dom";
import * as PATH from "../../constants/path";

const DivBorder = styled.div`
  width: 100%;
  height: 2px;
  background: #fff;
`;

const ZaloIcon = styled.a`
  font-size: 12px;
  font-weight: bold;
`;

const FooterComponent = () => {
  return (
    <footer id="footer">
      <div className="monkey-bg-violet title text-center monkey-pt-20 monkey-pb-20 text-uppercase monkey-color-white monkey-fz-30 monkey-f-header">
        Liên hệ
      </div>
      <DivBorder />
      <div className="footer-body monkey-bg-violet monkey-pt-25 monkey-pb-25">
        <div className="container-fluid container-xl">
          <div className="contact-content text-center">
            <ul className="list-inline monkey-color-white ">
              <li className="list-inline-item border-line monkey-f-bold text-left mb-2 monkey-color-white">
                <a x-apple-data-detectors="true">Hotline: 02473098866</a>
              </li>
              <li className="list-inline-item monkey-f-bold">
                contact@hoc10.vn
              </li>
            </ul>

            <ul className="list-inline" style={{ display: "flex" }}>
              <li className="list-inline-item cursor">
                <a
                  className="size-icon-title monkey-bg-white distance-center rounded-circle"
                  href="https://www.facebook.com/sachgiaokhoacanhdieu.vepic"
                  target="_blank"
                  alt="#"
                >
                  <i className="icon-monkey-face monkey-color-violet monkey-fz-18"></i>
                </a>
              </li>
              <li className="list-inline-item cursor">
                <a
                  className="size-icon-title monkey-bg-white distance-center rounded-circle"
                  href="https://www.youtube.com/channel/UCWhhyetWAPzw8mXk3-T2VDg"
                  target="_blank"
                  alt="#"
                >
                  <i className="icon-monkey-youtube monkey-color-violet monkey-fz-18"></i>
                </a>
              </li>
              <li className="list-inline-item cursor">
                <ZaloIcon
                  className="size-icon-title monkey-bg-white distance-center rounded-circle monkey-color-violet"
                  href="https://zalo.me/0982594622"
                  target="_blank"
                  alt="#"
                >
                  Zalo
                </ZaloIcon>
              </li>
            </ul>
          </div>

          <div className="monkey-f-bold footer-item monkey-color-white d-block d-lg-flex">
            <Link
              className="monkey-color-white mr-lg-3 ml-ld-3 d-flex"
              to={PATH.ROUTE_PATH_CONTACT}
            >
              <span className="mr-2"> ●</span>
              <span>Liên hệ</span>
            </Link>
            <Link
              className="monkey-color-white mr-lg-3 ml-ld-3 d-flex"
              to={PATH.ROUTE_INSTRUCTION_ACTIVATED_BOOK}
            >
              <span className="mr-2"> ●</span>
              <span>Hướng dẫn kích hoạt</span>
            </Link>
            <Link
              className="monkey-color-white mr-lg-3 ml-ld-3 d-flex"
              to={PATH.ROUTE_PATH_TERMS_OF_USE}
            >
              <span className="mr-2"> ●</span>
              <span>Điều khoản sử dụng</span>
            </Link>
            <Link
              className="monkey-color-white mr-lg-3 ml-ld-3 d-flex"
              to={PATH.ROUTE_PATH_PRIVACY_POLICY}
            >
              <span className="mr-2"> ●</span>
              <span>Chính sách bảo mật</span>
            </Link>
          </div>
          <div className="address-content monkey-pt-20 monkey-pb-20 mt-3 mb-3">
            <div className="row justify-content-center">
              <div className="col-lg-11">
                <div className="row justify-content-end">
                  <div className="col-lg-9 monkey-f-regular monkey-color-white text-center">
                    <p className="monkey-fz-12">
                      ©2021 CÔNG TY CỔ PHẦN ONE PERCENT
                    </p>
                    <p className="monkey-fz-12">
                      Địa chỉ: Tầng 2, tòa nhà HH-N01, dự án Gold Season, Số 47
                      đường Nguyễn Tuân, Phường Thanh Xuân Trung, Quận Thanh
                      Xuân, Tp. Hà Nội
                    </p>
                    <p className="monkey-fz-12">
                      Số giấy chứng nhận ĐKKD: 0109 621 809 Ngày cấp 6/5/2021
                      Nơi cấp: Sở KHĐT thành phố Hà Nội
                    </p>
                    <p className="monkey-fz-12">
                      Người đại diện: Ông Đào Xuân Hoàng
                    </p>
                  </div>

                  <div className="col-lg-2">
                    <a
                      href="http://online.gov.vn/Home/WebDetails/86940"
                      target="blank"
                    >
                      <img
                        alt=""
                        title=""
                        src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/game/logoSaleNoti.png`}
                        className="img-certification"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
