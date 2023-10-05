import React from "react";
import { LOCAL_STORAGE_KEY_USER_INFO } from "../../../constants/type";
import { onResultUserInfo } from "../../selection";

const Dashboard = (props) => {
  const userInfo = onResultUserInfo();
  return (
    <div className="dashboard-wrapper">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-6">
            <h4 className="monkey-color-violet text-center mt-3 mb-5">
              Phòng GD&DT {userInfo.ward_id_name} {userInfo.district_name}{" "}
              {userInfo.province_name}
            </h4>
            <div className="w-100 border p-3 mb-5">
              <p className="mb-2">
                Họ tên:{" "}
                <span className="monkey-color-violet">
                  {userInfo.full_name}
                </span>
              </p>
              <p className="mb-2">
                Phone:{" "}
                <span className="monkey-color-violet">{userInfo.phone}</span>
              </p>
              <p className="mb-2">
                Email:{" "}
                <span className="monkey-color-violet">{userInfo.email}</span>
              </p>
              <p className="mb-2">
                Trường:{" "}
                <span className="monkey-color-violet">
                  {userInfo.school_name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
