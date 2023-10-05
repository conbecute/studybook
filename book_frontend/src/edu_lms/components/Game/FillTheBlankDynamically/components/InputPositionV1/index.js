import React from 'react';
import style from './style.module.scss';

const IMAGE_WIDTH_WEB_VIEW = 1106;
const IMAGE_WIDTH_CMS_VIEW = 1106;

const InputPositionV1 = React.forwardRef(({ widthForm, fontSize, color, position, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="text"
      className={`monkey-fz-20 quicksand-medium ${style['input-position-v1']}`}
      style={{
        fontSize: `${fontSize}px`,
        color: color,
        position: "absolute",
        border: "none",
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        top: ((widthForm || IMAGE_WIDTH_WEB_VIEW) / IMAGE_WIDTH_CMS_VIEW) * position.vertical_axis_px,
        left: ((widthForm || IMAGE_WIDTH_WEB_VIEW) / IMAGE_WIDTH_CMS_VIEW) * position.horizontal_axis_px,
      }}
      placeholder="?"
      autoComplete="off"
    />
  );
});

export default InputPositionV1;