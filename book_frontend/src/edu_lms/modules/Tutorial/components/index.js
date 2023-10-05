import TitleComponent from "../../../components/title";
import SelectComponent from "../../../components/SelectComponent";
import FormSearch from "../../../components/FormSearch";
import * as TEXT from "../../../constants/text";
import TutorialContent from "./TutorialContent";

const TutorialWrapper = (props) => {
  return (
    <div className="introduce_wrapper pb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title={TEXT.TITLE_BOOK_TUTORIAL}
              className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      onGetDataBook={props.onGetDataBook}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
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
        <div className="introduce-content">
          <TutorialContent
            data={props.data}
            total={props.total}
            pageCount={props.pageCount}
            onPageClick={props.onPageClick}
          />
        </div>
      </div>
    </div>
  );
};
export default TutorialWrapper;
