import { createSlice } from '@reduxjs/toolkit'
import { API } from '../../util/config';
import { DispatchType } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';

export interface courseType {
    maKhoaHoc:      string;
    biDanh:         string;
    tenKhoaHoc:     string;
    moTa:           string;
    luotXem:        number;
    hinhAnh:        string;
    maNhom:         string;
    ngayTAO:        string;
    soLuongHocVien: number;
    nguoiTAO:       string;
    danhMucKhoaHoc: string;
}

export interface courseStateType {
    courses: courseType[] | null
}

const initialState = {
    courses: null
}

const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    getAllCoursesAction: (state:courseStateType, action) => {
        state.courses = action.payload;
    }
  }
});

export const {getAllCoursesAction} = courseReducer.actions

export default courseReducer.reducer

/********** Async Action ********/
export const getAllCoursesApi = async (dispatch:DispatchType) => {
    try {
        const result = await API.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
        const action: PayloadAction<courseType> = getAllCoursesAction(result.data);
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}