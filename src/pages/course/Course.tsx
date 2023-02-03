import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import { getCourseDetailApi } from "../../redux/courseReducer/courseReducer";
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
  const { show, toggle } = useModal();

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
                  <button className="btn btn-primary" onClick={toggle}>
                    Xem chi tiết khóa học
                  </button>
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
            {window.innerWidth < 998 ? (
              <Modal show={show} toggle={toggle} title="Chi tiết khóa học">
                <div className="modal_sidebar">
                  <CourseSidebar />
                </div>
              </Modal>
            ) : (
              <CourseSidebar />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
