import ReactPaginate from "react-paginate";
import TitleComponent from "../../../components/title";
import FormSearch from "../../../components/FormSearch";
import BoxItem from "../../../components/BoxItem";
import * as TEXT from "../../../constants/text";
import EducationContent from "./EducationContent";
export const EducationProgramWrapper = (props) => {
  return (
    <div className="introduce_wrapper pb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title={TEXT.TITLE_BOOK_EDUCATION}
              className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      placeholder="Chương trình cần tìm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="introduce-content">
              <EducationContent
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
export default EducationProgramWrapper;
