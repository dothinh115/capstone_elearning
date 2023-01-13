import React from "react";
import Mainblock from "../../components/Mainblock";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Mainblock
        value={
          <>
            <i className="fa-solid fa-arrow-right"></i>
            Thông báo gì đó ở đây!
          </>
        }
      />
      <Mainblock
        headerContent="Demo main block header"
        value={
          <>
            <div>JSX in here</div>
          </>
        }
      />
    </>
  );
};

export default Home;
