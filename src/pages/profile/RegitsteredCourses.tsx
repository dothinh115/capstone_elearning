import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { ghiDanhApi } from "../../redux/userReducer/userReducer";
import { RegisterdCoursesDetailType } from "../../util/interface/courseReducerInterface";
import { dataGhiDanh } from "../../util/interface/userReducerInterface";

type Props = {};

const RegitsteredCourses = (props: Props) => {
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const dispatch: DispatchType = useDispatch();

  const huyGhiDanhBtnHandle = (maKhoaHoc: string) => {
    const data: dataGhiDanh = {
      maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(ghiDanhApi(false, data));
  };

  return (
    <ul>
      {userInfo?.chiTietKhoaHocGhiDanh?.length === 0 ? (
        <div className="profile_container_main_block">
          {" "}
          Chưa ghi danh khóa học nào!
        </div>
      ) : (
        userInfo?.chiTietKhoaHocGhiDanh?.map(
          (course: RegisterdCoursesDetailType, index: number) => {
            return (
              <li key={index}>
                <Link to={`/course/${course.maKhoaHoc}`}>
                  <img src={course.hinhAnh} alt="" />
                  <div className="course_info">
                    <h3>{course.tenKhoaHoc}</h3>
                    <p>
                      {course.moTa.length > 50
                        ? course.moTa.substring(0, 49) + "..."
                        : course.moTa.length}
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
                <button onClick={() => huyGhiDanhBtnHandle(course.maKhoaHoc)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            );
          }
        )
      )}
    </ul>
  );
};

export default RegitsteredCourses;
