import _ from "lodash";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import styled from "styled-components";
import Select from "react-select";
import AudioPlayer from "react-h5-audio-player";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MathQuillComponent from "../../../components/MathQuill/MathQuill";
import IconAddImage from "../../../assets/images/mathquill/picture.svg";
import IconAddAudio from "../../../assets/images/mathquill/audio.svg";
import IconAddVideo from "../../../assets/images/mathquill/video.svg";
import IconDelete from "../../../assets/images/mathquill/delete.svg";
import { SELECTRANKS } from "../../../constants/type";
import {
  convertDataCMSToForm,
  convertDataFormToDataCMS,
  getFolderPath,
} from "../constants";
import AudioQuestion from "./AudioQuestion";
import PopupConfirmDelete from "./PopupConfirmDelete";
import ListQuestionHoc10 from "./ListQuestionHoc10";
import { getQuestionId, HOC10_QUESTION, MY_QUESTION } from "../constant";
import { TypeGame } from "edu_lms/components/configGame";
import ShowQuestion from "./ShowQuestion";
import ChooseActivity from "./ChooseActivity";
import { getListTextBook } from "edu_lms_v2/services/listBook";
import { getListAct, getMenuBook } from "edu_lms/services/readingBook";
import { onFormatDataGameConfig } from "edu_lms/modules/DoingExercise/selection";
import { postUploadImageQuestion } from "edu_lms/services/question";

