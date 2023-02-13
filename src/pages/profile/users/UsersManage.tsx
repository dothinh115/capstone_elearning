import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import useModal from "../../../hooks/useModal";
import { DispatchType, ReduxRootType } from "../../../redux/store";
import { getAllUserListApi } from "../../../redux/userReducer/userReducer";
import { UserListType } from "../../../util/interface/userReducerInterface";

type Props = {};

const UsersManage = (props: Props) => {
  const { toggle } = useModal();
  const modal = useRef<HTMLDivElement | null>(null);
  const dispatch: DispatchType = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<
    UserListType[] | null | undefined
  >(null);
  const { userList } = useSelector((store: ReduxRootType) => store.userReducer);
  console.log(userList);

  const searchMethod = useForm<{ search: string }>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const searchHandle = (value: string | undefined | null): void => {
    let filterArr: UserListType[] | null | undefined = userList;
    const keywordsFromParams: string | null | undefined =
      searchParams.get("keywords");
    if (value) {
      filterArr = filterArr?.filter((item: UserListType) =>
        item.hoTen.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (!value) {
      searchParams.delete("keywords");
      setSearchParams(searchParams);
    } else if (value !== keywordsFromParams && value) {
      setSearchParams({
        ...(value && { keywords: value }),
      });
    }

    setSearchResult(filterArr);
  };

  const searchSubmitHandle = (data: { search: string }) => {
    searchHandle(data.search);
  };

  useEffect(() => {
    dispatch(getAllUserListApi);
  }, []);

  const html = (
    <div className="profile_main_info">
      <div className="profile_container_main_block">
        <Link to="/profile/users_manage/create" className="btn">
          Thêm học viên mới
        </Link>
      </div>
      <div className="profile_container_`ma`in_block">
        <form className="profile_main_info_search">
          <input type="text" placeholder="Tìm kiếm" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="profile_container_main_block"></div>
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
