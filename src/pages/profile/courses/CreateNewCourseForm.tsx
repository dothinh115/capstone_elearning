import React, { useEffect, useRef, useState } from "react";
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
  const [showImg, setShowImg] = useState<string | null>(null);
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

  const addNewSubmitHandle = async (data: UpdateCourseType) => {
    const payload: UpdateCourseType = {
      ...data,
      biDanh: toNonAccentVietnamese(data.tenKhoaHoc.trim()),
      maKhoaHoc: toNonAccentVietnamese(data.tenKhoaHoc.trim()),
      ngayTAO: getDate(),
      taiKhoanNguoiTAO: userInfo!.taiKhoan,
      hinhAnh: data.hinhAnh[0],
    };
    const formData: FormData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key as keyof UpdateCourseType]);
    }
    const result = dispatch(createNewCourse(formData));
    result.then((res: any) => {
      mKHoc.current = res!.maKhoaHoc;
    });
  };

  const nameToCode = (value: string): void =>
    setValue("maKhoaHoc", toNonAccentVietnamese(value.trim()));

  const fileChangeHandle = (event: React.SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      if (file && file.size > 1000000)
        setError("hinhAnh", {
          type: "custom",
          message: "Dung l?????ng v?????t qu?? 1Mb",
        });
      else clearErrors("hinhAnh");

      //hi???n h??nh
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const img = fileReader?.result as string;
        setShowImg(img);
      };
    } else setShowImg(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const html = (
    <form onSubmit={handleSubmit(addNewSubmitHandle)}>
      {showImg && (
        <div
          className="profile_main_info_item"
          style={{ position: "relative" }}
        >
          <button
            className="btn btn-danger"
            style={{
              position: "absolute",
              height: "35px",
              width: "50px",
              margin: "unset",
              padding: "unset",
              top: "15px",
              right: "15px",
            }}
            onClick={() => {
              setShowImg(null);
              setValue("hinhAnh", "");
            }}
          >
            X??a
          </button>
          <img
            src={showImg}
            onError={({ currentTarget }) => {
              currentTarget.src = "../../img/Nodejs.png";
            }}
            alt=""
          />
        </div>
      )}

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
                    required: "Kh??ng ???????c ????? tr???ng!",
                  })}
                  onChange={(event) => fileChangeHandle(event)}
                />
              ) : item === "maDanhMucKhoaHoc" ? (
                <select
                  {...register(item, {
                    required: "Kh??ng ???????c ????? tr???ng!",
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
                    required: "Kh??ng ???????c ????? tr???ng!",
                  })}
                />
              ) : (
                <input
                  type="text"
                  {...register(item as keyof UpdateCourseType, {
                    ...(item !== "maKhoaHoc" && {
                      required: "Kh??ng ???????c ????? tr???ng!",
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
                      ? "???????c l???y t??? ?????ng!"
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
                <>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors[item as keyof UpdateCourseType]?.message}
                </>
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
            Th??m m???i
          </button>
        </div>
      </div>
    </form>
  );

  if (successMessage)
    return (
      <Modal show={true} toggle={toggle} title="Th??m kh??a h???c m???i th??nh c??ng">
        <span>
          <p className="btn btn-info">T???o kh??a h???c m???i th??nh c??ng</p>
          <button
            style={{ display: "block", width: "100%", marginTop: "10px" }}
            className="btn btn-success"
            onClick={() => {
              history.push(`/course/${mKHoc.current}`);
            }}
          >
            Xem kh??a h???c
          </button>
        </span>
      </Modal>
    );

  return (
    <Modal show={true} toggle={toggle} title="Th??m kh??a h???c m???i">
      {html}
    </Modal>
  );
};

export default CreateNewCourseForm;
