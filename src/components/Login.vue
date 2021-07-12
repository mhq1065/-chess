<template>
    <div class="about">
        <form>
            <label for="username">
                姓名
                <input
                    type="text"
                    name="username"
                    id="username"
                    v-model="username"
                />
            </label>
            <br />
            <label for="login-pwd">
                密码
                <input
                    type="password"
                    name="pwd"
                    id="login-pwd"
                    v-model="pwd"
                />
            </label>
            <br />
            <button @click="Login">登录</button>
        </form>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { login } from "@/utils/user";

    export default Vue.extend({
        name: "Login",
        data: function() {
            return {
                username: "youguess",
                pwd: "",
            };
        },
        methods: {
            Login: function() {
                login(this.username, this.pwd);
            },
        },
    });
</script>
