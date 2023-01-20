import {
  BrowserRouter,
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
import Profile from "./pages/profile/Profile";
import useToken from "./hooks/useToken";
import { createBrowserHistory } from "history";
export const history: any = createBrowserHistory();

function App() {
  const { token }: { token: string } = useToken();
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="course/:courseID" element={<Course />} />
          <Route element={<NotLoggedInRoute token={token} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<LoggedInRoute token={token} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
