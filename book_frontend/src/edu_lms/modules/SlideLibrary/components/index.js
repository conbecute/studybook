import FormSearch from "../../../components/FormSearch";
import TitleComponent from "../../../components/title";
import SelectComponent from "../../../components/SelectComponent";
import Content from "./Content";

const SlideLibraryWrapper = (props) => {
  return (
    <div className="electronic_courseware_wrapper pb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title="Bài giảng điện tử"
              className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      placeholder="Tên bài giảng cần tìm"
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
                  <div className="ml-3">
                    <SelectComponent
                      listGrade={props.listSubjects}
                      gradeId={props.subjectId}
                      typeBook={props.typeBook}
                      onGetDataBook={props.onGetSubjects}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="introduce-content">
              <Content
                data={props.data}
                total={props.total}
                pageCount={props.pageCount}
                onPageClick={props.onPageClick}
                initialPage={props.initialPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideLibraryWrapper;
