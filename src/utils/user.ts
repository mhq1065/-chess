import ajax from "./ajax";
import store from "@/store/index";
// 注册
export async function register(username: string, pwd: string) {
    const data = await ajax.post("/register", {
        username: username,
        password: pwd,
    });
    switch (data.data.state) {
        case 200:
            return data.data;
        case 300:
            throw new Error("用户名冲突");
        case 400:
            throw new Error("数据库查询失败");
        case 401:
            throw new Error("数据库插入失败");
    }
}

// 登录
export async function login(username: string, pwd: string) {
    const data = await ajax.post("/login", {
        username: username,
        password: pwd,
    });
    switch (data.data.state) {
        // 注册成功
        case 200:
            // 保存token
            store.commit("updateJWT", data.data.token);
            store.commit("updateUser", {
                username: username,
                pwd: pwd,
            });
            return data.data;
        case 301: // 用户名不存在
            throw new Error("用户名不存在");
        case 302: // 用户名密码不匹配
            throw new Error("用户名密码不匹配");
        case 400: //数据库查询失败
            throw new Error("数据库查询失败");
    }
}
