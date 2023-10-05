import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageComponent from "../image";
import * as PATH from "../../constants/path";
import { removeAccents } from "../selection";
import { TYPE_POPUP_ACTIVE_BOOK } from "../../constants/type";
import * as TEXT from "../../constants/text";
import * as TYPE from "../../constants/general";
import { setEventGTM } from "../../constants/googleTagManager";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
  onDispatchTogglePopupSuccess,
} from "../../modules/App/actions";
import "./style.css";
import { onDispatchBookInfo } from "../../modules/General/actions";
import { OPEN_BOOK } from "../../constants/eventNameGTM";
import { getNameTypeBook } from "../../constants/typeBook";

const BookItem = (props) => {
  const history = useHistory();
  const { data, gradeId, listGrade, typeBook } = props;
  const valueOption = listGrade.filter((item) => item.id === gradeId)[0];

  const onNextBookDetail = (title, id, is_free, active, is_licence) => {
    props.onDispatchBookInfo({
      bookName: title,
      bookGrade: valueOption?.name,
      bookType: getNameTypeBook(typeBook),
    });
    setEventGTM({
      event: OPEN_BOOK,
      book_name: title,
      book_grade: valueOption?.name,
      book_type: getNameTypeBook(typeBook),
    });
    const converTitle = removeAccents(title);
    localStorage.setItem("title", title);
    let pageId = 0;
    if (!active && is_free) {
      if (is_licence) {
        const access_token = localStorage.getItem("token");
        if (access_token) {
          props.onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
          props.onDispatchShowPopupActivateBook(true);
        } else {
          const dataSuccess = {
            status: true,
            title: [TEXT.TITLE_POPUP_SBT_NOTIFICATION],
            url: PATH.ROUTE_PATH_SIGN_IN,
            labelButton: TEXT.TITLE_SIGN_IN,
            icon: "fa-exclamation",
            close: true,
          };
          props.onDispatchTogglePopupSuccess(dataSuccess);
        }
      } else {
        history.push(
          `${PATH.ROUTE_PATH_READING_BOOKS}/${converTitle}/${typeBook}/${id}/${pageId}/`
        );
      }
    } else {
      history.push(
        `${PATH.ROUTE_PATH_READING_BOOKS}/${converTitle}/${typeBook}/${id}/${pageId}/`
      );
    }
  };

  return (
    <div className="book_item_wrapper">
      <div className="book_item monkey-bg-silver">
        {typeBook === TYPE.TYPE_TEXT_BOOKS_DOCUMENT ? (
          <div className="image-container-v1">
            <div
              className="book_image"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={data.thumb} alt="#" style={{ width: "250px" }} />
            </div>
          </div>
        ) : (
          <div
            className="book_item_image position-relative"
            onClick={() =>
              onNextBookDetail(
                data.title,
                data.id,
                data.is_free,
                data.is_active,
                data.is_licence
              )
            }
          >
            <div className="image-container-v1">
              <ImageComponent
                bookId={data.id}
                src={data.thumb}
                className="book_image"
              />
              {data.is_free && !data.is_active && data.is_licence && (
                <div className="after">
                  <span className="label-active">
                    {data.is_licence
                      ? "Vui lòng kích hoạt để xem bản đầy đủ"
                      : "Vui lòng dùng sách giấy để xem bản đầy đủ"}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="book_item_content monkey-p-15">
          <div className="text_view d-flex justify-content-between align-items-center">
            <span className="monkey-fz-16 monkey-color-blue monkey-f-bold">
              {typeBook === TYPE.TYPE_TEXT_BOOKS_DOCUMENT ? (
                <span>{data?.worksheet_title}</span>
              ) : (
                <span>{valueOption?.name}</span>
              )}
            </span>

            {typeBook === TYPE.TYPE_TEXT_BOOKS_DOCUMENT ? (
              <button className="btn monkey-bg-violet monkey-color-white monkey-fz-12 hvr-registration-bc-violet">
                <a
                  className="a-v1"
                  href={data.url}
                  download
                  style={{ color: "#fff" }}
                >
                  <span>
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </span>
                </a>
              </button>
            ) : data.is_free && !data.is_active ? (
              <button
                onClick={() =>
                  onNextBookDetail(data.title, data.id, "", true, false)
                }
                className="btn monkey-bg-trial monkey-color-white monkey-fz-12 hvr-registration-bc-violet"
              >
                Đọc thử
              </button>
            ) : (
              <button
                onClick={() =>
                  onNextBookDetail(data.title, data.id, "", false, true)
                }
                className="btn monkey-bg-violet monkey-color-white monkey-fz-12 hvr-registration-bc-violet"
              >
                Xem ngay
              </button>
            )}
          </div>
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
      onDispatchTogglePopupSuccess,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
      onDispatchBookInfo,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
