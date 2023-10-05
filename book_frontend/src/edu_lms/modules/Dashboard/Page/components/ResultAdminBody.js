import React from "react";
import { useHistory } from "react-router-dom";
import FormSearch from "./FormSearch";
import TableAdmin from "./TableAdmin";

const ResultAdminBody = ({
  dataTheadTableAdmin,
  dataForm,
  value,
  data,
  userInfo,
  roleId,
  showButton,
  onSearch,
  onSubmitFormDashboard,
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
        onSearch={onSearch}
      />
      {roleId !== 0 && (
        <TableAdmin
          data={dataTheadTableAdmin}
          value={value}
          dataTable={data}
          roleId={roleId}
          provinceId={userInfo?.province_id}
          onSubmitFormDashboard={onSubmitFormDashboard}
          showButton={showButton}
        />
      )}
    </div>
  );
};
export default ResultAdminBody;
