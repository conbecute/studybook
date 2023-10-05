import React, { useState } from "react";
import { Modal, Col, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Select from "react-select";
import "./style.css";
import * as TEXT from "../../../constants/text";
import { OPTIONS_GRADE, SELECTRANKS } from "../../../constants/type";
import { getListSubject } from "../../../services/app/app";

const optionsAreaOfKnowledge = [
  { value: "chapter1", label: "Chương 1" },
  { value: "chapter2", label: "Chương 2" },
  { value: "chapter3", label: "Chương 3" },
];
export default function QuestionSet(props) {
  const [messageError, setMessageError] = useState("");

  const [optionsGrade] = useState(OPTIONS_GRADE);
  const [optionsSubject, setStataOptionsSubject] = useState([]);

  const [selectedOptionGrade, setStateSelectedOptionGrade] = useState({});
  const [selectedOptionSubject, setStateSelectedOptionSubject] = useState({});
  const [selectedOptionsRank, setStateSelectedOptionsRank] = useState({});

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const dataCreateQuestionSet = {
      title: data.name_question_set,
      grade_id: selectedOptionGrade.id,
      subject_id: selectedOptionSubject.id,
    };
    props.onSaveQuestionSet(dataCreateQuestionSet);
    setMessageError("Vui lòng hoàn thành các trường thông tin !");
  };

  const handleChangeGrade = (selectedOptionGrade) => {
    setStataOptionsSubject([]);
    setStateSelectedOptionSubject({});
    setStateSelectedOptionGrade(selectedOptionGrade);
    getListSubject(selectedOptionGrade.id)
      .then((res) => {
        if (res.data.status === "success") {
          console.log("res", res);
          const list = [];
          res.data.data.list_subject.forEach((value, index) => {
            list.push({
              id: value.id,
              label: value.title,
              value: `file_${value.id}`,
              type: value.id,
            });
          });
          setStataOptionsSubject(list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeKnowledge = () => {};
  const handleChangeOptionsRank = () => {};

  const handleChangeSubject = (selectedOptionSubject) => {
    setStateSelectedOptionSubject(selectedOptionSubject);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modal-title quicksand-bold text-center"
          >
            <span style={{ paddingLeft: 125 }}>
              {TEXT.TITLE_POPUP_QUESTION_SET}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="" style={{ marginTop: "40px" }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group style={{ marginBottom: "2rem" }} as={Row}>
              <FormLabel className="form-label col-form-label col-sm-3 ">
                Tên <span>*</span>
              </FormLabel>
              <Col sm="8">
                <InputForm
                  type="text"
                  maxLength="100"
                  id="name_question_set"
                  name="name_question_set"
                  ref={register}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group style={{ marginBottom: "2rem" }} as={Row}>
              <FormLabel className="form-label col-form-label col-sm-3">
                Lớp <span>*</span>
              </FormLabel>
              <Col sm="8">
                <Select
                  value={selectedOptionGrade}
                  onChange={handleChangeGrade}
                  options={optionsGrade}
                />
              </Col>
            </Form.Group>

            <Form.Group style={{ marginBottom: "2rem" }} as={Row}>
              <FormLabel className="form-label col-form-label col-sm-3">
                Cấp độ:
              </FormLabel>
              <Col sm="8">
                <Select
                  // value={selectedOptionsRank}
                  // defaultValue={optionsRank[0]}
                  placeholder="Chọn mức độ "
                  onChange={handleChangeOptionsRank}
                  options={SELECTRANKS}
                />
              </Col>
            </Form.Group>
            <Form.Group style={{ marginBottom: "2rem" }} as={Row}>
              <FormLabel className="form-label col-form-label col-sm-3">
                Môn:
              </FormLabel>
              <Col sm="8">
                <Select
                  value={selectedOptionSubject}
                  onChange={handleChangeSubject}
                  options={optionsSubject}
                />
              </Col>
            </Form.Group>
            <Form.Group style={{ marginBottom: "2rem" }} as={Row}>
              <FormLabel className="form-label col-form-label col-sm-5">
                Vùng kiến thức
              </FormLabel>
              <Col sm="6">
                <Select
                  // value={selectedOptionAreaOfKnowledge}
                  // defaultValue={optionsAreaOfKnowledge[0]}
                  placeholder="Chương ...."
                  onChange={handleChangeKnowledge}
                  options={optionsAreaOfKnowledge}
                />
              </Col>
            </Form.Group>
            {messageError && (
              <PError className="quicksand-medium">{messageError}</PError>
            )}

            <hr></hr>
            <div
              style={{ marginBottom: "2rem" }}
              className="form-group d-flex justify-content-center"
            >
              <ButtonStyle
                type="submit"
                className="quicksand-medium mt-4 monkey-bg-question rounded-pill monkey-pr-45 monkey-pl-45"
              >
                {TEXT.TEXT_SEND1}
              </ButtonStyle>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const PError = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;

const ButtonStyle = styled.button`
  font-size: 20px;
  padding: 8px 50px;
  color: #fff;
`;
const FormLabel = styled.label`
  padding-left: 40px;
  font-weight: bold;
  font-size: 18px;
  span {
    color: red;
  }
`;

const InputForm = styled.input`
  width: 100%;
  height: 40px;
  padding: 18px 0px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;
