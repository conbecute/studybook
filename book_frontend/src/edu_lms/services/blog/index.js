import axios from "axios";

const GET_NEW_POST = "get-list-blog-by-slug";
const GET_DETAIL_ARTICLE = "get-blog-by-alias";
const GET_CATE_BY_PARENT = "get-cate-by-parent";

export const getNewPostBlog = ({ limit, page, slug, view_count }) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL_MONKEY_WEB}${GET_NEW_POST}?app_id=68&language=vi&limit=${limit}&page=${page}&slug=${slug}&view_count=${view_count}`
  );
};

export const getDetailArticle = ({ alias }) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL_MONKEY_WEB}${GET_DETAIL_ARTICLE}?alias=${alias}`
  );
};

export const getCateByParent = ({ slug }) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL_MONKEY_WEB}${GET_CATE_BY_PARENT}?slug=${slug}`
  );
};
