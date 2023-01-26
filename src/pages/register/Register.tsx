import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { DispatchType } from "../../redux/store";
import { registerApi } from "../../redux/userReducer/userReducer";
import { registerInputData } from "../../util/config";
import { RegisterInputType } from "../../util/interface/userReducerInterface";

type Props = {};

const Register = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { state }: { state: { errorMessage: string; successMessage: string } } =
    useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputType>({
    mode: "onChange",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },
  });
  const onSubmit = (data: RegisterInputType): void => {
    dispatch(registerApi(data));
  };
  const showMaNhom = (): JSX.Element[] => {
    let html: JSX.Element[] = [];
    for (let i: number = 1; i <= 10; i++) {
      html.push(
        <option key={i} value={`GP${i !== 10 ? "0" + i : i}`}>
          GP{i !== 10 ? "0" + i : i}
        </option>
      );
    }
    return html;
  };
  return (
    <section className="login">
      <div className="login_inner">
        <div className="login_inner_header">
          <h1>Đăng ký tài khoản</h1>
          <Link to="/" className="badge">
            <i className="fa-solid fa-x"></i>
          </Link>
        </div>

        <div className="login_inner_container">
          {state?.successMessage ? (
            <div className="login_inner_container_success">
              <i className="fa-solid fa-check"></i>
              {state?.successMessage}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {registerInputData.id.map((item: string | any, index: number) => {
                const reg = new RegExp(registerInputData.regex[index]);
                return (
                  <div className="item" key={index}>
                    <div className="item_title">
                      <i
                        className={`fa-solid fa-${registerInputData.icon[index]}`}
                      ></i>
                      {registerInputData.title[index]}
                    </div>
                    <div className="item_input">
                      {item === "maNhom" ? (
                        <select {...register(item)}>
                          {showMaNhom().map((val: JSX.Element) => {
                            return val;
                          })}
                        </select>
                      ) : (
                        <input
                          className={`${
                            errors[item as keyof RegisterInputType]?.message &&
                            "isInvalid"
                          }`}
                          type={`${item === "matKhau" ? "password" : "text"}`}
                          placeholder={registerInputData.placeHolder[index]}
                          {...register(item, {
                            required: `${registerInputData.title[index]} không được để trống!`,
                            pattern: {
                              value: reg,
                              message: registerInputData.errors[index],
                            },
                          })}
                        />
                      )}
                    </div>
                    {errors[item as keyof RegisterInputType]?.message && (
                      <div className="item_errors">
                        <>
                          <i className="fa-solid fa-circle-exclamation"></i>
                          {errors[item as keyof RegisterInputType]?.message}
                        </>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="item_btn">
                <button className="btn btn-primary">Đăng ký</button>
              </div>
            </form>
          )}
        </div>
        {state?.errorMessage && (
          <div className="login_inner_show_errors">
            <i className="fa-solid fa-circle-exclamation"></i>
            {state?.errorMessage}
          </div>
        )}
        <div className="login_footer">
          <div className="hr_span_footer">
            <span className={state?.successMessage && "success"}>
              {state?.successMessage ? (
                <i className="fa-solid fa-arrow-down"></i>
              ) : (
                "Hoặc"
              )}
            </span>
            <div>
              <Link className="btn" to="/login">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
