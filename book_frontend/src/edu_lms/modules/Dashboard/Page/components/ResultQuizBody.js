import React from "react";
import { useHistory } from "react-router-dom";
import FormSearch from "./FormSearch";
import TableQuiz from "./TableQuiz";

const ResultQuizBody = ({
  dataTheadTable,
  dataForm,
  value,
  data,
  userInfo,
  roleId,
  type,
  onSearch,
}) => {
  const history = useHistory();
  return (
    <div className="result-quiz-wrapper">
      <button
        onClick={() => history.goBack()}
        className="btn border mb-3 monkey-bg-violet monkey-color-white cursor"
      >
        <i className="fa fa-reply-all monkey-fz-20 mr-2"> Quay lại</i>
      </button>
      {/* <p className="mb-4">Sở giáo dục & đào tạo {userInfo?.province_name} </p> */}
      <FormSearch
        dataForm={dataForm}
        numberGrid={2}
        roleId={roleId}
        type={type}
        onSearch={onSearch}
      />
      {roleId !== 0 && (
        <TableQuiz
          data={dataTheadTable}
          value={value}
          listAccountProvince={data}
          roleId={roleId}
          province_id={userInfo.province_id}
          school_id={userInfo.school_id}
        />
      )}
    </div>
  );
};
export default ResultQuizBody;
