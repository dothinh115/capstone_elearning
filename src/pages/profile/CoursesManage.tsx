import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { history } from "../../App";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import {
  setCoursesManageScroll,
  setCoursesViewNumber,
} from "../../redux/profileReducer/profileReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { limitProfileCoursesViewMore } from "../../util/config";
import { CourseType } from "../../util/interface/courseReducerInterface";
import CourseEditForm from "./CourseEditForm";
import CreateNewCourseForm from "./CreateNewCourseForm";

type Props = {};

const CoursesManage = (props: Props) => {
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const [searchResult, setSearchResult] = useState<
    CourseType[] | null | undefined
  >(null);
  const dispatch: DispatchType = useDispatch();
  const { show, toggle } = useModal();
  const newCourseModal = useModal();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { coursesManageScroll, coursesViewNumber } = useSelector(
    (store: ReduxRootType) => store.profileReducer
  );
  const courseList = useRef<HTMLUListElement | null>(null);
  const { courseID } = useParams();

  const searchMethod = useForm<{ search: string }>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const searchHandle = (value: string | undefined | null): void => {
    let filterArr: CourseType[] | null | undefined = coursesArr;
    if (value) {
      filterArr = filterArr?.filter((item: CourseType) =>
        item.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSearchParams({
      ...(value && { keywords: value }),
    });
    setSearchResult(filterArr);
  };

  const searchSubmitHandle = (data: { search: string }) => {
    searchHandle(data.search);
  };

  useEffect(() => {
    if (coursesManageScroll)
      courseList.current?.scroll({
        top: coursesManageScroll,
        behavior: "smooth",
      });
  }, [searchResult]);

  useEffect(() => {
    const keywords = searchParams.get("keywords");
    if (keywords) {
      searchHandle(keywords);
      searchMethod.reset({
        search: keywords,
      });
    } else setSearchResult(coursesArr);
  }, [coursesArr, searchParams]);

  useEffect(() => {
    if (courseID) toggle();
  }, [courseID]);

  useEffect(() => {
    if (pathname === "/profile/courses_manage/create") newCourseModal.toggle();
  }, [pathname]);

  return (
    <div className="profile_main_info">
      <Modal
        title="Thêm khóa học mới"
        show={newCourseModal.show}
        toggle={newCourseModal.toggle}
      >
        <CreateNewCourseForm />
      </Modal>

      <Modal show={show} toggle={toggle} title="Thay đổi thông tin khóa học">
        <CourseEditForm />
      </Modal>

      <div className="profile_container_main_block">
        <button
          onClick={() => history.push("/profile/courses_manage/create")}
          className="btn"
        >
          Thêm khóa học mới
        </button>
      </div>
      <div
        className="profile_container_main_block"
        style={{ padding: "unset" }}
      >
        <form
          className="profile_main_info_search"
          onSubmit={searchMethod.handleSubmit(searchSubmitHandle)}
        >
          <input
            {...searchMethod.register("search")}
            type="text"
            placeholder="Tìm kiếm"
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      <ul ref={courseList}>
        {searchResult?.length === 0 ? (
          <>
            <div className="profile_container_main_block">
              {" "}
              Chưa có dữ liệu!
            </div>
          </>
        ) : (
          searchResult
            ?.slice(0, coursesViewNumber)
            .map((course: CourseType, index: number) => {
              return (
                <li key={index} id={course.maKhoaHoc}>
                  <Link
                    to={`/course/${course.maKhoaHoc}`}
                    onClick={() => {
                      dispatch(setCoursesManageScroll(index * 82));
                    }}
                  >
                    <img
                      src={course.hinhAnh}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src = "../../img/Nodejs.png";
                      }}
                    />
                    <div className="course_info">
                      <h3>
                        {window.innerWidth <= 600 &&
                          (course.tenKhoaHoc?.length > 22
                            ? course.tenKhoaHoc.substring(0, 21) + "..."
                            : course.tenKhoaHoc)}
                        {window.innerWidth > 600 &&
                          (course.tenKhoaHoc?.length > 30
                            ? course.tenKhoaHoc.substring(0, 29) + "..."
                            : course.tenKhoaHoc)}
                      </h3>
                      <p>
                        {window.innerWidth <= 600 &&
                          (course.moTa?.length > 28
                            ? course.moTa.substring(0, 27) + "..."
                            : course.moTa)}
                        {window.innerWidth > 600 &&
                          (course.moTa?.length > 50
                            ? course.moTa.substring(0, 49) + "..."
                            : course.moTa)}
                      </p>
                      <p>
                        <i className="fa-solid fa-user"></i>
                        {course.nguoiTao.hoTen}
                        {window.innerWidth > 600 && (
                          <>
                            | <i className="fa-solid fa-calendar-days"></i>
                            {course.ngayTao
                              .substring(0, 10)
                              .split("-")
                              .reverse()
                              .join("/")}
                          </>
                        )}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      history.push(`${pathname}/${course.maKhoaHoc}${search}`);
                    }}
                  >
                    <i className="fa-solid fa-gear"></i>
                  </button>
                </li>
              );
            })
        )}
        {searchResult?.length! > coursesViewNumber && (
          <div className="profile_container_main_block">
            <button
              style={{ display: "block", width: "100%" }}
              className="btn btn-primary"
              onClick={(): void => {
                dispatch(
                  setCoursesViewNumber(
                    coursesViewNumber + limitProfileCoursesViewMore
                  )
                );
              }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CoursesManage;
