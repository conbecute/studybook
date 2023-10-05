import _ from "lodash";
import { TYPE_CALCULATION } from "../../../constants/type";

const ImageQuestion = ({ resultNumberTwo, resultNumberOne, operators }) => {
  return (
    <div
      className="fill-the-black-image mt-5 mb-5 text-center"
      style={{ width: "273px" }}
    >
      {operators === TYPE_CALCULATION.ADDITION && (
        <div>
          <div>{showIcon(resultNumberOne, "monkey-color-light-yellow")}</div>
          <div className="monkey-fz-40">{operators}</div>
          <div>{showIcon(resultNumberTwo, "monkey-color-blue")}</div>
        </div>
      )}
      {operators === TYPE_CALCULATION.SUBTRACTION && (
        <div>
          <div>{showIcon(resultNumberTwo, "monkey-color-blue")}</div>
          <div className="monkey-fz-40">{operators}</div>
          <div>{showIcon(resultNumberOne, "monkey-color-light-yellow")}</div>
        </div>
      )}
    </div>
  );
};
export default ImageQuestion;

const showIcon = (data, color) => {
  const newArray = _.times(data, _.constant(0));
  return newArray.map((item, index) => {
    return (
      <i
        key={index}
        className={`${color} fa fa-camera mr-1 ml-1 monkey-fz-18`}
        aria-hidden="true"
      ></i>
    );
  });
};
