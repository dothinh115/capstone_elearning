import React from "react";
import { CourseType } from "../../util/config";

type Props = {
  item: CourseType;
};

const CardItem = ({ item }: Props): JSX.Element => {
  return (
    <>
      <div className="card">
        <div className="card-inner">
          <div className="card-inner-title">{item.tenKhoaHoc}</div>
          <div className="card-inner-img">
            <img
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "https://canhme.com/wp-content/uploads/2018/09/Nodejs.png";
              }}
              src={item.hinhAnh}
              alt="..." width={321} height={214}
            />
          </div>
          <div className="card-inner-body">
            <p>
              <i className="fa-solid fa-arrow-right"></i>
              {item.moTa.length > 27 ? item.moTa.substring(0,27)+ '...':item.moTa}
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
