import Iframe from "react-iframe";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LogoComponent from "../../../components/Header/LogoComponent";
import * as PATH from "../../../constants/path";
import { isMobile } from "react-device-detect";

const BookDetailContent = styled.div`
position: fixed;
width: 100%;
height: 90%;
left: 0;
right: 0;
top: 80px;
}
`;

const BooDetailWrapper = (props) => {
  const history = useHistory();
  return (
    <div className="book_detail_wrapper pt-3" style={{ marginTop: "60px" }}>
      <header className="monkey-header monkey-bg-light-gray fixed-top border-bottom">
        <section className="monkey-bg-white monkey-nav-wrapper">
          <div className="container-fluid container-xl">
            <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between monkey-nav position-relative">
              <button
                style={{ position: "absolute" }}
                onClick={() => history.push(PATH.ROUTE_PATH_BOOK_USED)}
                className="btn ml-3 monkey-bg-blue monkey-color-white pr-3 pl-3 rounded-pill d-flex align-items-center"
              >
                <i
                  className="fa fa-arrow-circle-o-left monkey-fz-20 mr-2"
                  aria-hidden="true"
                ></i>{" "}
                {!isMobile && <span>Kho sách của tôi</span>}
              </button>
              <LogoComponent />
            </nav>
          </div>
        </section>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <BookDetailContent>
              <Iframe
                url={props.linkBook}
                width="100%"
                height="100%"
                id="myId"
                allow="fullscreen"
                className="myClassname"
                display="initial"
              />
            </BookDetailContent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BooDetailWrapper;
