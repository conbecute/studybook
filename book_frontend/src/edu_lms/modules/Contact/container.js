import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import ContactWrapper from "./components";
export class ContactContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const Scroll = require("react-scroll");
    const scroller = Scroll.scroller;
    scroller.scrollTo("myScrollToElement", {
      smooth: "easeInQuad",
      offset: "-100",
    });
  }

  render() {
    return (
      <Fragment>
        <Element name="myScrollToElement">
          <ContactWrapper />
        </Element>
      </Fragment>
    );
  }
}

export default ContactContainer;
