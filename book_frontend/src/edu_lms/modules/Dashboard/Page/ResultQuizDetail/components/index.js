import React from "react";
import TitlePage from "../../components/TitlePage";
import ResultProvince from "../../components/ResultQuizBody";
import { dataTheadTable, FormSearch } from "../../../selection";

const ResultQuizDetailWrapper = ({
  roleId,
  data,
  userInfo,
  type,
  onSearch,
}) => {
  return (
    <div className="result-quiz-wrapper">
      <ResultProvince
        dataTheadTable={dataTheadTable[roleId].data}
        dataForm={FormSearch[roleId]}
        value={dataTheadTable[roleId].value}
        data={data}
        roleId={roleId}
        userInfo={userInfo}
        type={type}
        onSearch={onSearch}
      />
    </div>
  );
};
export default ResultQuizDetailWrapper;
