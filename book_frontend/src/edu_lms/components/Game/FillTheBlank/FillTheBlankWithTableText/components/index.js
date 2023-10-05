import React from "react";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import _ from "lodash";
import styled from "styled-components";
import { TYPE_SPLIT } from "../../../../../constants/type";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { onResultIcon } from "../../../selection";
import ButtonCheck from "../../components/ButtonCheck";
import TableRow from "./TableRow";
import {
  onDispatchIsClickSubmitAnswer,
  onDispatchIsClickRefresh,
} from "../../../../../modules/General/actions";
const FillTheBlankWithTableTextWrapper = ({
  titleTable,
  iconList,
  data,
  alert,
  languageBook,
  isButtonReset,
  onHandleForm,
  onResetForm,
  handleDispatchDataAlert,
  onDispatchIsClickSubmitAnswer,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const isDisabled = !isDirty || !isValid;
  const onSubmit = () => {};

  const onSubmitForm = handleSubmit((dataForm) => {
    onDispatchIsClickSubmitAnswer(true);
    let data = [];
    _.forEach(dataForm, function (value, key) {
      data = [
        ...data,
        { icon_id: _.split(key, TYPE_SPLIT)[0], value: value.toLowerCase() },
      ];
    });
    onHandleForm(data, reset);
  });
  const onResetFormData = () => {
    onResetForm(reset);
  };
  return (
    <div className="fill-the-blank-with-table-text-wrapper mt-4 pr-3 pl-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table striped className="text-center monkey-fz-20">
          <thead>
            <tr>
              <th className="monkey-bg-blue monkey-color-white border">
                Số thứ tự
              </th>
              {titleTable.map((item, index) => (
                <th
                  key={index}
                  className="monkey-bg-blue monkey-color-white border"
                >
                  {onResultIcon(item.icon_id, iconList).props[0].text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  index={index}
                  data={item}
                  iconList={iconList}
                  innerRef={register({ required: true })}
                />
              );
            })}
          </tbody>
        </Table>
      </form>
      <Footer>
        <ButtonCheck
          isDisabled={isDisabled}
          alert={alert}
          languageBook={languageBook}
          isButtonReset={isButtonReset}
          onResetFormData={onResetFormData}
          onSubmitForm={onSubmitForm}
          handleDispatchDataAlert={handleDispatchDataAlert}
        />
      </Footer>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchIsClickSubmitAnswer,
      onDispatchIsClickRefresh,
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(FillTheBlankWithTableTextWrapper);

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
