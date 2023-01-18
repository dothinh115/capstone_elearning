import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/cardItem/CardItem";
import {
  checkCategories,
  unCheckCategories,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { CategoriesType, CourseType } from "../../util/config";
import { randomBadge } from "../../util/function";

type Props = {};

const Categories = (props: Props) => {
  const { categories, checkedCategories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const dispatch: DispatchType = useDispatch();

  const checkboxHandle = (e: { target: HTMLInputElement }) => {
    if (e.target.checked) {
      dispatch(checkCategories(e.target.value));
    } else {
      dispatch(unCheckCategories(e.target.value));
    }
  };

  const coursesByCategories = (): CourseType[] => {
    let arr: CourseType[] = [];
    for (let value of checkedCategories!) {
      coursesArr?.map((item: CourseType) => {
        if (item.danhMucKhoaHoc.maDanhMucKhoahoc === value) {
          arr = [...arr, item];
        }
      });
    }
    return arr;
  };

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
                      <li>
                        <input
                          type="checkbox"
                          value={item.maDanhMuc}
                          onChange={checkboxHandle}
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
                Khóa học đã chọn:{" "}
                {coursesByCategories()?.length === 0 ? (
                  <>
                    <span className="badge badge-info">Tất cả khóa học</span>
                  </>
                ) : (
                  <>
                    {checkedCategories?.map((item: string, index: number) => {
                      const find = categories?.find(
                        (val: CategoriesType) => val.maDanhMuc === item
                      );
                      if (find !== undefined)
                        return (
                          <span className={`badge badge-${randomBadge()}`}>
                            {find.tenDanhMuc}
                          </span>
                        );
                    })}
                  </>
                )}
              </div>
              {coursesByCategories()?.length === 0 ? (
                <>
                  {coursesArr?.map((item: CourseType, index: number) => {
                    return <CardItem item={item} key={index} />;
                  })}
                </>
              ) : (
                <>
                  {coursesByCategories()?.map(
                    (item: CourseType, index: number) => {
                      return <CardItem item={item} key={index} />;
                    }
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
