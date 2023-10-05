import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  URL_IMAGE_READING_BOOK,
  WIDTH_BOOK_DEFAULT,
} from "../../../constants/type";
import Canvas from "./Canvas";
import { BookToolSketch } from "../../../components/BookTool";
import { postSaveDraw } from "../../../services/bookTool";
import { onDispatchUpdatePageDraw } from "../actions";
import { onDispatchIncreaseBookTool } from "../../General/actions";
import { Tools } from "edu_lms/libs/react-sketch";

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  //height: 100%;
  top: 0;
  left: 0;
  zindex: 1;
  aspect-ratio: ${(props) => props.aspectRatio};
`;

const Page = React.forwardRef((props, ref) => {
  const [scaleBook, setScaleBook] = useState(1);
  const dispatch = useDispatch();
  const bookTool = useSelector(
    (state) => state.readingBookReducers.bookTool.page
  );
  const checkColorBookTool = useRef(bookTool.lineColor);
  const bookId = useSelector(
    (state) => state.readingBookReducers.paramaterBookId
  );
  const draw = (props.data.draws || []).find((draw) => !draw.object_id);

  const saveCanvasObjects = (objects) => {
    const postData = {
      book_id: bookId,
      page_id: props.data.id,
      data: JSON.stringify(objects),
    };
    dispatch(onDispatchUpdatePageDraw(postData));
    postSaveDraw(postData).catch((errors) => {
      console.log(errors);
    });
  };
  const checkBookToolGTM = () => {
    //bắt event GTM
    if (checkColorBookTool.current !== bookTool.lineColor) {
      dispatch(onDispatchIncreaseBookTool("count_select_color"));
    }
    switch (bookTool.drawType) {
      case "none":
        dispatch(onDispatchIncreaseBookTool("count_click_cursor"));
        break;
      case "highlight":
        dispatch(onDispatchIncreaseBookTool("count_click_brush"));
        break;
      case "text":
        dispatch(onDispatchIncreaseBookTool("count_add_text"));
        break;
      case "link":
        dispatch(onDispatchIncreaseBookTool("count_add_hyperlink"));
        break;
      case "line":
        dispatch(onDispatchIncreaseBookTool("count_add_line"));
        break;
      case "rectangle":
        dispatch(onDispatchIncreaseBookTool("count_add_rectangle"));
        break;
      case "circle":
        dispatch(onDispatchIncreaseBookTool("count_add_circle"));
        break;
      case "eraser":
        dispatch(onDispatchIncreaseBookTool("count_click_delete"));
        break;
      case "eraserAll":
        dispatch(onDispatchIncreaseBookTool("count_click_delete_all"));
        break;
      default:
        dispatch(
          onDispatchIncreaseBookTool(`count_click_${bookTool.drawType}`)
        );
        break;
    }
    checkColorBookTool.current = bookTool.lineColor;
  };

  useEffect(() => {
    const widthBook = document.getElementById("page-book");
    const singlePage = localStorage.getItem('singlePage');

    let scale = widthBook.offsetWidth / 2 / WIDTH_BOOK_DEFAULT;

    if (window.innerWidth < 630 || JSON.parse(singlePage)) {
      scale = widthBook.offsetWidth / WIDTH_BOOK_DEFAULT;
    }

    setScaleBook(scale);
  }, []);

  const isActivePage =
    Number(props.number) === props.pageBook - 1 ||
    Number(props.number) === props.pageBook;

  return (
    <div id="page-book" className="page" ref={ref} onClick={checkBookToolGTM}>
      <StyledImage
        src={`${URL_IMAGE_READING_BOOK}${props.data.background}`}
        alt=""
        width={props.widthBook}
        top={props.topBook}
        aspectRatio={props.aspectRatio}
      />
      {isActivePage && (
        <BookToolSketch
          bookTool={bookTool}
          draw={draw}
          saveCanvasObjects={saveCanvasObjects}
        />
      )}
      {isActivePage &&
        props.data.objects.length > 0 &&
        bookTool.drawType === Tools.None && (
          <Canvas
            data={props.data.objects}
            isShowStationPoint={props.isShowStationPoint}
            idName={`canvas-${props.data.id}`}
            onQuestionGame={props.onQuestionGame}
            language={props.language}
            pageId={props.data.id}
            scaleBook={scaleBook}
          />
        )}
    </div>
  );
});

export default memo(Page);
