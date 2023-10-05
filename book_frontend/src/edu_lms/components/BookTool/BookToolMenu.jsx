import React, { useState } from "react";
import classNames from "classnames";
import styled from "styled-components";
import Draggable from "react-draggable";
import { DEFAULT_BOOK_TOOLS } from "./const";
import ColorPickerButton from "./ColorPickerButton";
import LineWidthPickerButton from "./LineWidthPickerButton";
import TimerButton from "./TimerButton";
import BookToolMenuItem from "./BookToolMenuItem";
import { COLOR_ORANGE, INNER_WIDTH } from "edu_lms/constants/type";

const ToolWrapper = styled.div`
  position: fixed;
  z-index: 16;
  &.tool-mobile {
    bottom: 70px;
  }
  &.tool-desktop {
    left: 2px;
    top: 20%;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  border-radius: 12px;
  border: 1px solid #dee2e6;

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${COLOR_ORANGE};
    background-color: ${COLOR_ORANGE};
  }
  .custom-control-input:focus ~ .custom-control-label::before {
    border-color: #ccc;
    box-shadow: 0 0 0 #fff;
  }
  li {
    padding: 3px 2.5px;
  }
  @media (min-width: 500px) {
    max-width: 100px;
    .fa-ellipsis-h {
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  @media (max-width: 500px) {
    overflow: auto;
  }
`;

const ScrollBookTool = styled.div`
  &.book-tool-mobile {
    overflow: auto;
    width: ${window.innerWidth}px;
  }
`;

const BookToolMenu = ({
  bookTool,
  onChangeDrawType,
  onChangeLineColor,
  onChangeLineWidth,
  isOnGame,
}) => {
  const isMobile = window.innerWidth <= INNER_WIDTH.MOBILE;
  const isNotMobile = window.innerWidth > INNER_WIDTH.MOBILE;

  const [isDisabled, setIsDisabled] = useState(false);

  const menu = (
    <ToolWrapper
      isOnGame={isOnGame}
      className={classNames({
        "tool-mobile": isMobile,
        "tool-desktop": isNotMobile,
      })}
    >
      <ScrollBookTool
        className={classNames({
          "book-tool-mobile": isMobile,
        })}
      >
        {bookTool.show && (
          <StyledUl
            className={classNames("monkey-bg-white position-relative", {
              "p-1 pt-4": isNotMobile,
              "d-flex align-items-center": isMobile,
            })}
          >
            {isNotMobile && (
              <i
                className="fa fa-ellipsis-h position-absolute"
                aria-hidden="true"
              />
            )}
            {DEFAULT_BOOK_TOOLS.map((item, i) => (
              <ul
                key={i}
                className={classNames("d-flex py-1", {
                  "flex-wrap": isNotMobile,
                })}
                style={{ borderBottom: "1px solid #FDEBD0" }}
              >
                {item.children.map((tool) => (
                  <>
                    <li key={tool.id} className="monkey-bg-white">
                      <BookToolMenuItem
                        item={tool}
                        active={bookTool.drawType === tool.id}
                        onClick={() => onChangeDrawType(tool.id)}
                        onTouchStart={() => onChangeDrawType(tool.id)}
                      />
                    </li>
                  </>
                ))}
              </ul>
            ))}
            <li
              className="py-2 d-flex justify-content-between"
              style={{ borderBottom: "1px solid #FDEBD0" }}
            >
              <ColorPickerButton
                color={bookTool.lineColor}
                onChange={onChangeLineColor}
                setIsDisabled={setIsDisabled}
              />
              <LineWidthPickerButton
                lineWidth={bookTool.lineWidth}
                onChange={onChangeLineWidth}
                setIsDisabled={setIsDisabled}
              />
            </li>
            <li
              className={classNames({
                "pt-2 pb-1": isNotMobile,
              })}
            >
              <TimerButton />
            </li>
          </StyledUl>
        )}
      </ScrollBookTool>
    </ToolWrapper>
  );

  return isNotMobile ? (
    <div title="Nhấn giữ để di chuyển thanh công cụ">
      <Draggable defaultClassName="cursor-move" disabled={isDisabled}>
        {menu}
      </Draggable>
    </div>
  ) : (
    menu
  );
};

export default BookToolMenu;
