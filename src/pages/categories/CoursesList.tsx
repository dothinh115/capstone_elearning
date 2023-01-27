import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { history } from "../../App";
import useToken from "../../hooks/useToken";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { ghiDanhApi } from "../../redux/userReducer/userReducer";
import {
  CourseType,
  RegisterdCoursesDetailType,
} from "../../util/interface/courseReducerInterface";
import { dataGhiDanh } from "../../util/interface/userReducerInterface";

type Props = {
  item: CourseType;
};

const CoursesList = ({ item }: Props) => {
  const { token } = useToken();
  const dispatch: DispatchType = useDispatch();
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const ghiDanhClickHandle = () => {
    if (!token) {
      history.push("/login");
      return;
    }
    const data: dataGhiDanh = {
      maKhoaHoc: item.maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(ghiDanhApi(!checkIfRegisterd(), data));
  };
  const checkIfRegisterd = (): boolean => {
    const find = userInfo?.chiTietKhoaHocGhiDanh?.find(
      (i: RegisterdCoursesDetailType) => i.maKhoaHoc === item.maKhoaHoc
    );
    if (find) return true;
    return false;
  };
  return (
    <ul>
      <li>
        <Link to={`/course/${item.maKhoaHoc}`}>
          <img
            src={`${item.hinhAnh}`}
            onError={({ currentTarget }) => {
              currentTarget.src = "../../img/Nodejs.png";
            }}
            alt=""
          />
          <div className="course_info">
            <h3>{item.tenKhoaHoc}</h3>
            <></>
            <p>
              <i className="fa-solid fa-circle-info"></i>
              {item.moTa?.length > 50
                ? item.moTa.substring(0, 49) + "..."
                : item.moTa}
            </p>
            <p>
              <i className="fa-solid fa-user"></i>
              {item.nguoiTao.hoTen}
            </p>
          </div>
        </Link>
        <div>
          <button>Sửa</button>
          <button
            className={checkIfRegisterd() ? "cancel" : "register"}
            onClick={ghiDanhClickHandle}
          >
            {checkIfRegisterd() ? "Hủy" : "Đăng ký"}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default CoursesList;
