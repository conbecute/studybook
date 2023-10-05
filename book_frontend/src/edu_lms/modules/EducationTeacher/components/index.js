import { useState } from "react";
import TitleComponent from "../../../components/title";
import SelectComponent from "../../../components/SelectComponent";
import FormSearch from "../../../components/FormSearch";
import IntroduceContent from "./IntroduceContent";
import * as TEXT from "../../../constants/text";

const IntroduceWrapper = (props) => {
  return (
    <div className="introduce_wrapper pb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title={TEXT.TITLE_BOOK_EDUCATION_TEACHER}
              className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      placeholder={onResultPlaceholder(props.fileId)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
                  <SelectComponent
                    listGrade={props.listOptionGrade}
                    gradeId={props.gradeId}
                    typeBook={props.typeBook}
                    onGetDataBook={props.onGetDataBookByGrade}
                  />
                  {/* <SelectComponent
                    listGrade={props.listOptionSubject}
                    gradeId={props.subjectId}
                    typeBook={props.typeBook}
                    onGetDataBook={props.onGetDataBookBySubject}
                  /> */}
                  <div className="ml-2">
                    <SelectComponent
                      listGrade={props.listFileOption}
                      gradeId={props.fileId}
                      typeBook={props.typeBook}
                      onGetDataBook={props.onGetDataBook}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="introduce-content">
          <IntroduceContent
            data={props.data}
            total={props.total}
            pageCount={props.pageCount}
            onPageClick={props.onPageClick}
            fileId={props.fileId}
            textNotSearch={onResultSearch(props.fileId)}
          />
        </div>
      </div>
    </div>
  );
};
export default IntroduceWrapper;

const onResultPlaceholder = (fileId) => {
  switch (fileId) {
    case 3:
      return "Tên video cần tìm";
      break;
    default:
      return "Tên file cần tìm";
  }
};

const onResultSearch = (fileId) => {
  switch (fileId) {
    case 3:
      return "Không tìm thấy video cần tìm";
      break;
    default:
      return "Không tìm thấy file cần tìm";
  }
};
