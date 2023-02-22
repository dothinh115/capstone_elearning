import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <section className="footer">
      <div className="footer_inner footer_container">
        <div className="footer_inner_left">
          <h1>
            CyberSoft <mark>E-learning</mark>
          </h1>
          <p>
            CyberSoft E-learning sẽ gởi các khóa học trực tuyến & các chương
            trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI
            hấp dẫn đến các bạn.
          </p>
          <p>
            © 2022 CyberSoft Capstone Dự án của nhóm 5 với đầy ắp tình yêu lập
            trình <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
            .
          </p>
        </div>
        <div className="footer_inner_center">
          <h1>Về chúng tôi</h1>
          <ul>
            <li>Về chúng tôi</li>
            <li>Khóa học</li>
            <li>Sự Kiện</li>
            <li>Trở thành Giáo Viên</li>
          </ul>
        </div>
        <div className="footer_inner_right">
          <h1>Đăng ký nhận bản tin của chúng tôi</h1>
          <p>
            Nhận bản tin hàng tuần với các tài liệu giáo dục, sách nổi tiếng và
            nhiều hơn nữa!
          </p>
          <form>
            <input type="text" placeholder="Nhập Email của bạn" />
            <button className="btn btn-primary">Gửi</button>
          </form>
          <div className="footer_inner_right_icon">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
