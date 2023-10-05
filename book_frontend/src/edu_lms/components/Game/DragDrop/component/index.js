import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import _ from "lodash";
import styled from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoxItem from "./BoxItem";
import Dustbin from "./Dustbin";
import { GAME_TYPE, CTA_POPUP_TYPE } from "../../../../constants/type";
import {
  WrapperDragDroExercises,
  onFormatDataQuestion,
  onFormatDataAnswer,
  onFormatData,
  onChangeStatus,
} from "../selection";
import { styleAlertGame } from "../../selection";
import ButtonReset from "../component/ButtonReset";
import { postHistoryGame } from "../../../../services/readingBook";
import AnswerComponent from "../../AnswerComponent";

const DragDropWrapper = ({ data, dataDefault, objectId }) => {
  const [dataAnswer, setStateDataAnswer] = useState([]);
  const [dataQuestion, setStateDataQuestion] = useState([]);
  const [isDislabeled, setSStateDislabeled] = useState(true);
  const [inputData, setInputData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [countCorrect, setCountCorrect] = useState(0);

  useEffect(() => {
    setInputData({
      ...dataDefault.game_config,
      results: [],
    });
  }, [dataDefault]);

  useEffect(() => {
    const newData = onFormatData(data);
    const dataQuestionConfig = onFormatDataQuestion(newData, data);
    const dataAnswerConfig = onFormatDataAnswer(data);
    setStateDataAnswer(dataAnswerConfig);
    setStateDataQuestion(dataQuestionConfig);
  }, [data]);

  const onSpliceData = (id) => {
    if (isDislabeled) {
      setSStateDislabeled(false);
    }
    const data = onChangeStatus(dataAnswer, id);
    setStateDataAnswer(data);
    const listAnswerUnselected = data.filter(
      (answer) => answer.status === false
    );
    if (listAnswerUnselected?.length === 0) {
      setShowAlert(true);
    }
  };
  const onResetData = () => {
    const data = dataAnswer.map((item) => ({ ...item, status: false }));
    setStateDataAnswer(data);
    setSStateDislabeled(true);
    setShowAlert(false);
    setCountCorrect(0);
  };

  useEffect(() => {
    if (inputData?.results?.length == dataAnswer.length) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(inputData),
      };
      postHistoryGame(dataPost);
    }
  }, [inputData]);

  const dropAnswer = (value) => {
    setInputData((state) => ({ ...state, results: [...state.results, value] }));
  };

  return (
    <WrapperDragDroExercises>
      <div className="w-100 quicksand-medium">
        <WrapButtonReset>
          <ButtonReset onResetData={onResetData} isDislabeled={isDislabeled} />
        </WrapButtonReset>
        <DndProvider backend={HTML5Backend}>
          <div className="d-flex justify-content-center align-items-end">
            {dataQuestion.map((item, index) => {
              return (
                <Dustbin
                  data={item}
                  dropAnswer={dropAnswer}
                  key={index}
                  typeGame={data.game_config?.type_game}
                  typeQuestion={data.game_config?.type_question}
                  setCountCorrect={setCountCorrect}
                />
              );
            })}
          </div>
          <AnswerBody numberCol={data.game_config.answer_number_in_a_row}>
            {dataAnswer.map((item, index) => {
              return (
                <BoxItem
                  key={index}
                  item={item}
                  onSpliceData={onSpliceData}
                  typeGame={data.game_config?.type_game}
                  typeAnswer={data.game_config?.type_answer}
                />
              );
            })}
          </AnswerBody>
        </DndProvider>
      </div>
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalAnswer={countCorrect}
          totalQuestion={data.game_config.answer.couple_of_icon.length}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
    </WrapperDragDroExercises>
  );
};

export default DragDropWrapper;

const AnswerBody = styled.div`
  grid-template-columns: ${(props) => `repeat(${props.numberCol}, 1fr)`};
  display: grid;
  grid-gap: 0.5rem;
  text-align: center;
  margin-top: 120px;
  padding: 0 15px;
`;
const WrapButtonReset = styled.div`
  position: absolute;
  top: 20px;
  right: 0px;
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;
