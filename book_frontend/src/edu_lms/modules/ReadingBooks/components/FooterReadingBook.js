import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Tooltip } from "reactstrap";
import {
  BOOK_LANGUAGE,
  COLOR_WHITE,
  COLOR_BLACK_READING_BOOK,
  INNER_WIDTH,
} from "../../../constants/type";
import { onDispatchUpdateBookToolPage } from "../actions";
import { Tools } from "../../../libs/react-sketch";
import "./style.css";
import { onDispatchIncreaseBookTool } from "../../General/actions";
import { getRecentBookInfo } from "edu_lms_v2/modules/ListBook/const";
import { useParams } from "react-router-dom";
import ToggleStationPoint from "edu_lms/assets/images/station-point.svg";
import ImageZoomOut from "edu_lms/assets/images/zoom-out.svg";
import ImageZoomIn from "edu_lms/assets/images/zoom-in.svg";
import ImageZoom100 from "edu_lms/assets/images/zoom-100.svg";
import classNames from "classnames";
import ToggleBookTool from "edu_lms/assets/images/switch-book-tool.svg";
import { VIEW_MODE } from "./const";
import { removeAccents } from "edu_lms/components/selection";

const FooterReadingBook = ({
  bookType,
  bookId,
  page,
  pageId,
  total,
  languageBook,
  isDisable,
  resultDataLength,
  onToNextPage,
  prevButtonClick,
  nextButtonClick,
  onShowMenu,
  zoomIn,
  zoomOut,
  resetTransform,
  onToggleStationPoint,
  isMenu,
  scale,
}) => {
  const dispatch = useDispatch();
  const url = useParams();
  const singlePage = localStorage.getItem('singlePage');
  const gradeId = localStorage.getItem('gradeIdOfBook');
  const viewMode = VIEW_MODE[JSON.parse(singlePage) ? 'two_page' : 'single_page'];
  const [isShowTotal, setStateShowTotal] = useState(true);
  const [switchToolZoom, setSwitchToolZoom] = useState(false);
  const [switchStationPoint, setSwitchStationPoint] = useState(true);
  const [valueTotal, setStateValueTotal] = useState("");
  const { register, handleSubmit } = useForm();
  const [valueNumberPage, setStateValueNumberPage] = useState("");
  const [tooltipPoint, setTooltipPoint] = useState(false);
  const [tooltipMenu, setTooltipMenu] = useState(false);
  const [tooltipTool, setTooltipTool] = useState(false);
  const toggleMenu = () => setTooltipMenu(!tooltipMenu);
  const togglePoint = () => setTooltipPoint(!tooltipPoint);
  const bookTool = useSelector(
    (state) => state.readingBookReducers.bookTool.page
  );
  const bookInfo = useSelector((state) => state.generalReducer)

  const toggleTool = () => setTooltipTool(!tooltipTool);
  useEffect(() => {
    let result;
    const bookNameUrl = removeAccents(bookInfo.bookInfo.bookName);
   const imgBooks =  `${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${bookInfo.bookInfo.bookThumb}`;
    if (bookId == 20 || bookId == 9) {
      const checkPage = page - 4 < 0 ? page : page - 4;
      result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${total - 4}`;
      getRecentBookInfo({ id: bookInfo.bookId, pageId: +checkPage || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image: imgBooks});
    } else {
      if ((bookType == 8 && gradeId == 14) || bookType == 10 || (bookType == 11 && gradeId != 7)) {
        if (bookId == 352) {
          const checkPage = page - 8 < 0 ? page : page - 8;
          result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${total - 5}`;
          getRecentBookInfo({ id: bookInfo.bookId, pageId: +checkPage || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image: imgBooks});
        } else {
          const checkPage = page - 1 < 0 ? page : page - 1;
          result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${total - 1}`;
          getRecentBookInfo({ id: bookInfo.bookId, pageId: +checkPage || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image: imgBooks});
        }
      } else {
        result = `${onResultNumberPage(page || +pageId, singlePage)} / ${total - 1}`;
        getRecentBookInfo({ id: bookInfo.bookId, pageId: +page || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image: imgBooks});
      }
    }
    
    setStateValueTotal(result);
  }, [total, page, bookId]);

  useEffect(() => {
    if (isShowTotal) {
      setStateValueNumberPage("");
    }
  }, [isShowTotal]);

  const onPrevPage = () => {
    if (valueNumberPage) {
      document.getElementById("input-page").blur();
      setStateValueNumberPage("");
      prevButtonClick(valueNumberPage);
      setStateShowTotal(true);
    } else {
      prevButtonClick(valueNumberPage);
    }
  };

  const onNextPage = () => {
    if (valueNumberPage) {
      document.getElementById("input-page").blur();
      setStateValueNumberPage("");
      setStateShowTotal(true);
      nextButtonClick(valueNumberPage);
    } else {
      nextButtonClick(valueNumberPage);
    }
  };

  const onSubmit = (data) => {
    let nextPage = 0;
    if (data.total_name) {
      if (bookId == 20 || bookId == 9) {
        nextPage = Number(data.total_name) + 4;
      } else {
        if (bookType == 8 && gradeId == 14) {
          if (bookId == 352) {
            nextPage = Number(data.total_name) + 8;
          } else {
            nextPage = Number(data.total_name) + 1;
          }
        } else {
          nextPage = Number(data.total_name);
        }
      }
      onToNextPage(nextPage);
      setStateValueNumberPage("");
      document.getElementById("input-page").blur();
    }
  };

  const handleValueFromWhenOnChange = (value) => {
    const RegExrNumber = /^[0-9\b]+$/;
    if (value === "" || RegExrNumber.test(value)) {
      setStateValueNumberPage(value);
    }
  };

  const onShowTotal = () => {
    setStateShowTotal(false);
    document.getElementById("input-page").focus();
  };

  const onFocusInputPage = () => {
    setStateShowTotal(false);
  };

  const onBlurInputPage = () => {
    if (valueNumberPage) {
      setStateShowTotal(false);
    } else {
      setStateShowTotal(true);
    }
  };

  const onShowTool = () => {
    if (isMenu) {
      onShowMenu();
    }
    dispatch(onDispatchIncreaseBookTool("count_show_tools"));
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        show: !bookTool.show,
        control: bookTool.show ? false : bookTool.control,
      })
    );
  };

  const handleChangeModeViewBook = () => {
    localStorage.setItem('singlePage', !JSON.parse(singlePage));
    window.location.reload();
  }

  return (
    <FooterWrapper>
      <div
        className={`${
          window.innerWidth > INNER_WIDTH.MOBILE &&
          "col-sm-4 d-flex justify-content-start align-items-center"
        }`}
      >
        <span
          onClick={() => {
            dispatch(
              onDispatchIncreaseBookTool("count_open_table_of_contents")
            );
            onShowMenu();
          }}
        >
          <Catalogue
            className={`fa fa-bars monkey-fz-25 cursor ${
              isMenu ? "color-orange" : "color-black"
            }`}
            aria-hidden="true"
            id="tooltip-menu"
          ></Catalogue>
          <Tooltip
            isOpen={tooltipMenu}
            target="tooltip-menu"
            toggle={toggleMenu}
          >
            {BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.menu}
          </Tooltip>
        </span>

        <span
          id="book_tools"
          onClick={onShowTool}
          style={{ marginLeft: "30px" }}
        >
          <img
            src={ToggleBookTool}
            alt=""
            id="tooltip-tool"
            className={`cursor ${
              bookTool.show ? "toggleStationPoint" : "notShowBookTool"
            }`}
            width="22px"
          />
          <Tooltip
            isOpen={tooltipTool}
            target="tooltip-tool"
            toggle={toggleTool}
          >
            Thanh công cụ
          </Tooltip>
        </span>
        <ModeView
          singlePage={singlePage}
          onClick={handleChangeModeViewBook}
          className="flex-column justify-content-center align-items-center cursor ml-3"
        >
          <img src={viewMode.icon} alt="" />
          <p className="monkey-f-header">{viewMode.title}</p>
        </ModeView>
      </div>

      <div
        id="use-book"
        className={`d-flex justify-content-start align-items-center ${
          window.innerWidth > INNER_WIDTH.MOBILE && "col-sm-4"
        }`}
      >
        <div>
          <ButtonHandling
            onClick={onPrevPage}
            isDisable={!(page === 0) || +url.pageId ? isDisable : true}
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </ButtonHandling>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-0 position-relative">
            <input
              type="text"
              className="form-control"
              name="total_name"
              autoComplete="off"
              id="input-page"
              value={valueNumberPage}
              onChange={(e) => handleValueFromWhenOnChange(e.target.value)}
              onFocus={onFocusInputPage}
              onBlur={onBlurInputPage}
              ref={register({ required: false })}
              onKeyDown={(e) =>
                e.keyCode === 13
                  ? dispatch(onDispatchIncreaseBookTool("count_change_page"))
                  : null
              }
            />
            {isShowTotal && (
              <ValueTotal onClick={onShowTotal}>{valueTotal}</ValueTotal>
            )}
          </div>
        </form>
        <div>
          <ButtonHandling
            onClick={onNextPage}
            isDisable={page + 2 === resultDataLength ? true : isDisable}
          >
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </ButtonHandling>
        </div>
      </div>
      <div
        className={`d-inline-flex ${
          window.innerWidth > INNER_WIDTH.MOBILE && "justify-content-end"
        }`}
      >
        <div
          id="tool"
          className={classNames({
            "d-none": window.innerWidth < INNER_WIDTH.MOBILE,
          })}
        >
          <span
            className="monkey-fz-20 cursor"
            onClick={() => {
              dispatch(onDispatchIncreaseBookTool("count_zoom_out"));
              zoomOut();
            }}
          >
            <img
              src={ImageZoomOut}
              alt=""
              className="d-inline color-tool-zoom"
            />
          </span>
          <span className="ml-4 font-weight-bold monkey-f-header monkey-color-back-reading-book monkey-fz-16">{`${Math.round(
            scale * 100
          )}%`}</span>
          <span
            className="monkey-fz-20 ml-4 cursor"
            onClick={() => {
              dispatch(onDispatchIncreaseBookTool("count_zoom_in"));
              zoomIn();
            }}
          >
            <img
              src={ImageZoomIn}
              alt=""
              className="d-inline color-tool-zoom"
            />
          </span>
          <span
            className="monkey-fz-20 ml-4 mr-5 cursor"
            onClick={() => {
              dispatch(onDispatchIncreaseBookTool("count_zoom_back_100"));
              resetTransform();
            }}
          >
            <img
              src={ImageZoom100}
              alt=""
              className="d-inline color-tool-zoom"
            />
          </span>
        </div>
        <MobileToolZoom
          className={classNames("monkey-fz-20 mr-3 position-relative cursor", {
            "d-none": window.innerWidth > INNER_WIDTH.MOBILE,
            "monkey-color-orange": switchToolZoom,
          })}
          onClick={() => setSwitchToolZoom(!switchToolZoom)}
        >
          <div
            id="tool"
            className={classNames("position-absolute rounded-pill p-2", {
              "d-none": !switchToolZoom,
            })}
          >
            <span
              className="monkey-fz-20 cursor"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(onDispatchIncreaseBookTool("count_zoom_out"));
                zoomOut();
              }}
            >
              <img
                src={ImageZoomOut}
                alt=""
                className="d-inline color-tool-zoom"
              />
            </span>
            <span className="ml-4 font-weight-bold monkey-f-header monkey-color-back-reading-book monkey-fz-16">{`${Math.round(
              scale * 100
            )}%`}</span>
            <span
              className="monkey-fz-20 ml-4 cursor"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(onDispatchIncreaseBookTool("count_zoom_in"));
                zoomIn();
              }}
            >
              <img
                src={ImageZoomIn}
                alt=""
                className="d-inline color-tool-zoom"
              />
            </span>
            <span
              className="monkey-fz-20 ml-4 cursor"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(onDispatchIncreaseBookTool("count_zoom_back_100"));
                resetTransform();
              }}
            >
              <img
                src={ImageZoom100}
                alt=""
                className="d-inline color-tool-zoom"
              />
            </span>
          </div>
          <i className="fa fa-cog" aria-hidden="true"></i>
        </MobileToolZoom>
        <span
          onClick={() => {
            onToggleStationPoint();
            setSwitchStationPoint(!switchStationPoint);
          }}
          className="monkey-fz-20 mt-1 cursor"
        >
          <img
            id="tooltip-point"
            src={ToggleStationPoint}
            alt=""
            className={switchStationPoint && "toggleStationPoint"}
          />
          <Tooltip
            isOpen={tooltipPoint}
            target="tooltip-point"
            toggle={togglePoint}
          >
            Tắt icon
          </Tooltip>
        </span>
      </div>
    </FooterWrapper>
  );
};

export default FooterReadingBook;

const onResultNumberPage = (page, singlePage) => {
  if (page < 0) {
    page = 0;
  }

  if (window.innerWidth <= 600 || JSON.parse(singlePage)) {
    return page;
  }

  return `${page} - ${page + 1}`;
};

const FooterWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  background-color: #f4f5f6;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px 15px;
  left: 0;
  align-items: center;
  text-align: center;
  z-index: 17;
  display: flex;
  justify-content: space-between;
  .form-control {
    background-color: #fff;
    border: 1px solid #ccc;
    width: 120px;
    color: ${COLOR_BLACK_READING_BOOK};
    text-align: center;
    &:hover {
      border: 1px solid rgba(0, 102, 178, 0.28);
      box-shadow: 0 0 0 0.2rem rgba(0, 102, 178, 0.26);
    }
    ::placeholder {
      color: ${COLOR_BLACK_READING_BOOK};
      opacity: 1;
    }
  }
  .toggleStationPoint {
    filter: invert(44%) sepia(91%) saturate(1229%) hue-rotate(355deg)
      brightness(105%) contrast(104%);
  }
  .notShowBookTool {
    filter: brightness(0) saturate(100%) invert(20%) sepia(39%) saturate(509%)
      hue-rotate(161deg) brightness(96%) contrast(89%);
  }
  .color-tool-zoom {
    filter: invert(18%) sepia(28%) saturate(689%) hue-rotate(161deg)
      brightness(53%) contrast(108%);
  }
`;

const ButtonHandling = styled.div`
  background-color: #eee;
  color: ${(props) => props.isDisable && "#fff"};
  border: 1px solid #ccc;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  cursor:${(props) => (props.isDisable ? "not-allowed" : "pointer")};
  pointer-events:${(props) => (props.isDisable ? "none" : "initial")}
  &:hover {
    background-color: rgba(147, 149, 152, 0.7);
    border: 1px solid rgba(0, 102, 178, 0.28);
    box-shadow: 0 0 0 0.2rem rgb(0 102 178 / 26%);
  }
`;

const ValueTotal = styled.span`
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  color: ${COLOR_BLACK_READING_BOOK};
`;

const Catalogue = styled.i`
  &.color-black {
    color: ${COLOR_BLACK_READING_BOOK};
  }
  &.color-orange {
    color: #ff7707;
  }
`;

const MobileToolZoom = styled.div`
  #tool {
    background-color: #fff;
    display: inline;
    bottom: 50px;
    width: max-content;
    right: -30px;
    box-shadow: 5px 5px 20px 1px #ccc;
    ::after {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      background-color: #fff;
      transform: rotate(45deg);
      bottom: -10px;
      right: 30px;
    }
  }
`;

const ModeView = styled.div`
  display: flex;
  @media (max-width: 630px) {
    display: none;
  }

  img {
    width: ${(props) => (JSON.parse(props.singlePage) ? "30px" : "20px")};
  }

  p {
    font-size: 12px;
  }
`
