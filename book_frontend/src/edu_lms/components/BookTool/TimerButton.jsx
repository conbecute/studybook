import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookToolMenuItem from "./BookToolMenuItem";
import Draggable from "react-draggable";
import { Modal } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import timeOutAudio from "../../assets/audio/timeOutAudio.mp3";
import waitingAudio from "../../assets/audio/waitingAudio.mp3";
import styleBookTool from "./bookTool.module.scss";

const SECOND_DEFAULT = 30;
const MINUTE_DEFAULT = 0;
const SECOND_MIN = 0;
const MINUTE_MIN = 0;
const SECOND_WAIT_AUDIO = 10;
const SECOND_MAX = 59;
const MINUTE_MAX = 59;

const TimerToolButton = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [minute, setMinute] = useState(MINUTE_DEFAULT);
  const [second, setSecond] = useState(SECOND_DEFAULT);
  const [isStart, setIsStart] = useState(false);

  const handleClick = () => {
    setShowTimer(!showTimer);
  };
  const onStartPause = () => {
    setIsStart(!isStart);
  };

  useEffect(() => {
    if (isStart) {
      if (second >= SECOND_MIN) {
        const timer = setTimeout(() => {
          if (second === SECOND_MIN && minute === MINUTE_MIN) {
            setIsStart(false);
            return;
          } else {
            setSecond((second) => second - 1);
          }
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        if (minute > MINUTE_MIN) {
          setMinute((minute) => minute - 1);
          setSecond(59);
        }
      }
    } else {
      if (second > SECOND_MAX) setSecond(SECOND_MIN);
      if (second < SECOND_MIN) setSecond(SECOND_MAX);
    }
  }, [isStart, second]);

  useEffect(() => {
    if (minute > MINUTE_MAX) setMinute(MINUTE_MIN);
    if (minute < MINUTE_MIN) setMinute(MINUTE_MAX);
  }, [minute]);

  return (
    <div className="positon-relative">
      <BookToolMenuItem
        item={{
          id: "timer",
          placement: "left",
          text: "Đồng hồ đếm ngược",
          icon: "fa fa-clock-o",
        }}
        onClick={handleClick}
        onTouchStart={handleClick}
      />
      {showTimer ? (
        <Popover className="position-absolute">
          <ReactAudioPlayer
            src={
              (isStart &&
                minute === MINUTE_MIN &&
                second === SECOND_MIN &&
                timeOutAudio) ||
              (isStart &&
                minute === MINUTE_MIN &&
                second <= SECOND_WAIT_AUDIO &&
                waitingAudio) ||
              ""
            }
            className="d-none"
            autoPlay={true}
            controls={true}
          />
          <Draggable>
            <Modal.Dialog>
              <Modal.Header
                closeButton
                onTouchStart={handleClick}
                onHide={handleClick}
                bsPrefix={styleBookTool.headerTimer}
              >
                <p className="font-weight-bold">Đồng hồ đếm ngược</p>
              </Modal.Header>
              <Modal.Body bsPrefix="pl-2 pb-2 pr-2">
                <Timer className="text-center d-flex">
                  <Screen className="d-flex">
                    <div className="w-50">
                      <p>phút</p>
                      <MinutesDisplay className="position-relative pl-2 pr-2 d-flex bg-white font-weight-bold ml-2 mt-1 justify-content-between">
                        <div className="d-flex justify-content-between w-100 pt-1">
                          <button
                            onClick={() => setMinute((minute) => minute - 1)}
                            onTouchStart={() =>
                              setMinute((minute) => minute - 1)
                            }
                            disabled={isStart}
                            className="monkey-fz-20"
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          {minute}
                          <button
                            onClick={() => setMinute((minute) => minute + 1)}
                            onTouchStart={() =>
                              setMinute((minute) => minute + 1)
                            }
                            disabled={isStart}
                            className="monkey-fz-20"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                      </MinutesDisplay>
                    </div>
                    <Display>
                      <p>giây</p>
                      <SecondsDisplay className="pl-2 pr-2 d-flex bg-white font-bold mt-1 mr-2">
                        <div className="d-flex justify-content-between w-100 pt-1">
                          <button
                            onClick={() => setSecond((second) => second - 1)}
                            onTouchStart={() =>
                              setSecond((second) => second - 1)
                            }
                            disabled={isStart}
                            className="monkey-fz-20"
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          {second}
                          <button
                            onClick={() => setSecond((second) => second + 1)}
                            onTouchStart={() =>
                              setSecond((second) => second + 1)
                            }
                            disabled={isStart}
                            className="monkey-fz-20"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                      </SecondsDisplay>
                    </Display>
                  </Screen>
                  <Control className="d-flex">
                    <PlayControl className="w-50">
                      <p>{isStart ? "Dừng" : "Bắt đầu"}</p>
                      <ButtonControlWrapper>
                        <ButtonControl
                          className="cursor bg-white text-center pt-1 mt-2"
                          onClick={onStartPause}
                          onTouchStart={onStartPause}
                          disabled={
                            second === SECOND_MIN && minute === MINUTE_MIN
                          }
                        >
                          {isStart ? (
                            <i className="fa fa-stop" aria-hidden="true"></i>
                          ) : (
                            <i className="fa fa-play" aria-hidden="true"></i>
                          )}
                        </ButtonControl>
                      </ButtonControlWrapper>
                    </PlayControl>
                    <ResetControl className="w-50">
                      <p>Đặt lại</p>
                      <ButtonControlWrapper>
                        <ButtonControl
                          className="cursor bg-white text-center pt-1 mt-2"
                          onTouchStart={() => {
                            setSecond(SECOND_DEFAULT);
                            setMinute(MINUTE_DEFAULT);
                          }}
                          onClick={() => {
                            setSecond(SECOND_DEFAULT);
                            setMinute(MINUTE_DEFAULT);
                          }}
                          onDoubleClick={() => {
                            setSecond(SECOND_MIN);
                            setMinute(MINUTE_MIN);
                          }}
                          disabled={isStart}
                        >
                          <i className="fa fa-repeat" aria-hidden="true"></i>
                        </ButtonControl>
                      </ButtonControlWrapper>
                    </ResetControl>
                  </Control>
                </Timer>
              </Modal.Body>
            </Modal.Dialog>
          </Draggable>
        </Popover>
      ) : null}
    </div>
  );
};

export default TimerToolButton;

const Popover = styled.div`
  z-index: 2;
  left: 42px;
  top: 360px;
`;
const Timer = styled.div`
  width: 375px;
  height: 90px;
  background-color: #9ee4ef;
  border-radius: 10px;
  border: 2px solid #0ebae5;
`;
const Screen = styled.div`
  width: 65%;
  border-right: 2px solid #0ebae5;
  height: 100%;
`;
const Display = styled.div`
  width: 50%;
`;
const MinutesDisplay = styled.div`
  font-size: 36px;
  margin-right: 1px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const SecondsDisplay = styled.div`
  font-size: 36px;
  margin-left: 1px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: space-between;
`;
const PlayControl = styled.div`
  border-right: 1px solid #0ebae5;
`;
const ResetControl = styled.div`
  height: 100%;
`;
const Control = styled.div`
  width: 35%;
`;
const ButtonControlWrapper = styled.div`
  border-top: 1px solid #0ebae5;
`;
const ButtonControl = styled.button`
  width: 45px;
  height: 45px;
  font-size: 20px;
  border-radius: 5px;
`;
