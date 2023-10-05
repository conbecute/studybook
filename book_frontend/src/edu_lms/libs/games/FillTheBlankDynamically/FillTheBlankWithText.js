import React, { useEffect, useState, forwardRef } from "react";
import { onDataConfig } from "./selection";
import { onResultIcon } from "edu_lms/components/Game/selection";
import FillTheBlankWithTextWrapper from "./FillTheBlankWithTextWrapper";

const FillTheBlankWithText = (
  {
    data,
    dataDefault,
    iconList,
    onComplete,
    onPlaying,
    showCorrectAnswer,
    isReadOnly,
  },
  ref
) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [indexQuestion, setStateIndexQuestion] = useState(0);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState(""); //Hiển thị giao diện ảnh

  useEffect(() => {
    const dataConfig = onDataConfig(data, iconList);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[indexQuestion]);
    const resultQuestion = onResultIcon(
      dataConfig[indexQuestion]?.question,
      iconList[0].icons
    );
    setStateTitleQuestion(resultQuestion);
  }, [data, indexQuestion]);

  return (
    !(indexQuestion >= dataConfig.length) && (
      <FillTheBlankWithTextWrapper
        titleQuestion={titleQuestion}
        dataConfig={dataConfig}
        data={dataAnswers.answers}
        typeQuestion={dataDefault?.game_config?.type_question}
        indexQuestion={indexQuestion}
        ref={ref}
        onPlaying={onPlaying}
        onComplete={onComplete}
        dataDynamically={dataDefault}
        showCorrectAnswer={showCorrectAnswer}
        isReadOnly={isReadOnly}
      />
    )
  );
};

export default forwardRef(FillTheBlankWithText);
