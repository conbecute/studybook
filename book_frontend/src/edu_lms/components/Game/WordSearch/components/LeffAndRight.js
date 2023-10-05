import React, { useState } from "react";
import styled from "styled-components";
import _, { set } from "lodash";
import { TypeGameMultipleChoice } from "../../selection";
import { URL_IMAGE_QUESTION } from "../../../../constants/type";

const LeftAndRight = ({
  listResult,
  wordsCorrect,
  fontSizeResult,
  typeResult,
  girds,
  fontSizeAnswer,
  fontSizeAnswerPx,
  isFirework,
  onChooseCell,
  listImage,
}) => {
  const reverseString = (str) => {
    return [...str].reverse().join("");
  };
  const chooseCell = (iRow, _iCell) => {
    onChooseCell(iRow, _iCell);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3 mt-5">
          <div className="row">
            {listImage[0].map((image) => (
              <div className="col-md-6 cursor">
                {wordsCorrect.includes(image.text.replace(" ", "")) ||
                wordsCorrect.includes(
                  reverseString(image.text).replace(" ", "")
                ) ? (
                  <>
                    {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                      image.text}
                    {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                      <img
                        style={{ opacity: 0.3 }}
                        src={`${URL_IMAGE_QUESTION}${image.image}`}
                        width="100px"
                        height="auto"
                        alt=""
                      />
                    )}
                  </>
                ) : (
                  <>
                    {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                      image.text}
                    {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                      <img
                        src={`${URL_IMAGE_QUESTION}${image.image}`}
                        width="100px"
                        height="auto"
                        alt=""
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="row d-flex justify-content-center mt-5">
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
        <div className="col-md-3 mt-5">
          <div className="row">
            {listImage[1].map((image) => (
              <div className="col-md-6 cursor">
                {wordsCorrect.includes(image.text.replace(" ", "")) ||
                wordsCorrect.includes(
                  reverseString(image.text).replace(" ", "")
                ) ? (
                  <>
                    {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                      image.text}
                    {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                      <img
                        style={{ opacity: 0.3 }}
                        src={`${URL_IMAGE_QUESTION}${image.image}`}
                        width="100px"
                        height="auto"
                        alt=""
                      />
                    )}
                  </>
                ) : (
                  <>
                    {_.includes(typeResult, TypeGameMultipleChoice.TEXT) &&
                      image.text}
                    {_.includes(typeResult, TypeGameMultipleChoice.IMAGE) && (
                      <img
                        src={`${URL_IMAGE_QUESTION}${image.image}`}
                        width="100px"
                        height="auto"
                        alt=""
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
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

export default LeftAndRight;
