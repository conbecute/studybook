import React from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";

const listQuestions = [
  {
    title: "Bộ đề 1",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
  {
    title: "Bộ đề 2",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
  {
    title: "Bộ đề 3",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
  {
    title: "Bộ đề 1",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
  {
    title: "Bộ đề 1",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
  {
    title: "Bộ đề 1",
    description:
      "Bảo mật thông tin của khách hàng là Bảo mật thông tin của khách hàng là",
    practiceRouter: "router",
    assignment: "router-giao-bai",
  },
];

export default function Practice({ setIsShowPractice, isShowPractice }) {
  return (
    <MenuWrapper>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        animationInDuration={1000}
        animationOutDuration={1000}
        isVisible={isShowPractice}
      >
        <div className="p-1 pb-5 monkey-color-back-reading-book monkey-fz-4 monkey-f-header table-content">
          <div className="d-flex justify-content-between align-content-center align-items-center">
            <p className="title monkey-fz-20 pt-4 pb-3">Bộ đề</p>
            <i
              className="fa fa-times pr-2 cursor"
              aria-hidden="true"
              onClick={() => setIsShowPractice(false)}
            />
          </div>
          <div>
            {listQuestions.map((item, index) => (
              <div
                className="d-flex pt-3 position-relative practive-container justify-content-center"
                key={index}
              >
                <div>
                  <img src="/assets/img/icon-picture.svg" alt="icon-picture" />
                </div>
                <div className="col-10 pr-0">
                  <p className="d-flex justify-content-between practive-title">
                    <span> {item.title || ""} </span>
                    <i className="fa fa-ellipsis-v cursor" aria-hidden="true" />
                  </p>
                  <p className="description">{item.description}</p>
                  <button className="practive-now practive-button">
                    <span className="pr-2"> Luyện tập ngay </span>
                    <i class="fa fa-arrow-right" aria-hidden="true" />
                  </button>
                  <button className="practive-button practive-assign">
                    <span className="pr-2"> Giao bài tập </span>
                    <i class="fa fa-glide" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Animated>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 148px;
  width: 250px;
  z-index: 9;
  height: calc(100% - 80px);
  padding-bottom: 80px;
  overflow-y: auto;
  .animated {
    width: 100%;
    height: 100%;
  }
  .table-content {
    min-height: 100%;
    width: calc(100%-50px);
    background-color: #fff;
  }
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
  }
  .practive-title {
    font-size: 16px;
    line-height: 22px;
    color: #777777;
    i {
      color: #777777;
    }
  }
  .description {
    margin-top: 5px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
    color: #777777;
  }
  .practive-container {
    background: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 15px;
    transition: 0.3s ease-in-out;
    &:hover {
      .practive-title,
      .description {
        color: #fff;
      }
      .practive-title {
        i {
          color: #fff;
        }
      }
      color: #fff;
      background: #ff9533;
      .practive-now {
        color: #ff9533;
        background: #fff;
      }
      .practive-assign {
        color: #fff;
        background: #ff9533;
        border: 1px solid #fff;
      }
    }
  }
  .practive-button {
    width: 158px;
    height: 40px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .practive-assign {
    background-color: #83d420;
    margin-top: 12px;
    margin-bottom: 20px;
  }
  .practive-now {
    background: #fb6d3a;
  }
  @media screen and (max-width: 1150px) {
    left: 100px;
  }
`;
