import { Fragment } from "react";
import NotBook from "../../../components/NotBook";
import BookItem from "../../../components/BookItem";

const BoxContent = (props) => {
  if (props?.data?.length > 0) {
    return (
      <Fragment>
        {props.data.map((item, index) => {
          return (
            <div key={index} className="col-12 col-xl-3 col-lg-4 col-md-6 mb-4">
              <BookItem
                statusModal={props.statusModal}
                data={item}
                onShowPopupActivateBook={props.onShowPopupActivateBook}
                gradeId={props.gradeId}
                listGrade={props.listGrade}
                typeBook={props.typeBook}
              />
            </div>
          );
        })}
      </Fragment>
    );
  } else {
    return (
      <div className="col-12">
        <NotBook />
      </div>
    );
  }
};
export default BoxContent;
