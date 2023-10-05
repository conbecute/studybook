import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormGroup } from "reactstrap";
import LogoComponent from "../../../components/Header/LogoComponent";
import * as TYPE from "../../../constants/type";

const JobWrapper = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [valueRadio, onStateRadio] = useState(props.job);

  const onSubmit = (data) => {
    onStateRadio(data);
    setTimeout(() => {
      props.onSubmitJob(data);
    }, 500);
  };

  return (
    <div className="jop_wrapper">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center pt-5 pb-5">
              <LogoComponent />
            </div>
          </div>
          <div className="col-lg-5 col-md-8">
            <div className="sign_in_form text-center">
              <h5 className="monkey-f-bold monkey-color-violet mb-5">
                Bạn là ...?
              </h5>
              <form className="form-job" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup check className="pl-0">
                  <label
                    className={`btn monkey-bc-violet rounded-pill mb-3 hvr-registration ${
                      valueRadio === TYPE.JOB_TEACHER
                        ? "monkey-bg-violet monkey-color-white"
                        : ""
                    } `}
                  >
                    <input
                      style={{ height: "44px" }}
                      onClick={() => onSubmit(TYPE.JOB_TEACHER)}
                      className="d-none"
                      type="radio"
                      name="job"
                      checked={props.job_id === TYPE.JOB_TEACHER}
                      value={TYPE.JOB_TEACHER}
                      ref={register({ required: true })}
                      onChange={() => onSubmit(TYPE.JOB_TEACHER)}
                    />
                    Tôi là giáo viên
                  </label>
                </FormGroup>
                <FormGroup check className="pl-0">
                  <label
                    className={`btn monkey-bc-violet rounded-pill mb-3 hvr-registration ${
                      valueRadio === TYPE.JOB_PARENTS
                        ? "monkey-bg-violet monkey-color-white"
                        : ""
                    } `}
                  >
                    <input
                      style={{ height: "44px" }}
                      onClick={() => onSubmit(TYPE.JOB_PARENTS)}
                      className="d-none"
                      type="radio"
                      name="job"
                      checked={props.job_id === TYPE.JOB_PARENTS}
                      value={TYPE.JOB_PARENTS}
                      ref={register({ required: true })}
                      onChange={() => onSubmit(TYPE.JOB_PARENTS)}
                    />
                    Tôi là phụ huynh
                  </label>
                </FormGroup>
                <FormGroup check className="pl-0">
                  <label
                    className={`btn monkey-bc-violet rounded-pill hvr-registration ${
                      valueRadio === TYPE.JOB_STUDENT
                        ? "monkey-bg-violet monkey-color-white"
                        : ""
                    } `}
                  >
                    <input
                      style={{ height: "44px" }}
                      onClick={() => onSubmit(TYPE.JOB_STUDENT)}
                      className="d-none"
                      type="radio"
                      name="job"
                      checked={props.job_id === TYPE.JOB_STUDENT}
                      value={TYPE.JOB_STUDENT}
                      ref={register({ required: true })}
                      onChange={() => onSubmit(TYPE.JOB_STUDENT)}
                    />
                    Tôi là học sinh
                  </label>
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWrapper;
