import { ROUTE_PATH_V2_HOME } from "edu_lms/constants/path";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class NotFoundContainer extends Component {
  render() {
    return (
      <>
        <main>
          <div className="hoc10-page-search">
            <div className="container">
              <div className="box-404">
                <div className="img-wrapper">
                  <img src="../assets/img/notfound.png" alt="" />
                </div>
                <div className="content">
                  <p>Liên kết không còn tồn tại</p>
                  <Link
                    to={`${ROUTE_PATH_V2_HOME}`}
                    title="Khám phá ngay"
                    className="btn-read-book btn-pr flex-center monkey-fz-20"
                    style={{ width: "30%", margin: "auto" }}
                  >
                    Quay về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default connect(null, null)(NotFoundContainer);
