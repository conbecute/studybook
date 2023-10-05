import React, { forwardRef, useEffect, useState } from "react";
import _ from "lodash";
import FillTheBlankWithTextWrapper from "./components/FillTheBlankWithDropdownContent";
import { onDataConfigFib003 } from "./selection";
import { onResultIcon } from "edu_lms/components/Game/selection";

import Title from "./components/Title";
import styled from "styled-components";
const FillTheBlankWithText = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [dataAnswers, setStateDataAnswers] = useState([]);
  const [titleQuestion, setStateTitleQuestion] = useState("");

  useEffect(() => {
    const dataConfig = onDataConfigFib003(data.game_config, data.icon_list);
    setStateDataConfig(dataConfig);
    setStateDataAnswers(dataConfig[0]);
    let title = dataConfig[0].title;
    let iconList = data.icon_list[0];
    const resultQuestion = onResultIcon(title, iconList.icons);
    setStateTitleQuestion(resultQuestion);
  }, [data]);

  const fontSizeAnswer = data.game_config.font_size_answer;
  return (
    <Wrapper>
      {dataConfig.length > 0 && (
        <>
          <Title
            titleQuestion={titleQuestion}
            typeQuestion={dataConfig?.type_question}
            typeText={dataConfig?.type_text}
            fontSize={dataConfig?.font_size}
          />
          <FillTheBlankWithTextWrapper
            data={dataAnswers.answers}
            fontSizeAnswer={fontSizeAnswer}
            dataConfig={dataConfig}
            typeAnswer={dataConfig?.type_answer}
            typeText={dataConfig?.type_text}
            ref={ref}
            onComplete={onComplete}
            onPlaying={onPlaying}
            showCorrectAnswer={showCorrectAnswer}
            dataHistory={data.dataHistory}
            isReadOnly={isReadOnly}
          />
        </>
      )}
    </Wrapper>
  );
};

export default forwardRef(FillTheBlankWithText);

const Wrapper = styled.div`
  text-align: center;
`;
