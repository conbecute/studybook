import PronunciationExercises from "../../components/PronunciationExercises";
import DragDropExercises from "../../components/DragDropExercises";
import DragDropExercisesFormatTwo from "../../components/DragDropExercises_2";
import MultipleChoiceQuestions from "../../components/MultipleChoiceQuestions";
import ListQuestion from "../../components/ListQuestion";

export const onShowGameQuestion = (type, dataQuestion) => {
  switch (type) {
    case 1:
      return <PronunciationExercises dataQuestion={dataQuestion} />;
    case 2:
      return <DragDropExercises dataQuestion={dataQuestion} />;
    case 3:
      return <DragDropExercisesFormatTwo dataQuestion={dataQuestion} />;
    case 4:
      return <MultipleChoiceQuestions dataQuestion={dataQuestion} />;
    case 5:
      return <ListQuestion dataQuestion={dataQuestion} />;
    default:
      return false;
  }
};

export const dataBook = [
  {
    id: "book_1",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/b446b7ff-9c74-4abf-86e2-72513e4227a3.jpg",
    list_game: [],
  },
  {
    id: "book_2",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/d3d71996-4f1d-4e7d-9da6-95100acbf7f2.jpg",
    list_game: [],
  },
  {
    id: "book_3",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/1465b9bf-b30a-4f69-bb8c-4a2744e8cace.jpg",
    list_game: [],
  },
  {
    id: "book_4",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/c0bafb08-d50c-41cc-9cb9-44b365cf375f.jpg",
    list_game: [],
  },
  {
    id: "book_5",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/59e8b047-7070-46fd-ab9b-661935d5056a.jpg",
    list_game: [],
  },
  {
    id: "book_6",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/8f65e648-895a-4aa9-a4e8-15e0fcfdeaa3.jpg",
    list_game: [
      {
        questionId: "question_1",
        type: 1,
        question: [
          {
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-1.jpg`,
            video: "84KmM-GLReo",
          },
          {
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-2.jpg`,
            video: "84KmM-GLReo",
          },
        ],
      },
      {
        questionId: "question_2",
        type: 2,
        result: [
          { id: "result_1", typeResult: "Q01", value: "anh", image: "" },
          { id: "result_2", typeResult: "Q02", value: "ach", image: "" },
        ],
        question: [
          {
            id: "1",
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-3.jpg`,
            typeResult: "Q01",
            video: "84KmM-GLReo",
          },
          {
            id: "2",
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-4.jpg`,
            typeResult: "Q01",
            video: "84KmM-GLReo",
          },
          {
            id: "3",
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-5.jpg`,
            typeResult: "Q01",
            video: "84KmM-GLReo",
          },
          {
            id: "4",
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-6.jpg`,
            typeResult: "Q02",
            video: "84KmM-GLReo",
          },
          {
            id: "5",
            image:
              `${process.env.REACT_APP_MEDIA_URL_APP}upload/web/background-web/book-7.jpg`,
            typeResult: "Q02",
            video: "84KmM-GLReo",
          },
        ],
      },
    ],
  },
  {
    id: "book_7",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/f18d9d26-53e4-48c9-9892-5073fd827cc8.jpg",
    list_game: [
      {
        questionId: "question_1",
        type: 3,
        result: [
          { id: "result_1", typeResult: "Q01", value: "book1", image: "" },
          { id: "result_2", typeResult: "Q02", value: "book2", image: "" },
          { id: "result_3", typeResult: "Q03", value: "book3", image: "" },
          { id: "result_4", typeResult: "Q04", value: "book4", image: "" },
        ],
        question: [
          {
            id: "1",
            image: "",
            text: "text_1",
            typeResult: "Q01",
            video: "84KmM-GLReo",
          },
          {
            id: "2",
            image: "",
            text: "text_2",
            typeResult: "Q02",
            video: "84KmM-GLReo",
          },
        ],
      },
      {
        questionId: "question_2",
        type: 4,
        result: [],
        question: [],
      },
    ],
  },
  {
    id: "book_8",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/a26f8282-9448-49ca-8f83-18b2bfad8e2f.jpg",
    list_game: [
      {
        id_game: "game_1",
        type: 5,
        destination: "width:50%;height:400px;position:...",
        question: [
          {
            game: {
              category: "FILL_THE_BLANK_WITH_NUMBER",
              question: "Subtract",
              answer: {
                operators: "+",
                number: 2,
                start: 10,
                end: 20,
                range: 2,
              },
              suggestions: ["tang dan 1", "tang dan 2"],
              icons: [
                {
                  icon_id: "Subtract",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Them phan tu vao day tang dan",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_3",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Them phan tu vao day tang dan",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_NUMBER",
              question: "Subtract_2",
              answer: {
                operators: "-",
                number: 2,
                start: 20,
                end: 30,
                range: 2,
              },
              suggestions: ["giam dan 1", "giam dan 2"],
              icons: [
                {
                  icon_id: "Subtract_2",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Them phan tu vao day giam dan ",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_5",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Subtract ....",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_IMAGES",
              question: "Subtract_3",
              answer: {
                operators: "+",
                image: [
                  {
                    items: "image_icon_1",
                  },
                ],
                positon: "top",
                end: 20,
                start: 10,
                positon_blank: "right",
              },
              suggestions: ["phep cong 1", "phep cong 3"],
              icons: [
                {
                  icon_id: "Subtract_3",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap dap an dung",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_5",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Subtract ....",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_IMAGES",
              question: "Subtract_4",
              answer: {
                operators: "-",
                image: [
                  {
                    items: "image_icon_1",
                  },
                ],
                positon: "top",
                end: 20,
                start: 10,
                positon_blank: "right",
              },
              suggestions: ["phep cong 1", "phep cong 3"],
              icons: [
                {
                  icon_id: "Subtract_4",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap dap an dung",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_5",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Subtract ....",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_COMPARE",
              question: "Subtract_5",
              operators: "<",
              answer: {
                start: 10,
                end: 20,
              },
              suggestions: [
                "FILL_THE_BLANK_WITH_COMPARE 1",
                "FILL_THE_BLANK_WITH_COMPARE3",
              ],
              icons: [
                {
                  icon_id: "Subtract_4",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap dap an dung",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_5",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Subtract ....",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_COMPARE",
              question: "Subtract_6",
              operators: ">",
              answer: {
                start: 10,
                end: 20,
              },
              suggestions: [
                "FILL_THE_BLANK_WITH_COMPARE 6",
                "FILL_THE_BLANK_WITH_COMPARE_8",
              ],
              icons: [
                {
                  icon_id: "Subtract_6",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap dap an dung",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_3",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Subtract ....",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "FILL_THE_BLANK_WITH_NUMBER_RANDOM",
              question: "Subtract_7",
              answer: {
                number: 1,
                start: 1,
                end: 101,
              },
              suggestions: ["tang dan 9", "tang dan 17"],
              icons: [
                {
                  icon_id: "Subtract",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap so con thieu",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_7",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "Them phan tu vao day tang dan",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
          {
            game: {
              category: "SEQUENCE",
              question: "Subtract_8",
              answer: {
                quantity: 5,
                start: 10,
                end: 20,
              },
              suggestions: ["tang dan 9", "tang dan 17"],
              icons: [
                {
                  icon_id: "Subtract",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "nhap so con thieu",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
                {
                  icon_id: "Subtract_8",
                  path: "MPNTifydjIZKyfhpChvA05kEsV7bkJQQ.png",
                  type_media: 1,
                  props: [
                    {
                      key: "name_1",
                      text: "sắp xếp phần tử theo thứ tự tăng dan",
                      audio: [
                        {
                          path: "u2JYh5JcgZh4WMQboUZUXrb5JpgGS8PN.mp3",
                          voice_id: 10,
                          sync_data: "",
                        },
                      ],
                    },
                  ],
                  tracing: '{"paths":[]}',
                  comparision: [],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "book_9",
    src: "https://cdn.cloudbook.vn/books/resources/00e5462c-e65b-43d0-b434-604d605ac360/01fc52ac-1bd1-4741-aa33-7a73be925c32.jpg",
    list_game: [{ questionId: "question_1", type: 1, list: [] }],
  },
];
