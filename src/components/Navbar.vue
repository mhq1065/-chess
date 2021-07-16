<template lang="">
    <div>
        <nav
            class="navbar has-shadow is-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div class="navbar-brand">
                <a class="navbar-item is-spaced">
                    Chess
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link"> Welcome! {{ username }} </a>

                        <div class="navbar-dropdown is-right">
                            <a class="navbar-item">
                                用户信息
                            </a>
                            <router-link to="/history" class="navbar-item">
                                历史对局
                            </router-link>
                            <!-- </a> -->
                            <hr class="navbar-divider" />
                            <a class="navbar-item">
                                退出登录
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import store from "@/store/index";
    export default Vue.extend({
        name: "Navbar",
        data() {
            return {
                username: "",
            };
        },
        mounted() {
            let data = store.getters.getUser;
            this.username = data.username || "";
        },
    });
</script>
