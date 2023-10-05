import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import styled from "styled-components";
import { TYPE_SPLIT, TEXT_SPLIT } from "../../../../../constants/type";
import FooterComponent from "../../components/FooterComponent";
import BoxAnswer from "./BoxAnswer";
import { URL_AUDIO } from "../../../../../constants/type";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../../../modules/General/actions";
import fillTheBlankStyle from "../../FillTheBlank.module.scss";

const FillTheBlankWithTextWrapper = ({
  data,
  dataConfig,
  dataDefault,
  indexQuestion,
  isButtonReset,
  alert,
  languageBook,
  typeAnswer,
  typeText,
  fontSize,
  onHandleForm,
  chooseQuestion,
  onResetForm,
  handleDispatchDataAlert,
  onDispatchIsClickSubmitAnswer,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  nextQuestion,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [audio, setAudio] = useState({
    audio: new Audio(""),
  });
  const [listStatusAudio, setlistStatusAudio] = useState([]);
  const isDisabled = !isValid || !isDirty;
  useEffect(() => {
    data?.map((answer, indexAnswer) => {
      answer.answer_text.map((item, index) => {
        if (item === TEXT_SPLIT) {
          register({
            name: `${answer.new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`,
          });
        }
      });
    });
  }, [register]);

  const onSubmitForm = handleSubmit((dataForm) => {
    onDispatchIsClickSubmitAnswer(true);
    const data = Object.keys(dataForm).map((value) => ({
      id: _.split(value, TYPE_SPLIT)[0],
      value: dataForm[value],
    }));

    var result = Object.values(
      data.reduce((a, c) => {
        let value = htmlDecode(c.value)
          .trim()
          .replace(/ +(?= )/g, "");
        (a[c.id] || (a[c.id] = { id: c.id, value: [] })).value.push(value);
        return a;
      }, {})
    );
    onHandleForm(result, reset);
  });

  const onHandleQuestion = (index) => {
    chooseQuestion(index, reset);
  };
  const onResetFormData = () => {
    onResetForm(reset);
  };
  const onNextQuestionGame = () => {
    nextQuestion(reset);
  };
  audio.audio.onended = function () {
    resetStatusAudio(null);
  };

  const resetStatusAudio = (i) => {
    let listStatus = [];
    data?.map((value, index) => {
      if (index == i) {
        listStatus[index] = true;
      } else {
        listStatus[index] = false;
      }
    });
    setlistStatusAudio(listStatus);
  };
  const toggleChange = (index) => {
    resetStatusAudio(index);
    audio?.audio?.pause();
    let url = URL_AUDIO + data[index]?.iconList?.props[0]?.audio[0]?.path;
    setAudio({
      url,
      audio: new Audio(url),
      isPlaying: false,
    });
  };

  const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    resetStatusAudio(null);
  }, [data]);

  useEffect(() => {
    if (audio?.audio) {
      audio?.audio
        ?.play()
        .then(() => audio.audio.play())
        .catch((e) => console.log(e));
    }
  }, [audio]);

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit()}
        className={`p-3 quicksand-medium monkey-color-black ${fillTheBlankStyle.title}`}
        style={{ fontSize: fontSize ? `${fontSize}px` : "24px" }}
      >
        <FromContent column={Number(dataDefault?.answer_number_in_a_row)}>
          {data?.map((answer, indexAnswer) => {
            return (
              <BoxAnswer
                typeAnswer={typeAnswer}
                key={indexAnswer}
                indexQuestion={indexQuestion}
                index={indexAnswer}
                data={answer}
                typeText={typeText}
                dataConfig={dataConfig}
                fontSize={fontSize}
                toggleChange={toggleChange}
                listStatusAudio={listStatusAudio}
                setValue={setValue}
                getValues={getValues}
              />
            );
          })}
        </FromContent>
      </form>
      <FooterComponent
        data={dataConfig}
        isButtonReset={isButtonReset}
        indexQuestion={indexQuestion}
        isDisabled={isDisabled}
        alert={alert}
        languageBook={languageBook}
        onResetFormData={onResetFormData}
        onHandleQuestion={onHandleQuestion}
        onSubmitForm={onSubmitForm}
        handleDispatchDataAlert={handleDispatchDataAlert}
        totalQuestion={totalQuestion}
        countCorrect={countCorrect}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        nextQuestion={onNextQuestionGame}
      ></FooterComponent>
    </Fragment>
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

const FromContent = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.column ? props.column : 1}, 1fr)`};
  grid-gap: 1rem;
`;
