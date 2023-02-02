import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getCoursesByCategoriesApi,
  setLimitCoursesAction,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import {
  limitCategoriesCourses,
  limitCategoriesCoursesViewMore,
  randomBadgeArr,
} from "../../util/config";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { CourseType } from "../../util/interface/courseReducerInterface";
import CoursesList from "./CoursesList";

type Props = {};

const Categories = (props: Props) => {
  const { categories, limitCouses, coursesByCategories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const dispatch: DispatchType = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<string[] | null>(null);
  const absoluteSidebar = useRef<HTMLDivElement | null>(null);
  const parentDiv = useRef<HTMLDivElement | null>(null);
  const [result, setResult] = useState<CourseType[] | null | undefined>(null);
  const { register, handleSubmit, reset } = useForm<{ search: string }>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const checkboxHandle = (e: { target: HTMLInputElement }) => {
    let arr: string[] | null = [];
    if (checked !== null) arr = [...checked];
    if (e.target.checked) {
      arr = [...arr, e.target.value];
    } else {
      const index: number = arr.findIndex(
        (item: string) => item === e.target.value
      );
      if (index !== -1) arr.splice(index, 1);
    }
    if (arr.length === 0) arr = null;
    setChecked(arr);
  };

  const getCategoriesFromParams = (): string[] | null => {
    let params: string | null | undefined = searchParams.get("categories");
    let arr: string[] | null = null;
    if (params) {
      arr = params.split("+");
    }
    return arr;
  };

  const checkCheked = (maDanhMuc: string): boolean => {
    const checkedList: string[] | null = getCategoriesFromParams();
    if (checkedList) {
      const find: string | undefined = checkedList.find(
        (item: string) => item === maDanhMuc
      );
      if (find) return true;
    }
    return false;
  };

  const sortSubmitHandle = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (checked !== null) {
      let params: string | undefined = checked?.join("+");
      setSearchParams({
        categories: params,
      });
      window.scrollTo(0, 0);
    } else {
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
    dispatch(getCoursesByCategoriesApi(checked));
    dispatch(setLimitCoursesAction(limitCategoriesCourses));
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
    window.addEventListener("scroll", onScroll);
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
        <div className="categories_container_sidebar">
          <div
            ref={absoluteSidebar}
            className="categories_container_sidebar_inner"
          >
            <div className="categories_container_sidebar_inner_header">
              <h1>
                <i className="fa-solid fa-list"></i>Bộ lọc
              </h1>
            </div>
            <div className="categories_container_sidebar_inner_body">
              <h1>Tất cả danh mục</h1>
              <ul>
                {categories?.map((item: CategoriesType, index: number) => {
                  return (
                    <li key={index}>
                      <input
                        type="checkbox"
                        value={item.maDanhMuc}
                        onChange={checkboxHandle}
                        defaultChecked={checkCheked(item.maDanhMuc)}
                      />
                      {item.tenDanhMuc}
                    </li>
                  );
                })}
              </ul>
              <div className="categories_container_sidebar_inner_body_btn">
                <button className="btn btn-primary" onClick={sortSubmitHandle}>
                  <i className="fa-solid fa-filter"></i>Lọc
                </button>
              </div>
            </div>
          </div>
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
