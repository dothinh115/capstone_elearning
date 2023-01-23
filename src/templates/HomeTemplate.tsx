import { useDispatch } from "react-redux";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { DispatchType } from "../redux/store";
import { useEffect } from "react";
import { getAllCoursesApi } from "../redux/courseReducer/courseReducer";
import { getAllCategoriesApi } from "../redux/categoriesReducer/categoriesReducer";
import useToken from "../hooks/useToken";
import { getUserInfoApi } from "../redux/userReducer/userReducer";

type Props = {};

const HomeTemplate = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { token } = useToken();
  useEffect(() => {
    dispatch(getAllCoursesApi);
    dispatch(getAllCategoriesApi);
    if (token) dispatch(getUserInfoApi);
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <section className="banner">
              <div className="banner_img">
                <img src="../../../img/banner.jpg" alt="" />
              </div>
              <div className="banner_container">
                <h1>KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN</h1>
                <p>Trở thành lập trình viên chuyên nghiệp tại Cybersoft</p>
                <Link to="/" className="btn btn-green">
                  Xem khóa học
                </Link>
              </div>
            </section>
          }
        ></Route>
      </Routes>
      <div className="home">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeTemplate;
