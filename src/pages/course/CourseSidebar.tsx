import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { history } from "../../App";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
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
  const { toggle } = useModal();

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

  const html = (
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
                  <i className="fa-solid fa-x"></i>H???y ????ng k??
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-shopping"></i>????ng k?? kh??a h???c
                  n??y
                </>
              )}
            </>
          )}
        </button>
        <Link
          state={{ inside: true }}
          to={`/profile/courses_manage/${courseDetail?.maKhoaHoc}`}
          className="btn btn-info"
        >
          Ch???nh s???a kh??a h???c n??y
        </Link>
        <p>
          <span>
            <i className="fa-solid fa-sliders"></i>
            M?? kh??a h???c:{" "}
          </span>
          <span>{courseDetail?.maKhoaHoc}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-tag"></i>
            B?? danh:{" "}
          </span>
          <span>{courseDetail?.biDanh}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-user-graduate"></i>
            H???c vi??n:{" "}
          </span>
          <span>{courseDetail?.soLuongHocVien}</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-clock"></i>
            Th???i gian:{" "}
          </span>
          <span>6 th??ng</span>
        </p>
        <p>
          <span>
            <i className="fa-solid fa-code"></i>
            Tr??nh ?????:{" "}
          </span>
          <span>Ng?????i v???a m???i b???t ?????u</span>
        </p>
      </div>
      <div className="sidebar_footer">
        <h1>T??i li???u k??m theo</h1>
        <p>
          <i className="fa-solid fa-check"></i>
          Video
        </p>
        <p>
          <i className="fa-solid fa-check"></i>
          Booklets
        </p>
        <h1>Danh m???c kh??a h???c</h1>
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
  if (window.innerWidth <= 820)
    return (
      <Modal toggle={toggle} show={true} title="Chi ti???t kh??a h???c">
        {html}
      </Modal>
    );
  return html;
};

export default CourseSidebar;
