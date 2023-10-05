import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AUDIO_ERROR, AUDIO_SUCCESS, RESULT } from "edu_lms/constants/type";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import BoxAnswer from "./BoxAnswer";

const FillTheBlankWithTextWrapper = (
  {
    data,
    fontSizeAnswer,
    dataConfig,
    typeAnswer,
    typeText,
    onComplete,
    onPlaying,
    showCorrectAnswer,
    dataHistory,
    isReadOnly,
  },
  ref
) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, control, setValue, getValues } = useForm();

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      onSubmitForm();
    },
    onNextQuestion,
  }));

  const onNextQuestion = () => {
    Object.keys(getValues()).forEach((item) => setValue(item, ""));
  };

  const onChangeValue = () => {
    setIsEdit(true);
    onPlaying(false);
  };

  const onSubmitForm = handleSubmit((dataForm) => {
    setIsEdit(false);
    const newData = Object.values(dataForm);
    const results = [];
    newData.forEach((item) => {
      results.push(item?.is_correct ? true : false);
    });
    const isCorrect = results.includes(false) ? RESULT._FALSE : RESULT._TRUE;
    showCorrectAnswer &&
      dispatch(
        onDispatchSrcAudio(
          isCorrect === RESULT._TRUE ? AUDIO_SUCCESS : AUDIO_ERROR
        )
      );
    onComplete({ isCorrect, dataHistory: dataForm });
  });

  return (
    <Fragment>
      <form className="p-4 monkey-fz-20 mx-auto quicksand-medium">
        <FromContent column={dataConfig[0].answer_number_in_a_row}>
          {data.map((answer, indexAnswer) => {
            return (
              <BoxAnswer
                dataConfig={dataConfig}
                fontSizeAnswer={fontSizeAnswer}
                key={indexAnswer}
                typeAnswer={typeAnswer}
                typeText={typeText}
                index={indexAnswer}
                data={answer}
                nameControl={control}
                dataHistory={dataHistory}
                setValue={setValue}
                showCorrectAnswer={showCorrectAnswer}
                onChangeValue={onChangeValue}
                isEdit={isEdit}
                isReadOnly={isReadOnly}
              />
            );
          })}
        </FromContent>
      </form>
    </Fragment>
  );
};

export default forwardRef(FillTheBlankWithTextWrapper);

const FromContent = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.column ? props.column : 1}, 1fr);`};
  grid-gap: 1rem;
  text-align: left;
`;
