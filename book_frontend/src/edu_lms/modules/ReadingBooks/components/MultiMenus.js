import classNames from "classnames";
import { COLOR_ORANGE } from "edu_lms/constants/type";
import MathpixMarkdown from "mathpix-markdown-it/lib/components/mathpix-markdown";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionPopUp from "./QuestionPopUp";
import { getListQuestionSet } from "edu_lms/services/readingBook";
import { useDispatch } from "react-redux";

const MultiMenus = ({ menus, onToNextPage, pageBook }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [activeMenus, setActiveMenus] = useState([]);
  const [tooltipGoToDetailQuestionSet, setTooltipGoToDetailQuestionSet] =
    useState(false);
  const toggleGoToDetailQuestionSet = () =>
    setTooltipGoToDetailQuestionSet(!tooltipGoToDetailQuestionSet);

  const [listQuestionSet, setListQuestionSet] = useState();
  const handleClick = (data, menuName) => {
    if (data.children.length) {
      let newActiveMenus = [...activeMenus];

      if (newActiveMenus.includes(menuName)) {
        var index = newActiveMenus.indexOf(menuName);
        if (index > -1) {
          newActiveMenus.splice(index, 1);
        }
      } else {
        newActiveMenus.push(menuName);
      }

      setActiveMenus(newActiveMenus);
    } else {
      if (data.index_page) {
        onToNextPage(Number(data.index_page) - 1);
      }
    }
  };

  const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex }) => (
    <LI>
      <Item
        className={classNames("label", {
          "catalogue-active": pageBook == data.index_page - 1,
        })}
        dept={dept}
      >
        {hasSubMenu?.length > 0 && (
          <Arrow
            toggle={activeMenus.includes(menuName)}
            onClick={() => handleClick(data, menuName)}
          />
        )}
        <Label
          className="text-label"
          onClick={() => handleClick(data, menuName)}
        >
          <MathpixMarkdown
            text={String(data.title) ? String(data.title) : ""}
          />
        </Label>
      </Item>

      {hasSubMenu?.length > 0 && (
        <SubMenu
          dept={dept}
          data={data.children}
          toggle={activeMenus.includes(menuName)}
          menuIndex={menuIndex}
        />
      )}
    </LI>
  );

  const SubMenu = ({ dept, data, toggle, menuIndex }) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <UL>
        {data.map((menu, index) => {
          const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.children}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
            />
          );
        })}
      </UL>
    );
  };

  return (
    <UL>
      {menus?.map((menu, index) => {
        const dept = 1;
        const menuName = `sidebar-menu-${dept}-${index}`;
        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.children}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        );
      })}
      <QuestionPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        listQuestionSet={listQuestionSet}
      />
    </UL>
  );
};

export default MultiMenus;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const LI = styled.li`
  .label:hover {
    background-color: #fffbf7;
    border-left: 2px solid #ff7707;
    transition: 0.3s ease-in-out;
  }
`;
const Item = styled.div`
  display: flex;
  /* padding: 12px 18px; */
  padding-left: ${(props) => `${props.dept * 18}px`};
  align-items: center;
  &.catalogue-active {
    color: ${COLOR_ORANGE};
  }
`;
const Label = styled.span`
  width: 100%;
  display: block;
  cursor: pointer;
`;
const Arrow = styled.span`
  display: flex;
  height: 25px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;

    border-top: 6px solid #000;

    transform: ${(props) => (props.toggle ? "rotate(180deg)" : "rotate(0deg)")};
  }
  .label:hover &::after {
    border-top: 6px solid ${COLOR_ORANGE};
  }
`;
