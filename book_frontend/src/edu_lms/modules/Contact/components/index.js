import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TitleComponent from "../../../components/title";
import * as TEXT from "../../../constants/text";
import IconContact_1 from "../../../assets/images/icon_contact_1.svg";
import BgContact from "../../../assets/images/bg-contact.svg";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
  onDispatchTogglePopupSuccess,
} from "../../App/actions";
import { TYPE_POPUP_ACTIVE_BOOK } from "../../../constants/type";
import * as PATH from "../../../constants/path";

const ContactWrapper = (props) => {
  const onActiveBook = () => {
    const access_token = localStorage.getItem("token");
    if (access_token) {
      props.onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
      props.onDispatchShowPopupActivateBook(true);
    } else {
      const dataSuccess = {
        status: true,
        title: [TEXT.TITLE_POPUP_NOTIFICATION],
        url: PATH.ROUTE_PATH_SIGN_IN,
        labelButton: TEXT.TITLE_SIGN_IN,
        icon: "fa-exclamation",
        close: true,
      };
      props.onDispatchTogglePopupSuccess(dataSuccess);
    }
  };
  return (
    <div className="contact_wrapper pt-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title={TEXT.TITLE_CONTACT}
              className="monkey-color-violet title-contact text-uppercase border-bottom monkey-fz-34 text-left pb-4 mb-5"
            />
            <div className="row">
              <div className="col-10">
                <div className="contact_content">
                  <TitleComponent
                    title={TEXT.TITLE_CONTACT_CONTENT_1}
                    className="monkey-color-light-black monkey-f-bold text-uppercase monkey-fz-18 text-left mb-4"
                  />
                  <div className="mb-5">
                    <p>
                      <i className="fa fa-home monkey-color-violet mr-2"></i>{" "}
                      Tầng 2, Tòa nhà HH-N01, Gold Season, số 47 Nguyễn Tuân, P.
                      Thanh Xuân Trung - Q. Thanh Xuân - TP. Hà Nội, Việt Nam
                    </p>
                    <div className="item-content mt-3">
                      <p>
                        <i className="fa fa-phone monkey-color-violet mr-2"></i>
                        (+84) 02473098866
                      </p>
                      <p>Fax: (+84) 02473098866</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${BgContact})` }}
              className="contact_footer p-3 mb-5"
            >
              <div className="row">
                <div className="col-12 col-lg-8 d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="contact_footer_icon monkey-bg-white rounded-pill d-flex align-items-center justify-content-center">
                        <img src={IconContact_1} alt="#" />
                      </div>
                    </div>

                    <p className="ml-3 monkey-color-white">
                      Thêm sách ngay vào "Kho sách của tôi" để sở hữu phiên bản
                      điện tử Bộ sách Cánh Diều
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <button
                      onClick={onActiveBook}
                      className="btn text-uppercase monkey-color-violet hvr-registration-br-white monkey-bg-white monkey-f-bold rounded-pill pl-3 pr-3"
                    >
                      kích hoạt sách
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactWrapper);
