import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useOutlet, useParams } from "react-router-dom";

import {
  getCourseDetailAction,
  getCourseDetailApi,
} from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { numberRelatedCourses } from "../../util/config";
import { CourseType } from "../../util/interface/courseReducerInterface";
import CourseSidebar from "./CourseSidebar";

type Props = {};

const Course = (props: Props) => {
  const { courseID } = useParams<{ courseID: string }>();
  const { courseDetail, coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const dispatch: DispatchType = useDispatch();
  const outlet = useOutlet();
  useEffect(() => {
    dispatch(getCourseDetailApi(courseID));
  }, [courseID]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [courseDetail]);

  useEffect(() => {
    return () => {
      dispatch(getCourseDetailAction(null));
    };
  }, []);
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
                <span>
                  <i className="fa-solid fa-star"></i>
                  <span className="rating">
                    <span>4.38</span>
                    /5
                  </span>
                  |
                  <span className="viewed">
                    Lượt xem: {courseDetail?.luotXem}
                  </span>
                </span>
                {window.innerWidth <= 998 && (
                  <>
                    <Link
                      className="btn btn-primary"
                      to={`/course/${courseDetail?.maKhoaHoc}/viewinfo`}
                      state={{ inside: true }}
                    >
                      Xem chi tiết khóa học
                    </Link>
                    <Link
                      state={{ inside: true }}
                      to={`/profile/courses_manage/${courseDetail?.maKhoaHoc}`}
                      className="btn btn-info"
                    >
                      Chỉnh sửa khóa học này
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="main_container_info">
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
            {window.innerWidth > 820 && !outlet && <CourseSidebar />}
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
