<script>
    import Vue from "vue";
    import * as Chess from "chess.js";

    import navbar from "@/components/Navbar.vue";
    import {
        getHistoryStat,
        getHistorySummaries,
        getStepRecords,
    } from "@/utils/history";
    import store from "@/store/index";
    import popup from "@/components/popup.vue"; // @ is an alias to /src

    export default Vue.extend({
        name: "History",
        data() {
            return {
                user: {},
                chess: null,
                board: null,
                tab: "All",
                getHistoryStat: {},
                getHistorySummaries: [],
                isShowController: true,
                StepRecords: {}, // 当前对局走棋记录
                isShowing: false, // 是否在进行记录复盘
                step: 0, // 记录当前步数
                index: 0, // 记录序号
                orientation: "white",
                //pop
                isShowPopup: false,
                popupMsg: "",
            };
        },
        components: {
            navbar,
            popup,
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
                this.initChessBoard();
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
                    // 获取对局信息并处理数据
                    let step = await getStepRecords(guid);
                    this.StepRecords = step.steps
                        .split("\n")
                        .filter((i) => i !== "");
                    // 初始化控制器
                    this.isShowing = true;
                    this.step = 0;

                    this.index = this.getHistorySummaries.findIndex(
                        (item) => item.guid === guid
                    );
                } catch (e) {
                    console.log("获取对局记录失败");
                    this.popupMsg = "获取对局记录失败";
                    this.isShowPopup = true;
                    setTimeout(() => {
                        this.isShowPopup = false;
                    }, 1000);
                    console.log(e);
                }
            },
            initChessBoard() {
                this.chess = new Chess();
                // eslint-disable-next-line no-undef
                let board = Chessboard("myboard", {
                    draggable: false,
                });
                this.board = board;
                board.start();
            },
            getboard(stepNum) {
                this.board.move(...this.StepRecords.slice(0, stepNum));
            },
            nextStep() {
                console.log("next Step");

                if (this.step >= this.StepRecords.length) {
                    this.step = this.StepRecords.length;
                    return;
                }
                this.step++;
                this.getboard(this.step);
            },
            beforeStep() {
                console.log("next Step");
                if (this.step <= 0) {
                    this.step = 0;
                    return;
                }
                this.step--;
                this.board.start();
                this.getboard(this.step);
            },
            reset() {
                console.log("reset");
                this.board.start();
                this.step = 0;
            },
            reverse() {
                this.orientation =
                    this.orientation == "white" ? "black" : "white";
                this.board.orientation(this.orientation);
            },
        },
    });
</script>
<template>
    <div>
        <navbar />
        <popup :isShow="isShowPopup">
            {{ popupMsg }}
        </popup>
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
                                所有对局
                            </a>
                            <a
                                @click="tab = 'Win'"
                                :class="{ 'is-active': tab === 'Win' }"
                            >
                                胜利对局
                            </a>
                            <a
                                @click="tab = 'Lose'"
                                :class="{ 'is-active': tab === 'Lose' }"
                            >
                                失败对局
                            </a>
                            <a
                                @click="tab = 'Draw'"
                                :class="{ 'is-active': tab === 'Draw' }"
                            >
                                平局
                            </a>
                        </p>
                        <!-- 全部对局 -->
                        <div v-if="tab === 'All'" class="hitory-box">
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
                        <div v-else-if="tab === 'Win'" class="hitory-box">
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
                        <div v-else-if="tab === 'Lose'" class="hitory-box">
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
                        <div v-else class="hitory-box">
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
                    <div
                        id="myboard"
                        style="width: 400px;margin: 0 auto;"
                    ></div>
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
                            <div v-if="isShowing">
                                <nav class="level">
                                    <p class="level-item has-text-centered">
                                        {{
                                            getHistorySummaries[index]
                                                .b_username
                                        }}
                                    </p>
                                    <p class="level-item has-text-centered">
                                        VS
                                    </p>
                                    <p class="level-item has-text-centered">
                                        {{
                                            getHistorySummaries[index]
                                                .w_username
                                        }}
                                    </p>
                                </nav>
                                <br />
                                <div class="field has-text-centered">
                                    当前步数/总步数：{{ step }}/{{
                                        StepRecords.length
                                    }}
                                </div>
                                <br />
                                <div class="field has-text-centered">
                                    <button
                                        class="button"
                                        @click="reverse"
                                        style="background-color:#46aad5;color:white"
                                    >
                                        翻转棋盘
                                    </button>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer" v-show="isShowController">
                            <a
                                href="#"
                                class="card-footer-item"
                                @click="beforeStep"
                            >
                                上一步
                            </a>
                            <a href="#" class="card-footer-item" @click="reset">
                                重置
                            </a>
                            <a
                                href="#"
                                class="card-footer-item"
                                @click="nextStep"
                            >
                                下一步
                            </a>
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
    .hitory-box {
        height: 22em;
        overflow: auto;
    }
</style>
