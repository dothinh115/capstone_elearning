import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
import { getCoursesByCategoryApi } from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { CategoriesType, CourseType } from "../../util/config";

type Props = {};

const Categories = (props: Props) => {
  const { categories, randomCoursesArr, coursesByCategory } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { categoryID } = useParams<{ categoryID: string }>();
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    if (categoryID) {
      dispatch(getCoursesByCategoryApi(categoryID));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [categoryID]);
  return (
    <>
      <section className="categories">
        <div
          className="categories_container"
          style={{ width: !categoryID ? "80%" : "100%" }}
        >
          <>
            {!categoryID && <h1>DANH MỤC KHÓA HỌC</h1>}

            <ul>
              {!categoryID ? (
                <>
                  {categories?.map((item: CategoriesType, index: number) => {
                    return (
                      <li key={index}>
                        <Link to={`/categories/${item.maDanhMuc}`}>
                          {item.tenDanhMuc}
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  <section className="courses" style={{ marginTop: "unset" }}>
                    <h1>
                      {categories?.map(
                        (item: CategoriesType, index: number) => {
                          if (item.maDanhMuc === categoryID)
                            return item.tenDanhMuc;
                        }
                      )}
                    </h1>
                    <div className="random_courses">
                      {coursesByCategory?.map(
                        (item: CourseType, index: number) => {
                          return <CardItem item={item} key={index} />;
                        }
                      )}
                    </div>
                  </section>
                </>
              )}
            </ul>
          </>
        </div>
      </section>
      {!categoryID && (
        <section className="courses">
          <h1>
            Khóa <mark>học</mark> tiêu biểu
          </h1>
          <div className="random_courses">
            {randomCoursesArr?.map((item: CourseType, index: number) => {
              return <CardItem item={item} key={index} />;
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
