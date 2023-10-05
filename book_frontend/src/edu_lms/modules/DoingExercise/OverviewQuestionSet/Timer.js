import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import waitingAudio from "../../../assets/audio/waitingAudio.mp3";
import classNames from "classnames";

export default function Timer({ isCountDown, limitedTime, onTimeUp }) {
  const historyTimer = JSON.parse(localStorage.getItem("timer"));
  const [second, setSecond] = useState(historyTimer?.second || 0);
  const [minute, setMinute] = useState(
    historyTimer?.minute ? historyTimer.minute : isCountDown ? limitedTime : 0
  );

  useEffect(() => {
    localStorage.setItem(
      "timer",
      JSON.stringify({ second: second, minute: minute })
    );
    if (isCountDown) {
      if (second >= 0) {
        const timer = setTimeout(() => {
          if (second === 0 && minute === 0) {
            onTimeUp();
            return;
          } else {
            setSecond((second) => second - 1);
          }
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        if (minute > 0) {
          setMinute((minute) => minute - 1);
          setSecond(59);
        }
      }
    } else {
      if (second < 60) {
        const timer = setTimeout(() => setSecond((pre) => pre + 1), 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        setMinute((pre) => pre + 1);
        setSecond(0);
      }
    }
  }, [second]);

  return (
    <TimerWrapper
      className={classNames(
        "m-auto d-flex justify-content-center align-items-center",
        {
          lessThan5Minute: isCountDown && minute < 5,
          moreThan5Minute: (isCountDown && minute >= 5) || !isCountDown,
        }
      )}
    >
      <ReactAudioPlayer
        src={isCountDown && minute < 5 ? waitingAudio : ""}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
      <Time className="d-block text-center">
        <Span>{minute >= 10 ? minute : "0" + minute}</Span> :
        <Span>{second >= 10 ? second : "0" + second}</Span>
      </Time>
    </TimerWrapper>
  );
}
const TimerWrapper = styled.div`
  height: 80px;
  border: 2px solid #ff7707;
  border-radius: 10px;
  width: 140px;
  @media (max-width: 767px) {
    height: 40px;
  }
  &.lessThan5Minute {
    background-color: #bb2124;
  }
  &.moreThan5Minute {
    background-color: #fcba03;
  }
`;
const Time = styled.div`
  color: white;
  font-size: 28px;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;
const Span = styled.span`
  display: inline-block;
  width: 35px;
  margin-left: 5px;
`;
