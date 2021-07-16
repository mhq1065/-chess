<script>
    import Vue from "vue";
    import navbar from "@/components/Navbar.vue";
    import {
        getHistoryStat,
        getHistorySummaries,
        getStepRecords,
    } from "@/utils/history";
    import store from "@/store/index";
    export default Vue.extend({
        name: "History",
        data() {
            return {
                user: {},
                tab: "All",
                getHistoryStat: {},
                getHistorySummaries: [],
                isShowController: true,
                StepRecords: {},
            };
        },
        components: {
            navbar,
        },
        computed: {
            winHistory: function() {
                return this.getHistorySummaries.filter((item) => {
                    if (item.result == 10) {
                        //白胜利
                        if (this.user.username === item.w_username) {
                            return true;
                        }
                    } else if (item.result == 11) {
                        if (this.user.username === item.b_username) {
                            return true;
                        }
                    } else {
                        return false;
                    }
                });
            },
            loseHistory: function() {
                return this.getHistorySummaries.filter((item) => {
                    if (item.result == 10) {
                        //白胜利
                        if (this.user.username === item.b_username) {
                            return true;
                        }
                    } else if (item.result == 11) {
                        if (this.user.username === item.w_username) {
                            return true;
                        }
                    } else {
                        return false;
                    }
                });
            },
            drawHistory() {
                return this.getHistorySummaries.filter(
                    (item) => item.result === 12
                );
            },
        },
        async mounted() {
            this.user = store.getters.getUser;
            try {
                this.getHistoryStat = await getHistoryStat();
                let historyR = await getHistorySummaries();
                this.getHistorySummaries = historyR.summaries;
                console.log("getHistoryStat:", this.getHistoryStat);
                console.log("getHistorySummaries", this.getHistorySummaries);
            } catch (e) {
                console.log("注册失败", e);
            }
        },
        methods: {
            getTime(time) {
                let d = new Date(time);
                let month = d.getMonth() + 1;
                let date = d.getDate();
                let hour = d.getHours();
                let m = d.getMinutes();

                return `${month}/${date} ${hour}:${m}`;
            },
            async getRecords(guid) {
                try {
                    this.StepRecords = await getStepRecords(guid);
                } catch (e) {
                    console.log(e);
                }
            },
        },
    });
</script>
<template>
    <div>
        <navbar />
        <div class="container section">
            <div class="columns">
                <!-- search -->
                <div class="column is-4">
                    <nav class="panel">
                        <p class="panel-heading">
                            历史战局
                        </p>
                        <div class="panel-block">
                            <p class="control has-icons-left">
                                <input
                                    class="input"
                                    type="text"
                                    placeholder="Search"
                                />
                                <span class="icon is-left">
                                    <i
                                        class="fas fa-search"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </p>
                        </div>
                        <!-- tabs -->
                        <p class="panel-tabs">
                            <a
                                @click="tab = 'All'"
                                :class="{ 'is-active': tab === 'All' }"
                            >
                                All
                            </a>
                            <a
                                @click="tab = 'Win'"
                                :class="{ 'is-active': tab === 'Win' }"
                            >
                                Win
                            </a>
                            <a
                                @click="tab = 'Lose'"
                                :class="{ 'is-active': tab === 'Lose' }"
                                >Lose
                            </a>
                            <a
                                @click="tab = 'Draw'"
                                :class="{ 'is-active': tab === 'Draw' }"
                                >Draw
                            </a>
                        </p>
                        <!-- 全部对局 -->
                        <div v-if="tab === 'All'">
                            <a
                                class="panel-block"
                                v-for="(game, index) in getHistorySummaries"
                                :key="index"
                                @click="getRecords(game.guid)"
                            >
                                <nav class="level">
                                    <div class="level-left">
                                        <span class="panel-icon">
                                            <i
                                                class="fas fa-book"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        {{ game.b_username }} vs
                                        {{ game.w_username }}
                                    </div>
                                    <div class="level-right">
                                        {{ getTime(game.time) }}
                                    </div>
                                </nav>
                            </a>
                        </div>
                        <!-- 胜利对局 -->
                        <div v-else-if="tab === 'Win'">
                            <a
                                class="panel-block"
                                v-for="(game, index) in winHistory"
                                :key="index"
                            >
                                <nav class="level">
                                    <div class="level-left">
                                        <span class="panel-icon">
                                            <i
                                                class="fas fa-book"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        {{ game.b_username }} vs
                                        {{ game.w_username }}
                                    </div>
                                    <div class="level-right">
                                        {{ getTime(game.time) }}
                                    </div>
                                </nav>
                            </a>
                        </div>
                        <!-- 失败对局 -->
                        <div v-else-if="tab === 'Lose'">
                            <a
                                class="panel-block"
                                v-for="(game, index) in loseHistory"
                                :key="index"
                            >
                                <nav class="level">
                                    <div class="level-left">
                                        <span class="panel-icon">
                                            <i
                                                class="fas fa-book"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        {{ game.b_username }} vs
                                        {{ game.w_username }}
                                    </div>
                                    <div class="level-right">
                                        {{ getTime(game.time) }}
                                    </div>
                                </nav>
                            </a>
                        </div>
                        <!-- 平局 -->
                        <div v-else>
                            <a
                                class="panel-block"
                                v-for="(game, index) in drawHistory"
                                :key="index"
                            >
                                <nav class="level">
                                    <div class="level-left">
                                        <span class="panel-icon">
                                            <i
                                                class="fas fa-book"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        {{ game.b_username }} vs
                                        {{ game.w_username }}
                                    </div>
                                    <div class="level-right">
                                        {{ getTime(game.time) }}
                                    </div>
                                </nav>
                            </a>
                        </div>
                    </nav>
                </div>
                <!-- chessboard -->
                <div class="column">
                    First column
                </div>
                <!-- controller -->
                <div class="column is-3">
                    <div class="card">
                        <header
                            class="card-header"
                            @click="isShowController = !isShowController"
                        >
                            <p class="card-header-title">
                                棋盘控制器
                            </p>
                            <button
                                class="card-header-icon"
                                aria-label="more options"
                            >
                                <span class="icon">
                                    <i
                                        class="fas fa-angle-down"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </button>
                        </header>
                        <div class="card-content" v-show="isShowController">
                            <div class="content">
                                Lorem ipsum leo risus, porta ac consectetur ac,
                                vestibulum at eros. Donec id elit non mi porta
                                gravida at eget metus. Cum sociis natoque
                                penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Cras mattis consectetur
                                purus sit amet fermentum.
                            </div>
                        </div>
                        <footer class="card-footer" v-show="isShowController">
                            <a href="#" class="card-footer-item">Save</a>
                            <a href="#" class="card-footer-item">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .level {
        width: 100%;
    }
</style>
