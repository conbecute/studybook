import { useState } from "react";
import {
  CUBIC_EQUATION,
  FIRST_DEGREE_EQUATION,
  formatDataActivity,
  QUADRATIC_EQUATION,
  QUATERNARY_EQUATION,
} from "../constant";
import FillTheBlankFirstDegreeEquation from "./FillTheBlankFirstDegreeEquation";
import FillTheBlankQuadraticEquation from "./FillTheBlankQuadraticEquation";

export default function FillTheBlank({ data }) {
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [checkAlert, setCheckAlert] = useState(true);
  const [isCheckQuestion, setIsCheckQuestion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dataGame, setDataGame] = useState(formatDataActivity(data.game_config.data));
  const [totalCorrect, setTotalCorrect] = useState(0);
  const graphStyle = data.game_config?.data[indexQuestion]?.type_graph?.icon_id;

  switch (graphStyle) {
    case FIRST_DEGREE_EQUATION:
      return (
        <FillTheBlankFirstDegreeEquation
          data={data}
          indexQuestion={indexQuestion}
          setIndexQuestion={setIndexQuestion}
          setIsCheckQuestion={setIsCheckQuestion}
          isCheckQuestion={isCheckQuestion}
          checkAlert={checkAlert}
          setCheckAlert={setCheckAlert}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          dataGame={dataGame}
          setDataGame={setDataGame}
          setTotalCorrect={setTotalCorrect}
          totalCorrect={totalCorrect}
        />
      );
    case QUADRATIC_EQUATION:
      return (
        <FillTheBlankQuadraticEquation
          data={data}
          indexQuestion={indexQuestion}
          setIndexQuestion={setIndexQuestion}
          setIsCheckQuestion={setIsCheckQuestion}
          isCheckQuestion={isCheckQuestion}
          checkAlert={checkAlert}
          setCheckAlert={setCheckAlert}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          dataGame={dataGame}
          setDataGame={setDataGame}
          setTotalCorrect={setTotalCorrect}
          totalCorrect={totalCorrect}
        />
      );
    case CUBIC_EQUATION:
      return <div></div>;
    case QUATERNARY_EQUATION:
      return <div></div>;
    default:
      return false;
  }
}
