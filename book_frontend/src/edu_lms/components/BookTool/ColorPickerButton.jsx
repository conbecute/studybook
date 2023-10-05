import React, { useState } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";
import * as material from "material-colors";
import BookToolMenuItem from "./BookToolMenuItem";

const Wrapper = styled.div`
  position: relative;
  @media (max-width: 500px) {
    padding-right: 5px;
  }
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
  left: 42px;
  top: 0;
  background-color: #e2e6ea;
  padding: 10px;
  border-radius: 0.2rem;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ColorPickerButton = ({ color, onChange, setIsDisabled }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
    setIsDisabled(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    setIsDisabled(false);
  };

  return (
    <Wrapper>
      <BookToolMenuItem
        item={{
          id: "color",
          placement: "left",
          text: "Chọn màu",
          icon: "fa fa-adjust",
        }}
        onTouchStart={handleClick}
        onClick={handleClick}
        style={{ color }}
      />
      {displayColorPicker ? (
        <Popover>
          <Cover onTouchStart={handleClose} onClick={handleClose} />
          <CirclePicker
            colors={[
              material.red["500"],
              material.pink["500"],
              material.purple["500"],
              material.deepPurple["500"],
              material.indigo["500"],
              material.blue["500"],
              material.lightBlue["500"],
              material.cyan["500"],
              material.teal["500"],
              material.green["500"],
              material.lightGreen["500"],
              material.lime["500"],
              material.yellow["500"],
              material.amber["500"],
              material.orange["500"],
              material.deepOrange["500"],
              material.brown["500"],
              material.blueGrey["500"],
            ]}
            color={color}
            onChange={(color) => {
              onChange(color.hex);
              handleClose();
            }}
          />
        </Popover>
      ) : null}
    </Wrapper>
  );
};

export default ColorPickerButton;
