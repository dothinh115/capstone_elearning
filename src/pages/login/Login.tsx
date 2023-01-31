import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { DispatchType } from "../../redux/store";
import { loginApi } from "../../redux/userReducer/userReducer";
import { loginInputData } from "../../util/config";
import { LoginType } from "../../util/interface/userReducerInterface";

type Props = {};

const Login = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });
  const onSubmit = (data: LoginType): void => {
    dispatch(loginApi(data));
    window.location.href = searchParams.get("next")!;
  };
  return (
    <section className="login">
      <div className="login_inner">
        <div className="login_inner_header">
          <h1>Đăng nhập tài khoản</h1>
          <Link
            to={
              searchParams.get("next")
                ? searchParams.get("next")!.replace("+", "%2B")
                : "/"
            }
            className="badge"
          >
            <i className="fa-solid fa-x"></i>
          </Link>
        </div>
        <div className="login_inner_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {loginInputData.id.map((item: string, index: number) => {
              return (
                <div className="item" key={index}>
                  <div className="item_title">
                    <i
                      className={`fa-solid fa-${loginInputData.icon[index]}`}
                    ></i>
                    {loginInputData.title[index]}
                  </div>
                  <div className="item_input">
                    <input
                      className={`${
                        errors[item as keyof LoginType]?.message && "isInvalid"
                      }`}
                      type={`${item === "matKhau" ? "password" : "text"}`}
                      {...register(item as keyof LoginType, {
                        required: `${loginInputData.title[index]} không được để trống!`,
                      })}
                    />
                  </div>
                  {errors[item as keyof LoginType]?.message && (
                    <div className="item_errors">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors[item as keyof LoginType]?.message}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="item_btn">
              <button className="btn btn-primary">Đăng nhập</button>
            </div>
          </form>
        </div>
        {state?.errorMessage && (
          <div className="login_inner_show_errors">
            <i className="fa-solid fa-circle-exclamation"></i>
            {state?.errorMessage}
          </div>
        )}
        <div className="login_footer">
          <div className="hr_span_footer">
            <span>Hoặc</span>
            <div>
              <Link className="btn" to="/register">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
