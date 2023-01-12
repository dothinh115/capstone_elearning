import axios, { AxiosInstance } from "axios";

export const  CYBERSOFT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA";

export const API: AxiosInstance  = axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn/api",
    headers: {
        Authorization: "token",
        TokenCybersoft: CYBERSOFT_TOKEN
    }
});

//request
// API.interceptors.request.use((config:any) => {
//     config.headers = {
//         ...config.headers,
//         Authorization: "token",
//         TokenCybersoft: CYBERSOFT_TOKEN
//     }
//     return config;
// }, (error:any) => {
//     return Promise.reject(error);
// });

API.interceptors.response.use((res) => {
    return res;
}, (error) => {
    
    return Promise.reject(error);
});