import React from "react";
import DragDropWrapper from "./component";

const DragDropContainer = ({ data, dataDefault, objectId }) => {
  return (
    <DragDropWrapper
      data={data}
      dataDefault={dataDefault}
      objectId={objectId}
    />
  );
};
export default DragDropContainer;
