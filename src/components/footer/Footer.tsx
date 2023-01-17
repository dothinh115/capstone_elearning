import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <section className="footer">
      <div className="footer_inner">
        <div className="footer_inner_left">
          <h1>
            CyberSoft <mark>E-learning</mark>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisc ing elit. Nunc
            maximus, nulla utlaoki comm odo sagittis.
          </p>
          <p>
            © 2022 CyberSoft Capstone Project by group 5 with love{" "}
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>.
          </p>
        </div>
        <div className="footer_inner_center">
          <h1>About Us</h1>
          <ul>
            <li>About us</li>
            <li>Courses</li>
            <li>Events</li>
            <li>Become a teacher</li>
          </ul>
        </div>
        <div className="footer_inner_right">
          <h1>Sign Up for Our Newsletter</h1>
          <p>
            Receive weekly newsletter with educational materials, popular books
            and much more!
          </p>
          <input type="text" />
          <button className="btn btn-primary">Gửi</button>
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
