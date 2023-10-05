import { useEffect, useState } from "react";
import { ANSWER_STATUS } from "edu_lms/constants/type";
import { useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import {
  Board,
  coorInteger,
  DEFAULT_POINT_Q1,
  DEFAULT_POINT_Q2,
  LINE,
  MOUSE_DRAG,
  POINT,
  COLOR_REGION,
  REGION,
  SMALL_COORDINATES,
} from "../constant";
import { useForm } from "react-hook-form";
import Question from "./Question";
import Footer from "./Footer";
import {
  formatQuestion,
  coordinatesRegion,
  EQUATION,
  isCovariate,
  onCheckDataForm,
  checkResultRegion,
  getStrokeColor,
} from "./selection";

export default function RegionGraph({ data }) {
  const { register, handleSubmit } = useForm({});
  const [isReview, setIsReview] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [question, setQuestion] = useState(
    formatQuestion(data.game_config.data)
  );
  const [dataActive, setDataActive] = useState(question[activeQuestion]);
  const [showAlert, setShowAlert] = useState(false);
  const [answerRegion, setAnswerRegion] = useState([]);
  const [checkParabol, setCheckParabol] = useState(false);
  const [inputDomain, setInputDomain] = useState(false);
  const [checkResult, setCheckResult] = useState(false);
  const [stepResult, setStepResult] = useState(true);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [checkValueInput, setCheckValueInput] = useState(false);
  const [checkStep, setCheckStep] = useState(true);
  const [disable, setDisable] = useState(true);
  const [getCoorPointA, setCoorPointA] = useState([...DEFAULT_POINT_Q1]);
  const [getCoorPointB, setCoorPointB] = useState([...DEFAULT_POINT_Q2]);
  const [checkInput, setCheckInput] = useState([]);

  useEffect(() => {
    setQuestion(formatQuestion(data.game_config.data));
  }, []);

  useEffect(() => {
    const board = Board(
      dataActive,
      {
        control: false,
        drag: true,
      },
      activeQuestion < question.length && `jxgbox${activeQuestion}`
    );
    let coordinatesQ1 = getCoorPointA;
    let coordinatesQ2 = getCoorPointB;
    question[0].coefficient.forEach((item, index) => {
      const pointQ1 = board.create(POINT, getCoorPointA[index], {
        name: "",
      });
      const pointQ2 = board.create(POINT, getCoorPointB[index], {
        name: "",
      });
      const line = board.create(
        LINE,
        [pointQ1, pointQ2],
        {
          withLines: false,
          withLabel: true,
          name: `${
            question[0]?.coefficient?.length !== EQUATION
              ? `d${index + 1}`
              : "d"
          }`,
          label: { offset: [0, -3] },
          strokeColor: getStrokeColor(answerRegion, index),
        },
        answerRegion[0] && {
          strokeColor: `${
            answerRegion[index] === ANSWER_STATUS.WRONG ? "red" : "green"
          }`,
        }
      );
      pointQ1.isDraggable = disable;
      pointQ2.isDraggable = disable;
      line.isDraggable = false;

      pointQ1.on(MOUSE_DRAG, () => {
        pointQ1.moveTo(coorInteger(pointQ1));
        coordinatesQ1[index] = coorInteger(pointQ1);
      });
      pointQ2.on(MOUSE_DRAG, () => {
        pointQ2.moveTo(coorInteger(pointQ2));
        coordinatesQ2[index] = coorInteger(pointQ2);
      });
      setCoorPointA(coordinatesQ1);
      setCoorPointB(coordinatesQ2);

      if (checkResult) {
        const points = [
          Math.abs(dataActive?.negative_coor_x),
          Math.abs(dataActive?.negative_coor_y),
          dataActive?.positive_coor_x,
          dataActive?.positive_coor_y,
        ];
        const maxCoordinates = _.max(points);
        const dataCoefficient = dataActive?.coefficient[index];
        const data = {
          a: dataCoefficient?.coefficient_a,
          b: dataCoefficient?.coefficient_b,
          c: dataCoefficient?.coefficient_c,
          negativeX: -maxCoordinates - 10,
          negativeY: -maxCoordinates - 10,
          positiveX: maxCoordinates + 10,
          positiveY: maxCoordinates + 10,
        };
        let drawRegion = coordinatesRegion(data);
        const covariate = isCovariate(dataCoefficient);
        if (dataCoefficient?.coefficient_b === 0) {
          const li = board.create(
            "line",
            drawRegion,
            answerRegion[0] && {
              strokeColor: `${
                answerRegion[index] === ANSWER_STATUS.WRONG ? "red" : "green"
              }`,
            }
          );
          const p1 = board.create("glider", [8, -16, li]);
          const p2 = board.create("glider", [8, 16, li]);
          drawRegion = [p1, p2];
        }
        const comb = board.create("comb", drawRegion, {
          curve: {
            strokeColor: COLOR_REGION[index],
            width: REGION.width,
            angle: covariate ? REGION.angleLeft : REGION.angleRight,
            frequency:
              dataActive?.positive_coor_y > SMALL_COORDINATES
                ? REGION.frequency
                : REGION.lowFrequency,
          },
        });
        comb.highlight = false;
      }
    });
  }, [checkResult, checkParabol, answerRegion, disable]);

  useEffect(() => {
    setDataActive(question[activeQuestion]);
  }, [activeQuestion, question]);

  const checkRegion = () => {
    const resultRegion = checkResultRegion(
      dataActive,
      getCoorPointA,
      getCoorPointB
    );
    setDisable(false);
    setAnswerRegion(resultRegion);

    let totalCorrect = 0;
    resultRegion.forEach((item) => {
      item === ANSWER_STATUS.CORRECT && totalCorrect++;
    });
    if (_.includes(resultRegion, ANSWER_STATUS.WRONG)) {
      setShowAlert(true);
      const newQuestion = question.map((item, index) =>
        index === activeQuestion
          ? { ...item, result: ANSWER_STATUS.WRONG }
          : item
      );
      setQuestion(newQuestion);
      setIsReview(true);
      return false;
    }
    setStepResult(false);
    const newQuestion = question.map((item, index) =>
      index === activeQuestion
        ? { ...item, result: ANSWER_STATUS.CORRECT }
        : item
    );
    setQuestion(newQuestion);
    setTotalAnswer(totalCorrect);
    return true;
  };
  const continudeGame = () => {
    setInputDomain(true);
    setCheckStep(false);
  };
  const onSubmitForm = handleSubmit((data) => {
    const dataInput = onCheckDataForm(data, dataActive);
    if (dataInput === ANSWER_STATUS.WRONG) {
      setCheckValueInput(true);
    } else {
      setIsReview(true);
      setShowAlert(true);
      setCheckInput(dataInput);
      let totalCorrect = 0;
      dataInput.forEach((item) => {
        item && totalCorrect++;
      });
      if (totalCorrect === dataInput.length) {
        setCheckResult(true);
      }
      setTotalAnswer(totalCorrect);
    }
  });

  const onResetData = () => {
    setDisable(true);
    setAnswerRegion([]);
    setCoorPointA([...DEFAULT_POINT_Q1]);
    setCoorPointB([...DEFAULT_POINT_Q2]);
    setCheckStep(true);
    setStepResult(true);
    setInputDomain(false);
    setCheckParabol(false);
    setShowAlert(false);
    setQuestion(formatQuestion(data.game_config.data));
    setCheckValueInput(false);
    setCheckResult(false);
    setActiveQuestion(0);
    setIsReview(false);
    setCheckInput([]);
  };
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );

  return (
    <Form>
      <div className="container">
        <Question
          question={question}
          activeQuestion={activeQuestion}
          isReview={isReview}
          inputDomain={inputDomain}
          register={register}
          checkResult={checkResult}
          checkInput={checkInput}
          showAlert={showAlert}
        />
        <Footer
          isReview={isReview}
          languageBook={languageBook}
          onResetData={onResetData}
          question={question}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          stepResult={stepResult}
          checkRegion={checkRegion}
          onSubmitForm={onSubmitForm}
          totalAnswer={totalAnswer}
          setCheckValueInput={setCheckValueInput}
          checkValueInput={checkValueInput}
          continudeGame={continudeGame}
          checkStep={checkStep}
        />
      </div>
    </Form>
  );
}

const Form = styled.form`
  overflow-x: auto;
  .container {
    height: 120%;
  }
`;
