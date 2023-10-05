import React, { useState } from "react";
import { Modal, Col, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as TEXT from "../../../constants/text";
import { onResultUserInfo } from "../../selection";

const listProblems = [
  {
    id: 1,
    text: "Lỗi hình ảnh",
    name: "image",
    marginTop: "20px",
  },
  {
    id: 1,
    text: "Sai đề bài",
    name: "question",
  },
  {
    id: 1,
    text: "Sai đáp án",
    name: "answer",
  },
  {
    id: 1,
    text: "Lỗi khác",
    name: "other_problems",
  },
];

const chunkListProblems = () => {
  const chunkSize = 2;
  let currentIndex = 0;
  let chunked = [];
  for (let i = 0; i < listProblems.length - chunkSize; ++i) {
    chunked.push([...listProblems].splice(currentIndex, chunkSize));
    currentIndex += chunkSize;
  }
  return chunked;
};

export default function FormReportError(props) {
  const [messageError, setMessageError] = useState("");

  const userInfo = onResultUserInfo();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: userInfo?.email,
      phone: userInfo?.phone,
    },
  });

  const onSubmit = (data) => {
    if (
      data.answer ||
      data.image ||
      data.question ||
      data.other_problems ||
      data.input_other_problems !== ""
    ) {
      props.saveReportError(data);
    } else {
      setMessageError("Vui lòng chọn loại lỗi");
    }
  };

  const isLoggedIn = Boolean(userInfo);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="title-report-error-question">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 text-center modal-title quicksand-bold"
          >
            <IStyle className="fa fa-exclamation-triangle" aria-hidden="true" />
            <span>{TEXT.TITLE_POPUP_REPORT_ERROR}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body-report-error"
          style={{ marginTop: "10px" }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <H5Style className="ml-4 mt-2 quicksand-bold">
              {TEXT.TEXT_USER_INFO_REPORT}
            </H5Style>
            <Form.Group as={Row} controlId="formPlaintextNumber">
              <FormLabel className="form-label col-form-label col-sm-5 quicksand-medium">
                Số điện thoại:
              </FormLabel>
              <Col className="col-sm-7">
                <InputForm
                  name="phone"
                  type="number"
                  readOnly={isLoggedIn}
                  maxLength="12"
                  ref={register({
                    pattern: {
                      value: /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
                      message: "Số điện thoại không hợp lệ",
                    },
                    validate: {
                      required: (value) => {
                        const { email } = getValues();
                        return (
                          Boolean(email || value) ||
                          "Vui lòng nhập số điện thoại hoặc email của bạn."
                        );
                      },
                    },
                  })}
                  className={`form-control ${errors.phone && "invalid"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <FormLabel className="form-label col-form-label col-sm-5 quicksand-medium">
                Email:
              </FormLabel>
              <Col className="col-sm-7">
                <InputForm
                  name="email"
                  type="text"
                  ref={register({
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Địa chỉ email không hợp lệ",
                    },
                    validate: {
                      required: (value) => {
                        const { phone } = getValues();
                        return (
                          Boolean(phone || value) ||
                          "Vui lòng nhập số điện thoại hoặc email của bạn."
                        );
                      },
                    },
                  })}
                  maxLength={30}
                  className={`form-control ${errors.email && "invalid"}`}
                  readOnly={isLoggedIn}
                />
              </Col>
            </Form.Group>
            {(errors.email || errors.phone) && (
              <PError>
                {errors?.email?.message ||
                  errors?.phone?.message ||
                  "Vui lòng nhập số điện thoại hoặc email của bạn."}
              </PError>
            )}
            <H5Style className="ml-4 mt-2 quicksand-bold">
              {TEXT.TEXT_HEADER_REPORT_ERROR}
            </H5Style>
            <div className="row ml-3 mt-2">
              {chunkListProblems().map((chunkProblem, index) => (
                <div className="col-6 d-flex flex-column">
                  {chunkProblem.map((problem) => (
                    <label className="form-custom-checkbox">
                      <input
                        name={problem.name}
                        type="checkbox"
                        ref={register}
                        id={problem.name}
                        className="mr-3 monkey-color-question myinput"
                      />
                      <span className="checkmarkbox"></span>
                      <LabelStyle
                        for={problem.name}
                        className="form-check-label quicksand-medium"
                      >
                        {problem.text}
                      </LabelStyle>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <div className="form-group form-check">
              <TextAreaStyle
                className="quicksand-medium"
                name="input_other_problems"
                type="text"
                ref={register}
                placeholder="Nhập các góp ý của bạn tại đây ..."
                id="input_other_problems"
                maxLength={300}
              />
            </div>
            {messageError && (
              <PError className="quicksand-medium">{messageError}</PError>
            )}

            <div className="form-group d-flex justify-content-end mr-3">
              <ButtonStyle
                type="submit"
                className="quicksand-medium btn mt-4 monkey-bg-question monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45"
              >
                {TEXT.TEXT_SEND}
              </ButtonStyle>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const TextAreaStyle = styled.textarea`
  width: 96%;
  height: 150px;
  padding: 15px 15px;
  border: 1px solid #ff7707;
  border-radius: 10px;
  font-size: 16px;
`;
const PError = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;
const IStyle = styled.i`
  margin-right: 10px;
`;
const LabelStyle = styled.label`
  font-size: 18px;
`;

const H5Style = styled.h5`
  font-size: 20px;
`;
const ButtonStyle = styled.button`
  font-size: 20px;
  padding: 8px 50px;
`;
const InputForm = styled.input`
  width: 95%;
  height: 20px;
  padding: 15px 15px;
  border: 1px solid #ff7707;
  border-radius: 10px;
  font-size: 16px;
  box-shadow: #ff7707;
`;
const FormLabel = styled.label`
  padding-left: 40px;
  font-size: 18px;
`;
