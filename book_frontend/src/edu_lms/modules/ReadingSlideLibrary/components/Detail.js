import React from "react";
import { URL_IMAGE } from "../../../constants/type";

const Detail = ({ activeSlide }) => (
  <img
    width="100%"
    src={`${process.env.REACT_APP_MEDIA_URL_APP}${activeSlide[0]?.image}`}
    alt=""
  />
);

export default Detail;
