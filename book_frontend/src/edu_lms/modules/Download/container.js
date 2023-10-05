import React, { Component, Fragment } from "react";
import DownloadWrapper from "./components";
import BannerComponent from "../../components/Banner";
import * as PATH from "../../constants/path";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";

export class DownloadContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        {/* <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          styleUI={true}
          values={[TEXT.TITLE_BANNER_HOME_1, TEXT.TITLE_BANNER_HOME_2]}
        /> */}
        <DownloadWrapper />
      </Fragment>
    );
  }
}

export default DownloadContainer;
