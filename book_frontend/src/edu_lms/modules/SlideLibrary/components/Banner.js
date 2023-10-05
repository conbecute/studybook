import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEventGTM } from "../../../constants/googleTagManager";
import { OPEN_LECTURE_INSTRUCTIONS } from "../../../constants/eventNameGTM";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTogglePopupSuccess,
  onDispatchTypePopup,
} from "../../../modules/App/actions";

export const BannerComponent = () => {
  return (
    <BannerWrapper url={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/intro/banner_BG-04.png`}>
      <div className="container-fluid container-lg">
        <div className="row ">
          <div className="col-md-5 col-12 d-none d-md-block d-lg-block d-xl-block">
            <div className="banner-content-mobile image_banner_home text-center pt-4 pb-4">
              <img
                src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/intro/sach-06.png`}
                alt="#"
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
            <div className="pt-4">
              <div className="text-center">
                <span className="monkey-color-violet monkey-fz-28">
                  Góc chia sẻ bài giảng điện tử
                </span>
                <span> </span>
                <span className="monkey-fz-20">
                  là nơi Hoc10 đăng tải các giáo án được xây dựng bởi một đội
                  ngũ giáo viên giỏi, dày dặn kinh nghiệm với mục đích tạo ra
                  một kho bài giảng điện tử để tham khảo và phần nào hỗ trợ Quý
                  thầy cô trong quá trình giảng dạy.
                </span>
              </div>
              <br />
              {/* <p className="text-center monkey-fz-18">
                (Các giáo viên chịu trách nhiệm về tính chính xác khi sử dụng)
              </p> */}
              <p className="text-center monkey-mt-30 monkey-mb-15">
                <ButtonStyle>
                  <a
                    className="monkey-color-violet"
                    href={`${process.env.REACT_APP_MEDIA_URL_APP}upload/huong_dan_tai_giao_an_canh_dieu__.pdf`}
                    target="_blank"
                    onClick={() => setEventGTM(OPEN_LECTURE_INSTRUCTIONS)}
                    rel="noreferrer"
                  >
                    Xem Hướng dẫn
                  </a>
                </ButtonStyle>
              </p>
            </div>
          </div>
          <div className="banner-content-mobile col-md-5 col-12 d-block d-md-none d-lg-none d-xl-none">
            <div className="image_banner_home text-center pb-4">
              <img
                src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/intro/sach-06.png`}
                alt="#"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </div>
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

const ButtonStyle = styled.button`
  background: #fff;
  border: 2px solid #0066b2;
  padding: 10px 25px;
  font-size: 24px;
  border-radius: 50px;
  z-index: 10;
  margin: auto;
`;
