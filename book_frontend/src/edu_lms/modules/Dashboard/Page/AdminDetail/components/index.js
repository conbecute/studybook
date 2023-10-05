import React from "react";
import ResultAdminBody from "../../components/ResultAdminBody";
import { dataTheadTableAdmin, formSearchAdmin } from "../../../selection";

const AdminDetailWrapper = ({ roleId, data, userInfo, onSearch }) => {
  return (
    <div className="result-quiz-wrapper">
      <ResultAdminBody
        dataTheadTableAdmin={dataTheadTableAdmin[roleId].data}
        dataForm={formSearchAdmin[roleId]}
        value={dataTheadTableAdmin[roleId].value}
        data={data}
        roleId={roleId}
        userInfo={userInfo}
        type={2}
        onSearch={onSearch}
      />
    </div>
  );
};
export default AdminDetailWrapper;
