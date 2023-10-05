import React, { useState } from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Cleave from "cleave.js/react";
import { onDispatchShowLoading } from "../../App/actions";
import { getCheckSerial } from "../../../services/activeBook/activeBook";

const FromCheckSeriBook = (props) => {
  const { handleSubmit } = useForm();
  const [valueCheckSeriBook, setStateValueLicence] = useState("");
  const [errorCheckSeriBook, setStateErrorLicence] = useState(false);
  const [messageError, setStateMessageError] = useState("");
  const [messageSuccess, setStateMessageSuccess] = useState("");

  const onChangeValueSeri = (value) => {
    if (value) {
      setStateValueLicence(value);
      setStateErrorLicence(false);
      setStateMessageSuccess("");
      setStateMessageError("");
    } else {
      setStateMessageError("");
      setStateErrorLicence(true);
    }
  };

  const onSubmit = () => {
    if (valueCheckSeriBook) {
      const data = {
        seri: valueCheckSeriBook,
      };
      props.onDispatchShowLoading(true);
      getCheckSerial(data)
        .then((res) => {
          if (res.data.status === "fail") {
            setStateMessageError(res.data.message);
            props.onDispatchShowLoading(false);
            setStateErrorLicence(false);
          }
          if (res.data.status === "success") {
            setStateMessageSuccess(res.data.message);
            props.onDispatchShowLoading(false);
          }
        })
        .catch((errors) => {
          console.log(errors);
          props.onDispatchShowLoading(false);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center mt-4 d-flex justify-content-center"
        >
          <div className="form-group position-relative mr-1">
            <Cleave
              options={{
                blocks: [2, 15],
                delimiter: "-",
                numericOnly: false,
                uppercase: true,
              }}
              placeholder="Nhập dãy seri để kiểm tra"
              value={valueCheckSeriBook}
              onChange={(e) => onChangeValueSeri(e.target.value)}
              className="form-control monkey-bc-violet text-search"
            />
            <div className="monkey-mt-15">
              <p className="monkey-color-red">
                {" "}
                {errorCheckSeriBook && "Bạn chưa nhập mã kích hoạt"}
              </p>
              <p className="monkey-color-red">{messageError}</p>
              <p className="text-success">{messageSuccess}</p>
            </div>
          </div>
          <input
            className="btn monkey-pr-45 monkey-pl-45 monkey-mb-30 btn_submit btn-pr flex-center submit-form"
            type="submit"
            value="Kiểm tra"
          />
        </Form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowLoading,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(FromCheckSeriBook);

const Form = styled.form`
  .submit-form {
    height: 44px;
  }
  .text-search {
    width: 300px;
    height: 44px;
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    .text-search,
    .submit-form,
    p {
      font-size: 14px;
    }
    .text-search {
      width: 100%;
    }
    .submit-form {
      width: 30%;
    }
  }

  @media screen and (min-width: 670px) and (max-width: 765px) {
    .text-search {
      width: 95%;
      font-size: 14px;
    }
    .submit-form {
      width: 30%;
    }
  }
`;
