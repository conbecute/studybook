import React from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import MultiMenus from "../MultiMenus";

export default function TableOfContent({
  isMenu,
  showMenu,
  menuBook,
  onToNextPage,
  pageBook,
  onShowMenu,
}) {
  return (
    <MenuWrapper showMenu={showMenu}>
      {showMenu && (
        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOutLeft"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={isMenu}
          className="p-0"
        >
          <div className="p-1 monkey-color-back-reading-book monkey-fz-4 monkey-f-header table-content">
            <div className="d-flex justify-content-between align-content-center align-items-center">
              <p className="title monkey-fz-20 pt-4 pb-3">MỤC LỤC</p>
              <i
                className="fa fa-times pr-2 cursor"
                aria-hidden="true"
                onClick={() => onShowMenu(false)}
              />
            </div>
            <span className="text-left menu-book">
              {menuBook && menuBook[0]?.id ? (
                <MultiMenus
                  onToNextPage={onToNextPage}
                  menus={menuBook}
                  pageBook={pageBook}
                />
              ) : (
                "Updating..."
              )}
            </span>
          </div>
        </Animated>
      )}
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 148px;
  z-index: ${({ showMenu }) => (showMenu ? 40 : -1)};
  width: 250px;
  height: calc(100% - 140px);
  .animated {
    width: 100%;
    height: 100%;
  }
  overflow-y: auto;
  .table-content {
    min-height: 100%;
    width: calc(100%-50px);
    background-color: #fff;
  }
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 1150px){
    left: 100px;
    z-index: 9;
    height: calc(100% - 125px);
  }
  @media screen and (max-width: 577px) {
    left: 100px;
  }
`;
