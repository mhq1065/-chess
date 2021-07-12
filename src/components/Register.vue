<template>
    <div class="about">
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
        <label for="username">
            密码
            <input type="password" name="pwd" id="pwd" v-model="pwd" />
        </label>
        <br />
        <label for="username">
            确认密码
            <input
                type="password"
                name="confirmPwd"
                id="confirmPwd"
                v-model="confirmPwd"
            />
        </label>
        <br />
        <button @click="reg">注册</button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { register } from "@/utils/user";

    export default Vue.extend({
        name: "Register",
        data: function() {
            return {
                username: "youguess",
                pwd: "",
                confirmPwd: "",
            };
        },
        methods: {
            reg: async function() {
                if (this.pwd !== this.confirmPwd) {
                    console.log("密码不一致");
                    return;
                }
                let [err, data] = await register(this.username, this.pwd);
                console.log(err, data);
            },
        },
    });
</script>
