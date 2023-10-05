import React from "react";
import styled from "styled-components";
import { COLOR_GREEN } from "../../../../constants/type";
import ButtonCheck from "./ButtonCheck";
const FooterComponent = ({
  data,
  isDisabled,
  indexQuestion,
  isButtonReset,
  onHandleQuestion,
  onSubmitForm,
  setShowAlert,
  showAlert,
  totalQuestion,
  totalAnswer,
  nextQuestion,
  onResetFormData,
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
        isButtonReset={isButtonReset}
        onSubmitForm={onSubmitForm}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        totalQuestion={totalQuestion}
        totalAnswer={totalAnswer}
        nextQuestion={nextQuestion}
        data={data}
        onResetFormData={onResetFormData}
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
