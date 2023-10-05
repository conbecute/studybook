import React from "react";
import { Table } from "react-bootstrap";
import TitleTable from "./TitleTable";
import TheadTable from "./TheadTable";
import TbodyTableAdmin from "./TbodyTableAdmin";

const TableAdmin = ({
  value,
  roleId,
  data,
  provinceId,
  dataTable = [],
  showButton,
  onSubmitFormDashboard,
}) => {
  return (
    <div className="table-wrapper monkey-bg-white">
      <TitleTable
        value={value}
        roleId={roleId}
        onSubmitFormDashboard={onSubmitFormDashboard}
        showButton={showButton}
      />
      <Table striped bordered hover size="md">
        <TheadTable data={data} />
        <TbodyTableAdmin
          data={dataTable}
          roleId={roleId}
          provinceId={provinceId}
        />
      </Table>
    </div>
  );
};
export default TableAdmin;