const QuestionWrapper = ({
  datalistQuestion,
  questionSetId,
  gradeName,
  subjectName,
  title,
  gradeId,
  subjectId,
  onEditQuestion,
  onDeleteQuestion,
  onAddQuestion,
  onGetData,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const defaultAnswer = [
    {
      id: "1",
      value: "",
      image: "",
      audio: "",
      video: "",
    },
    {
      id: "2",
      value: "",
      image: "",
      audio: "",
      video: "",
    },
    {
      id: "3",
      value: "",
      image: "",
      audio: "",
      video: "",
    },
    {
      id: "4",
      value: "",
      image: "",
      audio: "",
      video: "",
    },
  ];

  const defaultQuestion = {
    question: "",
    image: "",
    audio: "",
    video: "",
    answers: defaultAnswer,
    correct_answer: "",
  };

  const [activeQuestion, setStateActiveQuestion] = useState(0);

  const questionDetailData = datalistQuestion[activeQuestion];
  const dataClone = { ...questionDetailData };
  if (!dataClone?.answers) {
    dataClone.answers = defaultAnswer;
  }
  const [questionDetail, setStateQuestionDetail] = useState(dataClone);
  const [activeId, setActiveId] = useState("");
  const [showCaculatorModal, setStateShowCaculatorModal] = useState(false);
  const [urlAudioAnswer, setUrlAudioAnswer] = useState("");
  const [showPopupCfDelete, setShowPopupCfDelete] = useState(false);
  const [indexDelete, setIndexDelete] = useState();
  const [actSelected, setActSelected] = useState({});
  const [typeQuestion, setTypeQuestion] = useState(MY_QUESTION);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [exercisesOfChapter, setExercisesOfChapter] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [listAct, setListAct] = useState([]);
  const [currentSemester, setCurrentSemester] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [currentExercise, setCurrentExercise] = useState();
  const [titleNotFound, setTitleNotFound] = useState("");
  const [difficultLevel, setDifficultLevel] = useState(SELECTRANKS[0]);
  const isHoc10Question = !datalistQuestion[activeQuestion]?.user_id;

  useEffect(() => {
    const dataForm = getValues();
    setValue(
      "question",
      dataForm.question != "" ? dataForm.question : questionDetail?.question
    );
    if (Array.isArray(questionDetail?.answers)) {
      questionDetail?.answers.forEach((answer, _index) => {
        let keyAnswer = `answer${_index}`;
        setValue(
          keyAnswer,
          dataForm[keyAnswer] !== "" ? dataForm[keyAnswer] : answer.value
        );
      });
    }
    setValue(
      "correct_answer",
      dataForm.correct_answer
        ? dataForm.correct_answer
        : String(questionDetail?.correct_answer)
    );
  }, [questionDetail]);

  useEffect(() => {
    reset();
    const dataConvert = convertDataCMSToForm(activeQuestion, datalistQuestion);
    setStateQuestionDetail(dataConvert);
    setActiveId(dataConvert.activityId);

    const getDifficultLevel = SELECTRANKS.find(
      (level) => level.value === datalistQuestion[activeQuestion]?.data.level
    );
    setDifficultLevel(getDifficultLevel);
  }, [datalistQuestion, activeQuestion]);

  const onClickAudio = (url) => {
    if (url === urlAudioAnswer) {
      setUrlAudioAnswer("");
    } else {
      setUrlAudioAnswer(url);
    }
  };

  const onSave = () => {
    let dataForm = getValues();
    const dataConvert = convertDataFormToDataCMS(dataForm, questionDetail);
    const dataEditQuestion = {
      question_set_id: questionSetId,
      game_config: dataConvert.game_config,
      icon_list: dataConvert.icon_list,
      game_id: 439,
      activityId: activeId,
      level: difficultLevel?.value,
    };
    if (datalistQuestion?.length > 0) {
      onEditQuestion(dataEditQuestion);
    } else {
      onAddQuestion({ ...dataEditQuestion, order: 1 });
      setStateActiveQuestion(datalistQuestion.length);
    }
  };

  const detailQuestion = (index) => {
    setStateActiveQuestion(index);
    setTypeQuestion(MY_QUESTION);
  };

  const deleteQuestion = (index) => {
    const dataGame = datalistQuestion[activeQuestion]?.data;

    if (dataGame.game_id === TypeGame.MULTIPLE_CHOICE) {
      const dataForm = getValues();
      const dataFormConvert = convertDataFormToDataCMS(
        dataForm,
        questionDetail
      );
      const stringDataForm = JSON.stringify(dataFormConvert);
      const stringDataCMS = JSON.stringify(dataGame);

      if (stringDataForm !== stringDataCMS) {
        setShowPopupCfDelete(true);
        setIndexDelete(index);
        return;
      }
    }

    confirmDelete(index);
  };

  const confirmDelete = (index) => {
    const dataDeleteQuestion = {
      question_set_id: questionSetId,
      activity_id: datalistQuestion[index].activity_id,
      order: datalistQuestion[index].order_index,
    };
    onDeleteQuestion(dataDeleteQuestion);
    if (
      activeQuestion === datalistQuestion.length - 1 ||
      activeQuestion > index
    ) {
      setStateActiveQuestion(activeQuestion - 1);
    }
  };

  const addQuestion = () => {
    const dataFormDefault = {
      answer0: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer_explain: "",
      correct_answer: "",
      question: "",
    };
    const defaultQuestionConvert = convertDataFormToDataCMS(
      dataFormDefault,
      defaultQuestion
    );
    const dataEditQuestion = {
      question_set_id: questionSetId,
      game_config: defaultQuestionConvert.game_config,
      icon_list: defaultQuestionConvert.icon_list,
      game_id: 439,
      order: datalistQuestion.length + 1,
    };
    onAddQuestion(dataEditQuestion);
    setStateActiveQuestion(datalistQuestion.length);
  };

  const selectFile = (event, inputType, resourceType, index) => {
    if (event.target.files[0]) {
      const data = new FormData();
      const folderPath = getFolderPath(resourceType);
      data.append("file", event.target.files[0]);
      data.append("folder_path", folderPath);
      data.append("description", "upload image question");
      data.append("auto_file_name", 1);
      const loading = toast.loading("Đang upload file. Vui lòng chờ!");
      postUploadImageQuestion(data)
        .then((res) => {
          if (res.data.status === "success") {
            const path = res.data.data.path;
            const pathArray = path.split("/");
            const mediaName = pathArray[pathArray.length - 1];
            if (inputType === "question") {
              setStateQuestionDetail({
                ...questionDetail,
                image: "",
                video: "",
                audio: "",
                [resourceType]: mediaName,
              });
            }
            if (inputType === "answer") {
              let dataQuestionDetail = { ...questionDetail };
              if (resourceType !== "audio") {
                dataQuestionDetail.answers[index].video = "";
                dataQuestionDetail.answers[index].image = "";
              }

              dataQuestionDetail.answers[index][resourceType] = mediaName;
              setStateQuestionDetail(dataQuestionDetail);
            }
            toast.dismiss(loading);
          }
        })
        .catch((error) => console.log(error));
      event.target.value = null;
    }
  };

  const removeFile = (inputType, resourceType, index) => {
    if (inputType === "question") {
      setStateQuestionDetail({ ...questionDetail, [resourceType]: "" });
    }

    if (inputType === "answer") {
      let dataQuestionDetail = { ...questionDetail };
      dataQuestionDetail.answers[index][resourceType] = "";
      setStateQuestionDetail(dataQuestionDetail);
    }
  };

  const handleClose = () => {
    setStateShowCaculatorModal(false);
  };

  const addAnswer = () => {
    setStateQuestionDetail({
      ...questionDetail,
      answers: [...questionDetail.answers, { value: "", image: "" }],
    });
  };

  const deleteAnswer = (index) => {
    const dataForm = getValues();
    const dataCMS = [
      { data: convertDataFormToDataCMS(dataForm, questionDetail) },
    ];
    const data = convertDataCMSToForm(0, dataCMS);
    const answers = data.answers.filter((_, _index) => _index !== index);
    setStateQuestionDetail({
      ...data,
      answers: answers,
    });
    reset();
  };

  const getListBook = () => {
    getListTextBook(gradeId, subjectId)
      .then((res) => {
        if (res.data.code === 200) {
          const listBook = res.data.data.list_book.map((book) => {
            return { label: book.title, value: book.id };
          });

          setBooks(listBook);
        }
      })
      .catch((error) => console.log(error));
  };

  const getChapters = (book_id) => {
    const data = {
      book_id,
    };
    getMenuBook(data)
      .then((res) => {
        if (res.data.code === 200) {
          const listChapter = res.data.data.map((chapter) => {
            return { label: chapter.title, value: chapter.id };
          });
          const listExerciseOfChapter = res.data.data.map((chapter) => {
            return { id: chapter.id, exercise: chapter.children };
          });

          setExercisesOfChapter(listExerciseOfChapter);
          setChapters(listChapter);
        }
      })
      .catch((error) => console.log(error));
  };

  const getExercises = (exercises_id) => {
    const listExercise = exercisesOfChapter.find(
      ({ id }) => id === exercises_id
    );
    const exs = listExercise.exercise.map((ex) => {
      return { value: ex.id, label: ex.title };
    });

    if (exs.length === 0) return getListActivity();

    setExercises(exs);
  };

  const getListActivity = (ex_id) => {
    getListAct(1618)
      .then((res) => {
        if (res.data.code === 200) {
          const activitys = _.isArray(res.data.data) ? res.data.data : [];
          setListAct(activitys);

          if (_.isEmpty(activitys)) setTitleNotFound("Không tìm thấy bộ đề");
        }
      })
      .catch((error) => console.log(error));
  };

  const titlePreview = (question) => {
    const formatQuestion = onFormatDataGameConfig([question], () => {});
    const questionId = getQuestionId(formatQuestion[0]);
    const title = formatQuestion[0].icon_list[0].icons.find(
      ({ icon_id }) => icon_id === questionId
    );

    return title?.props[0].text;
  };

  return (
    <>
      {urlAudioAnswer && (
        <AudioPlayer
          src={urlAudioAnswer}
          className="d-none"
          autoPlay={true}
          controls={true}
          onEnded={() => setUrlAudioAnswer("")}
        />
      )}
      <form onSubmit={handleSubmit(onSave)}>
        <div>
          <Header
            title={title}
            gradeName={gradeName}
            subjectName={subjectName}
          />

          <div className="container-fluid">
            <div className="row" style={{ paddingTop: "60px" }}>
              <div className="col-md-2 question-left scrollbar-question">
                {datalistQuestion.length > 0 &&
                  datalistQuestion.map((question, index) => (
                    <ItemsQuestion
                      className="d-flex mb-2 rounded"
                      isActive={index === activeQuestion}
                    >
                      <div className="d-flex flex-column pl-1">
                        <p
                          className={classNames(
                            "monkey-fz-24 font-weight-bold monkey-f-header text-center my-3 not-active-number",
                            {
                              "text-white": index === activeQuestion,
                            }
                          )}
                        >
                          {index + 1}
                        </p>
                        <p
                          onClick={() => deleteQuestion(index)}
                          className="d-inline cursor"
                        >
                          <i
                            className={classNames(
                              "fa fa-trash-o text-white not-active-image pt-1 pb-1 rounded px-2 monkey-fz-20",
                              {
                                "monkey-bg-orange": index === activeQuestion,
                              }
                            )}
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                      <TextPreview
                        className="monkey-bg-white mx-1 mx-md-2 w-100 my-2 rounded px-1"
                        onClick={() => detailQuestion(index)}
                      >
                        {titlePreview(question)}
                      </TextPreview>
                    </ItemsQuestion>
                  ))}

                <div
                  className="question-view"
                  style={{ backgroundColor: "rgb(247, 249, 250)" }}
                >
                  <div className="question-view-content justify-content-center">
                    <button
                      type="button"
                      className="monkey-color-orange monkey-fz-18"
                      onClick={() => addQuestion()}
                    >
                      <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>

              <QuestionContent className="col-md-8 question-right scrollbar-question">
                {typeQuestion === MY_QUESTION &&
                  questionDetail.game_id === TypeGame.MULTIPLE_CHOICE && (
                    <div>
                      <p className="mb-2 font-weight-bold">Câu hỏi</p>
                      <div
                        style={{ marginLeft: "-7px" }}
                        className="row mb-3 d-flex flex-nowrap"
                      >
                        <textarea
                          className="form-control"
                          rows="5"
                          name="question"
                          ref={register}
                        />
                        <label className="btn btn-default d-none">
                          <input
                            className="d-none"
                            type="file"
                            onChange={(file) =>
                              selectFile(file, "question", "image")
                            }
                            id="fileQuestionImage"
                            name="fileQuestionImage"
                            accept="image/png, image/jpeg"
                          />
                        </label>

                        <label className="btn btn-default d-none">
                          <input
                            className="d-none"
                            type="file"
                            onChange={(file) =>
                              selectFile(file, "question", "audio")
                            }
                            id="fileQuestionAudio"
                            name="fileQuestionAudio"
                            accept="audio/mp3"
                          />
                        </label>

                        <label className="btn btn-default d-none">
                          <input
                            className="d-none"
                            type="file"
                            onChange={(file) =>
                              selectFile(file, "question", "video")
                            }
                            id="fileQuestionVideo"
                            name="fileQuestionVideo"
                            accept="video/mp4"
                          />
                        </label>
                        <ButtonShowMathQuill>
                          <div>
                            <label for="fileQuestionImage">
                              <ImageStyleM src={IconAddImage} alt="" />
                            </label>
                          </div>
                          <div>
                            <label for="fileQuestionAudio">
                              <ImageStyleM src={IconAddAudio} alt="" />
                            </label>
                          </div>
                          <div>
                            <label for="fileQuestionVideo">
                              <ImageStyleM src={IconAddVideo} alt="" />
                            </label>
                          </div>
                        </ButtonShowMathQuill>
                        <div>
                          <div className="mb-3">
                            <div className="position-relative">
                              {questionDetail?.image && (
                                <>
                                  <Image
                                    src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${questionDetail?.image}`}
                                    width="260px"
                                    height="auto"
                                    alt=""
                                  />
                                  <ButtonDelete
                                    type="button"
                                    className="position-absolute"
                                    onClick={() =>
                                      removeFile("question", "image")
                                    }
                                  >
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </ButtonDelete>
                                </>
                              )}
                            </div>
                            <div className="position-relative">
                              {questionDetail?.video && (
                                <div className="mt-2">
                                  <Video
                                    src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${questionDetail?.video}`}
                                    width="200px"
                                    controls
                                  />
                                  <ButtonDelete
                                    type="button"
                                    className="position-absolute"
                                    onClick={() =>
                                      removeFile("question", "video")
                                    }
                                  >
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </ButtonDelete>
                                </div>
                              )}
                            </div>
                            <div>
                              {questionDetail?.audio && (
                                <div
                                  style={{ width: "200px" }}
                                  className="mt-2"
                                >
                                  <AudioQuestion
                                    src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${questionDetail?.audio}`}
                                    onDelete={() =>
                                      removeFile("question", "audio")
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {showCaculatorModal && (
                          <MathQuillComponent
                            show={showCaculatorModal}
                            onHide={handleClose}
                          />
                        )}
                      </div>

                      <p className="mb-2 font-weight-bold">Các lựa chọn</p>
                      <div className="row mb-3">
                        {questionDetail?.answers?.map((answer, index) => (
                          <div className="col-md-6 my-2">
                            <div className="wrap-answer h-100">
                              <div className="d-flex mt-3 position-relative">
                                <InputRadio
                                  type="radio"
                                  name="correct_answer"
                                  value={answer.id}
                                  ref={register}
                                />

                                <textarea
                                  style={{ padding: "1.1rem 0.75rem" }}
                                  rows="3"
                                  className="form-control"
                                  name={`answer${index}`}
                                  ref={register}
                                  id="answer"
                                  defaultValue={answer.value}
                                />
                                <ButtonShowMathQuill>
                                  <div>
                                    <label for={`fileAnswer${index}`}>
                                      <ImageStyleM src={IconAddImage} alt="" />
                                    </label>
                                  </div>
                                  <div>
                                    <label for={`fileAnswerAudio${index}`}>
                                      <ImageStyleM src={IconAddAudio} alt="" />
                                    </label>
                                  </div>
                                  <div>
                                    <label for={`fileAnswerVideo${index}`}>
                                      <ImageStyleM src={IconAddVideo} alt="" />
                                    </label>
                                  </div>
                                  <div>
                                    <ImageStyleD
                                      src={IconDelete}
                                      alt=""
                                      onClick={() => deleteAnswer(index)}
                                    />
                                  </div>
                                </ButtonShowMathQuill>
                              </div>
                              <div className="wrap-image mx-3">
                                <div className="row">
                                  <div className="col-lg-8">
                                    {answer?.image && (
                                      <div className="position-relative">
                                        <Image
                                          src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${answer?.image}`}
                                          height="auto"
                                          alt=""
                                        />
                                        <ButtonDelete
                                          type="button"
                                          className="position-absolute monkey-color-orange"
                                          onClick={() =>
                                            removeFile("answer", "image", index)
                                          }
                                        >
                                          <i
                                            className="fa fa-times"
                                            aria-hidden="true"
                                          />
                                        </ButtonDelete>
                                      </div>
                                    )}
                                    {answer?.video && (
                                      <div className="position-relative mt-2">
                                        <Video
                                          src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${answer?.video}`}
                                          width="100%"
                                          controls
                                        />
                                        <ButtonDelete
                                          type="button"
                                          className="position-absolute"
                                          onClick={() =>
                                            removeFile("answer", "video", index)
                                          }
                                        >
                                          <i
                                            className="fa fa-times"
                                            aria-hidden="true"
                                          ></i>
                                        </ButtonDelete>
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-lg-4 mt-2">
                                    {answer?.audio && (
                                      <>
                                        <AudioWrapper
                                          className="monkey-color-orange cursor d-flex position-relative"
                                          onClick={() =>
                                            onClickAudio(
                                              `${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${answer?.audio}`
                                            )
                                          }
                                        >
                                          <i
                                            className="fa fa-volume-up d-block m-auto"
                                            aria-hidden="true"
                                          ></i>
                                          <ButtonDelete
                                            type="button"
                                            className="position-absolute monkey-color-orange"
                                            onClick={() =>
                                              removeFile(
                                                "answer",
                                                "audio",
                                                index
                                              )
                                            }
                                          >
                                            <i
                                              className="fa fa-times"
                                              aria-hidden="true"
                                            ></i>
                                          </ButtonDelete>
                                        </AudioWrapper>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <label className="btn btn-default">
                                <input
                                  className="d-none"
                                  type="file"
                                  onChange={(file) =>
                                    selectFile(file, "answer", "image", index)
                                  }
                                  id={`fileAnswer${index}`}
                                  name={`fileAnswer${index}`}
                                  accept="image/png, image/jpeg"
                                />
                                <input
                                  className="d-none"
                                  type="file"
                                  onChange={(file) =>
                                    selectFile(file, "answer", "audio", index)
                                  }
                                  id={`fileAnswerAudio${index}`}
                                  name={`fileAnswerAudio${index}`}
                                  accept="audio/mp3"
                                />
                                <input
                                  className="d-none"
                                  type="file"
                                  onChange={(file) =>
                                    selectFile(file, "answer", "video", index)
                                  }
                                  id={`fileAnswerVideo${index}`}
                                  name={`fileAnswerVideo${index}`}
                                  accept="video/mp4"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="row d-flex justify-content-between">
                        <p
                          className="mb-2 font-weight-bold cursor monkey-color-orange"
                          onClick={addAnswer}
                        >
                          + Thêm đáp án
                        </p>
                      </div>
                    </div>
                  )}

                {typeQuestion === MY_QUESTION &&
                  questionDetail?.question?.data?.game_id !==
                    TypeGame.MULTIPLE_CHOICE && (
                    <ShowQuestion data={questionDetail} />
                  )}

                {typeQuestion === HOC10_QUESTION && (
                  <ShowQuestion data={actSelected} />
                )}
              </QuestionContent>
              <div className="col-md-2 d-flex flex-column justify-content-between mb-5">
                <div className="mt-3">
                  <label
                    className="font-weight-bold cursor"
                    htmlFor={MY_QUESTION}
                  >
                    <input
                      className="mr-2"
                      type="radio"
                      name="question"
                      id={MY_QUESTION}
                      onChange={({ target }) => setTypeQuestion(target.id)}
                      checked={typeQuestion === MY_QUESTION}
                    />
                    Câu hỏi của bạn
                  </label>
                  <label
                    className="font-weight-bold cursor"
                    htmlFor={HOC10_QUESTION}
                  >
                    <input
                      className="mr-2"
                      type="radio"
                      name="question"
                      id={HOC10_QUESTION}
                      onChange={({ target }) => {
                        getListBook();
                        setTypeQuestion(target.id);
                      }}
                      checked={typeQuestion === HOC10_QUESTION}
                    />
                    Câu hỏi của Hoc10
                  </label>
                  {typeQuestion === HOC10_QUESTION && (
                    <ChooseActivity
                      books={books}
                      chapters={chapters}
                      exercises={exercises}
                      currentSemester={currentSemester}
                      currentChapter={currentChapter}
                      currentExercise={currentExercise}
                      getChapters={getChapters}
                      getExercises={getExercises}
                      getListActivity={getListActivity}
                      setCurrentSemester={setCurrentSemester}
                      setCurrentChapter={setCurrentChapter}
                      setCurrentExercise={setCurrentExercise}
                    />
                  )}
                  {typeQuestion === MY_QUESTION && (
                    <div className="d-flex flex-column">
                      {/* <SpanSelect>Loại câu hỏi</SpanSelect>
                      <Select
                        defaultValue={SELECTQUESTIONS[1]}
                        options={SELECTQUESTIONS}
                      /> */}
                      <span className="pt-4 pb-2">Độ khó</span>
                      <Select
                        value={difficultLevel}
                        options={SELECTRANKS}
                        onChange={(rank) => setDifficultLevel(rank)}
                        isDisabled={isHoc10Question}
                      />
                    </div>
                  )}
                </div>
                {typeQuestion === HOC10_QUESTION && (
                  <ListQuestionHoc10
                    listAct={listAct}
                    titleNotFound={titleNotFound}
                    setActSelected={setActSelected}
                    questionSetId={questionSetId}
                    datalistQuestion={datalistQuestion}
                    onGetData={onGetData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <PopupConfirmDelete
        show={showPopupCfDelete}
        setShow={setShowPopupCfDelete}
        confirmDelete={confirmDelete}
        indexDelete={indexDelete}
      />
    </>
  );
};

const TextPreview = styled.div`
  cursor: default;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemsQuestion = styled.div`
  ${(props) => props.isActive && "background-color: rgba(255, 190, 136, 0.7);"}
  height: 128px;
  border: 1px solid rgba(255, 190, 136, 0.7);
  .not-active-number {
    color: #ffbe88;
  }

  .not-active-image {
    background-color: #ffbe88;
  }
`;

const ButtonShowMathQuill = styled.div`
  padding: 10px 10px;
  border-radius: 51px;
  color: #fff;
  cursor: pointer;
`;

const ImageStyleM = styled.img`
  width: 30px;
  background: #ffbe88;
  border-radius: 2px;
  padding: 5px 5px;
  cursor: pointer;
`;
const ImageStyleD = styled.img`
  width: 30px;
  margin-top: 10px;
  background: #ffbe88;
  border-radius: 2px;
  padding: 5px 5px;
  cursor: pointer;
`;
const InputRadio = styled.input`
  position: absolute;
  height: 16px;
  width: 16px;
  top: 5px;
  left: 5px;
`;

const QuestionContent = styled.div`
  height: calc(100vh - 60px);
  overflow: scroll;
  overflow-x: visible;
  background-color: rgba(255, 190, 136, 0.08);
  paddingtop: 20px;
`;
const AudioWrapper = styled.div`
  width: 100%;
  height: 85px;
  background: #f4f5f6;
  border: 0.5px solid #e9e9e9;
  border-radius: 7px;
  font-size: 40px;
`;
const ButtonDelete = styled.button`
  top: 5px;
  right: 5px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  width: 16px;
  height: 16px;
  color: #ff7707 !important;
`;
const Image = styled.img`
  border-radius: 7px;
`;
const Video = styled.video`
  border-radius: 7px;
`;

export default QuestionWrapper;
