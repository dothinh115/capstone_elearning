import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetailApi } from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";

type Props = {};

const Course = (props: Props) => {
  const { courseID } = useParams<{ courseID: string }>();
  const { courseDetail } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(getCourseDetailApi(courseID));
  }, [courseID]);
  return (
    <>
      <section className="course_detail">
        <div className="container">
          <div className="main_container">
            <div className="main_container_title">
              <span className="badge badge-red">
                <i className="fa-brands fa-hotjar"></i>-39%
              </span>
              <span className="badge badge-info">
                {courseDetail?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </span>
              <h1>{courseDetail?.tenKhoaHoc}</h1>
              <div className="main_container_title_author">
                <img
                  src="../../img/12693195.jpg"
                  onError={({ currentTarget }) => {
                    currentTarget.src = "../../img/Nodejs.png";
                  }}
                  alt=""
                />
                <span className="author">{courseDetail?.nguoiTao.hoTen}</span> |{" "}
                <span className="date"> {courseDetail?.ngayTao}</span>
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
              <p>{courseDetail?.moTa}</p>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_img">
              <img src={courseDetail?.hinhAnh} alt="" />
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
              <h1>Khóa học liên quan</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
