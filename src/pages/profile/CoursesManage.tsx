import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxRootType } from "../../redux/store";
import { CourseType } from "../../util/interface/courseReducerInterface";

type Props = {};

const CoursesManage = (props: Props) => {
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const [resultNumber, setResultNumber] = useState<number>(5);
  const searchValue = useRef<HTMLInputElement | null>(null);
  const [searchResult, setSearchResult] = useState<
    CourseType[] | null | undefined
  >(null);
  const searchSubmitHandle = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    let filterArr: CourseType[] | null | undefined = coursesArr;
    if (searchValue.current?.value.length !== 0) {
      filterArr = filterArr?.filter((item: CourseType) =>
        item.tenKhoaHoc
          .toLowerCase()
          .includes(searchValue.current!?.value.toLowerCase())
      );
    }
    setSearchResult(filterArr);
    console.log(searchResult);
  };

  useEffect(() => {
    setSearchResult(coursesArr);
  }, [coursesArr]);

  return (
    <>
      <div className="profile_container_main_block">
        <form
          className="profile_container_main_block_search"
          onSubmit={searchSubmitHandle}
        >
          <input ref={searchValue} type="text" placeholder="Tìm kiếm" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      <ul>
        {searchResult?.length === 0 ? (
          <>
            <div className="profile_container_main_block">
              {" "}
              Chưa có dữ liệu!
            </div>
          </>
        ) : (
          searchResult
            ?.slice(0, resultNumber)
            .map((course: CourseType, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/course/${course.maKhoaHoc}`}>
                    <img
                      src={course.hinhAnh}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src = "../../img/Nodejs.png";
                      }}
                    />
                    <div className="course_info">
                      <h3>{course.tenKhoaHoc}</h3>
                      <p>
                        {course.moTa?.length > 50
                          ? course.moTa.substring(0, 49) + "..."
                          : course.moTa}
                      </p>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i>
                        {course.ngayTao
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                      </p>
                    </div>
                  </Link>
                  <button>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })
        )}
        {searchResult?.length! > resultNumber && (
          <div className="profile_container_main_block">
            <button
              style={{ display: "block", width: "100%" }}
              className="btn btn-primary"
              onClick={(): void => {
                setResultNumber(resultNumber + 5);
              }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </ul>
    </>
  );
};

export default CoursesManage;
