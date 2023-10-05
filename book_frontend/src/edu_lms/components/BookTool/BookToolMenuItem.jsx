import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "reactstrap";
import { COLOR_ORANGE } from "edu_lms/constants/type";

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
  color: ${(props) => (props.active ? "#fff" : "#212529")};
  background-color: ${(props) => (props.active ? COLOR_ORANGE : "#fff")};

  &:hover {
    color: #fff;
    background-color: ${COLOR_ORANGE};
  }
  &:active {
    color: #fff !important;
    background-color: ${COLOR_ORANGE} !important;
  }
  &:focus {
    color: #fff !important;
    background-color: ${COLOR_ORANGE} !important;
  }
`;

const BookToolMenuItem = React.forwardRef(
  ({ item, onClick, active, style }, ref) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
      <Button
        active={active}
        type="button"
        className="btn btn-light btn-sm rounded"
        onClick={onClick}
        onTouchStart={onClick}
        style={style}
        ref={ref}
      >
        <span color="secondary" id={"Tooltip-" + item.id}>
          <i
            style={{ fontSize: "20px" }}
            className={item.icon}
            aria-hidden="true"
          />
        </span>
        <Tooltip
          placement={item.placement}
          isOpen={tooltipOpen}
          target={"Tooltip-" + item.id}
          toggle={toggle}
        >
          {item.text}
        </Tooltip>
      </Button>
    );
  }
);

export default BookToolMenuItem;
