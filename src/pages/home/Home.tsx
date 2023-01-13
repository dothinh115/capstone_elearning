import React from "react";
import { useSelector } from "react-redux";
import CardItem from "../../components/cardItem/CardItem";
import Mainblock from "../../components/mainblock/Mainblock";
import { ReduxRootType } from "../../redux/store";
import { courseType } from "../../util/config";

type Props = {};

const Home = (props: Props) => {
  const { courses } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {courses.map((item: courseType, index: number) => {
        return <CardItem key={index} item={item} />;
      })}
    </div>
  );
};

export default Home;
