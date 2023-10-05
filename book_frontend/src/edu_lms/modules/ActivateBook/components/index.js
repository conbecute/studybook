import React from "react";
import { useForm } from "react-hook-form";
import TitleComponent from "../../../components/title";

const ActivateBookWrapper = () => {
  const { register, handleSubmit, errors } = useForm();
  const onConfirm = (data) => {
    console.log(data);
  };
  return (
    <div className="activate_book_wrapper monkey-pt-15 monkey-pb-15">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3">
            <div className="activate_book_content sign_in_form mt-5">
              <TitleComponent title="Nhập số thẻ sử dung" />

              <form className="text-center" onSubmit={handleSubmit(onConfirm)}>
                <div className="form-group">
                  <input
                    style={{ height: "44px" }}
                    className="form-control rounded-pill"
                    type="text"
                    placeholder="Nhập số thẻ sử dụng"
                    autoComplete="off"
                    name="cardNumber"
                    ref={register({ required: true, maxLength: 80 })}
                  />
                  <p className="monkey-color-red monkey-mt-15">
                    {errors.cardNumber && "Card Number is required"}
                  </p>
                </div>
                <input
                  style={{ height: "44px" }}
                  className="btn btn-primary rounded-pill monkey-pr-45 monkey-pl-45"
                  type="submit"
                  value="Xác nhận"
                />
              </form>
            </div>
          </div>
          <div className="col-12">
            <div className="text-center monkey-f-bold mt-5">
              Trợ giúp:
              <button className="btn monkey-bg-red monkey-color-white monkey-fz-12 mr-2 ml-2">
                Cách lấy mã sách
              </button>
              <button className="btn monkey-bg-red monkey-color-white monkey-fz-12 mr-2 ml-2">
                Hotline: +84 89 6688 786 | 0985 953 486 | 0869 766 093
              </button>
              <button className="btn monkey-bg-red monkey-color-white monkey-fz-12 mr-2 ml-2">
                Xác thực email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivateBookWrapper;
