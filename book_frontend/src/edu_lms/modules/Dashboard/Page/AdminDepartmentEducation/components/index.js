import React from "react";
import ResultAdminBody from "../../components/ResultAdminBody";

const DepartmentEducationWrapper = ({
  dataForm,
  dataTheadTableAdmin,
  value,
  listAccountProvince,
  userInfo,
  showButton,
  onSearch,
  onSubmitFormDashboard,
}) => {
  return (
    <div className="department-education-wrapper">
      <ResultAdminBody
        dataForm={dataForm}
        numberGrid={2}
        dataTheadTableAdmin={dataTheadTableAdmin}
        value={value}
        data={listAccountProvince}
        userInfo={userInfo}
        showButton={showButton}
        roleId={Number(userInfo?.role_id)}
        onSearch={onSearch}
        onSubmitFormDashboard={onSubmitFormDashboard}
      />
    </div>
  );
};
export default DepartmentEducationWrapper;
