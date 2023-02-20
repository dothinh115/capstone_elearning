import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import { setCoursesViewNumber } from "../../../redux/profileReducer/profileReducer";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import { getAllUserListApi } from "../../../redux/userReducer/userReducer";
import { limitProfileCoursesViewMore } from "../../../util/config";
import { UserListType } from "../../../util/interface/userReducerInterface";

type Props = {};

const UsersManage = (props: Props) => {
  const { toggle } = useModal();
  const dispatch: DispatchType = useDispatch();
  const [searchResult, setSearchResult] = useState<
    UserListType[] | null | undefined
  >(null);
  const { userList } = useSelector((store: ReduxRootType) => store.userReducer);
  const [loading, setLoading] = useState<boolean>(false);
  const { coursesManageScroll, coursesViewNumber } = useSelector(
    (store: ReduxRootType) => store.profileReducer
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm<{ search: string | null }>({
    mode: "onSubmit",
    defaultValues: {
      search: null,
    },
  });

  const getAllUserList = async () => {
    setLoading(true);
    await dispatch(getAllUserListApi);
    setLoading(false);
  };

  const submitHandle = (data: { search: string | null }) => {
    const value = data.search;
    const keywords = searchParams.get("search");
    if (value) {
      if (value !== keywords) setSearchParams({ search: value });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const searchHandle = (value: string | null): void => {
    let result: UserListType[] | null | undefined = userList;
    if (value) {
      result = result?.filter((item: UserListType) => {
        return item.hoTen.toLowerCase().includes(value.toLowerCase());
      });
    }
    setSearchResult(result);
  };

  useEffect(() => {
    const keywords: string | null = searchParams.get("search");
    searchHandle(keywords);
  }, [searchParams]);

  useEffect(() => {
    setSearchResult(userList);
  }, [userList]);

  useEffect(() => {
    getAllUserList();
  }, []);

  const html = (
    <div className="profile_main_info">
      <Outlet />
      <div className="profile_container_main_block">
        <Link
          to="/profile/users_manage/create"
          className="btn"
          state={{ inside: true }}
        >
          Thêm học viên mới
        </Link>
      </div>
      <div
        className="profile_container_main_block"
        style={{ padding: "unset" }}
      >
        <form
          className="profile_main_info_search"
          onSubmit={handleSubmit(submitHandle)}
        >
          <input
            type="text"
            placeholder="Tìm kiếm(Theo họ tên)"
            {...register("search")}
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <ul>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            {searchResult
              ?.slice(0, coursesViewNumber)
              .map((item: UserListType) => {
                return (
                  <li key={item.taiKhoan}>
                    <Link
                      to={`/profile/users_manage/${item.taiKhoan}`}
                      state={{ inside: true }}
                    >
                      <div
                        className="user_type"
                        style={{
                          backgroundColor:
                            item.maLoaiNguoiDung === "GV"
                              ? "rgba(255, 0, 0, 50%)"
                              : "rgba(95, 158, 160, 60%)",
                        }}
                      >
                        {item.maLoaiNguoiDung}
                      </div>
                      <div className="course_info">
                        <h3>{item.hoTen}</h3>
                        <p>{item.email}</p>
                        <p>
                          <i className="fa-solid fa-user"></i>
                          {item.taiKhoan} |{" "}
                          <i className="fa-solid fa-phone"></i>
                          {item.soDt}
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={`/profile/users_manage/${item.taiKhoan}`}
                      className="editButton"
                      state={{ inside: true }}
                    >
                      <i className="fa-solid fa-gear"></i>
                    </Link>
                  </li>
                );
              })}
            {searchResult?.length! > coursesViewNumber && (
              <div className="profile_container_main_block">
                <button
                  style={{ display: "block", width: "100%" }}
                  className="btn btn-primary"
                  onClick={(): void => {
                    dispatch(
                      setCoursesViewNumber(
                        coursesViewNumber + limitProfileCoursesViewMore
                      )
                    );
                  }}
                >
                  Xem thêm
                </button>
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );

  if (window.innerWidth <= 600)
    return (
      <Modal show={true} toggle={toggle} title="Quản lý học viên">
        {html}
      </Modal>
    );
  return html;
};

export default UsersManage;
