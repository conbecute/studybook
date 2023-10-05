import { useState } from "react";
import { Modal } from "react-bootstrap";
import _ from "lodash";
import classNames from "classnames";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { onResultGameComponent } from "edu_lms/components/configGameOld";
import { getListActByActName } from "edu_lms/services/readingBook";
import Loading from "edu_lms_v2/components/Loading";

export default function PopupMultiActivity({ show, toggle }) {
  const [data, setData] = useState([]);
  const [indexActive, setIndexActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register } = useForm();

  const onGetData = (act) => {
    setIsLoading(true);
    getListActByActName(act)
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.data);
        } else {
          setData([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onNext = () => {
    setIndexActive(indexActive + 1);
  };

  const onBack = () => {
    setIndexActive(indexActive - 1);
  };

  const onSubmit = (data) => {
    setIndexActive(0);
    onGetData(data.act);
  };

  return (
    <Modal
      show={show}
      onHide={toggle}
      dialogClassName="modal-suggestion-dialog"
      contentClassName="modal-suggestion-content"
      size="xl"
    >
      <Modal.Header closeButton>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 d-flex">
          <div>
            <p className="text-center font-weight-bold">Activity_name</p>
            <div className="d-flex">
              <Button
                type="button"
                className={classNames({
                  cursorDefault: indexActive === 0,
                  "d-none": _.isEmpty(data),
                })}
                onClick={() => onBack()}
                disabled={indexActive === 0}
              >
                <i className="fa fa-angle-left" aria-hidden="true"></i>
              </Button>
              <ActName className="text-center">
                {data[indexActive]?.activity_name}
              </ActName>
              <Button
                type="button"
                className={classNames({
                  cursorDefault: indexActive === data.length - 1,
                  "d-none": _.isEmpty(data),
                })}
                onClick={() => onNext()}
                disabled={indexActive === data.length - 1}
              >
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
          <Input
            type="text"
            className="mx-3"
            placeholder="Nhập danh sách activity_name cách nhau bằng dấu phẩy"
            ref={register}
            name="act"
          ></Input>
          <ButtonSubmit type="submit">Nhập</ButtonSubmit>
        </form>
      </Modal.Header>
      <Modal.Body className="modal-body-custom position-relative">
        {isLoading && <Loading />}
        {_.isEmpty(data) && (
          <div>
            <p className="text-center">
              Vui lòng nhập activity_name để tìm kiếm
            </p>
          </div>
        )}
        {!_.isEmpty(data) && onResultGameComponent(data[indexActive], null, true)}
      </Modal.Body>
    </Modal>
  );
}

const Button = styled.button`
  font-size: 20px;
  &.cursorDefault {
    cursor: default;
  }
`;

const ButtonSubmit = styled.button`
  width: 80px;
  height: 40px;
  border: 1px solid #f70;
  border-radius: 8px;
  color: #f70;
`;

const Input = styled.input`
  width: 70%;
  border-radius: 8px;
  border: 1px solid;
  padding: 8px;
`;

const ActName = styled.p`
  width: 250px;
  overflow: hidden;
  flexwrap: nowrap;
`;
