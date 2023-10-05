import { TypeGame } from "edu_lms/components/configGame";
import { onFormatDataGameConfig } from "edu_lms/modules/DoingExercise/selection";
import { converDataDefault } from "edu_lms_v2/modules/MockTest/ResultQuestion/selections";
import _ from "lodash";
import { getQuestionId } from "../constant";

const dataDefault = {
  question: "",
  image: "",
  audio: "",
  video: "",
  answers: [
    {
      id: "1",
      audio: "",
      image: "",
      value: "",
      video: "",
    },
    {
      id: "2",
      audio: "",
      image: "",
      value: "",
      video: "",
    },
    {
      id: "3",
      audio: "",
      image: "",
      value: "",
      video: "",
    },
    {
      id: "4",
      audio: "",
      image: "",
      value: "",
      video: "",
    },
  ],
  correct_answer: "",
};

export const convertDataFormToDataCMS = (dataForm, questionDetail) => {
  const dataAnswers = questionDetail?.answers.map((answer, index) => ({
    icon_id: index + 1,
    path: answer.image || answer.video,
    type_media: 1,
    props: [
      {
        key: "",
        text: dataForm[`answer${index}`],
        audio: [
          {
            path: answer.audio,
            voice_id: 56,
            sync_data: "",
          },
        ],
      },
    ],
  }));
  const answers =
    questionDetail?.answers.map((_, index) => ({
      answer_id: index + 1,
      is_correct: index + 1 == dataForm.correct_answer ? true : false,
    })) || [];
  const dataQuestion = [
    {
      icon_id: "question",
      path: questionDetail?.image || questionDetail?.video,
      tracing: '{"paths":[]}',
      type_media: 1,
      props:
        [
          {
            key: "",
            text: dataForm.question,
            audio: [
              { path: questionDetail?.audio, voice_id: 56, sync_data: "" },
            ],
          },
        ] || [],
      height: 1308,
      width: 1139,
    },
  ];
  const typeQuestion = [
    questionDetail?.image && "image",
    dataQuestion[0].props[0].text && "text",
    dataQuestion[0].props[0].audio[0].path && "audio",
    questionDetail?.video && "video",
  ];

  const typeAnswer = [];
  questionDetail?.answers.map((answer, index) => {
    answer.image && typeAnswer.push("image");
    dataForm[`answer${index}`] && typeAnswer.push("text");
    answer.audio && typeAnswer.push("audio");
    answer.video && typeAnswer.push("video");
  });

  const dataConvert = {
    game_id: 439,
    icon_list: [
      {
        language: "vi",
        icons: dataQuestion.concat(dataAnswers),
      },
    ],
    game_config: {
      background: [],
      data: [
        {
          answer_number_in_a_row: "2",
          question: "question",
          answers,
        },
      ],
      type_answer: [...new Set(typeAnswer)],
      type_question: typeQuestion.filter(Boolean),
    },
  };

  return dataConvert;
};

export const convertDataCMSToForm = (index, datalistQuestion) => {
  const isEmpty = _.isEmpty(datalistQuestion);
  const questionSetInfo = datalistQuestion[index]?.data;
  const activityId = datalistQuestion[index]?.activity_id;
  const questionId = getQuestionId(datalistQuestion[index]);
  const questionInfo = questionSetInfo?.icon_list[0]?.icons.find(
    ({ icon_id }) => icon_id === questionId
  );

  if (!isEmpty && questionSetInfo?.game_id === TypeGame.MULTIPLE_CHOICE) {
    const correctAnswer = questionSetInfo?.game_config?.data[0].answers.find(
      ({ is_correct }) => is_correct
    );
    const questionConvert = {
      question: questionInfo?.props[0]?.text,
      image: questionSetInfo?.game_config?.type_question.includes("image")
        ? questionInfo?.path
        : "",
      audio: questionInfo?.props[0]?.audio[0].path,
      correct_answer: correctAnswer?.answer_id,
      video: questionSetInfo?.game_config?.type_question.includes("video")
        ? questionInfo?.path
        : "",
    };
    const answersList = questionSetInfo?.game_config.data[0].answers;
    const answersInfo = answersList?.map((answer) => {
      const info = questionSetInfo?.icon_list[0].icons.find(
        ({ icon_id }) => icon_id === answer.answer_id
      );
      return { ...answer, ...info };
    });

    const answersConvert = answersInfo?.map((answer) => {
      const arrPath = answer?.path?.split(".");
      const typePath = arrPath ? arrPath[arrPath?.length - 1] : "";
      return {
        id: answer.answer_id,
        value: answer.props[0].text,
        image: typePath !== "mp4" ? answer.path : "",
        audio:
          !_.isEmpty(answer.props[0].audio) && answer.props[0].audio[0].path,
        video: typePath === "mp4" ? answer.path : "",
      };
    });

    const dataConvert = {
      ...questionConvert,
      game_id: 439,
      answers: answersConvert,
      activityId: activityId,
    };
    return dataConvert;
  }

  if (!isEmpty && questionSetInfo?.game_id !== TypeGame.MULTIPLE_CHOICE) {
    const dataformat = onFormatDataGameConfig(datalistQuestion, () => {});
    const dataAnswerDefault = converDataDefault(dataformat);
    return { question: dataformat[index], answer: dataAnswerDefault[index] };
  }

  return dataDefault;
};

export const getFolderPath = (resourceType) => {
  switch (resourceType) {
    case "image":
      return process.env.REACT_APP_FOLDER_UPLOAD_IMAGE;
    case "audio":
      return process.env.REACT_APP_FOLDER_UPLOAD_AUDIO;
    case "video":
      return process.env.REACT_APP_FOLDER_UPLOAD_VIDEO;
    default:
      return;
  }
};
