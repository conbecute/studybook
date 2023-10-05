import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../../constants/path";
import * as TEXT from "../../../../constants/text";
import { onDispatchTogglePopupSuccess } from "../../../App/actions";
import { pathAdmin } from "../../selection";
import { Form } from "react-bootstrap";

const TbodyTableAdmin = ({
  data,
  roleId,
  provinceId,
  onDispatchTogglePopupSuccess,
}) => {
  const newRoleId = onResultRoleId(roleId);
  const history = useHistory();
  const onAction = () => {};
  const onSendAccountTeacher = (roleId) => {
    const dataSuccessConfig = {
      status: true,
      title: [TEXT.TEXT_FINISH_SEND_1, TEXT.TEXT_FINISH_SEND_2],
      url: "",
      data: {
        roleId,
      },
      labelButton: TEXT.TEXT_CONFIRM,
      icon: "fa-exclamation",
      close: true,
    };
    onDispatchTogglePopupSuccess(dataSuccessConfig);
  };
  return (
    <tbody>
      {data.map((item, index) => {
        const schoolId = item.school_id ? item.school_id : 0;
        return (
          <tr key={index} className="text-center">
            {roleId !== 3 && (
              <td className="text-left">
                <span
                  className="cursor monkey-color-violet hvr-registration"
                  onClick={() =>
                    history.push(
                      `${pathAdmin[newRoleId]}/${provinceId}/${item.district_id}/${schoolId}/${item.user_id}/${newRoleId}`
                    )
                  }
                >
                  {item.name}
                </span>
              </td>
            )}
            {roleId === 3 && (
              <td className="text-left">
                <span
                // className="cursor monkey-color-violet hvr-registration"
                // onClick={() =>
                //   history.push(
                //     `${pathAdmin[newRoleId]}/${provinceId}/${item.district_id}/${schoolId}/${item.user_id}/${newRoleId}`
                //   )
                // }
                >
                  {item.full_name}
                </span>
              </td>
            )}
            <td name="email" className="text-left">
              {item.email}
            </td>
            {roleId === 1 && (
              <Fragment>
                <td name="stk Trường">stk</td>
              </Fragment>
            )}
            <td name="stk GV">{item.phone}</td>
            <td name="trang thai">
              <Form>
                <Form.Check
                  type="switch"
                  id={`custom-switch-${item.user_id}`}
                  label=""
                  checked={item.status}
                  onChange={onAction}
                />
              </Form>
            </td>
            <td name="hoat dong">
              <i
                className="mr-2 ml-2 cursor fa monkey-fz-25 monkey-color-blue fa-pencil-square"
                aria-hidden="true"
              ></i>
              <i
                onClick={() => onSendAccountTeacher(roleId)}
                className="mr-2 ml-2 cursor fa monkey-fz-25 monkey-color-sunshine fa-share-square-o"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const mapStateToProps = (state) => {
  const { dataNavDashboard, numberIndex } = state.dashboardReducer;
  return {
    dataNavDashboard,
    numberIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TbodyTableAdmin);

function onResultRoleId(roleId) {
  switch (roleId) {
    case 1:
      return 2;
      break;
    case 2:
      return 3;
      break;
    case 3:
      return 4;
      break;
    default:
      return 1;
  }
}
