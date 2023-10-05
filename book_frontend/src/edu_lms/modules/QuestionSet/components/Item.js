import { connect } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import * as PATH from "../../../constants/path";
import styled from "styled-components";
import "./style.css";
import bookApprove from "edu_lms/assets/images/approve.png";

import {
  onDispatchShowPopupPDF,
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
} from "../../App/actions";

const Item = ({ item, isStyleUI = true }) => {
  const history = useHistory();
  const onReadingSlideLibrary = (id) => {
    history.push(`${PATH.ROUTE_PATH_QUESTION}/${id}`);
  };
  const onDoingExercise = (id) => {
    history.push(`${PATH.ROUTE_PATH_EXERCISE}/${id}`);
  };

  return (
    <div className={`${isStyleUI ? "col-12" : ""}`}>
      <IntroQuestion className="mb-4">
        <div className="image-container">
          <div className="button-cursor introduce-box-content background-style d-flex justify-content-center align-items-end lazy"></div>
          <div
            className="content-video monkey-f-medium monkey-color-gray monkey-box-shadow p-3 monkey-bg-white br-16"
            style={{ height: 160 }}
          >
            <div
              className="button-cursor monkey-fz-16  d-flex align-items-center"
              style={{ height: "30px" }}
            >
              {item.grade_name} | Bài tập | Chương 1
            </div>

            <hr />
            <div className="d-flex">
              <LabelGrade
                style={{ fontSize: 20 }}
                className="button-cursor font-weight-bold"
              >
                {item.title}
              </LabelGrade>
            </div>
            <Button1
              style={{
                float: "right",
              }}
              className="btn"
            >
              <i className="fa fa-share-alt monkey-color-orange" />
            </Button1>
            <Button
              style={{
                border: "1px solid #FF7707",
              }}
              className="btn"
              onClick={() => {
                onReadingSlideLibrary(item.id);
              }}
            >
              <i className="fa fa-pencil monkey-color-orange" />
            </Button>
            <Button
              className="btn d-flex justify-content-between align-items-center monkey-bg-question"
              onClick={() => {
                onDoingExercise(item.id);
              }}
            >
              <img
                src={bookApprove}
                alt=""
                style={{ width: 20, marginRight: 5 }}
              />
              <span className="text-white">Luyện tập</span>
            </Button>
          </div>
        </div>
      </IntroQuestion>
    </div>
  );
};

const IntroQuestion = styled.div`
  .br-16 {
    border-radius: 16px;
  }
`;
const LabelGrade = styled.div`
  color: #212529;
  width: 100%;
`;

const Button = styled.button`
  float: right;
  margin-right: 10px;
`;
const Button1 = styled.button`
  background-color: white;
  border: 1px solid #ff7707;
`;
const mapStateToProps = (state) => {
  const { statusModal, dataPopupPdf } = state.app;
  return {
    dataPopupPdf,
    statusModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupPDF,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
