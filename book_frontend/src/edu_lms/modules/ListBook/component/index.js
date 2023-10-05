import ReactPaginate from "react-paginate";

import TitleComponent from "../../../components/title";
import SelectComponent from "../../../components/SelectComponent";
import SelectSubjectComponent from "../../../components/SelectSubjectComponent";

import BoxContent from "./BoxContent";
import FormSearch from "../../../components/FormSearch";
import React from "react";
import { TYPE_TEXT_BOOKS_DOCUMENT } from "../../../constants/general";
import { SHOW_PAGINATE } from "../../../constants/type";

export const ListBookWrapper = (props) => {
  return (
    <div className="list_book_wrapper monkey-bg-light-gray pt-5 monkey-pb-15">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title={props.title}
              className="monkey-color-violet monkey-fz-34 text-uppercase text-center monkey-pb-30"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className="d-flex align-items-center">
                    <FormSearch
                      onSearch={props.onSearch}
                      gradeId={props.gradeId}
                      typeBook={props.typeBook}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-7 d-flex justify-content-end align-items-center">
                  <SelectComponent
                    typeBook={props.typeBook}
                    listGrade={props.listGrade}
                    placeholder="Chọn lớp"
                    gradeId={props.gradeId}
                    onGetDataBook={props.onGetDataBook}
                  />
                  {props.typeBook === TYPE_TEXT_BOOKS_DOCUMENT && (
                    <SelectSubjectComponent
                      className="ml-3"
                      typeBook={props.typeBook}
                      listGrade={props?.listSubjectActive}
                      gradeId={props.gradeId}
                      onGetDataBookBySubject={props.onGetDataBookBySubject}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <BoxContent
                data={props.data}
                listGrade={props.listGrade}
                gradeId={props.gradeId}
                statusModal={props.statusModal}
                typeBook={props.typeBook}
                onShowPopupActivateBook={props.onShowPopupActivateBook}
              />
            </div>
            {props.total > SHOW_PAGINATE && (
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                }
                nextLabel={
                  <i
                    className="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i>
                }
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) =>
                  props.onPageClick(
                    e,
                    props.gradeId,
                    props.typeBook,
                    props.bookId
                  )
                }
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBookWrapper;
