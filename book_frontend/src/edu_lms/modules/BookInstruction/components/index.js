import React, { useState } from "react";
import TitleComponent from "../../../components/title";
import {
  TabContent,
  TabPane,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import NavTab from "./NavTab";
const BookIntroduceWrapper = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="book-introduce-wrapper monkey-bg-light-gray pt-5 pb-5">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <TitleComponent
              title={"giới thiệu sách"}
              className="monkey-color-violet monkey-fz-34 text-uppercase text-center monkey-pb-30"
            />
          </div>
        </div>
        <div className="book-introduce-content mt-5">
          <div className="row">
            <div className="col-4">
              <div className="book-introduce-image d-flex justify-content-center">
                <div className="content cursor" style={{ width: "80%" }}>
                  <img
                    src={`${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/thumb/Tieng_Viet_1_-_tap_1.jpg`}
                    alt="#"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="book-introduce-body">
                <div className="title">
                  <h3 className="monkey-f-bold">Toán 2 - Tập một</h3>
                  <p className="monkey-color-light-silver">
                    Năm xuất bản : 2021
                  </p>
                </div>
                <div className="content mt-5">
                  <NavTab
                    classnames={classnames}
                    activeTab={activeTab}
                    toggle={toggle}
                  />
                  <TabContent activeTab={activeTab} className="pt-5">
                    <TabPane tabId="1">
                      <h4>Cập nhật</h4>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="information border-bottom pb-5 mb-5">
                        <h4 className="monkey-f-bold">Thông tin</h4>
                        <div className="information-content">
                          <div className="d-flex justify-content-start align-items-center mb-3 mt-3">
                            <p style={{ marginRight: "150px" }}>Bộ sách</p>
                            <p>Kết nối trí thức với cuộc sống</p>
                          </div>
                        </div>
                        <p>
                          Bộ sách “Kết nối tri thức với cuộc sống” được biên
                          soạn chú trọng vai trò của kiến thức gắn liền với thực
                          tế; cập nhật thành tựu khoa học hiện đại, phù hợp nền
                          tảng văn hóa, thực tiễn Việt Nam; giúp người học vận
                          dụng để giải quyết các vấn đề của đời sống: đời sống
                          cá nhân và xã hội, đời sống tinh thần và vật chất.
                        </p>
                      </div>
                      <div className="author border-bottom pb-5 mb-5">
                        <h4 className="monkey-f-bold">Thông tin</h4>
                        <div className="author-content">
                          <div className="d-flex justify-content-start align-items-center mb-3 mt-3">
                            <p style={{ marginRight: "150px" }}>Bộ sách</p>
                            <p>Kết nối trí thức với cuộc sống</p>
                          </div>
                        </div>
                        <p>
                          Bộ sách “Kết nối tri thức với cuộc sống” được biên
                          soạn chú trọng vai trò của kiến thức gắn liền với thực
                          tế; cập nhật thành tựu khoa học hiện đại, phù hợp nền
                          tảng văn hóa, thực tiễn Việt Nam; giúp người học vận
                          dụng để giải quyết các vấn đề của đời sống: đời sống
                          cá nhân và xã hội, đời sống tinh thần và vật chất.
                        </p>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookIntroduceWrapper;
