import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../constants/path";
import { TEXT_NOTE_1_REGISTER } from "../../../constants/text";
import { Link } from "react-router-dom";
const FooterComponent = (props) => {
  return (
    <Fragment>
      <p className="monkey-mb-20 monkey-fz-12">
        <i>{TEXT_NOTE_1_REGISTER}</i>
      </p>

      <p className="border-top monkey-pt-40 monkey-fz-14">
        Bạn chưa có tài khoản?{" "}
        <Link
          className="monkey-color-violet monkey-f-bold cursor"
          to={PATH.ROUTE_PATH_FORM_JOB}
        >
          Đăng ký ngay!
        </Link>
      </p>
    </Fragment>
  );
};

export default FooterComponent;
