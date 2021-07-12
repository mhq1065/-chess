import ajax from "./ajax";
import store from "@/store/index";
// 注册
export async function register(usernmae: string, pwd: string) {
    try {
        const data = await ajax.post("/register", {
            username: usernmae,
            password: pwd,
        });
        switch (data.data.state) {
            case 200:
                return [null, data.data];
            case 300:
            case 400:
            case 401:
                return [data.data, null];
        }
    } catch (err) {
        return [err, null];
    }
}

// 登录
export async function login(usernmae: string, pwd: string) {
    try {
        const data = await ajax.post("/login", {
            username: usernmae,
            password: pwd,
        });
        console.log(data);
        switch (data.data.state) {
            // 注册成功
            case 200:
                // 保存token
                store.commit("updateJWT", data.data.token);
                return [null, data.data];
            case 301: // 用户名不存在
            case 302: // 用户名密码不匹配
            case 400: //数据库查询失败
                return [data.data, null];
        }
        return [null, data.data];
    } catch (err) {
        return [err, null];
    }
}
