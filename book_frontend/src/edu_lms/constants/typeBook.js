export const TypeBook = {
  TEXT_BOOK: 2,
  SUPPLEMENTARY_BOOK: 5,
  TEACHER_BOOK: 3,
};

export const getNameTypeBook = (type) => {
  switch (type) {
    case TypeBook.TEXT_BOOK:
      return "textbook";
    case TypeBook.SUPPLEMENTARY_BOOK:
      return "supplementary_book";
    case TypeBook.TEACHER_BOOK:
      return "teacher_book";
    default:
      return "";
  }
};
