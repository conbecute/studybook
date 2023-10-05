import React from "react";

const TheadTable = ({ data }) => {
  return (
    <thead>
      <tr>
        {data.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};
export default TheadTable;
