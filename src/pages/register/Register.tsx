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
  const { state }: { state: { errorMessage: string } } = useLocation();
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
      maNhom: "",
      email: "",
    },
  });
  const onSubmit = (data: RegisterInputType) => {
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
      <div className="login_header">
        <h1>Đăng nhập</h1>
        <Link to="/" className="badge">
          <i className="fa-solid fa-x"></i>
        </Link>
      </div>

      <div className="login_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {registerInputData.id.map((item: string | any, index: number) => {
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
                      {showMaNhom().map((val: JSX.Element, i: number) => {
                        return val;
                      })}
                    </select>
                  ) : (
                    <input
                      type="text"
                      {...register(item, {
                        required: `${registerInputData.title[index]} không được để trống!`,
                      })}
                    />
                  )}
                </div>
                {errors[item as keyof RegisterInputType]?.message && (
                  <div className="item_errors" style={{ color: "red" }}>
                    <>{errors[item as keyof RegisterInputType]?.message}</>
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

export default Register;
