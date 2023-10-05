import React from "react";

export default function Guide({
  onShowPopupSupport,
  onDispatchStatusIntro,
  setEventActive,
}) {
  return (
    <div className="guide-container position-relative">
      <div
        className="button-close position-absolute"
        onClick={() => setEventActive("")}
      >
        <i className="fa fa-times pr-2 cursor" aria-hidden="true" />
      </div>
      <a href="#" className="dropdown-item" onClick={onShowPopupSupport}>
        Hướng dẫn sử dụng
      </a>
      <a href="#" className="dropdown-item" onClick={onDispatchStatusIntro}>
        Giới thiệu tính năng
      </a>
    </div>
  );
}
