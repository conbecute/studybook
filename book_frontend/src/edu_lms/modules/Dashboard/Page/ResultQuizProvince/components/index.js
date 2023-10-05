import React from "react";
import TitlePage from "../../components/TitlePage";
import ResultQuizBody from "../../components/ResultQuizBody";
import { dataTheadTable, FormSearch } from "../../../selection";

const ResultQuizProvinceWrapper = ({
  roleId,
  listAccountProvince,
  userInfo,
  onSearch,
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
        onSearch={onSearch}
      />
    </div>
  );
};
export default ResultQuizProvinceWrapper;
