import axios from "axios";
import qs from "qs";
import store from "@/store/index";

const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    baseURL: "/api",
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorition: `Bearer ${store.getters.getJWT}`,
    },
});
service.interceptors.request.use(
    (config) => {
        config.method === "post"
            ? (config.data = qs.stringify({ ...config.data }))
            : (config.params = { ...config.params });
        return config;
    },
    (error) => {
        //请求错误处理
        console.log(error);
        Promise.reject(error);
    }
);
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            // 异常处理
            if (response.data.state === 303) {
                // token过期
                console.log("凭证过期");
            }
            return Promise.reject(response);
        }
    },
    (error) => {
        //请求错误处理
        console.log(error);
        Promise.reject(error);
    }
);

export default service;
