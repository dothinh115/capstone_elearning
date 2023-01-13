import React from "react";
import { useSelector } from "react-redux";
import CardItem from "../../components/cardItem/CardItem";
import { ReduxRootType } from "../../redux/store";
import { CourseType } from "../../util/config";

type Props = {};

const Home = (props: Props) => {
  const { coursesArr } = useSelector(
    (store: ReduxRootType) => store.courseReducer
  );
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {coursesArr?.map((item: CourseType, index: number) => {
        return <CardItem key={index} item={item} />;
      })}
    </div>
  );
};

export default Home;
