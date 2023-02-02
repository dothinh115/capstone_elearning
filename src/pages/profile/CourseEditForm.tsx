import React from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ReduxRootType } from "../../redux/store";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { UpdateCourseType } from "../../util/interface/courseReducerInterface";

type Props = {
  handleSubmit: UseFormHandleSubmit<UpdateCourseType>;
  editSubmitHandle: any;
  register: UseFormRegister<UpdateCourseType>;
  errors: any;
};

const CourseEditForm = ({
  handleSubmit,
  editSubmitHandle,
  register,
  errors,
}: Props) => {
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { state } = useLocation();

  return (
    <form onSubmit={handleSubmit(editSubmitHandle)}>
      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">
          {" "}
          <i className="fa-solid fa-sliders"></i>Mã khóa học
        </div>
        <div className="profile_main_info_item_input">
          <input
            disabled
            type="text"
            {...register("maKhoaHoc", {
              required: "Không được để trống!",
            })}
          />
        </div>
      </div>

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
              return <option value={item.maDanhMuc}>{item.tenDanhMuc}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="profile_main_info_item">
        <div className="profile_main_info_item_title">Mô tả</div>
        <div className="profile_main_info_item_input">
          <textarea
            {...register("moTa", {
              required: "Không được để trống!",
            })}
          />
        </div>
        {errors.moTa?.message && (
          <div className="profile_main_info_item_error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {errors.moTa?.message}
          </div>
        )}
      </div>

      {state && (
        <div className="profile_main_info_item_result">
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

      <div className="profile_main_info_item">
        <div className="profile_main_info_item_button">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseEditForm;
