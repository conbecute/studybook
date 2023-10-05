import React, { useState } from "react";
import styled from "styled-components";
import _, { set } from "lodash";
import { TypeGameMultipleChoice } from "../../selection";
import { URL_IMAGE_QUESTION } from "../../../../constants/type";

const Top = ({
  listResult,
  wordsCorrect,
  fontSizeResult,
  typeResult,
  girds,
  fontSizeAnswer,
  fontSizeAnswerPx,
  isFirework,
  onChooseCell,
}) => {
  const chooseCell = (iRow, _iCell) => {
    onChooseCell(iRow, _iCell);
  };

  return (
    <div>
      <div className="row justify-content-center mt-3">
        {listResult.map((result, index) =>
          wordsCorrect.includes(result.text.replace(" ", "")) ? (
            <LiStyle
              key={index}
              style={{
                textDecorationLine: "line-through",
                textDecorationThickness: "3px",
                fontSize: `${fontSizeResult ? fontSizeResult : "18px"}`,
              }}
            >
              {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                result.text}
              {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                <img
                  style={{ opacity: 0.3 }}
                  src={`${URL_IMAGE_QUESTION}${result.image}`}
                  width="100px"
                  height="auto"
                  alt=""
                />
              )}
            </LiStyle>
          ) : (
            <LiStyle
              key={index}
              style={{
                marginBottom: "20px",
                fontSize: `${fontSizeResult ? fontSizeResult : "18px"}`,
              }}
            >
              {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                result.text}
              {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                <img
                  src={`${URL_IMAGE_QUESTION}${result.image}`}
                  width="100px"
                  height="auto"
                  alt=""
                />
              )}
            </LiStyle>
          )
        )}
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="gird-wrapper-v1">
          <table style={{ borderSpacing: "10px" }}>
            <tbody>
              {girds?.map((row, iRow) => (
                <tr key={iRow}>
                  {row.map((cell, _iCell) => (
                    <td
                      key={_iCell}
                      onClick={() => chooseCell(iRow, _iCell)}
                      className="cell-v1 noselect"
                      style={{
                        width: `${fontSizeAnswer < 30 ? "45px" : "65px"}`,
                        height: `${fontSizeAnswer < 30 ? "45px" : "65px"}`,
                        background: `${
                          cell.status === 1
                            ? "#14C6F4"
                            : cell.status === 2
                            ? "#23BF2D"
                            : cell.status === 3
                            ? "#fff"
                            : ""
                        }`,
                      }}
                    >
                      <span
                        style={{
                          color: `${cell.status === 3 ? "#fff" : "black"}`,
                          fontSize: `${
                            fontSizeAnswerPx ? fontSizeAnswerPx : "18px"
                          }`,
                        }}
                      >
                        {cell.text}
                      </span>
                      {isFirework && cell.check && (
                        <div className="pyro">
                          <div className="before"></div>
                          <div className="after"></div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LiStyle = styled.li`
  margin-right: 25px;
  color: #14c6f4;
  font-size: 25px;
  list-style-type: none;
`;

export default Top;
