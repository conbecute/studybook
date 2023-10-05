import React, { useState, useEffect, Fragment } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import reactImageSize from "react-image-size";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import FooterComponent from "./components/FooterComponent";
import {
  onFormatDataGameConfig,
  onGetBackgroundImage,
} from "../MultipleChoiceBackGround/selection";
import {
  AlertDefault,
  AlertError,
  AlertErrorEnglish,
  AlertSuccess,
  AlertSuccessEnglish,
} from "../selection";
import {
  TYPE_ENGLISH,
  URL_AUDIO,
  URL_IMAGE_QUESTION,
} from "../../../constants/type";
import AudioComponent from "../../AudioComponent";

const AudioBackGroundContainer = ({
  data,
  alert,
  onDispatchDataAlert,
  languageBook,
}) => {
  const [backgroundList] = useState(
    data.background_list.backgroundList[0].value[0].touch
  );
  const [constScale, setStateConstScale] = useState(1);
  const [backgroundImage] = useState(
    data.background_list.backgroundList[0].value[0].path
  );
  const [listAudio, setStateListAudio] = useState([]);

  const [widthImageConst] = useState(
    data.background_list.backgroundList[0].value[0].image_width
  );

  const [widthImage, setStateWidthImage] = useState();
  const [heightImage, setStateHeightImage] = useState();

  useEffect(() => {
    let dataListAudio = onFormatDataGameConfig(data, constScale);
    setStateListAudio(dataListAudio);

    async function setWidthHeghtImage() {
      const { width, height } = await reactImageSize(
        `${URL_IMAGE_QUESTION}${data.background_list.backgroundList[0].value[0].path}`
      );
      if (height > 600) {
        let heightWindow =
          window.innerHeight - 150 > 0 ? window.innerHeight - 150 : 600;
        let widthImage = String(Math.round((width * heightWindow) / height));
        if (widthImage > 1100) {
          setStateWidthImage(String(1000));
          setStateHeightImage(String(height * 1000) / width);
        } else {
          setStateWidthImage(String(widthImage));
          setStateHeightImage(String(heightWindow));
        }
      } else {
        if (width > 1100) {
          setStateWidthImage(String(1000));
          setStateHeightImage(String(height * 1000) / width);
        } else {
          setStateWidthImage(String(width));
          setStateHeightImage(String(height));
        }
      }
    }
    setWidthHeghtImage();
    setStateConstScale(widthImage / widthImageConst);

    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [backgroundList, widthImage, heightImage]);

  return (
    <Fragment>
      <WrapperAudio>
        <AudioBackGroundContainerWrapper>
          {listAudio.map((audio, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  zIndex: 11,
                  top: audio.top,
                  left: audio.left,
                }}
              >
                <AudioComponent key={index} src={`${URL_AUDIO}${audio.url}`} />
              </div>
            );
          })}
          <StyledImage
            width={`${widthImage}px`}
            height={`${heightImage}px`}
            src={`${URL_IMAGE_QUESTION}${backgroundImage}`}
            alt=""
          />
        </AudioBackGroundContainerWrapper>
      </WrapperAudio>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioBackGroundContainer);

const StyledImage = styled.img`
  zindex: 1;
`;

const WrapperAudio = styled.div`
  display: flex;
  justify-content: center;
`;

const AudioBackGroundContainerWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: fit-content;
  height: 100%;
  .answer-wrapper,
  .question-wrapper {
    z-index: 12;
    position: relative;
    .box-item {
      &:hover {
        background-color: rgba(102, 217, 255, 0.2) !important;
      }
    }
  }
  .canvas-container {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    z-index: 11;
  }
`;
