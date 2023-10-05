import React from "react";
import { styleCssGrid } from "../../../../components/Game/selection";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import TitleTable from "./TitleTable";
import { COLOR_RED } from "../../../../constants/type";

const FormSearch = ({ dataForm, type, numberGrid = 3, roleId, onSearch }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (valueForm) => {
    const data = {
      type: type,
      roleId: roleId,
      name: valueForm?.fullName,
      email: valueForm?.email || "",
      phone: valueForm?.phone || "",
      status: valueForm?.status?.value || "",
    };
    onSearch(data);
    // reset()
  };
  const isDisabled = !isDirty || !isValid;
  return (
    <div className="form-search-table monkey-bg-white mb-3">
      <TitleTable value={dataForm.value} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="p-3 text-center"
                style={{ ...styleCssGrid(numberGrid, "1rem") }}
              >
                {dataForm.data.map((item, index) => {
                  switch (item.key) {
                    case "text":
                      return (
                        <div
                          key={index}
                          className={`${item.className} form-group`}
                        >
                          <input
                            className="form-control"
                            type={item.type}
                            id={item.name}
                            name={item.name}
                            defaultValue={item.value}
                            placeholder={item.placeholder}
                            ref={register({
                              required: item.required,
                              pattern: {
                                value: item.pattern,
                                message: item.valueError,
                              },
                            })}
                            autoComplete="off"
                          />
                          {item.error && errors[`${item.name}`]?.message && (
                            <p
                              style={{
                                position: "absolute",
                                bottom: "-25px",
                                left: 0,
                                color: COLOR_RED,
                              }}
                            >
                              {errors[`${item.name}`]?.message}
                            </p>
                          )}
                        </div>
                      );
                      break;
                    case "select":
                      return (
                        <div key={index} className="form-group">
                          <Controller
                            name={item.name}
                            control={control}
                            defaultValue={item.value}
                            rules={{ required: item.required }}
                            as={
                              <Select
                                options={item.options}
                                menuPlacement={item.menuPlacement}
                                maxMenuHeight={180}
                                placeholder={item.placeholder}
                              />
                            }
                          />
                        </div>
                      );
                      break;
                    default:
                      return "";
                  }
                })}
                <div>
                  <button
                    type="submit"
                    // disabled={isDisabled}
                    // style={{ opacity: isDisabled ? "0.2" : "1" }}
                    // className={`${
                    //   isDisabled ? "monkey-bg-black" : "monkey-bg-blue cursor"
                    // } btn monkey-color-white`}
                    className="btn monkey-color-white monkey-bg-blue cursor"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormSearch;
