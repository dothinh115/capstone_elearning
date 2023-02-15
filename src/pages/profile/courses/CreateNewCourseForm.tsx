import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import { createNewCourse } from "../../../redux/courseReducer/courseReducer";
import {
  updateErrorMessageReducer,
  updateSuccessMessageReducer,
} from "../../../redux/pageReducer/pageReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import { createNewCourseConfig } from "../../../util/config";
import { getDate, toNonAccentVietnamese } from "../../../util/function";
import { CategoriesType } from "../../../util/interface/categoriesReducerInterface";
import {
  CreateNewCourseType,
  UpdateCourseType,
} from "../../../util/interface/courseReducerInterface";

type Props = {};

const newCourse: UpdateCourseType = {
  maKhoaHoc: "",
  biDanh: "",
  tenKhoaHoc: "",
  moTa: "",
  luotXem: 0,
  danhGia: 0,
  hinhAnh: "",
  maNhom: "GP01",
  ngayTAO: "",
  maDanhMucKhoaHoc: "BackEnd",
  taiKhoanNguoiTAO: "",
};

const keysExcepted: string[] = [
  "biDanh",
  "luotXem",
  "danhGia",
  "maNhom",
  "ngayTAO",
  "taiKhoanNguoiTAO",
];

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
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateCourseType>({
    mode: "onChange",
    defaultValues: newCourse,
  });

  const addNewSubmitHandle = async (data: any) => {
    const biDanh = toNonAccentVietnamese(data.tenKhoaHoc);

    const payload = {
      ...data,
      biDanh,
      maKhoaHoc: toNonAccentVietnamese(data.tenKhoaHoc.trim()),
      ngayTAO: getDate(),
      taiKhoanNguoiTAO: userInfo!.taiKhoan,
      hinhAnh: data.hinhAnh[0],
    };
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    const result = dispatch(createNewCourse(formData));
    result.then((res: any) => {
      mKHoc.current = res!.maKhoaHoc;
    });
  };

  const nameToCode = (value: string): void =>
    setValue("maKhoaHoc", toNonAccentVietnamese(value.trim()));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const html = (
    <form onSubmit={handleSubmit(addNewSubmitHandle)}>
      {Object.keys(newCourse).map((item: string): JSX.Element | null => {
        for (let value of keysExcepted) {
          if (item === value) return null;
        }
        return (
          <div className="profile_main_info_item" key={item}>
            <div className="profile_main_info_item_title">
              <i
                className={`fa-solid fa-${
                  createNewCourseConfig.icon[
                    createNewCourseConfig.keys.indexOf(
                      item as keyof CreateNewCourseType
                    )
                  ]
                }`}
              ></i>
              {
                createNewCourseConfig.title[
                  createNewCourseConfig.keys.indexOf(
                    item as keyof CreateNewCourseType
                  )
                ]
              }
              :
            </div>
            <div className="profile_main_info_item_input">
              {item === "hinhAnh" ? (
                <input
                  type="file"
                  {...register(item, {
                    required: "Không được để trống!",
                  })}
                  placeholder="Link hình ảnh"
                  onChange={({ currentTarget }) => {
                    const file = currentTarget.files![0];
                    if (file && file.size > 1000000)
                      setError("hinhAnh", {
                        message: "Dung lượng vượt quá 1Mb",
                      });
                    else clearErrors("hinhAnh");
                  }}
                />
              ) : item === "maDanhMucKhoaHoc" ? (
                <select
                  {...register(item, {
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
              ) : item === "moTa" ? (
                <textarea
                  className={`${
                    errors[item as keyof UpdateCourseType]?.message
                      ? "isInvalid"
                      : ""
                  }`}
                  {...register(item, {
                    required: "Không được để trống!",
                  })}
                />
              ) : (
                <input
                  type="text"
                  {...register(item as keyof UpdateCourseType, {
                    ...(item !== "maKhoaHoc" && {
                      required: "Không được để trống!",
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                        nameToCode(event.target.value),
                    }),
                  })}
                  className={`${
                    errors[item as keyof UpdateCourseType]?.message
                      ? "isInvalid"
                      : ""
                  }`}
                  disabled={item === "maKhoaHoc" ? true : false}
                  placeholder={
                    item === "maKhoaHoc"
                      ? "Được lấy tự động!"
                      : createNewCourseConfig.title[
                          createNewCourseConfig.keys.indexOf(
                            item as keyof CreateNewCourseType
                          )
                        ]
                  }
                />
              )}
            </div>
            {errors[item as keyof UpdateCourseType]?.message && (
              <div className="profile_main_info_item_error">
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors[item as keyof UpdateCourseType]?.message}
              </div>
            )}
          </div>
        );
      })}

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
