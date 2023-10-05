import React from "react";
import { Table } from "react-bootstrap";
import TitleTable from "./TitleTable";
import TheadTable from "./TheadTable";
import TbodyTable from "./TbodyTable";

const TableQuiz = ({
  value,
  roleId,
  data,
  province_id,
  school_id,
  listAccountProvince = [],
}) => {
  return (
    <div className="table-wrapper monkey-bg-white">
      <TitleTable value={value} />
      <Table striped bordered hover size="md">
        <TheadTable data={data} />
        {listAccountProvince.length > 0 && (
          <TbodyTable
            data={listAccountProvince}
            roleId={roleId}
            province_id={province_id}
            school_id={school_id}
          />
        )}
      </Table>
    </div>
  );
};
export default TableQuiz;
