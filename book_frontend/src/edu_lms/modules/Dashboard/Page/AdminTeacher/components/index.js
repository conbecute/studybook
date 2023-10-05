import React from "react";
import ResultAdminBody from "../../components/ResultAdminBody";

const AdminTeacherWrapper = ({
  dataForm,
  dataTheadTableAdmin,
  listAccountSchool,
  roleId,
  userInfo,
  value,
}) => {
  return (
    <div className="school-wrapper">
      <ResultAdminBody
        roleId={roleId}
        dataForm={dataForm}
        dataTheadTableAdmin={dataTheadTableAdmin}
        value={value}
        data={listAccountSchool}
        userInfo={userInfo}
      />
    </div>
  );
};
export default AdminTeacherWrapper;
