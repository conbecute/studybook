import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { TYPE_SPLIT, TEXT_SPLIT } from "edu_lms/constants/type";
import BoxAnswer from "./BoxAnswer";

const FillTheBlankWithTextWrapper = (
  {
    dataAnswers,
    dataDefault,
    indexQuestion,
    typeAnswer,
    typeText,
    fontSize,
    sensitive = [],
    onHandleForm,
    handlePlaying,
    historyForm,
    resultStatus,
    showCorrectAnswer,
    isReadOnly,
  },
  ref
) => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    mode: "onChange",
  });
  const [audio, setAudio] = useState({
    audio: new Audio(""),
  });
  const isSensitive = sensitive.includes("true");
  const [listStatusAudio, setlistStatusAudio] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [arrInputName, setArrInputName] = useState([]);
  const [newArrInputName, setNewArrInputName] = useState([]);

  useEffect(() => {
    setData(dataAnswers);
  }, [dataAnswers]);

  useEffect(() => {
    data.map((answer) => {
      answer.answer_text.map((item, index) => {
        if (item === TEXT_SPLIT) {
          const name = `${answer.new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`;
          register({
            name: name,
          });
          if (historyForm?.[name]) {
            setValue(name, historyForm?.[name]);
            setArrInputName((pre) =>
              !pre.includes(name) ? [...pre, name] : pre
            );
          }
        }
      });
    });
  }, [data, historyForm]);

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
      _handleComplete();
    },
    onNextQuestion,
  }));

  const onNextQuestion = () => {
    reset();
    setData([]);
    setArrInputName([]);
  };

  const _handleComplete = handleSubmit((dataForm) => {
    setIsEdit(false);

    const data = Object.keys(dataForm).map((value) => ({
      id: _.split(value, TYPE_SPLIT)[0],
      value: isSensitive ? dataForm[value] : dataForm[value]?.toLowerCase(),
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
    onHandleForm(result, dataForm, isSensitive);
  });

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

  return (
    <form
      onSubmit={handleSubmit()}
      className="px-4 quicksand-medium monkey-color-black mt-3"
      style={{ fontSize: fontSize ? `${fontSize}px` : "24px" }}
    >
      <div className="row">
        {data.map((answer, indexAnswer) => {
          return (
            <div
              className={`px-2 col-md-${
                12 / dataDefault?.answer_number_in_a_row
              }`}
            >
              <BoxAnswer
                typeAnswer={typeAnswer}
                key={indexAnswer}
                indexQuestion={indexQuestion}
                index={indexAnswer}
                data={answer}
                typeText={typeText}
                fontSize={fontSize}
                toggleChange={toggleChange}
                listStatusAudio={listStatusAudio}
                setValue={setValue}
                getValues={getValues}
                handlePlaying={handlePlaying}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                newArrInputName={newArrInputName}
                showCorrectAnswer={showCorrectAnswer}
                isDone={Boolean(historyForm)}
                isReadOnly={isReadOnly}
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default forwardRef(FillTheBlankWithTextWrapper);
