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
        <div className="img">
          <Link to={`/course/${item.maKhoaHoc}`}>
            <img
              src={item.hinhAnh}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.src = "../../img/Nodejs.png";
              }}
            />
          </Link>
        </div>
        <div className="body">
          <Link to={`/course/${item.maKhoaHoc}`}>
            <h3>
              <i className="fa-solid fa-arrow-right"></i>
              {item.tenKhoaHoc}
            </h3>
          </Link>

          <p>
            <i className="fa-solid fa-file-lines"></i>
            {item.moTa?.length > 100
              ? item.moTa.substr(0, 50) + "..."
              : "Lập trình hiện đang là xu hướng trên toàn thế giới..."}
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
      </div>
    </div>
  );
};

export default CardItem;
