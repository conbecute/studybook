import ModalVideo from "react-modal-video";
import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactAudioPlayer from "react-audio-player";
import {
  BOOK_DOCUMENT_PDF,
  BOOK_INTRO,
  BOOK_DOCUMENT_POWERPOINT_PDF,
  BOOK_DOCUMENT_POWERPOINT,
  BOOK_DOCUMENT_COURSEWARE,
  VIDEO_ENGLISH_COURSEWARE,
  TYPE_POPUP_PDF,
  EDUCATION_TEACHER,
  PDF_ENGLISH_COURSEWARE,
  POWERPOINT_ENGLISH_COURSEWARE,
  AUDIO_SBT_ENGLISH_COURSEWARE,
  AUDIO_SKG_ENGLISH_COURSEWARE,
  THUMB_IMAGE,
  BOOK_DOCUMENT_POWERPOINT_TEACHER,
  URL_IMAGE,
  ZIP_ENGLISH_COURSEWARE,
} from "../../constants/type";
import {
  onDispatchShowPopupPDF,
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
} from "../../modules/App/actions";

const BoxItem = ({
  item,
  isStyleUI = true,
  onDispatchShowPopupPDF,
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
  dataPopupPdf,
  statusModal,
}) => {
  const onShowPopupPdf = (data) => {
    const dataSuccess = {
      title: data.title,
      url: data.url,
    };
    onDispatchTypePopup(TYPE_POPUP_PDF);
    onDispatchShowPopupActivateBook(!statusModal);
    onDispatchShowPopupPDF(dataSuccess);
  };
  return (
    <div
      className={`${
        isStyleUI ? "col-lg-4" : "col-lg-4"
      } col-12 col-sm-6 col-md-4`}
    >
      <div className="introduce-box mb-4">
        <div className="introduce-box-content background-style d-flex justify-content-center align-items-end lazy">
          <BoxItemImage
            item={item}
            onShowPopupPdf={onShowPopupPdf}
            dataPopupPdf={dataPopupPdf}
          />
          {BoxItemVideo(item)}
        </div>
        <div className="content-video monkey-f-medium monkey-color-gray p-3 monkey-bg-white">
          {BoxItemTitle(item)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { statusModal, dataPopupPdf } = state.app;
  return {
    dataPopupPdf,
    statusModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupPDF,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxItem);

const BoxItemTitle = (item) => {
  switch (item.type_document) {
    case BOOK_INTRO:
    case BOOK_DOCUMENT_PDF:
    case BOOK_DOCUMENT_POWERPOINT_PDF:
    case BOOK_DOCUMENT_POWERPOINT:
    case EDUCATION_TEACHER:
    case BOOK_DOCUMENT_COURSEWARE:
    case VIDEO_ENGLISH_COURSEWARE:
    case POWERPOINT_ENGLISH_COURSEWARE:
    case ZIP_ENGLISH_COURSEWARE:
    case PDF_ENGLISH_COURSEWARE:
    case AUDIO_SKG_ENGLISH_COURSEWARE:
    case AUDIO_SBT_ENGLISH_COURSEWARE:
    case BOOK_DOCUMENT_POWERPOINT_TEACHER:
      return (
        <p
          className="monkey-fz-16 monkey-color-violet monkey-f-bold d-flex align-items-center"
          style={{ height: "30px" }}
        >
          {item.title}
        </p>
      );
    default:
      return;
  }
};

const BoxItemImage = ({ item, onShowPopupPdf, dataPopupPdf }) => {
  switch (item.type_document) {
    case BOOK_DOCUMENT_PDF:
    case BOOK_DOCUMENT_POWERPOINT_PDF:
    case BOOK_DOCUMENT_POWERPOINT:
    case PDF_ENGLISH_COURSEWARE:
      return (
        <Fragment>
          <a
            className="w-100 cursor d-md-block d-lg-block d-xl-block d-none"
            onClick={() => onShowPopupPdf(item, dataPopupPdf.status)}
          >
            <img
              className="w-100"
              src={item.thumb ? item.thumb : THUMB_IMAGE}
              alt="#"
            />
          </a>
          <a
            className="w-100 cursor d-md-none d-lg-none d-xl-none d-block"
            href={item.url}
            target="_blank"
          >
            <img
              className="w-100"
              src={item.thumb ? item.thumb : THUMB_IMAGE}
              alt="#"
            />
          </a>
        </Fragment>
      );
    case BOOK_INTRO:
    case BOOK_DOCUMENT_COURSEWARE:
    case VIDEO_ENGLISH_COURSEWARE:
    case EDUCATION_TEACHER:
      return (
        <img
          className="w-100"
          src={`http://i3.ytimg.com/vi/${item.url}/hqdefault.jpg`}
          alt=""
        />
      );
    case POWERPOINT_ENGLISH_COURSEWARE:
    case ZIP_ENGLISH_COURSEWARE:
    case BOOK_DOCUMENT_POWERPOINT_TEACHER:
      return (
        <a href={item.url} alt="#">
          <img className="w-100" src={item.thumb} alt="" />
        </a>
      );
    default:
      return "";
  }
};

const BoxItemVideo = (item) => {
  const [isOpen, setStateShowPopup] = useState(false);

  switch (item.type_document) {
    case BOOK_INTRO:
    case EDUCATION_TEACHER:
    case BOOK_DOCUMENT_COURSEWARE:
    case VIDEO_ENGLISH_COURSEWARE:
      return (
        <Fragment>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            autoplay={1}
            videoId={item.url}
            onClose={() => setStateShowPopup(false)}
          />
          <img
            onClick={() => setStateShowPopup(true)}
            className="card-img-top icon-play cursor"
            alt="#"
            src={`${URL_IMAGE}upload/web/background-web/icon-play.svg`}
          />
        </Fragment>
      );
      break;
    case AUDIO_SBT_ENGLISH_COURSEWARE:
    case AUDIO_SKG_ENGLISH_COURSEWARE:
      return (
        <div className="pt-3 pb-3 monkey-bg-white w-100 d-flex justify-content-center">
          <ReactAudioPlayer src={item.url} controls={true} />
        </div>
      );
    default:
      return "";
  }
};
