import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Btt from "./Btt";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Btt />
    </>
  );
};

export default HomeTemplate;
