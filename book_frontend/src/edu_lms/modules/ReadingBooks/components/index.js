import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "turn.js";
import HTMLFlipBook from "react-pageflip";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";
import Page from "./Page";
import HeaderReadingBook from "./HeaderReadingBook";
import HeaderLeftReadingBook from "./readingBooksV2/HeaderLeftReadingBook";
import FooterReadingBook from "./FooterReadingBook";
import MenuComponent from "./MenuComponent";
import { BookToolMenu } from "../../../components/BookTool";
import { INNER_WIDTH } from "../../../constants/type";
import { onDispatchUpdateBookToolPage } from "../actions";
import { useParams } from "react-router-dom";
import { Tools } from "edu_lms/libs/react-sketch";
import TableOfContent from "./readingBooksV2/TableOfContent";
import Practice from "./readingBooksV2/Practice";
import FooterReadingBookV2 from "./readingBooksV2/FooterReadingBookV2";
import { findIdQuestion } from "./const";
import SEO from "../../../components/Seo";

const ReadingBooksWrapper = ({
  bookId,
  bookType,
  bookName,
  pageBook,
  menuBook,
  dataBook,
  heightBook,
  aspectRatio,
  total,
  languageBook,
  onQuestionGame,
  onDispatchPageBook,
  onDispatchCurrentMenu,
  onDispatchShowPopupActiveFree,
  onDispatchUpdatePageId,
  onDispatchStatusTour,
}) => {
  const dispatch = useDispatch();
  const bookTool = useSelector(
    (state) => state.readingBookReducers.bookTool.page
  );
  const flipBook = useRef("");
  const { pageId } = useParams();
  const [isDisable, setStateDisable] = useState(false);
  const [isMenu, setStateMenu] = useState(false);
  const [showMenu, setStateShowMenu] = useState(false);
  const [isShowStationPoint, setStateShowStationPoint] = useState(true);
  const [numberWidth, setStateWithBrotherNumber] = useState(1441);
  const [eventActive, setEventActive] = useState("");
  const [isShowPractice, setIsShowPractice] = useState(false);
  const [isShowMenuWidthMobile, setIsShowMenuWidthMobile] = useState(false);

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      let eventPage = flipBook.current.pageFlip();
      if (localStorage.getItem("doc-sach-hidden-intro")) {
        if (event.keyCode === 39) {
          if (eventPage.pages.currentPageIndex >= dataBook.length - 4) {
            onDispatchShowPopupActiveFree();
          }
          flipBook.current.pageFlip().flipNext();
          updateUrl(flipBook.current.pageFlip().pages.currentPageIndex + 2);
        }
        if (event.keyCode === 37) {
          flipBook.current.pageFlip().flipPrev();
          updateUrl(flipBook.current.pageFlip().pages.currentPageIndex - 2);
        }
      }
    };

    if (dataBook.length > 0) {
      window.addEventListener("keydown", handleUserKeyPress);
      window.addEventListener("contextmenu", handleRightClick);
    }
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      window.removeEventListener("keydown", handleKeyCode);
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, [
    bookId,
    dataBook,
    onDispatchShowPopupActiveFree,
    onDispatchStatusTour
  ]);

  useEffect(() => {
    const singlePage = localStorage.getItem("singlePage");

    setStateWithBrotherNumber(JSON.parse(singlePage) ? 500 : window.innerWidth);
  }, [bookId]);

  const handleRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  const handleKeyCode = (event) => {
    if (event.keyCode === 123) {
      event.preventDefault();
      return false;
    }
  };

  const onFlip = (e) => {
    const currentMenu = findIdQuestion(menuBook, e.data);
    onDispatchCurrentMenu(currentMenu);
    onDispatchPageBook(e.data);
  };

  const updateUrl = (numberPage) => {
    var new_url =
      "/doc-sach/" +
      bookName +
      "/" +
      bookType +
      "/" +
      bookId +
      "/" +
      numberPage +
	  "/";
    window.history.replaceState("", "", new_url);
  };

  const nextButtonClick = (numberPage) => {
    if (numberPage) {
      flipBook.current.pageFlip().flip(Number(numberPage));
    } else {
      if (
        flipBook.current.pageFlip().pages.currentPageIndex >=
        dataBook.length - 4
      ) {
        onDispatchShowPopupActiveFree();
      }
      flipBook.current.pageFlip().flipNext();
      setStateDisable(true);
    }

    updateUrl(flipBook.current.pageFlip().pages.currentPageIndex + 2);
  };

  const prevButtonClick = (numberPage) => {
    if (numberPage) {
      flipBook.current.pageFlip().flip(Number(numberPage));
    } else {
      flipBook.current.pageFlip().flipPrev();
      setStateDisable(true);
    }

    updateUrl(flipBook.current.pageFlip().pages.currentPageIndex - 2);
  };

  const onChangeState = (e) => {
    if (e.data === "read") {
      setStateDisable(false);
    }
  };

  const onToNextPage = (numberPage) => {
    if (numberPage >= dataBook.length - 2) {
      onDispatchShowPopupActiveFree();
    }
    flipBook.current.pageFlip().flip(Number(numberPage));

    updateUrl(numberPage);
  };

  const onShowMenu = (isShowMenu) => {
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        show: false,
        control: false,
      })
    );
    if (isMenu) {
      setStateMenu(!isMenu);
      setTimeout(() => {
        setStateShowMenu(isShowMenu);
      }, 1000);
    } else {
      setStateShowMenu(isShowMenu);
      setStateMenu(!isMenu);
    }
    setEventActive("");
  };

  const onToggleStationPoint = () => {
    setStateShowStationPoint(!isShowStationPoint);
  };

  const onChangeDrawType = (drawType) => {
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        drawType,
      })
    );
  };

  const onChangeLineColor = (lineColor) => {
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        lineColor,
      })
    );
  };

  const onDispatchStatusIntro = () => {
    if (!localStorage.getItem("doc-sach-hidden-intro")) {
      onDispatchStatusTour(true);
    }
  };

  const onChangeLineWidth = (lineWidth) => {
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        lineWidth,
      })
    );
  };

  return (
    <Wrapper numberWidth={numberWidth}>
	    <SEO totalPage={total}></SEO>
      <HeaderReadingBook />
      <HeaderLeftReadingBook
        isMenu={isMenu}
        onShowMenu={onShowMenu}
        onToggleStationPoint={onToggleStationPoint}
        eventActive={eventActive}
        setEventActive={setEventActive}
        setIsShowPractice={setIsShowPractice}
        isShowPractice={isShowPractice}
        isShowMenuWidthMobile={isShowMenuWidthMobile}
      />
      {showMenu &&
      <TableOfContent
        menuBook={menuBook}
        isMenu={isMenu}
        showMenu={showMenu}
        onToNextPage={onToNextPage}
        pageBook={pageBook}
        onShowMenu={onShowMenu}
      />
      }
      {isShowPractice && (
        <Practice
          setIsShowPractice={setIsShowPractice}
          isShowPractice={isShowPractice}
        />
      )}

      {/* <MenuComponent
        menuBook={menuBook}
        isMenu={isMenu}
        showMenu={showMenu}
        onToNextPage={onToNextPage}
        pageBook={pageBook}
      /> */}
      {dataBook.length > 0 && (
        <>
          <BookToolMenu
            bookTool={bookTool}
            onChangeDrawType={onChangeDrawType}
            onChangeLineColor={onChangeLineColor}
            onChangeLineWidth={onChangeLineWidth}
          />

          <TransformWrapper
            initialScale={1}
            minScale={0}
            centerOnInit={true}
            centerZoomedOut={true}
            initialPositionX={0}
            initialPositionY={0}
            defaultPositionX={200}
            defaultPositionY={100}
            disabled={bookTool.drawType !== Tools.None}
          >
            {({ zoomIn, zoomOut, resetTransform, state }) => (
              <>
                <TransformComponent>
                  <Container>
                    <div id="full-screen">
                      {heightBook &&
                        <HTMLFlipBook
                          width={550}
                          height={heightBook}
                          size="stretch"
                          minWidth={315}
                          maxWidth={1000}
                          minHeight={300}
                          maxHeight={1533}
                          showCover={false}
                          mobileScrollSupport={true}
                          ref={flipBook}
                          flippingTime={500}
                          useMouseEvents={false}
                          autoSize={true}
                          onFlip={onFlip}
                          onChangeState={onChangeState}
                          className="reading-book"
                          onInit={onDispatchStatusIntro}
                          startPage={+pageId}
                        >
                          {dataBook.map((item, index) => (
                            <Page
                              number={`${index}`}
                              data={item}
                              key={index}
                              onQuestionGame={onQuestionGame}
                              onDispatchUpdatePageId={onDispatchUpdatePageId}
                              pageBook={pageBook + 1}
                              heightBook={heightBook}
                              aspectRatio={aspectRatio}
                              isShowStationPoint={isShowStationPoint}
                            />
                          ))}
                        </HTMLFlipBook>
                      }
                    </div>
                  </Container>
                </TransformComponent>
                {/* <FooterReadingBook
                  bookType={bookType}
                  isMenu={isMenu}
                  bookId={bookId}
                  page={pageBook}
                  pageId={pageId}
                  resultDataLength={dataBook.length}
                  total={total}
                  languageBook={languageBook}
                  isDisable={isDisable}
                  prevButtonClick={prevButtonClick}
                  nextButtonClick={nextButtonClick}
                  onToNextPage={onToNextPage}
                  onShowMenu={onShowMenu}
                  onToggleStationPoint={onToggleStationPoint}
                  zoomIn={() => zoomIn(0.1)}
                  zoomOut={() => zoomOut(0.1)}
                  resetTransform={() => resetTransform()}
                  scale={state.scale}
                /> */}
                <FooterReadingBookV2
                  bookType={bookType}
                  isMenu={isMenu}
                  bookId={bookId}
                  page={pageBook}
                  pageId={pageId}
                  resultDataLength={dataBook.length}
                  total={total}
                  languageBook={languageBook}
                  isDisable={isDisable}
                  prevButtonClick={prevButtonClick}
                  nextButtonClick={nextButtonClick}
                  onToNextPage={onToNextPage}
                  onShowMenu={onShowMenu}
                  onToggleStationPoint={onToggleStationPoint}
                  zoomIn={() => zoomIn(0.1)}
                  zoomOut={() => zoomOut(0.1)}
                  resetTransform={() => resetTransform()}
                  scale={state.scale}
                  isShowMenuWidthMobile={isShowMenuWidthMobile}
                  setIsShowMenuWidthMobile={setIsShowMenuWidthMobile}
                />
              </>
            )}
          </TransformWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ReadingBooksWrapper;

const Wrapper = styled.div`
  position: fixed;
  // width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: #f7f9fc;
  #full-screen {
    max-width: ${(props) => onResultWidth(props.numberWidth)};
    width: 100%;
    height: auto;
  }
`;

const Container = styled.div`
  padding-left: 135px;
  position: relative;
  height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1150px) {
    padding-left: 100px;
  }
  @media screen and (max-width: 577px) {
    padding-left: 0;
  }
`;

function onResultWidth(numberWidth) {
  let result = "1250px";
  if (numberWidth <= INNER_WIDTH.DESKTOP) {
    result = "1090px";
  }
  if (numberWidth <= INNER_WIDTH.LAPTOP) {
    result = "969px";
  }
  if (numberWidth <= INNER_WIDTH.IPAD) {
    result = "969px";
  }
  if (numberWidth <= INNER_WIDTH.MOBILE) {
    result = "600px";
  }
  return result;
}
