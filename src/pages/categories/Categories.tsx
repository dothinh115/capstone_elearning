import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
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

  const checkboxHandle = (e: { target: HTMLInputElement }) => {
    let arr: string[] | null = [];
    if (checked !== null) arr = [...checked];
    if (e.target.checked) {
      arr = [...arr, e.target.value];
    } else {
      const index = arr.findIndex((item: string) => item === e.target.value);
      if (index !== -1) arr.splice(index, 1);
    }
    if (arr.length === 0) arr = null;
    setChecked(arr);
  };

  const checkCheked = (maDanhMuc: string): boolean => {
    let params: string | null | string[] = searchParams.get("categories");
    if (params) {
      params = params.split("+");
      const find = params.find((item: string) => item === maDanhMuc);
      if (find) return true;
    }
    return false;
  };

  const sortSubmitHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (checked !== null) {
      dispatch(getCoursesByCategoriesApi(checked));
      let params: string | undefined = checked?.join("+");
      setSearchParams({
        categories: params,
      });
      window.scrollTo(0, 0);
    } else {
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
  };

  const getCategoriesFromParams = (): string[] | null => {
    let params: string | null | undefined = searchParams.get("categories");
    let arr: string[] | null = null;
    if (params) {
      arr = params.split("+");
    }
    return arr;
  };

  useEffect(() => {
    const checkedList: string[] | null = getCategoriesFromParams();
    if (checkedList) {
      dispatch(getCoursesByCategoriesApi(checkedList));
      setChecked(checkedList);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const topDivAnimate = absoluteSidebar.current!.getBoundingClientRect().top;
    absoluteSidebar.current!.classList.remove("absolute");
    const onScroll = () => {
      if (topDivAnimate < window.scrollY) {
        absoluteSidebar.current!.classList.add("absolute");
        absoluteSidebar.current!.style.top = `${window.scrollY - 75}px`;
      } else {
        absoluteSidebar.current!.classList.remove("absolute");
      }
      if (window.scrollY > parentDiv.current!.clientHeight - 300) {
        absoluteSidebar.current!.style.top = "unset";
        absoluteSidebar.current!.style.bottom = "0px";
      } else {
        absoluteSidebar.current!.style.bottom = "unset";
        absoluteSidebar.current!.style.top = `${window.scrollY - 75}px`;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
            {coursesByCategories?.length === 0 ? (
              <h1 className="notfound">
                <img src="../../img/notfound.png" alt="" />
                <div>Chưa có gì ở đây!</div>
              </h1>
            ) : (
              <div className="selectedCategories result">
                <i className="fa-solid fa-arrow-right"></i>
                Đã tìm thấy:{" "}
                <span className="badge badge-info">
                  {coursesByCategories?.length}
                </span>{" "}
                kết quả.
              </div>
            )}
            {coursesByCategories!?.length <= limitCouses ? (
              <>
                {coursesByCategories?.map((item: CourseType, index: number) => {
                  return <CardItem item={item} key={index} />;
                })}
              </>
            ) : (
              <>
                {coursesByCategories
                  ?.slice(0, limitCouses)
                  .map((item: CourseType, index: number) => {
                    return <CardItem item={item} key={index} />;
                  })}
              </>
            )}

            {coursesByCategories!?.length > limitCouses && (
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
