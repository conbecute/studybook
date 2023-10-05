import React, { useState, useRef } from "react";
import styled from "styled-components";
import Overlay from "react-bootstrap/Overlay";
import { COLOR_ORANGE } from "edu_lms/constants/type";
import BookToolMenuItem from "./BookToolMenuItem";

const Wrapper = styled.div`
  position: relative;
  width: 40px;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-bottom: 8px solid #212529;
    border-left: 8px solid transparent;
    position: absolute;
    right: 1px;
    bottom: 1px;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  background-color: #fff;
  border-radius: 12px;
  z-index: 10000;
  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${COLOR_ORANGE};
    background-color: ${COLOR_ORANGE};
  }
  .custom-control-input:focus ~ .custom-control-label::before {
    border-color: #ccc;
    box-shadow: 0 0 0 #fff;
  }
  li {
    background-color: #fff;
    padding: 2px;
  }
`;

const BookToolMenuGroup = ({ icon, items, text, id, active }) => {
  const [displayMenuGroup, setDisplayMenuGroup] = useState(false);
  const target = useRef(null);

  const handleClick = () => {
    setDisplayMenuGroup(!displayMenuGroup);
  };

  const handleClose = () => {
    setDisplayMenuGroup(false);
  };

  return (
    <Wrapper>
      <BookToolMenuItem
        item={{
          id,
          placement: "left",
          text,
          icon,
        }}
        onClick={handleClick}
        onTouchStart={handleClick}
        ref={target}
        active={active}
      />
      <Overlay
        target={target.current}
        show={displayMenuGroup}
        placement="right"
        rootClose
        onHide={handleClose}
      >
        {({ ...props }) => (
          <StyledUl {...props}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </StyledUl>
        )}
      </Overlay>
    </Wrapper>
  );
};

export default BookToolMenuGroup;
