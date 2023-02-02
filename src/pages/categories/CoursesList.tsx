import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
  const { pathname, search } = useLocation();
  const ghiDanhClickHandle = () => {
    if (!token) {
      history.push({ pathname: `/login?next=${pathname + search}` });
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
          <h3>
            {window.innerWidth <= 600 && (
              <>
                {item.tenKhoaHoc?.length > 20
                  ? item.tenKhoaHoc.substring(0, 19) + "..."
                  : item.tenKhoaHoc}
              </>
            )}

            {window.innerWidth > 600 && (
              <>
                {item.tenKhoaHoc?.length > 60
                  ? item.tenKhoaHoc.substring(0, 59) + "..."
                  : item.tenKhoaHoc}
              </>
            )}
          </h3>
          <></>
          <p>
            <i className="fa-solid fa-circle-info"></i>
            {window.innerWidth <= 600 && (
              <>
                {item.moTa?.length > 25
                  ? item.moTa.substring(0, 23) + "..."
                  : item.moTa}
              </>
            )}

            {window.innerWidth > 600 && (
              <>
                {item.moTa?.length > 60
                  ? item.moTa.substring(0, 59) + "..."
                  : item.moTa}
              </>
            )}
          </p>
          <p>
            <i className="fa-solid fa-user"></i>
            {item.nguoiTao.hoTen}
            {window.innerWidth > 600 && (
              <>
                " | " <i className="fa-solid fa-calendar-days"></i>
                {" " + item.ngayTao}
              </>
            )}
          </p>
        </div>
      </Link>
      <div>
        <button
          className={checkIfRegisterd() ? "cancel" : "register"}
          onClick={ghiDanhClickHandle}
        >
          {checkIfRegisterd() ? "Hủy" : "Đăng ký"}
        </button>
      </div>
    </li>
  );
};

export default CoursesList;
