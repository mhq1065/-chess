<script lang="ts">
    import Vue from "vue";
    import { login } from "@/utils/user";
    import store from "@/store/index";
    import modal from "./Modal.vue";

    export default Vue.extend({
        name: "Login",
        components: {
            modal,
        },
        data: function() {
            return {
                username: "mhq1",
                pwd: "",
                remember: false,
                isShowModal: false,
                modalMsg: "",
            };
        },
        mounted() {
            let data = store.getters.getUser;
            [this.username, this.pwd] = [data.username, data.pwd];
            if (this.username != "") {
                this.remember = true;
            }
        },
        methods: {
            showModal: function(msg: string) {
                this.modalMsg = msg;
                this.isShowModal = true;
            },
            Login: function() {
                if (this.username == "") {
                    this.showModal("用户名不能为空");
                    return;
                } else if (this.pwd == "") {
                    this.showModal("密码不能为空");
                    return;
                }
                login(this.username, this.pwd)
                    .then((data) => {
                        if (this.remember) {
                            store.commit("updateUser", {
                                username: this.username,
                                pwd: this.pwd,
                            });
                        } else {
                            store.commit("clearUser");
                        }
                        this.$router.push({ name: "Game" });
                        console.log(data);
                    })
                    .catch((err) => {
                        this.showModal(err);
                        console.log(err);
                    });
            },
        },
    });
</script>
<template>
    <div class="container ">
        <!-- 用户名 -->
        <div class="field">
            <div class="control has-icons-left has-icons-right">
                <input
                    class="input is-success"
                    type="text"
                    placeholder="User Name"
                    v-model="username"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>
        <!-- 密码 -->
        <div class="field">
            <p class="control has-icons-left">
                <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    v-model="pwd"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <!-- 记住我 -->
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="remember" />
                    Remember me
                </label>
            </div>
        </div>
        <!-- 登录 -->
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" @click="Login">Login</button>
            </div>
        </div>
        <modal :isShow="isShowModal" @closeModal="isShowModal = false">
            {{ modalMsg }}
        </modal>
    </div>
</template>
