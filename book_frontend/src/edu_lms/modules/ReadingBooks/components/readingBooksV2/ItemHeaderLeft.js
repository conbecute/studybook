import { TYPE_EVENT_READING_BOOK } from "edu_lms/constants/type";

const itemReadingBook = [
  {
    icon: "fa fa-bars",
    title: "Mục lục",
    id: "tooltip-menu",
    event: TYPE_EVENT_READING_BOOK.menu,
  },
  {
    icon: "fa fa-pencil",
    title: "Công cụ",
    id: "tooltip-tool",
    event: TYPE_EVENT_READING_BOOK.tools,
  },
  // {
  //   icon: "fa fa-file-text-o",
  //   title: "Luyện tập",
  //   id: "practice",
  //   event: TYPE_EVENT_READING_BOOK.practice,
  // },
  {
    icon: "fa fa-question-circle",
    title: "Hướng dẫn",
    id: "reading-support-tooltip",
    event: TYPE_EVENT_READING_BOOK.guide,
  },
  {
    icon: "fa fa-pencil-square",
    title: "Tắt icon sách",
    titleActive: "Bật icon sách",
    id: "tooltip-point",
    event: TYPE_EVENT_READING_BOOK.touchPoint,
  },
];

export default function ItemHeaderLeft({
  eventActive,
  handleEventReadingBook,
}) {
  return itemReadingBook.map((item) => (
    <div
      id={item.id}
      className={`item position-relative ${
        eventActive.event === item.event ? "color-orange" : "color-white"
      }`}
      onClick={() => handleEventReadingBook(item)}
    >
      <div className="position-absolute item-container">
        <i className={`${item.icon} monkey-fz-25 `} aria-hidden="true" />
        <p>
          {eventActive.event === item.event && item.titleActive
            ? item.titleActive
            : item.title}
        </p>
      </div>
    </div>
  ));
}
