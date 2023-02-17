import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";
import { ReduxRootType } from "../../redux/store";
import { indexCategoriesShow, perClick } from "../../util/config";
import { CategoriesType } from "../../util/interface/categoriesReducerInterface";
import { CourseType } from "../../util/interface/courseReducerInterface";

type Props = {};

const Home = (props: Props) => {
  const { randomCoursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  const { categories } = useSelector(
    (store: ReduxRootType) => store.categoriesReducer
  );
  const [startCategories, setStartCategories] = useState<number>(0);
  return (
    <>
      <section className="feature">
        <div className="feature_container">
          <div className="feature_info">
            <h1>đúng nơi đúng thời điểm</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <button>Xem thêm</button>
          </div>
          <div className="introduce">
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
                    Bạn được học và trải nghiệm các công nghệ lập trình mới
                    nhất, chuyên sâu, bám sát nhu cầu tuyển dụng thực tế từ
                    doanh nghiệp.
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
                    nghiệm qua các dự án thực tế tại các công ty lớn sẽ truyền
                    đạt những kinh nghiệm "máu lửa" cho bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="story">
        <div className="story_container">
          <div className="story_container_left">
            <img src="./img/thaykhai.jpg" alt="" />
          </div>
          <div className="story_container_right">
            <h1>Câu chuyện về đội ngũ đầy tâm huyết</h1>
            <div className="story_container_right_title">
              By <span>Khải Trương</span>, 20/11/2023.
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
              distinctio illum natus nihil molestiae soluta, cum veniam saepe
              sit, deleniti consequuntur dignissimos sequi velit magni incidunt
              eius expedita esse ipsum?
            </p>
            <button>Xem thêm</button>
          </div>
        </div>
      </section>
      <section className="hot_courses">
        <div className="hot_courses_container">
          <h1>khóa học tiêu biểu</h1>
          <div className="hot_courses_container_menu">
            <button
              className="prev"
              onClick={() => {
                const result = startCategories - perClick;
                if (result < 0) return;
                setStartCategories(startCategories - perClick);
              }}
            >
              prev
            </button>
            <ul>
              {categories
                ?.slice(startCategories, startCategories + perClick)
                .map((item: CategoriesType) => {
                  return (
                    <li key={item.maDanhMuc}>
                      <Link to={`/categories?categories=${item.maDanhMuc}`}>
                        {item.tenDanhMuc}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <button
              className="next"
              onClick={() => {
                const result = startCategories + perClick;
                if (result >= categories!?.length) return;
                setStartCategories(result);
              }}
            >
              next
            </button>
          </div>
          <div className="hot_courses_container_main"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
