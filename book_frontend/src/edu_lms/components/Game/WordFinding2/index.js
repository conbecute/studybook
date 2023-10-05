import React, { useState, useEffect, Fragment } from "react";

import WordFindingWrapper from "./components";
import { onConfigData } from "./selection";
import _ from "lodash";

const WordFinding2Container = ({ data }) => {
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [arraySelected, setStateArraySelected] = useState([]);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [isDisabled, setStateDisabled] = useState(false);

  useEffect(() => {
    const dataConfig = onConfigData(data);
    setStateDataAnswers(dataConfig);
  }, [data]);

  const onActiveText = (data, index) => {
    if (arraySelected[index]) {
      arraySelected[index].push({ text: data.trim(), status: 0 });
    } else {
      arraySelected[index] = [{ text: data.trim(), status: 0 }];
    }
    setStateArraySelected(arraySelected);
  };

  const onResetData = () => {
    const dataConfig = onConfigData(data);
    setStateDataAnswers([...dataConfig]);
    setStateButtonReset(false);
    setStateDisabled(false);
    setStateArraySelected([]);
  };
  const onCheckAnswers = () => {
    const dataAnswer = arraySelected.map((item, index) => {
      item.map((item2, index2) => {
        if (dataAnswers[0].answers[index].answer_result.includes(item2.text)) {
          arraySelected[index][index2].status = 1;
        } else {
          arraySelected[index][index2].status = 2;
        }
      });
    });

    setStateArraySelected(arraySelected);
    setStateButtonReset(true);
    setStateDisabled(true);
  };

  return (
    <Fragment>
      <WordFindingWrapper
        data={dataAnswers[0]}
        arraySelected={arraySelected}
        isButtonReset={isButtonReset}
        typeQuestion={data.game_config.type_question}
        typeAnswer={data.game_config.type_answer}
        typeText={data.game_config?.type_text}
        fontSize={data.game_config?.font_size}
        onActiveText={onActiveText}
        onCheckAnswers={onCheckAnswers}
        onResetData={onResetData}
        isDisabled={isDisabled}
      />
    </Fragment>
  );
};
export default WordFinding2Container;
