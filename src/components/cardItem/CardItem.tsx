import React from "react";
import { courseType } from "../../util/config";

type Props = {
  item: courseType;
};

const CardItem = ({ item }: Props): JSX.Element => {
  return (
    <>
      <div className="card">
        <div className="card-inner">
          <div className="card-inner-title">{item.tenKhoaHoc}</div>
          <div className="card-inner-img">
            <img src={item.hinhAnh} alt="" />
          </div>
          <div className="card-inner-body">
            <p>
              <i className="fa-solid fa-arrow-right"></i>
              {item.moTa}
            </p>
            <p>
              <i className="fa-solid fa-list"></i> Danh mục:{" "}
              {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </p>
            <p>
              <i className="fa-solid fa-calendar-days"></i> Ngày tạo:{" "}
              {item.ngayTao}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
