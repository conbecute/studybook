import React from "react";
import ResultAdminBody from "../../components/ResultAdminBody";

const AdminSchoolWrapper = ({
  dataForm,
  dataTheadTableAdmin,
  listAccountSchool,
  roleId,
  userInfo,
  value,
  onSearch,
  onSubmitFormDashboard,
}) => {
  return (
    <div className="school-wrapper">
      <ResultAdminBody
        roleId={roleId}
        dataForm={dataForm}
        numberGrid={2}
        showButton={true}
        dataTheadTableAdmin={dataTheadTableAdmin}
        value={value}
        data={listAccountSchool}
        userInfo={userInfo}
        onSearch={onSearch}
        onSubmitFormDashboard={onSubmitFormDashboard}
      />
    </div>
  );
};
export default AdminSchoolWrapper;
