import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getCoursesByCategoriesApi,
  setLimitCoursesAction,
} from "../../redux/categoriesReducer/categoriesReducer";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { limitCategoriesCourses } from "../../util/config";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";

type Props = {
  setChecked: any;
  checked: string[] | null;
  getCategoriesFromParams: any;
  toggle?: any;
};

const CategoriesSidebar = ({
  setChecked,
  checked,
  getCategoriesFromParams,
  toggle,
}: Props) => {
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
    setChecked(arr);
  };

  const checkCheked = (maDanhMuc: string): boolean => {
    const checkedList: string[] | null = getCategoriesFromParams();
    if (checkedList) {
      const find: string | undefined = checkedList.find(
        (item: string) => item === maDanhMuc
      );
      if (find) return true;
    }
    return false;
  };

  const sortSubmitHandle = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (checked !== null) {
      let params: string | undefined = checked?.join("+");
      setSearchParams({
        categories: params,
      });
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
                  defaultChecked={checkCheked(item.maDanhMuc)}
                />
                {item.tenDanhMuc}
              </li>
            );
          })}
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
