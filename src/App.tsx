import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Categories from "./pages/categories/Categories";
import Course from "./pages/course/Course";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomeTemplate from "./templates/HomeTemplate";
import "../src/assets/sass/style.scss";
import LoggedInRoute from "./hoc/LoggedInRoute";
import NotLoggedInRoute from "./hoc/NotLoggedInRoute";
import useToken from "./hooks/useToken";
import { createBrowserHistory } from "history";
import { useEffect } from "react";
import { DispatchType } from "./redux/store";
import { useDispatch } from "react-redux";
import { getAllCoursesApi } from "./redux/courseReducer/courseReducer";
import { getAllCategoriesApi } from "./redux/categoriesReducer/categoriesReducer";
import { getUserInfoApi } from "./redux/userReducer/userReducer";
import UserTemplate from "./templates/UserTemplate";
import EditProfile from "./pages/profile/EditProfile";
import RegitsteredCourses from "./pages/profile/RegitsteredCourses";
import CoursesManage from "./pages/profile/CoursesManage";
export const history: any = createBrowserHistory();

function App() {
  const { token }: { token: string } = useToken();
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesApi);
    dispatch(getAllCategoriesApi);
    dispatch(getUserInfoApi);
  }, []);
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="course/:courseID" element={<Course />} />
        </Route>
        <Route element={<LoggedInRoute token={token} />}>
          <Route path="profile" element={<UserTemplate />}>
            <Route index element={<EditProfile />} />
            <Route path="registered_courses" element={<RegitsteredCourses />} />
            <Route path="courses_manage" element={<CoursesManage />} />
            <Route
              path="courses_manage/:courseID"
              element={<CoursesManage />}
            />
          </Route>
        </Route>
        <Route element={<NotLoggedInRoute token={token} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
