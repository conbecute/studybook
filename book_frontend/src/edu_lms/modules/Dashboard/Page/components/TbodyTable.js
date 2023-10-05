import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../../constants/path";
import { pathResultQuiz } from "../../selection";
const TbodyTable = ({ data, roleId, province_id }) => {
  const newRoleId = onResultRoleId(roleId);
  const history = useHistory();
  return (
    <tbody>
      {data.map((item, index) => {
        const schoolId = item.school_id ? item.school_id : 0;
        return (
          <tr key={index}>
            {roleId < 3 && (
              <td>
                <span
                  className="cursor monkey-color-violet hvr-registration"
                  onClick={() =>
                    history.push(
                      `${pathResultQuiz[newRoleId]}/${province_id}/${item.district_id}/${schoolId}/${item.user_id}/${newRoleId}`
                    )
                  }
                >
                  {item.name}
                </span>
              </td>
            )}
            {roleId === 3 && (
              <td>
                <span
                  className="cursor monkey-color-violet hvr-registration"
                  onClick={() =>
                    history.push(
                      `${pathResultQuiz[newRoleId]}/${province_id}/${item.district_id}/${schoolId}/${item.user_id}/${newRoleId}`
                    )
                  }
                >
                  {item.full_name}
                </span>
              </td>
            )}
            {roleId === 4 && (
              <Fragment>
                <td>
                  <span className="cursor monkey-color-violet hvr-registration">
                    {item.full_name}
                  </span>
                </td>
                <td>{item.count_done_quiz}</td>
                <td>{item.count_total_quiz}</td>
                <td>Xếp loại</td>
              </Fragment>
            )}
            {roleId === 3 && (
              <Fragment>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>số lượng khóa tập huấn</td>
              </Fragment>
            )}
            {roleId === 1 && <td>{item.count_school}</td>}
            {roleId < 3 && (
              <Fragment>
                <td>{item.count_teacher}</td>
                <td>{item?.history_quiz?.total_quiz}</td>
              </Fragment>
            )}
            {roleId <= 3 && (
              <Fragment>
                <td>{item?.history_quiz?.total_not_reached}</td>
                <td>{item?.history_quiz?.total_good}</td>
                <td>{item?.history_quiz?.total_great}</td>
                <td>{item?.history_quiz?.total_reached}</td>
              </Fragment>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
export default TbodyTable;

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
