import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
import {
  setCheckCategories,
  setLimitCourses,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import {
  CategoriesType,
  CourseType,
  limitCategoriesCourses,
  limitCategoriesCoursesViewMore,
  randomBadgeArr,
} from "../../util/config";
import { randomBadge } from "../../util/function";

type Props = {};

const Categories = (props: Props) => {
  const { categories, checkedCategories, limitCouses } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const dispatch: DispatchType = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const checkboxHandle = (e: { target: HTMLInputElement }) => {
    let arr: string[] | null = [];
    if (checkedCategories !== null) arr = [...checkedCategories!];
    if (e.target.checked) {
      arr = [...arr, e.target.value];
    } else {
      const index = arr.findIndex((item: string) => item === e.target.value);
      if (index !== -1) arr.splice(index, 1);
    }
    if (arr.length === 0) {
      arr = null;
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
    dispatch(setCheckCategories(arr));
  };

  const coursesByCategories = (): any => {
    let arr: CourseType[] = [];
    if (checkedCategories !== null) {
      for (let value of checkedCategories!) {
        coursesArr?.map((item: CourseType) => {
          if (item.danhMucKhoaHoc.maDanhMucKhoahoc === value)
            arr = [...arr, item];
        });
      }
    }

    if (arr.length === 0) return coursesArr;
    return arr;
  };

  const checkCheked = (maDanhMuc: string): boolean => {
    let params: any = searchParams.get("categories");
    if (params) {
      params = params.split("+");
      for (let value of params) {
        if (value === maDanhMuc) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    let params: any = checkedCategories?.join("+");
    if (params !== undefined) {
      setSearchParams({
        categories: params,
      });
    }
  }, [checkedCategories]);

  useEffect(() => {
    let params: any = searchParams.get("categories");
    if (params) {
      params = params.split("+");
      dispatch(setCheckCategories(params));
      dispatch(setLimitCourses(limitCategoriesCourses));
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams]);

  return (
    <>
      <section className="categories">
        <div className="categories_container">
          <div className="categories_container_sidebar">
            <div className="categories_container_sidebar_inner">
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
              </div>
            </div>
          </div>
          <div className="categories_container_main">
            <div className="categories_container_main_searchbar"></div>
            <div className="categories_container_main_body">
              <div className="selectedCategories">
                <i className="fa-solid fa-arrow-right"></i>
                Khóa học đã chọn:{" "}
                {checkedCategories === null ? (
                  <span className="badge badge-info">Tất cả khóa học</span>
                ) : (
                  <>
                    {checkedCategories?.map((item: string, index: number) => {
                      const find = categories?.find(
                        (val: CategoriesType) => val.maDanhMuc === item
                      );
                      if (find !== undefined)
                        return (
                          <span
                            className={`badge badge-${randomBadgeArr[index]}`}
                            key={index}
                          >
                            {find.tenDanhMuc}
                          </span>
                        );
                    })}
                  </>
                )}
              </div>
              {coursesByCategories()?.length <= limitCouses ? (
                <>
                  {coursesByCategories()?.map(
                    (item: CourseType, index: number) => {
                      return <CardItem item={item} key={index} />;
                    }
                  )}
                </>
              ) : (
                <>
                  {coursesByCategories()
                    ?.slice(0, limitCouses)
                    .map((item: CourseType, index: number) => {
                      return <CardItem item={item} key={index} />;
                    })}
                </>
              )}
              {coursesByCategories()?.slice(0, limitCouses).length >=
                limitCouses && (
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(
                      setLimitCourses(
                        limitCouses + limitCategoriesCoursesViewMore
                      )
                    );
                  }}
                >
                  Xem thêm
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
