import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DispatchType } from "../../redux/store";
import { loginApi } from "../../redux/userReducer/userReducer";
import { loginInputData } from "../../util/config";
import { LoginType } from "../../util/interface/userReducerInterface";

type Props = {};

const Login = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
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
  const onSubmit = (data: LoginType) => {
    dispatch(loginApi(data));
  };
  return (
    <section className="login">
      <div className="login_header">
        <h1>Đăng nhập</h1>
        <Link to="/" className="badge">
          <i className="fa-solid fa-x"></i>
        </Link>
      </div>

      <div className="login_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginInputData.id.map((item: string | any, index: number) => {
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
                    type="text"
                    {...register(item, {
                      required: "Tài khoản không được để trống!",
                    })}
                  />
                </div>
                {errors[item as keyof LoginType]?.message && (
                  <div className="item_errors" style={{ color: "red" }}>
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
      <div className="login_footer">
        <div className="hr_span_footer">
          <span>Hoặc</span>
          <div>
            <button className="btn">Đăng ký</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
