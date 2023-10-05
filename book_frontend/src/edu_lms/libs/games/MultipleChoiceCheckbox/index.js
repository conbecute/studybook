import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { onDispatchSrcAudio } from "edu_lms/modules/App/actions";
import { AUDIO_ERROR, AUDIO_SUCCESS, RESULT } from "edu_lms/constants/type";
import AnswerItem from "./AnswerItem";
import QuestionContent from "./QuestionContent";

function MultipleChoiceCheckbox(
  { data, onPlaying, onComplete, showCorrectAnswer, isReadOnly },
  ref
) {
  const pathAudio = data.question.props[0]?.audio[0]?.path;
  const [checked, setChecked] = useState(data.selectedAnswer);
  const srcAudio = useSelector((state) => state.app.srcAudio);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, getValues } = useForm();

  useImperativeHandle(ref, () => ({
    handleComplete: () => {
      const dataForm = getValues();
      _handleComplete(dataForm);
    },
  }));

  useEffect(() => {
    setValue("selectedAnswer", data.selectedAnswer);
  }, [data]);

  useEffect(() => {
    onClickAudio(
      `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${pathAudio}`
    );
  }, [pathAudio]);

  const onClickAudio = (src) => {
    if (src) {
      dispatch(onDispatchSrcAudio(src !== srcAudio ? src : ""));
    }
  };

  const _handleComplete = (dataForm) => {
    let isCorrect = RESULT._FALSE;
    setChecked(true);
    const answers = data.answers.filter(
      (question) => question.is_correct == true
    );
    const arrCorrect = answers.map((answer) => answer.answer_id);
    if (JSON.stringify(dataForm.selectedAnswer) == JSON.stringify(arrCorrect)) {
      isCorrect = RESULT._TRUE;
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_SUCCESS));
    } else {
      showCorrectAnswer && dispatch(onDispatchSrcAudio(AUDIO_ERROR));
    }
    onComplete({ selectedAnswer: dataForm.selectedAnswer, isCorrect });
  };

  const handlePlaying = () => {
    const formValues = getValues();
    setChecked(false);
    onPlaying(formValues.selectedAnswer === data?.selectedAnswer);
  };

  return (
    <form onSubmit={handleSubmit(_handleComplete)}>
      <div className="mb-5">
        <QuestionContent data={data} onClickAudio={onClickAudio} />
        <div>
          <div style={{ margin: 0 }} className="row">
            {data?.answers?.map((answer, index) => {
              return (
                <AnswerItem
                  data={data}
                  answer={answer}
                  checked={checked}
                  key={index}
                  onClickAudio={onClickAudio}
                  register={register}
                  handlePlaying={handlePlaying}
                  showCorrectAnswer={showCorrectAnswer}
                  isReadOnly={isReadOnly}
                />
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}

export default forwardRef(MultipleChoiceCheckbox);
