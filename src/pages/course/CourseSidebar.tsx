import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { history } from "../../App";
import useToken from "../../hooks/useToken";
import { DispatchType, ReduxRootType } from "../../redux/store";
import { dangKyApi } from "../../redux/userReducer/userReducer";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { RegisterdCoursesDetailType } from "../../util/interface/courseReducerInterface";
import { dataGhiDanh } from "../../util/interface/userReducerInterface";

type Props = {};

const CourseSidebar = (props: Props) => {
  const { courseDetail } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const { loading } = useSelector((store: ReduxRootType) => store.userReducer);
  const { userInfo } = useSelector((store: ReduxRootType) => store.userReducer);
  const { pathname } = useLocation();
  const { token } = useToken();
  const dispatch: DispatchType = useDispatch();

  const ghidanhHandle = (): void => {
    if (!token) {
      history.push(`/login?next=${pathname}`);
      return;
    }
    const data: dataGhiDanh = {
      maKhoaHoc: courseDetail?.maKhoaHoc,
      taiKhoan: userInfo?.taiKhoan,
    };
    dispatch(dangKyApi(!findIfRegisted(), data));
  };

  const findIfRegisted = (): boolean => {
    const find = userInfo?.chiTietKhoaHocGhiDanh?.find(
      (item: RegisterdCoursesDetailType) =>
        item.maKhoaHoc === courseDetail?.maKhoaHoc
    );
    if (find) return true;
    return false;
  };
  return (
    <>
      <div className="sidebar_img">
        <img
          src={courseDetail?.hinhAnh}
          onError={({ currentTarget }) => {
            currentTarget.src = "../../img/Nodejs.png";
          }}
          alt=""
        />
      </div>

      <div className="sidebar_info">
        <button
          disabled={loading ? true : false}
          className={`btn btn-${findIfRegisted() ? "danger" : "primary"}`}
          onClick={ghidanhHandle}
        >
          {loading ? (
            <div className="smallLoader"></div>
          ) : (
            <>
              {findIfRegisted() ? (
                <>
                  <i className="fa-solid fa-x"></i>Hủy đăng ký
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-shopping"></i>Đăng ký khóa học
                  này
                </>
              )}
            </>
          )}
        </button>
        <p>
          <span>
            <i className="fa-solid fa-sliders"></i>
            Mã khóa học:{" "}
          </span>
          <span>{courseDetail?.maKhoaHoc}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-tag"></i>
            Bí danh:{" "}
          </span>
          <span>{courseDetail?.biDanh}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-user-graduate"></i>
            Học viên:{" "}
          </span>
          <span>{courseDetail?.soLuongHocVien}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-clock"></i>
            Thời gian:{" "}
          </span>
          <span>6 tháng</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-code"></i>
            Trình độ:{" "}
          </span>
          <span>Người vừa mới bắt đầu</span>
        </p>
      </div>
      <div className="sidebar_footer">
        <h1>Tài liệu kèm theo</h1>
        <p>
          <i className="fa-solid fa-check"></i>
          Video
        </p>
        <p>
          <i className="fa-solid fa-check"></i>
          Booklets
        </p>
        <h1>Danh mục khóa học</h1>
        <ul>
          {categories?.map((item: CategoriesType, index: number) => {
            return (
              <li key={index}>
                <Link
                  to={`/categories?categories=${item.maDanhMuc}`}
                  className={
                    item.maDanhMuc ===
                    courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc
                      ? "active"
                      : ""
                  }
                >
                  {item.tenDanhMuc}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CourseSidebar;
