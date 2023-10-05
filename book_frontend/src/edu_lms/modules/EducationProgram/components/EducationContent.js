import { Fragment } from "react";
import ModalVideo from "react-modal-video";
import ReactPaginate from "react-paginate";
import { TITLE_SEARCH_NOT_BOOK } from "../../../constants/text";
import BoxItem from "../../../components/BoxItem";
import NotBook from "../../../components/NotBook";
import { SHOW_PAGINATE } from "../../../constants/type";

const EducationContent = (props) => {
  if (props.data.length > 0) {
    return (
      <Fragment>
        <div className="row">
          {props.data.map((item, index) => {
            return <BoxItem key={index} item={item} isStyleUI={false} />;
          })}
        </div>
        {props.total > SHOW_PAGINATE && (
          <ReactPaginate
            previousLabel={
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            }
            nextLabel={
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={props.onPageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </Fragment>
    );
  }
  return <NotBook status={true} title="Không tìm thấy chương trình cần tìm" />;
};
export default EducationContent;
