import iconSinglePage from "edu_lms/assets/images/single-page.jpg";
import iconTwoPage from "edu_lms/assets/images/two-page.jpg";
import _ from "lodash";

export const VIEW_MODE = {
  single_page: {
    icon: iconSinglePage,
    title: "Xem một trang",
  },
  two_page: {
    icon: iconTwoPage,
    title: "Xem hai trang",
  },
};

let menuPages = [];
export const findIdQuestion = (menus, currentPage) => {
  menuPages = [];
  const findMenu = getAllMenuBooks(menus, currentPage);

  if (!_.isEmpty(findMenu)) return findMenu.pop();
  return false;
};

const getAllMenuBooks = (menus, currentPage) => {
  const getMenuBooks = (menu, currentPage) => {
    menu.children.forEach((item) => {
      if (
        item.index_page &&
        (item.index_page - 1 < currentPage ||
          item.index_page - 1 === currentPage)
      ) {
        menuPages = [...menuPages, item];
      }
    });
  };
  for (let menu of menus) {
    const menuChildren = menu.children;
    if (!_.isEmpty(menuChildren)) {
      if (menuChildren[0]?.children) {
        getAllMenuBooks(menuChildren, currentPage);
      }
      getMenuBooks(menu, currentPage);
    } else if (
      menu.index_page - 1 === currentPage ||
      menu.index_page - 1 < currentPage
    ) {
      menuPages = [...menuPages, menu];
    }
  }
  if (!_.isEmpty(menuPages)) {
    // menuPages = menuPages.sort((a, b) => a.id - b.id);
	  menuPages = menuPages.sort((a, b) => (a.index_page === b.index_page) ? (a.id - b.id) : (a.index_page - b.index_page));
	
	  return menuPages;
  }
};
