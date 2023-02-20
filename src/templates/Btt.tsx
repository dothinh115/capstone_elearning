import React, { useEffect, useState } from "react";

type Props = {};

const Btt = (props: Props) => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="btt">
      {backToTopButton && (
        <button
          style={{
            position: "fixed",
            bottom: "60px",
            right: "30px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={scrollUp}
        >
          <i
            className="fa fa-arrow-circle-up"
            aria-hidden="true"
            style={{ color: "green", overflow: "auto", fontSize: "40px" }}
          ></i>
        </button>
      )}
    </div>
  );
};

export default Btt;
