<template>
    <div class="home">
        <div class="columns">
            <div class="column is-7"></div>
            <div class="column is-4">
                <div class="box">
                    <div v-if="tab == 'login'">
                        <button @click="tab = 'register'">跳转注册</button>
                        <Login />
                    </div>
                    <div v-else>
                        <button @click="tab = 'login'">返回登录</button>
                        <Register />
                    </div>
                </div>
            </div>

            <div class="column is-1"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Login from "@/components/Login.vue"; // @ is an alias to /src
    import Register from "@/components/Register.vue"; // @ is an alias to /src

    export default Vue.extend({
        name: "Home",
        components: {
            Login,
            Register,
        },
        data() {
            return {
                tab: "login",
            };
        },
    });
</script>
