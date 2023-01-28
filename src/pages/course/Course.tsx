import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseDetailApi } from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { ghiDanhApi } from "../../redux/userReducer/userReducer";
import { numberRelatedCourses } from "../../util/config";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import {
  CourseType,
  RegisterdCoursesDetailType,
} from "../../util/interface/courseReducerInterface";
import { dataGhiDanh } from "../../util/interface/userReducerInterface";

type Props = {};

const Course = (props: Props) => {
  const { courseID } = useParams<{ courseID: string }>();
  const { courseDetail, coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const dispatch: DispatchType = useDispatch();

  const findIfRegisted = (): boolean => {
    const find = userInfo?.chiTietKhoaHocGhiDanh?.find(
      (item: RegisterdCoursesDetailType) =>
        item.maKhoaHoc === courseDetail?.maKhoaHoc
    );
    if (find) return true;
    return false;
  };

  const ghidanhHandle = (): void => {
    const data: dataGhiDanh = {
      maKhoaHoc: courseDetail?.maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(ghiDanhApi(!findIfRegisted(), data));
  };

  useEffect(() => {
    dispatch(getCourseDetailApi(courseID));
  }, [courseID]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [courseDetail]);
  return (
    <>
      <section className="course_detail">
        <div className="course_detail_container">
          <div className="main_container">
            <div className="main_container_title">
              <span className="badge badge-danger">
                <i className="fa-brands fa-hotjar"></i>-{courseDetail?.discount}
                %
              </span>
              <span className="badge badge-info">
                {courseDetail?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </span>
              <h1>{courseDetail?.tenKhoaHoc}</h1>
              <div className="main_container_title_author">
                <img src="../../img/12693195.jpg" alt="" />
                <span className="author">
                  {courseDetail?.nguoiTao.hoTen}
                </span> | <span className="date"> {courseDetail?.ngayTao}</span>
              </div>
              <div className="main_container_title_info">
                <i className="fa-solid fa-star"></i>
                <span className="rating">
                  <span>4.38</span>
                  /5
                </span>
                |
                <span className="viewed">
                  Lượt xem: {courseDetail?.luotXem}
                </span>
              </div>
            </div>
            <div className="main_container_info">
              <div className="main_container_info_btn">
                <button
                  className={`btn btn-${
                    findIfRegisted() ? "danger" : "primary"
                  }`}
                  onClick={ghidanhHandle}
                >
                  {findIfRegisted() ? (
                    <>
                      <i className="fa-solid fa-x"></i>Hủy ghi danh
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping"></i>Ghi danh khóa
                      học này
                    </>
                  )}
                </button>
              </div>
              <p>{courseDetail?.moTa}</p>
            </div>
            <div className="main_container_related">
              <h1>
                KHÓA <mark>HỌC</mark> LIÊN QUAN
              </h1>
              <ul>
                {coursesArr
                  ?.filter(
                    (child: CourseType) =>
                      child.danhMucKhoaHoc.maDanhMucKhoahoc ===
                      courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc
                  )
                  .slice(0, numberRelatedCourses)
                  .map((item: CourseType, index: number) => {
                    if (item.maKhoaHoc === courseID) return false;
                    return (
                      <li key={index}>
                        <Link to={`/course/${item.maKhoaHoc}`}>
                          {item.tenKhoaHoc}
                        </Link>
                      </li>
                    );
                  })}
                <li style={{ textAlign: "right" }}>
                  <Link
                    key="abc"
                    to={`/categories?categories=${courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc}`}
                    style={{ width: "unset" }}
                  >
                    <span
                      className="badge badge-primary"
                      style={{ borderRadius: "5px" }}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                      Xem tất cả
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_img">
              <img
                src={courseDetail?.hinhAnh}
                onError={({ currentTarget }) => {
                  currentTarget.src = "../../img/Nodejs.png";
                }}
                alt=""
              />
            </div>
            <div className="sidebar_info">
              <p>
                <span>
                  <i className="fa-solid fa-sliders"></i>
                  Mã khóa học:{" "}
                </span>
                <span>{courseDetail?.maKhoaHoc}</span>
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-tag"></i>
                  Bí danh:{" "}
                </span>
                <span>{courseDetail?.biDanh}</span>
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-user-graduate"></i>
                  Học viên:{" "}
                </span>
                <span>{courseDetail?.soLuongHocVien}</span>
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-clock"></i>
                  Thời gian:{" "}
                </span>
                <span>6 tháng</span>
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-code"></i>
                  Trình độ:{" "}
                </span>
                <span>Người vừa mới bắt đầu</span>
              </p>
            </div>
            <div className="sidebar_footer">
              <h1>Tài liệu kèm theo</h1>
              <p>
                <i className="fa-solid fa-check"></i>
                Video
              </p>
              <p>
                <i className="fa-solid fa-check"></i>
                Booklets
              </p>
              <h1>Danh mục khóa học</h1>
              <ul>
                {categories?.map((item: CategoriesType, index: number) => {
                  return (
                    <li key={index}>
                      <Link
                        to={`/categories?categories=${item.maDanhMuc}`}
                        className={
                          item.maDanhMuc ===
                          courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc
                            ? "active"
                            : ""
                        }
                      >
                        {item.tenDanhMuc}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
