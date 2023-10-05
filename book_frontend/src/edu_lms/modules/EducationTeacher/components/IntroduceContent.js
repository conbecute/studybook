import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import DocumentItem from "../../../components/DocumentItem";
import NotBook from "../../../components/NotBook";
import { SHOW_PAGINATE } from "../../../constants/type";

const IntroduceContent = (props) => {
  if (props.data.length > 0) {
    return (
      <Fragment>
        <div className="row">
          {props.data.map((item, index) => {
            return <DocumentItem key={index} item={item} />;
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
  return <NotBook status={true} title={props.textNotSearch} />;
};
export default IntroduceContent;
