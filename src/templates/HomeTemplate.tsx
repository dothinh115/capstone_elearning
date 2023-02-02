import { Link, Outlet, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
type Props = {};

const HomeTemplate = (props: Props) => {
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
        <Footer />
      </div>
    </>
  );
};

export default HomeTemplate;
