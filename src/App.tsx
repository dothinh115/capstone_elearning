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
import CourseSidebar from "./pages/course/CourseSidebar";
import RegitsteredCourses from "./pages/profile/courses/RegitsteredCourses";
import CoursesManage from "./pages/profile/courses/CoursesManage";
import CreateNewCourseForm from "./pages/profile/courses/CreateNewCourseForm";
import CourseEditForm from "./pages/profile/courses/CourseEditForm";
import UsersManage from "./pages/profile/users/UsersManage";
import UsersEditForm from "./pages/profile/users/UsersEditForm";
import AdminRoute from "./hoc/AdminRoute";
import CreateUser from "./pages/profile/users/CreateUser";
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
          <Route path="course/:courseID" element={<Course />}>
            <Route path="viewinfo" element={<CourseSidebar />} />
          </Route>
        </Route>
        <Route element={<LoggedInRoute token={token} />}>
          <Route path="profile" element={<UserTemplate />}>
            <Route path="view_profile" element={<EditProfile />} />
            <Route path="registered_courses" element={<RegitsteredCourses />} />
            <Route path="courses_manage" element={<CoursesManage />}>
              <Route element={<AdminRoute />}>
                <Route path="create" element={<CreateNewCourseForm />} />
                <Route path=":courseID" element={<CourseEditForm />} />
              </Route>
            </Route>
            <Route path="users_manage" element={<UsersManage />}>
              <Route element={<AdminRoute />}>
                <Route path="create" element={<CreateUser />} />
                <Route path=":userID" element={<UsersEditForm />} />
              </Route>
            </Route>
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
