import React from "react";
import styled from "styled-components";

const WrapperGameQuestion = styled.div`
  width: 70%;
  margin: 0 auto auto;
  height: 90%;
`;

const GameQuestion = (props) => {
  const onShowBook = () => {
    props.onShowBook();
  };
  return (
    <WrapperGameQuestion>
      <div
        className="header-game-question "
        style={{ height: "40px", backgroundColor: "rgb(81,45,168)" }}
      >
        <a
          className="cursor p-2 d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          onClick={onShowBook}
        >
          <i
            className="fa fa-reply-all monkey-color-white monkey-fz-18"
            aria-hidden="true"
          ></i>
        </a>
      </div>
      <div
        className="body-game-question monkey-bg-white position-relative"
        style={{ height: "90%" }}
      >
        {props.children}
      </div>
    </WrapperGameQuestion>
  );
};
export default GameQuestion;
