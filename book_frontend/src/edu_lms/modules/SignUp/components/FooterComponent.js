import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../constants/path";
import { TEXT_NOTE_1_REGISTER } from "../../../constants/text";

const FooterComponent = (props) => {
  const history = useHistory();
  return (
    <Fragment>
      <p className="monkey-mt-40 monkey-mb-40 monkey-fz-14">
        <i>{TEXT_NOTE_1_REGISTER}</i>
      </p>
      <p className="border-top monkey-pt-40 monkey-fz-14">
        Bạn đã có tài khoản?{" "}
        <a
          className="monkey-color-violet monkey-f-bold cursor"
          onClick={() => history.push(PATH.ROUTE_PATH_SIGN_IN)}
        >
          Đăng nhập ngay
        </a>
      </p>
    </Fragment>
  );
};

export default FooterComponent;
