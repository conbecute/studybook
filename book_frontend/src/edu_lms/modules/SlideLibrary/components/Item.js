import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import * as PATH from "../../../constants/path";
import { URL_IMAGE } from "../../../constants/type";
import styled from "styled-components";
import "./style.css";

import {
  onDispatchShowPopupPDF,
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
} from "../../../modules/App/actions";
import moment from "moment";
import { encryptBase64 } from "../../../modules/selection";
import { postUpdateSlideLibrary } from "../../../services/slide";
import { removeAccents } from "../../../components/selection";

const Item = ({ item, isStyleUI = true }) => {
  const history = useHistory();
  const onReadingSlideLibrary = (title, id, publishedDate) => {
    let timeNow = Math.floor(Date.now() / 1000);
    console.log("time", timeNow, publishedDate);
    const converTitle = removeAccents(title);
    if (timeNow > publishedDate) {
      const data = {
        slideId: id,
        typeUpdate: 1,
      };
      postUpdateSlideLibrary(data)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
      let hashId = encryptBase64(id);
      history.push(
        `${PATH.ROUTE_PATH_READING_SLIDE_LIBRARY}/${converTitle}/${hashId}`
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`${
        isStyleUI ? "col-lg-4" : "col-lg-4"
      } col-12 col-sm-6 col-md-4`}
    >
      <div className="introduce-box mb-4">
        <div className="image-container">
          <div className="button-cursor introduce-box-content background-style d-flex justify-content-center align-items-end lazy">
            <img
              className="w-100"
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${item.thumb}`}
              alt=""
              onClick={() => {
                onReadingSlideLibrary(item.title, item.id, item.published_date);
              }}
            />
          </div>
          <div className="content-video monkey-f-medium monkey-color-gray p-3 monkey-bg-white">
            <p
              onClick={() => {
                onReadingSlideLibrary(item.title, item.id, item.published_date);
              }}
              className="button-cursor monkey-fz-16 monkey-color-violet monkey-f-bold d-flex align-items-center"
              style={{ height: "30px" }}
            >
              {item.title}
            </p>
            <hr />
            <WrapperLabel>
              <LabelGrade>{item.subject_name}</LabelGrade>
              <LabelView
                onClick={() => {
                  onReadingSlideLibrary(
                    item.title,
                    item.id,
                    item.published_date
                  );
                }}
              >
                Xem nhanh
              </LabelView>
            </WrapperLabel>
            <WrapperIcon>
              <WrapItemIcon>
                <Icon className="fa fa-download" aria-hidden="true"></Icon>
                <SpanIcon>{item.count_download}</SpanIcon>
              </WrapItemIcon>
              <WrapItemIcon>
                <Icon className="fa fa-share-alt" aria-hidden="true"></Icon>
                <SpanIcon>{item.count_share + item.count_copy}</SpanIcon>
              </WrapItemIcon>
              <WrapItemIcon>
                <Icon className="fa fa-eye" aria-hidden="true"></Icon>
                <SpanIcon>{item.count_view}</SpanIcon>
              </WrapItemIcon>
            </WrapperIcon>
          </div>
          {Math.floor(Date.now() / 1000) < item.published_date && (
            <div className="after">
              <p>
                <i className="fa fa-lock icon-lock" aria-hidden="true"></i>
              </p>
              <span className="label-active-date-publish">
                Ngày phát hành:{" "}
                {moment(item.published_date * 1000).format("DD/MM/YYYY")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LabelSubject = styled.span`
  background: #0066b2;
  border-radius: 11px;
  padding: 5px;
  color: #fff;
  margin-left: 10px;
`;
const LabelGrade = styled.span`
  color: #00c2f3;
`;
const LabelView = styled.span`
  display: block;
  float: right;
  background: #0066b2;
  border-radius: 11px;
  padding: 5px;
  color: #fff;
  cursor: pointer;
`;
const WrapperLabel = styled.p`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const WrapperIcon = styled.p``;
const Icon = styled.i`
  color: #0066b2;
  margin-right: 10px;
`;
const SpanIcon = styled.span`
  color: #0066b2;
`;
const WrapItemIcon = styled.span`
  margin-right: 30px;
`;

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

export default connect(mapStateToProps, mapDispatchToProps)(Item);
