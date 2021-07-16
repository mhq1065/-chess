<template>
    <div class="home">
        <div class="columns">
            <div class="column is-7"></div>
            <div class="column is-4">
                <div class="box">
                    <div class="tabs">
                        <ul>
                            <li :class="{ 'is-active': tab == 'login' }">
                                <a @click="tab = 'login'">登录</a>
                            </li>
                            <li :class="{ 'is-active': tab == 'register' }">
                                <a @click="tab = 'register'">注册</a>
                            </li>
                        </ul>
                    </div>
                    <div v-if="tab == 'login'">
                        <Login />
                    </div>
                    <div v-else>
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
