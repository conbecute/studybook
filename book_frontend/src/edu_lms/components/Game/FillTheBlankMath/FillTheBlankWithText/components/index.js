import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import styled from "styled-components";
import { TYPE_SPLIT, TEXT_SPLIT } from "../../../../../constants/type";
import FooterComponent from "../../components/FooterComponent";
import BoxAnswer from "./BoxAnswer";
import { URL_AUDIO } from "../../../../../constants/type";

const FillTheBlankWithTextWrapper = ({
  data,
  dataConfig,
  dataDefault,
  indexQuestion,
  isButtonReset,
  typeAnswer,
  typeText,
  fontSize,
  onHandleForm,
  onNextQuestion,
  onResetForm,
  setShowAlert,
  showAlert,
  totalQuestion,
  totalAnswer,
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
  const [isDisabled, setIsDisabled] = useState(true);
  const [listStatusAudio, setlistStatusAudio] = useState([]);
  useEffect(() => {
    data.map((answer, indexAnswer) => {
      answer.answer_text.map((item, index) => {
        if (item === TEXT_SPLIT) {
          register(
            {
              name: `${answer.new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`,
            },
            { required: true }
          );
        }
      });
    });
    setIsDisabled(!isDirty || !isValid);
  }, [register, isValid, isDirty]);
  const onSubmitForm = handleSubmit((dataForm) => {
    let data = [];
    _.forEach(dataForm, function (value, key) {
      data = [
        ...data,
        { id: _.split(key, TYPE_SPLIT)[0], value: value.toLowerCase() },
      ];
    });
    var result = Object.values(
      data.reduce((a, c) => {
        let value = htmlDecode(c.value)
          .trim()
          .replace(/ +(?= )/g, "");
        if (!isNaN(value)) {
          value = String(parseInt(value, 10));
        }
        (a[c.id] || (a[c.id] = { id: c.id, value: [] })).value.push(value);
        return a;
      }, {})
    );
    onHandleForm(result, reset);
  });

  const onHandleQuestion = (index) => {
    onNextQuestion(index, reset);
  };
  const onResetFormData = () => {
    onResetForm();
    reset();
  };

  audio.audio.onended = function () {
    resetStatusAudio(null);
  };

  const resetStatusAudio = (i) => {
    let listStatus = [];
    data.map((value, index) => {
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
  const nextQuestionGame = () => {
    nextQuestion(reset);
    setIsDisabled(true);
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit()}
        className="p-4 quicksand-medium monkey-color-black"
        style={{ fontSize: fontSize ? `${fontSize}px` : "24px" }}
      >
        <FromContent column={Number(dataDefault?.answer_number_in_a_row)}>
          {data.map((answer, indexAnswer) => {
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
                register={register({ required: true })}
                isButtonReset={isButtonReset}
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
        nextQuestion={nextQuestionGame}
        data={dataConfig}
        isButtonReset={isButtonReset}
        indexQuestion={indexQuestion}
        isDisabled={isDisabled}
        onResetFormData={onResetFormData}
        onHandleQuestion={onHandleQuestion}
        onSubmitForm={onSubmitForm}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        totalQuestion={totalQuestion}
        totalAnswer={totalAnswer}
      ></FooterComponent>
    </Fragment>
  );
};
export default FillTheBlankWithTextWrapper;

const FromContent = styled.div`
   {
    display: grid;
    grid-template-columns: ${(props) =>
      `repeat(${props.column ? props.column : 1}, 1fr);`}
    grid-gap: 1rem;
  }
`;
