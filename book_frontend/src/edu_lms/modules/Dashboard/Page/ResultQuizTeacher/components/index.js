import React from "react";
import TitlePage from "../../components/TitlePage";
import ResultQuizBody from "../../components/ResultQuizBody";
import { dataTheadTable, FormSearch } from "../../../selection";

const ResultQuizTeacherWrapper = ({
  roleId,
  listAccountProvince,
  userInfo,
}) => {
  return (
    <div className="result-quiz-wrapper">
      <ResultQuizBody
        dataTheadTable={dataTheadTable[roleId].data}
        dataForm={FormSearch[roleId]}
        value={dataTheadTable[roleId].value}
        data={listAccountProvince}
        roleId={roleId}
        userInfo={userInfo}
      />
    </div>
  );
};
export default ResultQuizTeacherWrapper;
