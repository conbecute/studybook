import React from "react";

export default function ViewModeReadingBook({ viewMode }) {
  return (
    <>
      <img src={viewMode.icon} alt="icon-view-mode" />
      <p>{viewMode.title}</p>
    </>
  );
}
