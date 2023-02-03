import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setregisteredCoursesScroll,
  setRegisteredCoursesViewNumber,
} from "../../redux/profileReducer/profileReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { ghiDanhApi } from "../../redux/userReducer/userReducer";
import { limitProfileCoursesViewMore } from "../../util/config";
import { RegisterdCoursesDetailType } from "../../util/interface/courseReducerInterface";
import { dataGhiDanh } from "../../util/interface/userReducerInterface";

type Props = {};

const RegitsteredCourses = (props: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { registeredCoursesScroll, registeredCoursesViewNumber } = useSelector(
    (store: ReduxRootType) => store.profileReducer
  );
  const dispatch: DispatchType = useDispatch();
  const coursesList = useRef<HTMLUListElement | null>(null);

  const ghiDanhBtnHandle = (maKhoaHoc: string) => {
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(ghiDanhApi(false, data));
  };

  useEffect(() => {
    if (registeredCoursesScroll)
      coursesList.current?.scroll({
        top: registeredCoursesScroll,
      });
  }, [userInfo?.chiTietKhoaHocGhiDanh]);

  return (
    <div className="profile_main_info">
      <ul ref={coursesList}>
        {userInfo?.chiTietKhoaHocGhiDanh?.length === 0 ? (
          <div className="profile_container_main_block">
            {" "}
            Chưa ghi danh khóa học nào!
          </div>
        ) : (
          userInfo?.chiTietKhoaHocGhiDanh
            ?.slice(0, registeredCoursesViewNumber)
            .map((course: RegisterdCoursesDetailType, index: number) => {
              return (
                <li key={index}>
                  <Link
                    to={`/course/${course.maKhoaHoc}`}
                    onClick={(): void => {
                      dispatch(setregisteredCoursesScroll(index * 82));
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
                        <i className="fa-solid fa-calendar-days"></i>
                        {course.ngayTao
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                      </p>
                    </div>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => ghiDanhBtnHandle(course.maKhoaHoc)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })
        )}
        {userInfo?.chiTietKhoaHocGhiDanh?.length! >
          registeredCoursesViewNumber && (
          <div className="profile_container_main_block">
            <button
              style={{ display: "block", width: "100%" }}
              className="btn btn-primary"
              onClick={(): void => {
                dispatch(
                  setRegisteredCoursesViewNumber(
                    registeredCoursesViewNumber + limitProfileCoursesViewMore
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

export default RegitsteredCourses;
