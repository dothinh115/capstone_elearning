import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { DispatchType } from "../redux/store";
import { useEffect } from "react";
import {
  getAllCategoriesApi,
  getAllCoursesApi,
} from "../redux/courseReducer/courseReducer";

type Props = {};

const HomeTemplate = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesApi);
    dispatch(getAllCategoriesApi);
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeTemplate;
