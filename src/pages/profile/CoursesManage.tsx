import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import {
  courseUpdateApi,
  createNewCourse,
} from "../../redux/courseReducer/courseReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { toNonAccentVietnamese } from "../../util/function";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import {
  CourseType,
  UpdateCourseType,
} from "../../util/interface/courseReducerInterface";

type Props = {};

const CoursesManage = (props: Props) => {
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { state } = useLocation();
  const [resultNumber, setResultNumber] = useState<number>(10);
  const searchValue = useRef<HTMLInputElement | null>(null);
  const [searchResult, setSearchResult] = useState<
    CourseType[] | null | undefined
  >(null);
  const dispatch: DispatchType = useDispatch();
  const { show, toggle } = useModal();
  const newCourseModal = useModal();
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

  const search = (): void => {
    let filterArr: CourseType[] | null | undefined = coursesArr;
    if (searchValue.current?.value !== null) {
      filterArr = filterArr?.filter((item: CourseType) =>
        item.tenKhoaHoc
          .toLowerCase()
          .includes(searchValue.current!?.value.toLowerCase())
      );
    }
    setSearchResult(filterArr);
  };

  const searchSubmitHandle = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    search();
  };

  const editSubmitHandle = (data: UpdateCourseType): void => {
    dispatch(courseUpdateApi(data));
  };

  const addNewSubmitHandle = (data: UpdateCourseType): void => {
    const biDanh = toNonAccentVietnamese(data.tenKhoaHoc); //Đỗ Thịnh => do-thinh
    const date = new Date();
    const newDate = `${date.getDay()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    data = {
      ...data,
      biDanh,
      ngayTAO: newDate,
      hinhAnh:
        "https://images.pexels.com/photos/127160/pexels-photo-127160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    };
    dispatch(createNewCourse(data));
  };

  useEffect(() => {
    if (searchValue.current?.value !== null) {
      search();
    } else {
      setSearchResult(coursesArr);
    }
  }, [coursesArr]);

  return (
    <>
      <Modal
        title="Thêm khóa học mới"
        show={newCourseModal.show}
        toggle={newCourseModal.toggle}
      >
        <form onSubmit={handleSubmit(addNewSubmitHandle)}>
          <div className="modal_body_item">
            <div className="modal_body_item_title">
              {" "}
              <i className="fa-solid fa-sliders"></i>Mã khóa học
            </div>
            <div className="modal_body_item_input">
              <input
                type="text"
                {...register("maKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.maKhoaHoc?.message && (
              <div className="modal_body_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.maKhoaHoc?.message}
              </div>
            )}
          </div>
          <div className="modal_body_item">
            <div className="modal_body_item_title">
              <i className="fa-solid fa-tag"></i>Tên khóa học
            </div>
            <div className="modal_body_item_input">
              <input
                type="text"
                {...register("tenKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.tenKhoaHoc?.message && (
              <div className="modal_body_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.tenKhoaHoc?.message}
              </div>
            )}
          </div>
          <div className="modal_body_item">
            <div className="modal_body_item_title">
              <i className="fa-solid fa-bars"></i>Danh mục
            </div>
            <div className="modal_body_item_input">
              <select
                {...register("maDanhMucKhoaHoc", {
                  required: "Không được để trống!",
                })}
              >
                {categories?.map((item: CategoriesType, index: number) => {
                  return (
                    <option value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="modal_body_item">
            <div className="modal_body_item_title">Mô tả</div>
            <div className="modal_body_item_input">
              <textarea
                {...register("moTa", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.moTa?.message && (
              <div className="modal_body_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.moTa?.message}
              </div>
            )}
          </div>
          <div className="modal_body_item">
            <div className="modal_body_item_button">
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal show={show} toggle={toggle} title="Thay đổi thông tin khóa học">
        <form onSubmit={handleSubmit(editSubmitHandle)}>
          <div className="modal_body_item">
            <div className="modal_body_item_title">
              {" "}
              <i className="fa-solid fa-sliders"></i>Mã khóa học
            </div>
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
            <div className="modal_body_item_title">
              <i className="fa-solid fa-tag"></i>Tên khóa học
            </div>
            <div className="modal_body_item_input">
              <input
                type="text"
                {...register("tenKhoaHoc", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.tenKhoaHoc?.message && (
              <div className="modal_body_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.tenKhoaHoc?.message}
              </div>
            )}
          </div>

          <div className="modal_body_item">
            <div className="modal_body_item_title">
              <i className="fa-solid fa-bars"></i>Danh mục
            </div>
            <div className="modal_body_item_input">
              <select
                {...register("maDanhMucKhoaHoc", {
                  required: "Không được để trống!",
                })}
              >
                {categories?.map((item: CategoriesType, index: number) => {
                  return (
                    <option value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="modal_body_item">
            <div className="modal_body_item_title">Mô tả</div>
            <div className="modal_body_item_input">
              <textarea
                {...register("moTa", {
                  required: "Không được để trống!",
                })}
              />
            </div>
            {errors.moTa?.message && (
              <div className="modal_body_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors.moTa?.message}
              </div>
            )}
          </div>

          {state && (
            <div className="modal_body_item_result">
              <span
                className={`btn ${
                  (state.successMess && "btn-success") ||
                  (state.errorMess && "btn-danger")
                }`}
              >
                {state.successMess} {state.errorMess}
              </span>
            </div>
          )}

          <div className="modal_body_item">
            <div className="modal_body_item_button">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="profile_container_main_block">
        <button
          onClick={() => {
            newCourseModal.toggle();
            reset({
              taiKhoanNguoiTAO: userInfo?.taiKhoan,
              danhGia: 0,
              luotXem: 0,
            });
          }}
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
