import React from "react";
import styled from "styled-components";
import { COLOR_GREEN } from "../../../../constants/type";
import ButtonCheck from "./ButtonCheck";
const FooterComponent = ({
  data,
  isDisabled,
  alert,
  indexQuestion,
  isButtonReset,
  onHandleQuestion,
  onResetFormData,
  onSubmitForm,
  handleDispatchDataAlert,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  dataAnswer,
}) => {
  return (
    <Footer>
      <div>
        {data.length > 1 &&
          data.map((item, index) => (
            <span
              onClick={() => onHandleQuestion(index)}
              key={index}
              className={`${
                indexQuestion === index ? "monkey-color-blue" : ""
              } mr-3 ml-3 cursor monkey-fz-20`}
              style={{
                borderBottom: `${
                  indexQuestion === index
                    ? `2px solid ${COLOR_GREEN}`
                    : "initial"
                }`,
              }}
            >
              {index + 1}
            </span>
          ))}
      </div>
      <ButtonCheck
        isDisabled={isDisabled}
        alert={alert}
        isButtonReset={isButtonReset}
        onResetFormData={onResetFormData}
        onSubmitForm={onSubmitForm}
        handleDispatchDataAlert={handleDispatchDataAlert}
        totalQuestion={totalQuestion}
        countCorrect={countCorrect}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        dataAnswer={dataAnswer}
      />
    </Footer>
  );
};
export default FooterComponent;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
