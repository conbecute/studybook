import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import { TypeGameMultipleChoice } from "../../../selection";
import { URL_AUDIO, URL_IMAGE_QUESTION, URL_IMAGE_QUESTION_TEST_GAME } from "../../../../../constants/type";
import { GAME_VERSION } from "edu_lms/constants/game";
import FooterComponent from "../../components/FooterComponent";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../../../modules/General/actions";
import InputPositionV1 from '../../components/InputPositionV1';
import { getColorInputAnswer } from '../../../../../utils/game';

const FillTheBlankWithTextWrapper = ({
  isPopupTestGame,
  dataGame,
  titleQuestion,
  typeQuestion,
  indexQuestion,
  data,
  dataConfig,
  isButtonReset,
  alert,
  languageBook,
  onHandleForm,
  chooseQuestion,
  nextQuestion,
  onResetForm,
  handleDispatchDataAlert,
  onDispatchIsClickSubmitAnswer,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
}) => {
  const urlImageQuestion = isPopupTestGame ? URL_IMAGE_QUESTION_TEST_GAME : URL_IMAGE_QUESTION;
  const question = dataConfig[indexQuestion];
  const objects = question.objects;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const isDisabled = !isDirty || !isValid;

  const onSubmit = () => {};

  const onSubmitForm = handleSubmit((dataForm) => {
    onDispatchIsClickSubmitAnswer(true);
    const arrDataForm = Object.values(dataForm);
    const data = arrDataForm.map((value) =>
      value.trim().replace(/ +(?= )/g, "")
    );
    onHandleForm(data);
  });

  const onHandleQuestion = (index) => {
    chooseQuestion(index, reset);
  };
  const onNextQuestionGame = () => {
    nextQuestion(reset);
  };
  const onResetFormData = () => {
    onDispatchIsClickRefresh(true);
    onResetForm(reset);
  };

  const onChangeValue = (e) => {
    if (e.target.value.length === 0) {
      e.target.style.width = "40px";
    }
    if (e.target.value.length >= 1) {
      e.target.style.width = e.target.offsetWidth + 15 + "px";
    }
  };

  if (!titleQuestion) return null;

  return (
    <>
      {titleQuestion?.props[0]?.audio[0]?.path && (
        <WrapAudioPlayer>
          <ReactAudioPlayer
            src={`${URL_AUDIO}${titleQuestion.props[0].audio[0].path}`}
            autoPlay={false}
            controls={true}
          />
        </WrapAudioPlayer>
      )}

      <div>
        {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
          <div
            className=""
            style={{
              width: "1106px",
              margin: "auto",
              height: "auto",
              position: "relative",
            }}
          >
            <img
              src={`${urlImageQuestion}${titleQuestion?.path}`}
              alt="#"
              className="w-100"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 5,
              }}
            >
              {objects.parseTracing.position?.map((position, index) => {
                if (dataConfig.version === GAME_VERSION.V1) {
                  return (
                    <InputPositionV1
                      key={index}
                      name={index}
                      position={position}
                      fontSize={dataConfig.fontSize}
                      color={getColorInputAnswer(data[index].status)}
                      ref={register()}
                      onChange={onChangeValue}
                    />
                  );
                }

                return (
                  <input
                    key={index}
                    type="text"
                    className="form-control monkey-fz-20 quicksand-medium"
                    style={{
                      fontSize: `${
                        dataConfig.fontSize ? dataConfig.fontSize : 30
                      }px`,
                      height: "45px",
                      width: "40px",
                      position: "absolute",
                      border: "none",
                      color: `${getColorInputAnswer(data[index].status)}`,
                      background: "transparent",
                      boxShadow: "none",
                      top: (1106 / 500) * position.vertical_axis_px - 20,
                      left: (1106 / 500) * position.horizontal_axis_px - 12,
                    }}
                    name={index}
                    ref={register()}
                    autoComplete="off"
                    placeholder="?"
                    onChange={onChangeValue}
                  />
                );
              })}
            </form>
          </div>
        )}
      </div>
      <FooterComponent
        dataGame={dataGame}
        nextQuestion={nextQuestion}
        data={dataConfig}
        isButtonReset={isButtonReset}
        indexQuestion={indexQuestion}
        alert={alert}
        languageBook={languageBook}
        onResetFormData={onResetFormData}
        onHandleQuestion={onHandleQuestion}
        onSubmitForm={onSubmitForm}
        handleDispatchDataAlert={handleDispatchDataAlert}
        totalQuestion={totalQuestion}
        countCorrect={countCorrect}
        showAlert={showAlert}
        isDisabled={isDisabled}
        setShowAlert={setShowAlert}
        onNextQuestionGame={onNextQuestionGame}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchIsClickSubmitAnswer,
      onDispatchIsClickRefresh,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(FillTheBlankWithTextWrapper);

const WrapAudioPlayer = styled.div`
  margin: 0 auto;
  width: max-content;
`;
