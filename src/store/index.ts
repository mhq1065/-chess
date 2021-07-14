import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const JWT_KEY = "JWT";
export default new Vuex.Store({
    state: {
        jwt: localStorage.getItem(JWT_KEY) || "",
    },
    getters: {
        getJWT(state) {
            return localStorage.getItem(JWT_KEY);
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
    },
    actions: {},
    modules: {},
});
