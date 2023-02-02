import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import {
  getCoursesByCategoriesApi,
  setLimitCoursesAction,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import {
  limitCategoriesCoursesViewMore,
  randomBadgeArr,
} from "../../util/config";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { CourseType } from "../../util/interface/courseReducerInterface";
import CategoriesSidebar from "./CategoriesSidebar";
import CoursesList from "./CoursesList";

type Props = {};

const Categories = (props: Props) => {
  const { categories, limitCouses, coursesByCategories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const dispatch: DispatchType = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const absoluteSidebar = useRef<HTMLDivElement | null>(null);
  const parentDiv = useRef<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState<string[] | null>(null);
  const [result, setResult] = useState<CourseType[] | null | undefined>(null);
  const { show, toggle } = useModal();
  const { register, handleSubmit, reset } = useForm<{ search: string }>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const getCategoriesFromParams = (): string[] | null => {
    let params: string | null | undefined = searchParams.get("categories");
    let arr: string[] | null = null;
    if (params) {
      arr = params.split("+");
    }
    return arr;
  };

  const onScroll = (): void => {
    const topDivAnimate: number =
      absoluteSidebar.current!.getBoundingClientRect().top;
    if (topDivAnimate < window.scrollY) {
      absoluteSidebar.current!.classList.add("absolute");
      absoluteSidebar.current!.style.top = `${window.scrollY - 55}px`;
    } else {
      absoluteSidebar.current!.classList.remove("absolute");
    }
    if (window.scrollY > parentDiv.current!.clientHeight - 207) {
      absoluteSidebar.current!.style.top = "unset";
      absoluteSidebar.current!.style.bottom = "0px";
    } else {
      absoluteSidebar.current!.style.bottom = "unset";
      absoluteSidebar.current!.style.top = `${window.scrollY - 55}px`;
    }
  };

  const search = (value: string | null): void => {
    let findArr: CourseType[] | null | undefined = coursesByCategories;
    if (value !== null) {
      findArr = findArr?.filter((item: CourseType) =>
        item.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
      );
      let params: string | null | undefined = searchParams.get("categories");
      setSearchParams({
        ...(params && { categories: params }),
        ...(value && { keywords: value }),
      });
    }
    if (findArr?.length === 0) findArr = null;
    setResult(findArr);
  };

  const searchSubmitHandle = (data: { search: string }): void =>
    search(data.search);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkedList: string[] | null = getCategoriesFromParams();
    if (checkedList) {
      dispatch(getCoursesByCategoriesApi(checkedList));
      setChecked(checkedList);
    }
    if (absoluteSidebar.current) window.addEventListener("scroll", onScroll);

    return () => {
      dispatch(getCoursesByCategoriesApi(null));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const keywords = searchParams.get("keywords");
    search(keywords);
  }, [coursesByCategories]);

  useEffect(() => {
    const keywords = searchParams.get("keywords");
    if (keywords) {
      reset({
        search: keywords,
      });
    }
  }, [searchParams]);

  return (
    <section className="categories" ref={parentDiv}>
      <div className="categories_container">
        {window.innerWidth <= 768 && (
          <button className="btn btn-primary" onClick={toggle}>
            Lọc danh mục
          </button>
        )}

        <div className="categories_container_sidebar">
          {window.innerWidth <= 768 ? (
            <Modal show={show} toggle={toggle} title="Lọc danh mục">
              <CategoriesSidebar
                checked={checked}
                setChecked={setChecked}
                getCategoriesFromParams={getCategoriesFromParams}
                toggle={toggle}
              />
            </Modal>
          ) : (
            <>
              <div ref={absoluteSidebar}>
                <div className="categories_container_sidebar_inner">
                  <CategoriesSidebar
                    checked={checked}
                    setChecked={setChecked}
                    getCategoriesFromParams={getCategoriesFromParams}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="categories_container_main">
          <div className="categories_container_main_body">
            <div className="selectedCategories">
              <i className="fa-solid fa-arrow-right"></i>
              Danh mục đã chọn:{" "}
              {getCategoriesFromParams()?.map((item: string, index: number) => {
                const find = categories?.find(
                  (val: CategoriesType) => val.maDanhMuc === item
                );
                return (
                  find !== undefined && (
                    <span
                      className={`badge badge-${randomBadgeArr[index]}`}
                      key={index}
                    >
                      {find.tenDanhMuc}
                    </span>
                  )
                );
              })}
            </div>

            <form
              className="searchInResult"
              onSubmit={handleSubmit(searchSubmitHandle)}
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                {...register("search")}
              />
              <button className="btn btn-primary">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            {!result && (
              <h1 className="notfound">
                <img src="../../img/notfound.png" alt="" />
                {!checked ? (
                  <div>Chưa chọn lọc khóa học!</div>
                ) : (
                  <div>Không tìm thấy kết quả nào!</div>
                )}
              </h1>
            )}
            {result && (
              <>
                <div className="selectedCategories result">
                  <i className="fa-solid fa-arrow-right"></i>
                  Đã tìm thấy:{" "}
                  <span className="badge badge-info">{result?.length}</span> kết
                  quả.
                </div>
              </>
            )}

            {result!?.length <= limitCouses ? (
              <ul>
                {result?.map((item: CourseType, index: number) => {
                  return <CoursesList item={item} key={index} />;
                })}
              </ul>
            ) : (
              <ul>
                {result
                  ?.slice(0, limitCouses)
                  .map((item: CourseType, index: number) => {
                    return <CoursesList item={item} key={index} />;
                  })}
              </ul>
            )}

            {result!?.length > limitCouses && (
              <div className="categories_container_main_body_btn">
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(
                      setLimitCoursesAction(
                        limitCouses + limitCategoriesCoursesViewMore
                      )
                    );
                  }}
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
