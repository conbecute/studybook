import Rearct, { Fragment } from "react";
import Slider from "react-slick";
import BookItem from "../../../components/BookItem";
import { settingSlider } from "../configs";
import NotBook from "../../../components/NotBook";
import { TYPE_TEXT_WORK_BOOKS } from "../../../constants/general";

const SliderComponent = ({
  statusModal,
  onShowPopupActivateBook,
  data,
  gradeId,
  listGrade,
  typeBook,
}) => {
  return (
    <Fragment>
      {onShowData(
        data,
        statusModal,
        onShowPopupActivateBook,
        gradeId,
        listGrade,
        typeBook
      )}
    </Fragment>
  );
};
export default SliderComponent;

const onShowData = (
  data,
  statusModal,
  onShowPopupActivateBook,
  gradeId,
  listGrade,
  typeBook
) => {
  if (data?.length > 0) {
    return (
      <Slider {...settingSlider}>
        {data.map((item, index) => {
          return (
            <BookItem
              statusModal={statusModal}
              key={index}
              data={item}
              gradeId={gradeId}
              listGrade={listGrade}
              onShowPopupActivateBook={onShowPopupActivateBook}
              typeBook={typeBook}
            />
          );
        })}
      </Slider>
    );
  } else {
    return <NotBook />;
  }
};
