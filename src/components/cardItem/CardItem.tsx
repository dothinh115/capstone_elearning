import React from "react";
import { Link } from "react-router-dom";
import { CourseType } from "../../util/config";

type Props = {
  item: CourseType;
};

const CardItem = ({ item }: Props) => {
  return (
    <div className="card_item">
      <div className="card_item_inner">
        <Link to={`/course/${item.maKhoaHoc}`}>
          <div className="img">
            <img
              src={item.hinhAnh}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.src = "../../img/Nodejs.png";
              }}
            />
          </div>
          <div className="body">
            <h3>
              <i className="fa-solid fa-arrow-right"></i>
              {item.tenKhoaHoc}
            </h3>
            <p>
              <i className="fa-solid fa-file-lines"></i>
              {item.moTa?.length > 100
                ? item.moTa.substring(0, 200) + "..."
                : item.moTa}
            </p>
          </div>
          <div className="footer">
            <p>
              <i className="fa-solid fa-user"></i>
              <>{item.nguoiTao?.hoTen}</>
            </p>
            <p>
              <i className="fa-solid fa-list"></i>
              {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
