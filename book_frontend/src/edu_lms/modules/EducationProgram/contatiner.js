import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Scroll from "react-scroll";
import { Element, animateScroll as scroll } from "react-scroll";
import BannerComponent from "../../components/Banner";
import EducationProgramWrapper from "./components/index";
import { onDispatchShowLoading } from "../App/actions";
import {
  getListBookTutorial,
  searchBookTutorial,
} from "../../services/tutorial";
import { onDispatchEducationId, onDispatchListBookEducation } from "./actions";
import { BOOK_DOCUMENT_PDF, SHOW_PAGINATE } from "../../constants/type";
import * as LINK from "../../constants/background";
import * as TEXT from "../../constants/text";

export class EducationProgramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: SHOW_PAGINATE,
      currentPage: 0,
      total: 0,
    };
  }
  componentDidMount() {
    const data = {
      typeDocument: BOOK_DOCUMENT_PDF,
      gradeId: 0,
      limit: 9,
    };
    this.onGetData(data);
  }

  onGetData = (data) => {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    this.props.onDispatchShowLoading(true);
    getListBookTutorial(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchListBookEducation(res.data.data.data);
          this.setState({
            pageCount: Math.ceil(res.data.data.total / this.state.perPage),
            total: res.data.data.total,
          });
          scroller.scrollTo("myScrollToElement", {
            smooth: "easeInQuad",
            offset: -90,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };
  onSearch = (value) => {
    const data = {
      typeDocument: BOOK_DOCUMENT_PDF,
      value: value,
    };
    this.props.onDispatchShowLoading(true);
    searchBookTutorial(data)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.onDispatchListBookEducation(res.data.data.data);
          this.setState({
            pageCount: Math.ceil(res.data.data.total / this.state.perPage),
            total: res.data.data.total,
          });
        }
        this.props.onDispatchShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.onDispatchShowLoading(false);
      });
  };

  onPageClick = (e) => {
    const selectedPage = e.selected + 1;
    const data = {
      typeDocument: BOOK_DOCUMENT_PDF,
      gradeId: 0,
      page: selectedPage,
      limit: 9,
    };
    this.onGetData(data);
  };

  render() {
    return (
      <Fragment>
        <BannerComponent
          src={LINK.IMAGE_BANNER_HOME}
          url={LINK.BACKGROUND_BANNER_HOME}
          values={[
            TEXT.TITLE_BANNER_EDUCATION_1,
            TEXT.TITLE_BANNER_EDUCATION_2,
          ]}
          isButton={false}
          styleUI={true}
          description={TEXT.DESCRIPTION_BANNER_EDUCATION_2}
        />
        <Element name="myScrollToElement">
          <EducationProgramWrapper
            onSearch={this.onSearch}
            onPageClick={this.onPageClick}
            pageCount={this.state.pageCount}
            data={this.props.listBookEducation}
            total={this.state.total}
          />
        </Element>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { listBookEducation, educationId } = state.educationReducer;
  return {
    listBookEducation,
    educationId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchEducationId,
      onDispatchShowLoading,
      onDispatchListBookEducation,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationProgramContainer);
