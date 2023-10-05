import { useEffect, useState } from "react";
import styled from "styled-components";
import { onDecryptedData } from "../selection";
import * as CONSTANTS_TYPE from "edu_lms/constants/type";
import ideaImg from "edu_lms_v2/assets/img/idea.svg";
import ideaWhiteImg from "edu_lms_v2/assets/img/idea-white.svg";

export default function Footer({
  isButtonNext,
  onNextQuestion,
  handleCheckAnswer,
  onConfirmSubmit,
  isModeExam,
  isLastQuestion,
  isDone,
  onRefresh,
  toggle,
}) {
  const [isUserHoc10, setIsUserHoc10] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userInfo = onDecryptedData(
        localStorage.getItem(CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO),
        CONSTANTS_TYPE.LOCAL_STORAGE_KEY_USER_INFO
      );
      setIsUserHoc10(userInfo.is_user_hoc10);
    }
  }, []);

  return (
    <DivFooter className="d-flex align-items-center">
      {isUserHoc10 && (
        <Button
          type="button"
          className="ml-3 px-md-3 px-2 mt-2 refresh"
          onClick={() => onRefresh()}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </Button>
      )}
      <ButtonWrapper>
        {isModeExam ? (
          <Button
            type="button"
            className={`px-md-3 px-2 ${isDone ? "btn-pr" : "btn-sub"}`}
            onClick={() => onConfirmSubmit()}
          >
            Nộp bài
          </Button>
        ) : (
          <Button
            className="px-md-3 px-2 btn-sub suggestion"
            onClick={() => toggle()}
          >
            <img src={ideaImg} className="orange" alt="#" width={24} />
            <img src={ideaWhiteImg} className="white" alt="#" width={24} />
            <span className="ml-2">Gợi ý</span>
          </Button>
        )}
        {!isButtonNext ? (
          <ButtonCheck
            type="submit"
            className="px-md-3 px-2 btn-pr"
            onClick={() => handleCheckAnswer()}
          >
            {isModeExam ? "Xác nhận" : "Kiểm tra"}
          </ButtonCheck>
        ) : (
          <ButtonCheck
            type="button"
            className={`px-md-3 px-2 btn-pr monkey-bg-green-2 ${
              isLastQuestion && isModeExam && "d-none"
            }`}
            onClick={() => onNextQuestion()}
          >
            Tiếp tục
          </ButtonCheck>
        )}
      </ButtonWrapper>
    </DivFooter>
  );
}

const DivFooter = styled.div`
  background-color: #eaeced;
  width: 100%;
  @media (max-width: 767px) {
    right: 0;
    height: 75px;
    width: 100%;
    justify-content: center;
  }
  height: 70px;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;
const ButtonWrapper = styled.div`
  @media (min-width: 768px) {
    margin-right: 30%;
    margin-left: auto;
  }
  @media screen and (min-width: 769px) and (max-width: 992px) {
    position: absolute;
    height: 50px;
    right: 15%;
  }
`;
const ButtonCheck = styled.button`
  border-radius: 7px;
  height: 48px;
  width: 130px;
  font-size: 20px;
  @media (max-width: 768px) {
    height: 46px;
    width: 90px;
    font-size: 16px;
  }
`;
const Button = styled.button`
  border-radius: 7px;
  height: 48px;
  width: 120px;
  margin-right: 20px;
  font-size: 20px;
  @media (max-width: 768px) {
    height: 46px;
    width: 90px;
    font-size: 16px;
  }
  &.refresh:hover {
    color: #f70;
  }
  &.refresh {
    color: #d7d7d7;
  }
  &.suggestion {
    justify-content: center;
    img {
      display: inline-block;
      &.orange {
        display: inline-block;
      }
      &.white {
        display: none;
      }
    }
  }
  &.suggestion:hover {
    img {
      &.orange {
        display: none;
      }
      &.white {
        display: inline-block;
      }
    }
  }
`;
