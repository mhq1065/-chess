import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const JWT_KEY = "JWT";
const USER_NAME = "user";
const USER_PASSWORD = "pwd";
interface userInterface {
    username: string;
    pwd: string;
}
export default new Vuex.Store({
    state: {
        jwt: localStorage.getItem(JWT_KEY) || "",
        usermsg: {
            username: localStorage.getItem(USER_NAME) || "",
            pwd: localStorage.getItem(USER_PASSWORD) || "",
        },
    },
    getters: {
        getJWT(state) {
            return localStorage.getItem(JWT_KEY);
        },
        getUser(state) {
            return state.usermsg;
        },
    },
    mutations: {
        updateJWT(state, token) {
            // 1. vuex做更新，使得有响应式
            state.jwt = token;
            // 2. localStorage做持久更新
            localStorage.setItem(JWT_KEY, token);
        },
        // 清除用户信息
        clearJWT(state) {
            // 1. vuex做清除，使得有响应式
            state.jwt = "";
            // 2. localStorage做持久清除
            localStorage.removeItem(JWT_KEY);
        },
        updateUser(state, user: userInterface) {
            console.log("updateUser", user);
            state.usermsg = user;
            localStorage.setItem(USER_NAME, user.username);
            localStorage.setItem(USER_PASSWORD, user.pwd);
        },
        clearUser(state) {
            state.usermsg.pwd = "";
            localStorage.setItem(USER_PASSWORD, "");
        },
    },
    actions: {},
    modules: {},
});
