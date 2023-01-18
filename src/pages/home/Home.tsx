import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
import { ReduxRootType } from "../../redux/store";
import { CourseType } from "../../util/config";

type Props = {};

const Home = (props: Props) => {
  const { randomCoursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  return (
    <>
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
      <section className="feature">
        <h1>
          Why <mark>choose</mark> Cybersoft???
        </h1>
        <div className="feature_content">
          <div className="feature_item">
            <div className="feature_item_inner">
              <div className="feature_item_inner_left">
                <img
                  src="https://htmldemo.net/edumall/assets/images/feature-02.png"
                  alt=""
                />
              </div>
              <div className="feature_item_inner_right">
                <h3>Học theo lộ trình, có định hướng</h3>
                <p>
                  CyberSoft sẽ định hướng và đưa ra các lộ trình học lập trình
                  nhằm phát triển năng lực và niềm đam mê lập trình của bạn để
                  có việc ngay sau học.
                </p>
              </div>
            </div>
          </div>

          <div className="feature_item">
            <div className="feature_item_inner">
              <div className="feature_item_inner_left">
                <img
                  src="https://htmldemo.net/edumall/assets/images/feature-03.png"
                  alt=""
                />
              </div>
              <div className="feature_item_inner_right">
                <h3>Công nghệ mới, chuyên sâu, thực tế</h3>
                <p>
                  Bạn được học và trải nghiệm các công nghệ lập trình mới nhất,
                  chuyên sâu, bám sát nhu cầu tuyển dụng thực tế từ doanh
                  nghiệp.
                </p>
              </div>
            </div>
          </div>

          <div className="feature_item">
            <div className="feature_item_inner">
              <div className="feature_item_inner_left">
                <img
                  src="https://htmldemo.net/edumall/assets/images/feature-02.png"
                  alt=""
                />
              </div>
              <div className="feature_item_inner_right">
                <h3>Mài giũa bạn qua dự án thực tế</h3>
                <p>
                  Đội ngũ Giảng viên và các Mentor là những người dày dạn kinh
                  nghiệm qua các dự án thực tế tại các công ty lớn sẽ truyền đạt
                  những kinh nghiệm "máu lửa" cho bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="courses">
        <h1>
          Khóa <mark>học</mark> tiêu biểu
        </h1>
        <div className="random_courses">
          {randomCoursesArr?.map((item: CourseType, index: number) => {
            return <CardItem item={item} key={index} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
