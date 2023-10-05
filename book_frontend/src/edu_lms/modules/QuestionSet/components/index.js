import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import CreateQuestion from "edu_lms_v2/modules/ControlDoingExercise/CreateQuestion";
import Item from "./Item";
import IconBack from "edu_lms_v2/assets/img/back1.svg";
import {
  INNER_WIDTH,
  OPTIONS_GRADE,
  SHOW_PAGINATE_TOPICS_QUESTION_WAREHOUSE,
} from "edu_lms/constants/type";
import { getListSubject } from "edu_lms/services/app/app";
import {
  getListQuestionSet,
  postCreateQuestionSet,
} from "edu_lms/services/question";
import {
  onDispatchUpdateParamterQuestionSet,
  onDispathSetInitialPageExercise,
} from "edu_lms/modules/QuestionSet/actions";
import { toast } from "react-toastify";

const QuestionSetWrapper = (props) => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const [optionsGrade] = useState(OPTIONS_GRADE);
  const [optionsSubject, setStateOptionsSubject] = useState([]);

  const [selectedOptionGrade, setStateSelectedOptionGrade] = useState();
  const [selectedOptionSubject, setStateSelectedOptionSubject] = useState();
  const [listItem, setListItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");

  const selectGradeId = useSelector(
    (state) => state.questionSetReducer.paramterQuestionSet.gradeId
  );
  const selectSubjectId = useSelector(
    (state) => state.questionSetReducer.paramterQuestionSet.subjectId
  );
  const subjectName = useSelector(
    (state) => state.questionSetReducer.paramterQuestionSet.subjectName
  );
  const titleSearch = useSelector(
    (state) => state.questionSetReducer.paramterQuestionSet.title
  );
  const initialPageExercise = useSelector(
    (state) => state.questionSetReducer.initialPageExercise
  );

  const onGetData = (data) => {
    setPage(data.page ? data.page - 1 : 0);
    getListQuestionSet(data)
      .then((res) => {
        if (res.data.status === "success") {
          setListItem(res.data.data.data);
          setTotal(
            Math.ceil(
              res.data.data.total / SHOW_PAGINATE_TOPICS_QUESTION_WAREHOUSE
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeGrade = (selectedOptionGrade) => {
    dispatch(
      onDispatchUpdateParamterQuestionSet({
        gradeId: selectedOptionGrade.id,
        subjectId: 0,
        subjectName: "",
      })
    );
    dispatch(
      onDispathSetInitialPageExercise({
        initialPageExercise: 0,
      })
    );
    setStateOptionsSubject([]);
    setStateSelectedOptionSubject("");
    setStateSelectedOptionGrade(selectedOptionGrade);
    getListSubject(selectedOptionGrade.id)
      .then((res) => {
        if (res.data.status === "success") {
          const list = [];
          res.data.data.list_subject.forEach((value, index) => {
            list.push({
              id: value.id,
              label: value.title,
              value: `file_${value.id}`,
              type: value.id,
            });
          });
          setStateOptionsSubject(list);
          const data = {
            gradeId: selectedOptionGrade?.id,
            subjectId: "",
            title: titleSearch,
          };
          onGetData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeSubject = (selectedOptionSubject) => {
    dispatch(
      onDispatchUpdateParamterQuestionSet({
        subjectId: selectedOptionSubject.id,
        subjectName: selectedOptionSubject.label,
      })
    );
    setStateSelectedOptionSubject(selectedOptionSubject);
    const data = {
      gradeId: selectedOptionGrade?.id || "",
      subjectId: selectedOptionSubject?.id,
      title: titleSearch,
    };
    onGetData(data);
  };

  const onSubmit = (dataForm) => {
    const data = {
      gradeId: selectedOptionGrade?.id || "",
      subjectId: selectedOptionSubject?.id || "",
      title: dataForm.search,
    };

    onGetData(data);
    setTitle(dataForm.search);
    dispatch(
      onDispatchUpdateParamterQuestionSet({
        title: dataForm.search,
      })
    );
    dispatch(
      onDispathSetInitialPageExercise({
        initialPageExercise: 0,
      })
    );
  };

  const currentPage = (page) => {
    const data = {
      gradeId: selectedOptionGrade?.id || "",
      subjectId: selectedOptionSubject?.id || "",
      title: titleSearch,
      page: page,
    };
    onGetData(data);
    dispatch(
      onDispathSetInitialPageExercise({
        initialPageExercise: page - 1,
      })
    );
  };
  useEffect(() => {
    const data = {
      gradeId: "",
      subjectId: "",
      title: titleSearch,
      page: initialPageExercise + 1 ?? 1,
    };
    onGetData(data);
  }, []);

  useEffect(() => {
    if (selectGradeId) {
      const selectGrade = OPTIONS_GRADE.find(
        (listGrade) => listGrade.id === selectGradeId
      );
      setStateSelectedOptionGrade(selectGrade);
      getListSubject(selectGradeId)
        .then((res) => {
          if (res.data.status === "success") {
            const list = [];
            res.data.data.list_subject.forEach((value, index) => {
              list.push({
                id: value.id,
                label: value.title,
                value: `file_${value.id}`,
                type: value.id,
              });
            });
            setStateSelectedOptionSubject({
              id: selectSubjectId,
              label: subjectName,
              type: selectSubjectId,
              value: `file${selectSubjectId}`,
            });
            setStateOptionsSubject(list);

            const data = {
              gradeId: selectGradeId,
              subjectId: selectSubjectId,
              title: titleSearch,
              page: initialPageExercise + 1 ?? 1,
            };
            onGetData(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setValue("search", titleSearch);
  }, []);
  const showModalCreateQuestion = () => {
    setShowModalCreate(!showModalCreate);
  };
  const onSaveQuestionSet = (dataCreateQuestionSet) => {
    postCreateQuestionSet(dataCreateQuestionSet)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Tạo mới bộ đề thành công");
          const data = {
            gradeId: selectedOptionGrade?.id || "",
            subjectId: selectedOptionSubject?.id || "",
            title: titleSearch || "",
          };
          onGetData(data);
          setShowModalCreate(false);
        } else {
          toast.error("Tạo mới câu hỏi thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgba(255,190,136, 0.08)" }}
        className="electronic_courseware_wrapper pb-5 mt-4 pt-5"
      >
        <div className="container-fluid container-xl">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="w-100 position-relative">
                <GoBackPage className="p-2 monkey-bg-white position-absolute cursor monkey-box-shadow">
                  <img src={IconBack} alt="" />
                </GoBackPage>
                <Title className="monkey-bg-white m-auto p-2 monkey-box-shadow">
                  <div className="d-inline font-weight-bold pl-4 pr-4">
                    Bài luyện tập của tôi
                  </div>
                  <span className="border-2px pl-4 pr-4">Được chia sẻ</span>
                </Title>
              </div>
              <div className="introduce-header monkey-pb-20 monkey-mb-30 mt-4 mb-4 pb-3">
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="d-flex align-items-center">
                      <ButtonStyle
                        className="mt-2 d-flex align-items-center monkey-bg-question"
                        onClick={() => showModalCreateQuestion()}
                      >
                        <i
                          style={{ marginRight: 10 }}
                          className="fa fa-plus-circle"
                          aria-hidden="true"
                        ></i>
                        <p title="Tạo mới">Tạo mới</p>
                      </ButtonStyle>
                    </div>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="row d-flex justify-content-start">
                      <div className="col-12 col-sm-3 mt-2">
                        <Select
                          placeholder="Chọn lớp"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 5 }),
                          }}
                          onChange={handleChangeGrade}
                          options={optionsGrade}
                          value={selectedOptionGrade}
                        />
                      </div>
                      <div className="col-12 col-sm-3 mt-2">
                        <Select
                          placeholder="Chọn môn"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 5 }),
                          }}
                          onChange={handleChangeSubject}
                          options={optionsSubject}
                          value={selectedOptionSubject}
                        />
                      </div>

                      <div className="col-12 col-sm-6 mt-2">
                        <form
                          name="formSearch"
                          className="form_search"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group mb-0 input-search">
                            <input
                              style={{ width: "95%" }}
                              className="form-control rounded-pill"
                              type="text"
                              autoComplete="off"
                              placeholder="Tên bộ đề cần tìm"
                              name="search"
                              ref={register({ required: false })}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="introduce-content">
                {listItem?.map((item, index) => {
                  return <Item key={index} item={item} />;
                })}

                {total > 1 && (
                  <ReactPaginate
                    previousLabel={""}
                    previousClassName={"icon icon-prev"}
                    nextLabel={""}
                    nextClassName={"icon icon-next"}
                    breakLabel={"..."}
                    pageCount={total}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={(data) => currentPage(data.selected + 1)}
                    forcePage={initialPageExercise ?? page}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    previousLinkClassName={`page-link page-link--prev ${
                      initialPageExercise + 1 === 1 && "btn disabled"
                    }`}
                    nextLinkClassName={`page-link page-link--next ${
                      initialPageExercise + 1 === total && "btn disabled"
                    }`}
                    renderOnZeroPageCount={null}
                    hrefAllControls
                    hrefBuilder={() => {
                      return "javascript:;";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateQuestion
        show={showModalCreate}
        onHide={() => setShowModalCreate(false)}
        onSaveQuestionSet={onSaveQuestionSet}
      />
    </>
  );
};

export default QuestionSetWrapper;

const ButtonStyle = styled.button`
  border: none;
  margin-left: 14px;
  border-radius: 8px;
  padding: 8px 24px;
  color: #fff;
`;

const Title = styled.div`
  color: #ff7707;
  width: max-content;
  border-radius: 10px;
  .border-2px {
    border-left: 2px solid #ff7707;
  }
  span {
    color: #2a404f;
  }
`;

const GoBackPage = styled.div`
  border-radius: 10px;
  ${window.innerWidth > INNER_WIDTH.DESKTOP
    ? "transform: translateX(-100%);"
    : "transform: translate(0, -130%);"}
`;
