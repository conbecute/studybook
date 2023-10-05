import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLOR_WHITE } from "../../../constants/type";

const Footer = ({}) => {
  useEffect(() => {}, []);

  return (
    <WraperButtonFooter>
      <FooterWrapper>
        <div className="d-flex justify-content-start align-items-center">
          <p>
            <IStyle className="fa fa-list" aria-hidden="true"></IStyle>{" "}
            <Span>Danh sách</Span>
          </p>
        </div>
      </FooterWrapper>
    </WraperButtonFooter>
  );
};

export default Footer;

const WraperButtonFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const IStyle = styled.i`
  color: #0066b2;
  font-weight: bold;
`;

const Span = styled.span`
  color: #0066b2;
  font-weight: bold;
  margin-left: 10px;
`;

const FooterWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  background-color: none;
  padding: 10px 45px;
  left: 0;
  align-items: center;
  text-align: center;
  z-index: 4;
  display: flex;
  justify-content: start;
  .form-control {
    background-color: rgba(0, 0, 0, 0.2);
    width: 120px;
    border-radius: 25px;
    border-color: transparent;
    color: ${COLOR_WHITE};
    text-align: center;
    &:hover {
      border: 1px solid rgba(0, 102, 178, 0.28);
      box-shadow: 0 0 0 0.2rem rgba(0, 102, 178, 0.26);
    }
    ::placeholder {
      color: ${COLOR_WHITE};
      opacity: 1;
    }
  }
`;
