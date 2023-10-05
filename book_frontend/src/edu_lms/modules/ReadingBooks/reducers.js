import _ from "lodash";
import * as material from "material-colors";
import * as TYPES from "../../constants/actionsType";
import { Tools } from "../../libs/react-sketch";

const defaultLineColor = material.green["500"];
const defaultLineWidth = 2;

const initialState = {
  dataBook: [],
  isQuestionPopup: false,
  pageBook: 0,
  dataQuestion: [],
  currentMenu: {},
  clickPractice: false,
  typeGame: 0,
  paramterPage: 1,
  total: 0,
  isActive: false,
  isLicence: false,
  bookType: 0,
  paramaterBookId: 0,
  idBook: 0,
  languageBook: 1,
  pageId: 0,
  bookTool: {
    page: {
      show: false,
      control: false,
      drawType: Tools.None,
      lineColor: defaultLineColor,
      lineWidth: defaultLineWidth,
    },
    game: {
      show: true,
      control: false,
      drawType: Tools.None,
      lineColor: defaultLineColor,
      lineWidth: defaultLineWidth,
    },
  },
};

const readingBookReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_BOOK:
      return { ...state, dataBook: action.data };

    case TYPES.PA_MENU_BOOK:
      return { ...state, menuBook: action.data };

    case TYPES.PA_DATA_QUESTION_POPUP:
      return { ...state, isQuestionPopup: action.value };

    case TYPES.PA_DATA_NUMBER_PAGE_BOOK:
      return { ...state, pageBook: action.number };

    case TYPES.PA_DATA_QUESTION:
      return { ...state, dataQuestion: action.data };

    case TYPES.PA_TYPE_GAME_QUESTION:
      return { ...state, typeGame: action.typeNumber };

    case TYPES.PA_TYPE_PARAMTER_PAGE:
      return { ...state, paramterPage: action.number };

    case TYPES.PA_TYPE_ID_BOOK:
      return { ...state, idBook: action.id };

    case TYPES.PA_TYPE_LANGUAGE_BOOK:
      return { ...state, languageBook: action.language };

    case TYPES.PA_TYPE_CHANGE_TOTAL:
      return { ...state, total: action.total };

    case TYPES.PA_TYPE_CHANGE_IS_ACTIVE:
      return { ...state, isActive: action.isActive };

    case TYPES.PA_TYPE_CHANGE_IS_LICENCE:
      return { ...state, isLicence: action.isLicence };

    case TYPES.PA_SET_CURRENT_MENU:
      return { ...state, currentMenu: action.currentMenu };

    case TYPES.PA_TYPE_PARAMTER_BOOK_ID:
      return { ...state, paramaterBookId: action.paramaterBookId };
      
    case TYPES.PA_SET_STATE_CLICK_PRACTICE:
      return { ...state, clickPractice: action.clickPractice };

    case TYPES.PA_READING_BOOK_UPDATE_BOOKTOOL_PAGE:
      return {
        ...state,
        bookTool: {
          ...state.bookTool,
          page: { ...state.bookTool.page, ...action.data },
        },
      };

    case TYPES.PA_READING_BOOK_UPDATE_BOOKTOOL_GAME:
      return {
        ...state,
        bookTool: {
          ...state.bookTool,
          game: { ...state.bookTool.game, ...action.data },
        },
      };

    case TYPES.PA_READING_BOOK_UPDATE_PAGE_ID:
      return { ...state, pageId: action.pageId };

    case TYPES.PA_READING_BOOK_UPDATE_PAGE_DRAW:
      return {
        ...state,
        dataBook: state.dataBook.map((page) => {
          if (page.id === action.data.page_id) {
            const draws = _.concat(page.draws || []);
            const drawIndex = (page.draws || []).findIndex((d) => {
              const hasOnPageDraw = !d.object_id;
              const hasOnGameDraw =
                d.object_id === action.data.object_id &&
                d.object_layer === action.data.object_layer;

              return hasOnPageDraw || hasOnGameDraw;
            });
            if (drawIndex !== -1) {
              draws[drawIndex] = action.data;
            } else {
              draws.push(action.data);
            }
            return {
              ...page,
              draws,
            };
          } else {
            return { ...page };
          }
        }),
      };

    case TYPES.PA_READING_BOOK_UPDATE:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default readingBookReducers;
