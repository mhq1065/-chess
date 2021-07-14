<script lang="ts">
    import Vue from "vue";
    import { login } from "@/utils/user";

    export default Vue.extend({
        name: "Login",
        data: function() {
            return {
                username: "mhq1",
                pwd: "",
            };
        },
        methods: {
            Login: function() {
                login(this.username, this.pwd)
                    .then((data) => {
                        this.$router.push({ name: "Game" });
                        console.log(data);
                    })
                    .catch((err) => {
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
                    <input type="checkbox" />
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
    </div>
</template>
