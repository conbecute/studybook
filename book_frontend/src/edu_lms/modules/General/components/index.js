import React from "react";
import BooksInUse from "./BooksInUse";
import * as TEXT from "../../../constants/text";
import * as TYPE from "../../../constants/general";
import * as PATH from "../../../constants/path";
import { getGradeIdTest3710, GRADETEST3710 } from "../../../constants/type";
const SliderComponent = React.lazy(() => import("./Slider"));

const GeneralWrapper = (props) => {
  return (
    <div className="genera_wrapper monkey-bg-light-gray monkey-pt-15 monkey-pb-15">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <BooksInUse
              statusModal={props.statusModal}
              data={props.listBookInUse}
              title={TEXT.TITLE_TEXT_BOOK}
              typeBook={TYPE.TYPE_TEXT_BOOKS_USED}
              gradeId={props.gradeIdBookUsed}
              listGrade={props.listGrade}
              parameter={PATH.ROUTE_PATH_BOOK_USED}
              onGetDataBook={props.onGetDataBook}
              onShowPopupActivateBook={props.onShowPopupActivateBook}
              isShowFilter={true}
            />
            {/* <BooksInUse
              statusModal={props.statusModal}
              data={props.listTextbooks}
              title={TEXT.TITLE_TEXT_BOOK}
              typeBook={TYPE.TYPE_TEXT_BOOKS}
              gradeId={props.gradeIdTextBook}
              listGrade={props.listGrade}
              parameter={PATH.ROUTE_PATH_LIST_BOOK}
              onGetDataBook={props.onGetDataBook}
              onShowPopupActivateBook={props.onShowPopupActivateBook}
              isShowFilter={true}
            /> */}
            <BooksInUse
              statusModal={props.statusModal}
              data={props.listWorkbook}
              title={TEXT.TITLE_TEXT_WORK_BOOK}
              typeBook={TYPE.TYPE_TEXT_WORK_BOOKS}
              gradeId={props.gradeIdWorkbook}
              listGrade={props.listGrade}
              parameter={PATH.ROUTE_PATH_LIST_WORK_BOOK}
              onGetDataBook={props.onGetDataBook}
              onShowPopupActivateBook={props.onShowPopupActivateBook}
              isShowFilter={true}
            />
            <BooksInUse
              statusModal={props.statusModal}
              data={props.listBookTeacher}
              title={TEXT.TITLE_TEXT_BOOK_TEACHER}
              typeBook={TYPE.TYPE_TEXT_BOOKS_TEACHER}
              gradeId={props.gradeIdBookTeacher}
              listGrade={props.listGrade}
              parameter={PATH.ROUTE_PATH_LIST_BOOK_TEACHER}
              onGetDataBook={props.onGetDataBook}
              onShowPopupActivateBook={props.onShowPopupActivateBook}
              isShowFilter={true}
            />
            {localStorage.getItem("token") &&
              localStorage.getItem("grade_id_book_test") && (
                <BooksInUse
                  statusModal={props.statusModal}
                  data={props.listBookTest3710}
                  title={TEXT.TITLE_TEXT_BOOK_TEST_3710}
                  typeBook={TYPE.TYPE_TEXT_BOOKS_TEST_3710}
                  gradeId={props.gradeIdBookTest3710}
                  listGrade={getGradeIdTest3710(
                    localStorage.getItem("grade_id_book_test")
                  )}
                  parameter={PATH.ROUTE_PATH_LIST_BOOK_TEST_3710}
                  onGetDataBook={props.onGetDataBook}
                  onShowPopupActivateBook={props.onShowPopupActivateBook}
                  isShowFilter={true}
                />
              )}
            {localStorage.getItem("token") && (
              <BooksInUse
                statusModal={props.statusModal}
                data={props.listBookDocument}
                title={TEXT.TITLE_TEXT_BOOK_DOCUMENT}
                typeBook={TYPE.TYPE_TEXT_BOOKS_DOCUMENT}
                gradeId={props.gradeIdBookDocument}
                listGrade={props.listGrade}
                parameter={PATH.ROUTE_PATH_LIST_BOOK_DOCUMENT}
                onGetDataBook={props.onGetDataBook}
                onShowPopupActivateBook={props.onShowPopupActivateBook}
                isShowFilter={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralWrapper;
