import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { history } from "../../App";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import { createNewCourse } from "../../redux/courseReducer/courseReducer";
import {
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { API } from "../../util/config";
import { toNonAccentVietnamese } from "../../util/function";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { UpdateCourseType } from "../../util/interface/courseReducerInterface";

type Props = {};

const CreateNewCourseForm = (props: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { successMessage, errorMessage } = useSelector(
    (store: ReduxRootType) => store.pageReducer
  );
  const mKHoc = useRef<string | null>(null);

  const { toggle } = useModal();
  const dispatch: DispatchType = useDispatch();
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
      maDanhMucKhoaHoc: "BackEnd",
      taiKhoanNguoiTAO: "",
    },
  });

  const addNewSubmitHandle = async (data: UpdateCourseType) => {
    const biDanh = toNonAccentVietnamese(data.tenKhoaHoc);
    const date = new Date();
    const newDate = `${date.getDay()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    data = {
      ...data,
      biDanh,
      ngayTAO: newDate,
      luotXem: 0,
      danhGia: 0,
      maNhom: "GP01",
      taiKhoanNguoiTAO: userInfo!.taiKhoan,
    };
    dispatch(createNewCourse(data));
  };

  const nameToCode = (event: { target: HTMLInputElement }): void => {
    reset({
      maKhoaHoc: toNonAccentVietnamese(event.target.value),
    });
    mKHoc.current = toNonAccentVietnamese(event.target.value);
  };

  useEffect(() => {
    reset({
      taiKhoanNguoiTAO: userInfo?.taiKhoan,
      danhGia: 0,
      luotXem: 0,
    });
    return () => {
      dispatch(updateSuccessMessageReducer(null));
      dispatch(updateErrorMessageReducer(null));
    };
  }, []);

  const html = (
    <form onSubmit={handleSubmit(addNewSubmitHandle)}>
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">
          <i className="fa-solid fa-tag"></i>Tên khóa học
        </div>
        <div className="profile_main_info_item_input">
          <input
            type="text"
            {...register("tenKhoaHoc", {
              required: "Không được để trống!",
            })}
            onChange={nameToCode}
            placeholder="Tên khóa học"
          />
        </div>
        {errors.tenKhoaHoc?.message && (
          <div className="profile_main_info_item_error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {errors.tenKhoaHoc?.message}
          </div>
        )}
      </div>
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">
          <i className="fa-solid fa-bars"></i>Danh mục
        </div>
        <div className="profile_main_info_item_input">
          <select
            {...register("maDanhMucKhoaHoc", {
              required: "Không được để trống!",
            })}
          >
            {categories?.map((item: CategoriesType, index: number) => {
              return (
                <option key={index} value={item.maDanhMuc}>
                  {item.tenDanhMuc}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">
          <i className="fa-solid fa-image"></i>Hình ảnh
        </div>
        <div className="profile_main_info_item_input">
          <input
            type="file"
            {...register("hinhAnh", {
              required: "Không được để trống!",
            })}
            placeholder="Link hình ảnh"
          />
        </div>
        {errors.hinhAnh?.message && (
          <div className="profile_main_info_item_error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {errors.hinhAnh?.message}
          </div>
        )}
      </div>
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">Mô tả</div>
        <div className="profile_main_info_item_input">
          <textarea
            {...register("moTa", {
              required: "Không được để trống!",
            })}
            placeholder="Mô tả khóa học"
          />
        </div>
        {errors.moTa?.message && (
          <div className="profile_main_info_item_error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {errors.moTa?.message}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="profile_main_info_item_result">
          <span className="btn btn-danger">{errorMessage}</span>
        </div>
      )}
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_button">
          <button type="submit" className="btn btn-primary">
            Thêm mới
          </button>
        </div>
      </div>
    </form>
  );

  if (successMessage)
    return (
      <Modal show={true} toggle={toggle} title="Thêm khóa học mới thành công">
        <span>
          <p className="btn btn-info">Tạo khóa học mới thành công</p>
          <button
            style={{ display: "block", width: "100%", marginTop: "10px" }}
            className="btn btn-success"
            onClick={() => {
              history.push(`/course/${mKHoc.current}`);
            }}
          >
            Xem khóa học
          </button>
        </span>
      </Modal>
    );

  return (
    <Modal show={true} toggle={toggle} title="Thêm khóa học mới">
      {html}
    </Modal>
  );
};

export default CreateNewCourseForm;
