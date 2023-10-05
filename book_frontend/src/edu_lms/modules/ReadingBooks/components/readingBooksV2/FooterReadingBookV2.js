import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Tooltip } from "reactstrap";
import {
  COLOR_BLACK_READING_BOOK,
  INNER_WIDTH,
} from "../../../../constants/type";
import "../style.css";
import { onDispatchIncreaseBookTool } from "../../../General/actions";
import { getRecentBookInfo } from "edu_lms_v2/modules/ListBook/const";
import { useParams } from "react-router-dom";
import ImageZoomOut from "edu_lms/assets/images/zoom-out.svg";
import ImageZoomIn from "edu_lms/assets/images/zoom-in.svg";
import ImageZoom100 from "edu_lms/assets/images/zoom-100.svg";
import classNames from "classnames";
import { removeAccents } from "edu_lms/components/selection";

export default function FooterReadingBookV2({
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
  setIsShowMenuWidthMobile,
  isShowMenuWidthMobile,
}) {
  const dispatch = useDispatch();
  const bookInfo = useSelector((state) => state.generalReducer);
  const url = useParams();
  const singlePage = localStorage.getItem("singlePage");
  const gradeId = localStorage.getItem("gradeIdOfBook");
  const [isShowTotal, setStateShowTotal] = useState(true);
  const [valueTotal, setStateValueTotal] = useState("");
  const { register, handleSubmit } = useForm();
  const [valueNumberPage, setStateValueNumberPage] = useState("");
  const [isShowSetSizeBook, setIsShowSetSizeBook] = useState(false);

  useEffect(() => {
    let result;
    const bookNameUrl = removeAccents(bookInfo.bookInfo.bookName);
    const image =  `${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${bookInfo.bookInfo.bookThumb}`;
    if (+bookId === 20 || +bookId === 9) {
      const checkPage = page - 4 < 0 ? page : page - 4;
      result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${
        total - 4
      }`;
      getRecentBookInfo({ id: bookInfo.bookId, pageId: +checkPage || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image});
    } else {
      if (+bookType === 8 && +gradeId === 14) {
        if (+bookId === 352) {
          const checkPage = page - 8 < 0 ? page : page - 8;
          result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${
            total - 5
          }`;
          getRecentBookInfo({ id: bookInfo.bookId, pageId: +checkPage || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image});
        } else {
          const checkPage = page - 1 < 0 ? page : page - 1;
          result = `${onResultNumberPage(checkPage || +pageId, singlePage)} / ${
            total - 1
          }`;
          getRecentBookInfo({ id: bookInfo.bookId, pageId: +page || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image});
        }
      } else {
        result = `${onResultNumberPage(page || +pageId, singlePage)} / ${
          total - 1
        }`;
        getRecentBookInfo({ id: bookInfo.bookId, pageId: +page || +pageId, name: bookNameUrl, typeBook: bookInfo.bookInfo.bookType, image: image});
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
      setStateShowTotal(true);
    }
    prevButtonClick(valueNumberPage);
  };

  const onNextPage = () => {
    if (valueNumberPage) {
      document.getElementById("input-page").blur();
      setStateValueNumberPage("");
      setStateShowTotal(true);
    }
    nextButtonClick(valueNumberPage);
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

  return (
    <FooterWrapper
      isShowMenuWidthMobile={isShowMenuWidthMobile}
      isShowSetSizeBook={isShowSetSizeBook}
    >
      <div className="position-relative w-100">
        <div
          className="show-menu menu-mobile"
          onClick={() => setIsShowMenuWidthMobile(!isShowMenuWidthMobile)}
        >
          <i className="fa fa-bars" aria-hidden />
        </div>
        <div
          className="set-size menu-mobile"
          onClick={() => setIsShowSetSizeBook(!isShowSetSizeBook)}
        >
          <i class="fa fa-cog" aria-hidden />
        </div>
        {isShowSetSizeBook && (
          <div id="tool" className="position-absolute rounded-pill p-2">
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
        )}

        <div
          id="use-book"
          className="d-flex justify-content-center align-items-center position-relative"
        >
          <div>
            <ButtonHandling
              onClick={onPrevPage}
              isDisable={!(page === 0) || +url.pageId ? isDisable : true}
            >
              <i className="fa fa-chevron-left" aria-hidden="true" />
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
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </ButtonHandling>
          </div>
        </div>
        <div className="d-inline-flex zoom-book position-absolute">
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
                alt="img-zoom-out"
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
                alt="img-zoom-in"
                className="d-inline color-tool-zoom"
              />
            </span>
            <span
              className="monkey-fz-20 ml-4 cursor"
              onClick={() => {
                dispatch(onDispatchIncreaseBookTool("count_zoom_back_100"));
                resetTransform();
              }}
            >
              <img
                src={ImageZoom100}
                alt="img-zoom-100"
                className="d-inline color-tool-zoom"
              />
            </span>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

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
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
  padding-left: 175px;
  padding-right: 40px;
  align-items: center;
  text-align: center;
  z-index: 14;
  display: flex;
  justify-content: center;
  .menu-mobile {
    display: none;
    z-index: 99;
    cursor: pointer;
  }
  .set-size {
    i {
      color: ${(props) => props.isShowSetSizeBook && "#ff7707"};
    }
  }
  .show-menu {
    i {
      color: ${(props) => props.isShowMenuWidthMobile && "#ff7707"};
    }
  }
  #tool {
    display: none;
    display: inline;
    bottom: 50px;
    width: max-content;
    right: 2px;
    box-shadow: 5px 5px 20px 1px #ccc;
    ::after {
      display: none;
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      background-color: #fff;
      transform: rotate(45deg);
      bottom: -10px;
      right: 20px;
    }
  }
  .show-menu:hover {
    color: var(--orange);
    transition: 0.3s ease-in-out;
  }
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
  .zoom-book {
    padding-left: 20px;
    padding-right: 20px;
    border-right: 2px solid #e5e5e5;
    border-left: 2px solid #e5e5e5;
    height: 60%;
    align-items: center;
    right: 40px;
    top: 10px;
  }
  @media screen and (max-width: 875px) {
    padding-left: 100px;
    height: 70px;
    .zoom-book {
      height: 50%;
      right: 10px;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
  @media screen and (max-width: 668px) {
    justify-content: flex-start;
  }
  @media screen and (max-width: 577px) {
    height: 50px;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    z-index: 99;
    .menu-mobile {
      display: block;
      position: absolute;
      line-height: 45px;
      font-size: 24px;
    }
    .set-size {
      right: 10px;
    }
    .show-menu {
      left: 10px;
    }
    .zoom-book {
      display: none !important;
    }
    #tool {
      display: block;
      ::after {
        display: block;
      }
    }
  }
`;

const ButtonHandling = styled.div`
  color: ${(props) => props.isDisable && "#fff"};
  border: 1px solid #afafaf;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  cursor: ${(props) => (props.isDisable ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.isDisable ? "none" : "initial")};
  &:hover {
    border: 1px solid #ff7707;
    transition: 0.3s ease-in-out;
    & > i {
      color: #ff7707;
    }
  }
  @media screen and (max-width: 875px) {
    width: 30px;
    height: 30px;
    i {
      font-size: 13px;
    }
  }
`;

const ValueTotal = styled.span`
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  color: ${COLOR_BLACK_READING_BOOK};
`;
