import React, {
  Fragment,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import styled from "styled-components";
import { TYPE_SPLIT, TEXT_SPLIT, INNER_WIDTH } from "edu_lms/constants/type";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import BoxAnswer from "./BoxAnswer";

const FillTheBlankWithTextWrapper = (
  {
    data,
    dataConfig,
    dataDefault,
    indexQuestion,
    historyForm,
    typeAnswer,
    showCorrectAnswer,
    typeText,
    fontSize,
    onPlaying,
    onHandleForm,
    isReadOnly,
    resultStatus,
  },
  ref
) => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    mode: "onChange",
  });
  const [audio, setAudio] = useState({
    audio: new Audio(""),
  });
  const [listStatusAudio, setlistStatusAudio] = useState([]);
  const [dataAnswers, setDataAnswers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [arrInputName, setArrInputName] = useState([]);
  const [newArrInputName, setNewArrInputName] = useState([]);

  useEffect(() => {
    setDataAnswers(data);
  }, [data]);

  useEffect(() => {
    dataAnswers.map((answer, indexAnswer) => {
      answer.answer_text.map((item, index) => {
        const name = `${answer.new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`;
        if (item === TEXT_SPLIT) {
          register({
            name: name,
          });
          if (historyForm?.[name]) {
            setValue(name, historyForm?.[name]);
          }
          setArrInputName((pre) =>
            !pre.includes(name) ? [...pre, name] : pre
          );
        }
      });
    });
  }, [dataAnswers, historyForm]);

  useEffect(() => {
    if (resultStatus) {
      const value = arrInputName.map((item, index) => ({
        [item]: resultStatus[index],
      }));
      setNewArrInputName(value);
    }
  }, [arrInputName, resultStatus]);

  const onSubmitForm = handleSubmit((dataForm, isCorrect) => {
    setIsEdit(false);
    let data = [];
    _.forEach(dataForm, function (value, key) {
      data = [
        ...data,
        { id: _.split(key, TYPE_SPLIT)[0], value: value?.toLowerCase() },
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
    onHandleForm(result, dataForm);
  });

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
    let url = `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${data[index]?.iconList?.props[0]?.audio[0]?.path}`;
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

  const isMedia = _.intersection(typeAnswer, [
    TypeGameMultipleChoice.IMAGE,
    TypeGameMultipleChoice.VIDEO,
  ]).length;
  useEffect(() => {
    if (resultStatus) {
      const value = arrInputName.map((item, index) => ({
        [item]: resultStatus[index],
      }));
      setNewArrInputName(value);
    }
  }, [arrInputName, resultStatus]);
  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onSubmitForm();
    },
    onNextQuestion,
  }));

  const onNextQuestion = () => {
    reset();
    setArrInputName([]);
    setDataAnswers([]);
  };

  const formatQuestions = () => {
    let questionsArray = [];
    for (let i = 0; i < data.length; i++) {
      let newArray = [data[i]];

      for (let j = i + 1; j < data.length; j++) {
        if (data[i]?.group_index === data[j]?.group_index)
          newArray.push(data[j]);
      }

      if (newArray.length > 1) questionsArray.push(newArray);
    }

    return questionsArray;
  };

  return (
    <Fragment>
      <FormText
        onSubmit={handleSubmit()}
        className="p-4 quicksand-medium monkey-color-black"
      >
        <FromContent
          column={
            window.innerWidth > INNER_WIDTH.MOBILE
              ? Number(dataDefault?.answer_number_in_a_row)
              : 1
          }
        >
          {!data[0]?.group_index &&
            data.map((answer, indexAnswer) => {
              return (
                <BoxAnswer
                  typeAnswer={typeAnswer}
                  key={indexAnswer}
                  indexQuestion={indexQuestion}
                  index={indexAnswer}
                  data={answer}
                  typeText={typeText}
                  dataConfig={dataConfig}
                  showCorrectAnswer={showCorrectAnswer}
                  fontSize={fontSize}
                  listStatusAudio={listStatusAudio}
                  setValue={setValue}
                  onPlaying={onPlaying}
                  isMedia={isMedia}
                  getValues={getValues}
                  setIsEdit={setIsEdit}
                  toggleChange={toggleChange}
                  isReadOnly={isReadOnly}
                  isDone={Boolean(historyForm)}
                  newArrInputName={newArrInputName}
                  isEdit={isEdit}
                />
              );
            })}

          {data[0]?.group_index &&
            formatQuestions().map((answer, indexAnswer) => {
              return (
                <div className="d-flex flex-column">
                  {answer.map((item) => (
                    <BoxAnswer
                      typeAnswer={typeAnswer}
                      key={indexAnswer}
                      indexQuestion={indexQuestion}
                      index={indexAnswer}
                      data={item}
                      typeText={typeText}
                      dataConfig={dataConfig}
                      showCorrectAnswer={showCorrectAnswer}
                      fontSize={fontSize}
                      listStatusAudio={listStatusAudio}
                      setValue={setValue}
                      onPlaying={onPlaying}
                      isMedia={isMedia}
                      getValues={getValues}
                      setIsEdit={setIsEdit}
                      toggleChange={toggleChange}
                      isReadOnly={isReadOnly}
                      isDone={Boolean(historyForm)}
                      newArrInputName={newArrInputName}
                      isEdit={isEdit}
                    />
                  ))}
                </div>
              );
            })}
        </FromContent>
      </FormText>
    </Fragment>
  );
};
export default forwardRef(FillTheBlankWithTextWrapper);

const FromContent = styled.div`
     {
      display: grid;
      grid-template-columns: ${(props) =>
        `repeat(${props.column ? props.column : 1}, 1fr);`}
      grid-gap: 1rem;
    }
  `;
const FormText = styled.div`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
  }
`;
