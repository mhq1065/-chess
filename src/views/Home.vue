<style>
    .bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        min-width: 1000px;
        z-index: 2;
        zoom: 1;
        background-color: #fff;
        background: url(../assets/棋子4.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-position: center center;
    }
    .begin_button {
        position: fixed;
        bottom: 3em;
        width: 100%;
        opacity: 0;
        transition: 0.3s;

        z-index: 100;
    }
    .isShow_begin_button {
        cursor: pointer;
        text-align: center;
        opacity: 1;
        color: white;
        font-size: 0.8em;
        
        background-image: linear-gradient(
            to right,
            rgba(128, 127, 127, 0),
            rgba(100, 100, 100, 0.8),
            rgba(128, 127, 127, 0)
        );
        padding: 0.2em;
    }
    .login_box {
        position: relative;
        z-index: 10;
        margin: 50px 0;
        transition: 0.3s;
        opacity: 0;
    }
    .login_box.isShow_login_box {
        margin: 150px 0;
        opacity: 0.95;
    }
</style>
<template>
    <div class="home">
        <div class="bg" @click="isBegining = !isBegining"></div>
        <div class="begin_button" :class="{ isShow_begin_button: !isBegining }">
            <div @click="isBegining = !isBegining">
                开始游戏
            </div>
        </div>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-4">
                <div>
                    <div
                        class="box login_box"
                        :class="{ isShow_login_box: isBegining }"
                    >
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
            </div>
            <div class="column"></div>
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
                isBegining: false,
            };
        }
    });
</script>
