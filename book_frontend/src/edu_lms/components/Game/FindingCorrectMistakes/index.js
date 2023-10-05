import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WordFindingWrapper from "./components";
import { onConfigData } from "./selection";
import FooterComponent from "./components/FooterComponent";
import { TYPE_SPLIT_MUL_ANSWER, TYPE_ENGLISH } from "../../../constants/type";
import { onDispatchDataAlert } from "../../ListQuestion/actions";
import {
  AlertSuccess,
  AlertError,
  AlertDefault,
  AlertErrorEnglish,
  AlertSuccessEnglish,
} from "../selection";
import { postHistoryGame } from "../../../services/readingBook";
const WordFindingContainer = ({
  data,
  onDispatchDataAlert,
  alert,
  objectId,
  gameId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [isDisabled, setStateDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  useEffect(() => {
    const dataConfig = onConfigData(data);
    setStateDataAnswers(dataConfig);
    onDispatchDataAlert(AlertDefault);
  }, [data]);
  const isCheckAnswer = !isDirty || !isValid;

  const onActiveText = (data, answerId) => {
    const newData = dataAnswers.map((dataItem) => {
      dataItem.answers.map((item) => {
        if (item.answer_id === answerId) {
          item.answer_text.map((answerItem) => {
            if (answerItem.id === data.id) {
              answerItem.status = answerItem.status === 1 ? 0 : 1;
              if (answerItem.status) {
                item.input.show = true;
              } else {
                item.input.show = false;
              }
            } else {
              answerItem.status = 0;
            }
            return { ...answerItem };
          });
        }

        return { ...item };
      });

      return { ...dataItem };
    });

    setStateDataAnswers(newData);
  };

  const onCheckAnswers = () => {
    onDispatchDataAlert(AlertDefault);
    setShowAlert(true);
    let isCorrect = true;
    const dataConfig = dataAnswers.map((answerItem) => {
      const dataAnswers = answerItem.answers.map((data) => {
        let newData;
        let statusData;
        let findCorrect = true;
        let listAnswer = data?.answer_correct?.split(TYPE_SPLIT_MUL_ANSWER);
        if (listAnswer) {
          let value = htmlDecode(getValues(data.answer_id))
            .trim()
            .replace(/ +(?= )/g, "");
          if (!isNaN(value)) {
            value = String(parseInt(data.answer_id, 10));
          }

          if (listAnswer?.includes(value)) {
            statusData = 1;
          } else {
            statusData = 2;
            findCorrect = false;
            isCorrect = false;
          }
        } else {
          statusData = 1;
        }

        if (data.answer_result.length > 0) {
          newData = data.answer_text.map((item) => {
            let status = 0;
            if (
              _.includes(
                data?.answer_result,
                item?.value?.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, "")
              )
            ) {
              switch (item.status) {
                case 0:
                  status = 4;
                  break;
                case 1:
                  status = 2;
                  break;
                case 2:
                  status = 2;
                  break;
                case 4:
                  status = 4;
                  break;
                default:
                  return false;
              }
            } else {
              if (item.status !== 0) {
                status = 3;
                isCorrect = false;
                findCorrect = false;
              }
            }
            return { ...item, status: status };
          });
        } else {
          newData = data.answer_text.map((item) => {
            let status;
            if (item.status !== 0) {
              status = 3;
              isCorrect = false;
              findCorrect = false;
            } else {
              status = 0;
            }
            return { ...item, status: status };
          });
        }
        return {
          ...data,
          answer_text: newData,
          input: {
            ...data.input,
            status: findCorrect && statusData ? statusData : 2,
            text: getValues(data.answer_id),
          },
        };
      });
      return { ...answerItem, answers: dataAnswers };
    });

    if (isCorrect) {
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertSuccessEnglish);
      } else {
        onDispatchDataAlert(AlertSuccess);
      }
    } else {
      if (languageBook == TYPE_ENGLISH) {
        onDispatchDataAlert(AlertErrorEnglish);
      } else {
        onDispatchDataAlert(AlertError);
      }
    }
    let dataPost = {
      objectId: objectId,
      gameId: data.game_id,
      data: JSON.stringify(dataConfig),
    };
    postHistoryGame(dataPost);
    setStateDataAnswers(dataConfig);
    setStateButtonReset(true);
    setStateDisabled(false);
  };

  const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  const onResetData = () => {
    setShowAlert(false);
    reset();
    const dataConfig = onConfigData(data);
    onDispatchDataAlert(AlertDefault);
    setStateDataAnswers(dataConfig);
    setStateButtonReset(false);
    setStateDisabled(false);
  };

  useEffect(() => {
    if (dataAnswers) {
      dataAnswers[0]?.answers?.map((answer, index) => {
        register(
          {
            name: `${answer.answer_id}`,
          },
          { required: true }
        );
      });
    }
  }, [register, dataAnswers]);

  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };

  return (
    <Body>
      <WordFindingWrapper
        data={dataAnswers[0]}
        isButtonReset={isButtonReset}
        typeQuestion={data.game_config.type_question}
        typeAnswer={data.game_config.type_answer}
        typeText={data.game_config?.type_text}
        fontSize={data.game_config?.font_size}
        onActiveText={onActiveText}
        onCheckAnswers={onCheckAnswers}
        onResetData={onResetData}
        isDisabled={isDisabled}
        setValue={setValue}
        getValues={getValues}
        register={register}
      />
      <div className="d-flex justify-content-end text-right pr-3">
        <FooterComponent
          data={dataAnswers[0]}
          onResetData={onResetData}
          onCheckAnswers={onCheckAnswers}
          alert={alert}
          isDisabled={isDisabled}
          handleDispatchDataAlert={handleDispatchDataAlert}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          isButtonReset={isButtonReset}
          isCheckAnswer={isCheckAnswer}
        />
      </div>
    </Body>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordFindingContainer);

const Body = styled.div`
  height: 92%;
  overflow-y: scroll;
`;
