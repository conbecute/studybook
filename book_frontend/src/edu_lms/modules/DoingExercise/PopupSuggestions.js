import { Modal } from "react-bootstrap";
import styled from "styled-components";
import Suggestions from "./Suggestions";
import Guides from "./Guides";
import { useState } from "react";
import classNames from "classnames";
import ReactAudioPlayer from "react-audio-player";

const tabs = [
  { title: "Gợi ý kiến thức", href: "#suggestion", selected: true },
  { title: "Hướng dẫn cách làm", href: "#guide", selected: false },
];

export default function PopupSuggestions({
  suggestions,
  guides,
  iconList,
  show,
  toggle,
  typeText,
}) {
  const [srcAudio, setSrcAudio] = useState("");
  const handleClickAudio = (src) => {
    setSrcAudio(src !== srcAudio ? src : "");
  };
  return (
    <Modal
      show={show}
      onHide={toggle}
      dialogClassName="modal-suggestion-dialog"
      contentClassName="modal-suggestion-content"
      size="xl"
    >
      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
        onEnded={() => setSrcAudio("")}
      />
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center font-weight-bold">
          Gợi ý của Hoc10
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="d-flex justify-content-center">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            {tabs.map((tab, index) => (
              <li key={index} className="">
                <Tab
                  href={tab.href}
                  title={tab.title}
                  data-toggle="pill"
                  role="tab"
                  aria-selected={tab.selected}
                  className={classNames({
                    active: tab.selected,
                  })}
                >
                  <span className="">{tab.title}</span>
                </Tab>
              </li>
            ))}
          </ul>
        </div>
        <ContentWrapper
          className="tab-content my-3 scrollbar-question"
          id="myTabContent"
        >
          <div
            className="tab-pane fade show active h-100"
            id="suggestion"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {suggestions ? (
              <Suggestions
                suggestions={suggestions}
                iconList={iconList}
                typeText={typeText}
                handleClickAudio={handleClickAudio}
              />
            ) : (
              <div className="text-center">Không có gợi ý</div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="guide"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {guides ? (
              <Guides
                guides={guides}
                iconList={iconList}
                typeText={typeText}
                handleClickAudio={handleClickAudio}
              />
            ) : (
              <div className="text-center">Không có hướng dẫn</div>
            )}
          </div>
        </ContentWrapper>
      </Modal.Body>
      <Modal.Footer className="justify-content-end py-1">
        <ButtonClose onClick={() => toggle()}>Đóng</ButtonClose>
      </Modal.Footer>
    </Modal>
  );
}

const ContentWrapper = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  @media (max-width: 500px) {
    height: calc(100% - 80px);
  }
  overflow-x: hidden;
`;
const ButtonClose = styled.button`
  width: 120px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f70;
  color: #fff;
  &:hover {
    background-color: #e36b09;
  }
  margin-right: 20px;
  @media (max-width: 500px) {
    width: 80px;
    margin: 0 5px;
    font-size: 14px;
    padding: 5px;
  }
`;
const Tab = styled.a`
  display: block;
  width: 200px;
  margin: 0 10px;
  text-align: center;
  padding: 10px;
  border: 1px solid #f70;
  border-radius: 7px;
  background-color: #fff;
  &.active {
    background-color: #ff7707;
    color: #fff;
  }
  @media (max-width: 500px) {
    width: 150px;
    margin: 0 5px;
    font-size: 14px;
    padding: 5px;
  }
`;
