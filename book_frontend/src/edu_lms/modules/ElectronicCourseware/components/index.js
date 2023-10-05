import FormSearch from "../../../components/FormSearch";
import TitleComponent from "../../../components/title";
import * as TEXT from "../../../constants/text";
import ElectronicCoursewareContent from "./ElectronicCoursewareContent";
import SelectComponent from "../../../components/SelectComponent";

const ElectronicCoursewareWrapper = (props) => {
  return (
    <div className="electronic_courseware_wrapper pb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title="học liệu điện tử"
              className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      placeholder="Tên học liệu cần tìm"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-7 d-flex justify-content-end align-items-center">
                  <SelectComponent
                    listGrade={props.listOptionGrade}
                    gradeId={props.gradeId}
                    typeBook={props.typeBook}
                    onGetDataBook={props.onGetDataBookByGrade}
                  />
                  {/* <div className="ml-2">
                    <SelectComponent
                      listGrade={props.listSubjects}
                      gradeId={props.subjectId}
                      typeBook={props.typeBook}
                      onGetDataBook={props.onGetSubjects}
                    />
                  </div> */}
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
            <div className="introduce-content">
              <ElectronicCoursewareContent
                data={props.data}
                total={props.total}
                pageCount={props.pageCount}
                onPageClick={props.onPageClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicCoursewareWrapper;
