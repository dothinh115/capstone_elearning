import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
import {
  getCoursesByCategoriesApi,
  setCheckCategoriesAction,
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
  const { categories, checkedCategories, limitCouses, coursesByCategories } =
    useSelector((store: ReduxRootType) => store.categoriesReducer);
  const [offsetHeight, setOffsetHeight] = useState<number>(0);
  const dispatch: DispatchType = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState<string[] | null>(null);

  const setHeight = (): void => {
    setOffsetHeight(window.pageYOffset);
  };

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
    dispatch(setCheckCategoriesAction(checked));
    if (checked === null) {
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    dispatch(getCoursesByCategoriesApi(checkedCategories));
    let params: string | undefined = checkedCategories?.join("+");
    if (params !== undefined) {
      setSearchParams({
        categories: params,
      });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedCategories]);

  useEffect(() => {
    let params: string | null | string[] = searchParams.get("categories");
    if (params) {
      params = params.split("+");
      dispatch(setCheckCategoriesAction(params));
      dispatch(getCoursesByCategoriesApi(params));
      setChecked(params);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setHeight);
  });

  return (
    <section className="categories">
      <div className="categories_container">
        <div className="categories_container_sidebar">
          <div
            className={`categories_container_sidebar_inner${
              offsetHeight > 85 ? " fixed" : ""
            }`}
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
              {checkedCategories?.map((item: string, index: number) => {
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

            {coursesByCategories!?.slice(0, limitCouses).length >=
              limitCouses && (
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
