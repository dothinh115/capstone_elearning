import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getCoursesByCategoriesApi,
  setLimitCoursesAction,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { limitCategoriesCourses } from "../../util/config";
import { xoaTrungLap } from "../../util/function";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";

type Props = {
  setChecked: any;
  checked: string[] | null;
  toggle?: any;
};

const CategoriesSidebar = ({ setChecked, checked, toggle }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: DispatchType = useDispatch();
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );

  const checkboxHandle = (e: { target: HTMLInputElement }) => {
    let arr: string[] | null = [];
    if (checked !== null) arr = [...checked];
    if (e.target.checked) {
      arr = [...arr, e.target.value];
    } else {
      const index: number = arr.findIndex(
        (item: string) => item === e.target.value
      );
      if (index !== -1) arr.splice(index, 1);
    }
    if (arr.length === 0) arr = null;
    else arr = xoaTrungLap(arr);
    setChecked(arr);
  };

  const checkCheked = (maDanhMuc: string): boolean => {
    if (checked) {
      const find: string | undefined = checked.find(
        (item: string) => item === maDanhMuc
      );
      if (find) return true;
    }
    return false;
  };

  const checkAllHandle = (e: { target: HTMLInputElement }) => {
    if (e.target.checked && categories) {
      let arr: string[] = [];
      for (let value of categories) {
        arr = [...arr, value.maDanhMuc];
      }
      setChecked(arr);
    } else setChecked(null);
  };

  const checkCheckedAll = (): boolean => {
    if (!checked) return false;

    if (categories) {
      for (let value of categories) {
        const find = checked.find((item: string) => item === value.maDanhMuc);
        if (!find) return false;
      }
    }
    return true;
  };

  const sortSubmitHandle = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (checked !== null) {
      let params: string | undefined = checked?.join("+");
      searchParams.set("categories", params);
      setSearchParams(searchParams);
      window.scrollTo(0, 0);
    } else {
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
    dispatch(getCoursesByCategoriesApi(checked));
    dispatch(setLimitCoursesAction(limitCategoriesCourses));
    toggle();
  };

  return (
    <>
      <div className="categories_container_sidebar_inner_header">
        <h1>
          <i className="fa-solid fa-list"></i>Bộ lọc
        </h1>
      </div>
      <div className="categories_container_sidebar_inner_body">
        <h1>Tất cả danh mục</h1>
        <ul>
          {categories?.map((item: CategoriesType, index: number) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  value={item.maDanhMuc}
                  onChange={checkboxHandle}
                  checked={checkCheked(item.maDanhMuc)}
                />
                {item.tenDanhMuc}
              </li>
            );
          })}
          <li style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
            <input
              type="checkbox"
              onChange={checkAllHandle}
              checked={checkCheckedAll()}
            />
            Chọn hết
          </li>
        </ul>
        <div className="categories_container_sidebar_inner_body_btn">
          <button className="btn btn-primary" onClick={sortSubmitHandle}>
            <i className="fa-solid fa-filter"></i>Lọc
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoriesSidebar;
