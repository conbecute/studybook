import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  onDispatchDataSlide,
  onDispatchTitleSlide,
  onDispatchUrlSlide,
} from "./actions";
import { onDispatchShowLoading } from "../App/actions";
import { getDetailSlideLibrary } from "../../services/slide";
import { decryptBase64 } from "../../modules/selection";

import ReadingSlideLibraryWrapper from "./components";

export class ReadingSlideLibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideId: decryptBase64(this.props.match.params.id),
    };
  }

  componentDidMount() {
    const data = {
      slide_id: this.state.slideId,
    };
    this.onGetDeatilSlide(data);
  }

  onGetDeatilSlide = (data) => {
    getDetailSlideLibrary(data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          const data = res.data.data.data;
          this.props.onDispatchDataSlide(data);
          this.props.onDispatchTitleSlide(res.data.data.title);
          this.props.onDispatchUrlSlide(res.data.data.url);
        }
      })
      .catch(() => {});
  };

  render() {
    return (
      <ReadingSlideLibraryWrapper
        title={this.props.title}
        url={this.props.url}
        dataSlide={this.props.dataSlide}
        slideId={this.state.slideId}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { dataSlide, title, url } = state.readingSlideReducer;
  return {
    dataSlide,
    title,
    url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
      onDispatchDataSlide,
      onDispatchTitleSlide,
      onDispatchUrlSlide,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingSlideLibraryContainer);
