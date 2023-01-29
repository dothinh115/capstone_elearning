import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import { ReduxRootType } from "../../redux/store";
import {
  CourseType,
  UpdateCourseType,
} from "../../util/interface/courseReducerInterface";

type Props = {};

const CoursesManage = (props: Props) => {
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const [resultNumber, setResultNumber] = useState<number>(10);
  const searchValue = useRef<HTMLInputElement | null>(null);
  const [searchResult, setSearchResult] = useState<
    CourseType[] | null | undefined
  >(null);
  const { show, toggle } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCourseType>({
    mode: "onChange",
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTAO: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTAO: "",
    },
  });
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
  };

  useEffect(() => {
    setSearchResult(coursesArr);
  }, [coursesArr]);

  return (
    <>
      <Modal show={show} toggle={toggle} title="Thay đổi thông tin khóa học">
        <>
          <div className="modal_body_item">
            <div className="modal_body_item_title">Mã khóa học</div>
            <div className="modal_body_item_input">
              <input
                disabled
                type="text"
                {...register("maKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
          </div>

          <div className="modal_body_item">
            <div className="modal_body_item_title">Tên khóa học</div>
            <div className="modal_body_item_input">
              <input
                disabled
                type="text"
                {...register("tenKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.tenKhoaHoc?.message && (
              <div className="modal_body_item_title">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.tenKhoaHoc?.message}
              </div>
            )}
          </div>

          <div className="modal_body_item">
            <div className="modal_body_item_title">Danh mục</div>
            <div className="modal_body_item_input">
              <input
                disabled
                type="text"
                {...register("maDanhMucKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.maDanhMucKhoaHoc?.message && (
              <div className="modal_body_item_title">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.maDanhMucKhoaHoc?.message}
              </div>
            )}
          </div>

          <div className="modal_body_item">
            <div className="modal_body_item_title">Danh mục</div>
            <div className="modal_body_item_input">
              <textarea
                disabled
                {...register("moTa", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.tenKhoaHoc?.message && (
              <div className="modal_body_item_title">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.moTa?.message}
              </div>
            )}
          </div>
        </>
      </Modal>
      <div className="profile_container_main_block">
        <button className="btn">Thêm khóa học mới</button>
      </div>
      <div
        className="profile_container_main_block"
        style={{ padding: "unset" }}
      >
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
                      <h3>
                        {course.tenKhoaHoc?.length > 30
                          ? course.tenKhoaHoc.substring(0, 29) + "..."
                          : course.tenKhoaHoc}
                      </h3>
                      <p>
                        {course.moTa?.length > 40
                          ? course.moTa.substring(0, 39) + "..."
                          : course.moTa}
                      </p>
                      <p>
                        <i className="fa-solid fa-user"></i>
                        {course.nguoiTao.hoTen + " | "}
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
                    onClick={() => {
                      const obj = {
                        maKhoaHoc: course.maKhoaHoc,
                        biDanh: course.biDanh,
                        tenKhoaHoc: course.tenKhoaHoc,
                        moTa: course.moTa,
                        luotXem: course.luotXem,
                        danhGia: 5,
                        hinhAnh: course.hinhAnh,
                        maNhom: course.maNhom,
                        ngayTAO: course.ngayTao,
                        maDanhMucKhoaHoc:
                          course.danhMucKhoaHoc.maDanhMucKhoahoc,
                        taiKhoanNguoiTAO: course.nguoiTao.taiKhoan,
                      };
                      reset(obj);
                      toggle();
                    }}
                  >
                    <i className="fa-solid fa-gear"></i>
                  </button>
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
