import React, { Suspense } from "react";
import LoadingComponent from "../../../components/loading";
import TitleComponent from "../../../components/title";
import SelectComponent from "../../../components/SelectComponent";
import { NavLink } from "react-router-dom";
import * as PATH from "../../../constants/path";
import * as TEXT from "../../../constants/text";
import { TYPE_TEXT_WORK_BOOKS } from "../../../constants/general";
const SliderComponent = React.lazy(() => import("./Slider"));

const BooksInUse = (props) => {
  return (
    <div className="books_in_use_wrapper monkey-mb-40 monkey-mt-40">
      <TitleComponent
        title={props.title}
        className="monkey-color-violet text-uppercase monkey-fz-34 text-center"
      />
      {props.isShowFilter && (
        <div className="monkey-pb-20 mt-3 border-bottom d-flex justify-content-end align-items-center">
          <div className="dropdown_grade">
            <SelectComponent
              typeBook={props.typeBook}
              listGrade={props.listGrade}
              gradeId={props.gradeId}
              onGetDataBook={props.onGetDataBook}
              placeholder="Chọn lớp"
            />
          </div>
        </div>
      )}
      <div className="books_in_use_content monkey-mt-20">
        <Suspense fallback={<LoadingComponent />}>
          <SliderComponent
            statusModal={props.statusModal}
            onShowPopupActivateBook={props.onShowPopupActivateBook}
            data={props.data}
            gradeId={props.gradeId}
            listGrade={props.listGrade}
            typeBook={props.typeBook}
          />
        </Suspense>
      </div>
      {props?.data?.length > 0 && (
        <div className="text-center mt-5">
          <NavLink
            to={`${props.parameter}`}
            className="btn monkey-bg-violet monkey-color-white rounded-pill cursor pl-3 pr-3 pt-2 pb-2 hvr-registration-bc-violet mr-3 ml-3"
          >
            {TEXT.BUTTON_VIEW_ALL}
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default BooksInUse;
