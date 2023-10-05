import React from "react";
import ResultAdminBody from "../../components/ResultAdminBody";

const DepartmentEducationWrapper = ({
  dataForm,
  dataTheadTableAdmin,
  listAccountProvince,
}) => {
  return (
    <div className="department-education-wrapper">
      <ResultAdminBody
        dataForm={dataForm}
        numberGrid={2}
        dataTheadTableAdmin={dataTheadTableAdmin}
        listAccountProvince={listAccountProvince}
      />
    </div>
  );
};
export default DepartmentEducationWrapper;
