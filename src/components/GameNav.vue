<template>
    <div>
        <aside class="menu">
            <p class="menu-label">
                开始游戏
            </p>
            <ul class="menu-list">
                <li>
                    <a @click="showCreate">创建游戏房间</a>
                    <ul v-show="isShowCreate">
                        <div class="content">
                            <div class="field">
                                <button
                                    class="button is-rounded"
                                    @click="createGame"
                                >
                                    创建游戏
                                </button>
                            </div>
                            <div class="field">
                                <div class="field">
                                    <p
                                        class="control has-icons-right"
                                        @click="copyCreate"
                                    >
                                        <input
                                            id="createInput"
                                            class="input"
                                            type="text"
                                            v-model="gid"
                                            readonly
                                        />
                                        <span class="icon is-small is-right">
                                            <i
                                                class="fa fa-clipboard"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ul>
                </li>
                <li>
                    <a @click="showJoin">加入游戏房间</a>
                    <ul v-show="isShowJoin">
                        <div class="content">
                            <div class="field">
                                <p class="control has-icons-right">
                                    <input
                                        id="joinInput"
                                        class="input"
                                        type="text"
                                        v-model="gidForJoin"
                                    />
                                    <span class="icon is-small is-right">
                                        <i
                                            class="fa fa-clipboard"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                </p>
                            </div>
                            <button
                                class="button is-small is-light"
                                @click="JoinGame"
                            >
                                加入游戏
                            </button>
                        </div>
                    </ul>
                </li>
                <li>
                    <a @click="showPve">人机模式</a>
                    <ul v-show="isPve">
                        <div class="content">
                            <button
                                class="button is-small is-light"
                                @click="startPve"
                            >
                                开始游戏
                            </button>
                        </div>
                    </ul>
                </li>
                <li>
                    <a @click="showRandomPvp">匹配游戏</a>
                    <ul v-show="isRandomPvp">
                        <div class="content">
                            <button
                                class="button is-small is-light"
                                @click="startRandomPvp"
                            >
                                开始游戏
                            </button>
                        </div>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
</template>
<script>
    import Vue from "vue";
    export default Vue.extend({
        name: "GameNav",
        props: {
            gid: String,
        },
        data() {
            return {
                gidForJoin: "",
                isShowCreate: false,
                isShowJoin: false,
                isPve: false,
                isRandomPvp: false,
            };
        },
        methods: {
            showCreate: function() {
                this.isShowCreate = !this.isShowCreate;
            },
            showJoin: function() {
                this.isShowJoin = !this.isShowJoin;
            },
            showPve: function() {
                this.isPve = !this.isPve;
            },
            showRandomPvp: function() {
                this.isRandomPvp = !this.isRandomPvp;
            },
            copyCreate: function() {
                let d = document.querySelector("#createInput");
                d.select();
                d.setSelectionRange(0, this.gid.length);
                document.execCommand("copy");
            },
            createGame: function() {
                console.log("GameNav", "createGame");
                this.$emit("createGame");
            },
            JoinGame: function() {
                console.log("GameNav", "JoinGame");
                this.$emit("JoinGame", this.gidForJoin);
            },
            startPve: function() {
                console.log("GameNav", "Start PVE");
                this.$emit("startPve");
            },
            startRandomPvp: function() {
                console.log("GameNav", "Start RandomPvp");
                this.$emit("startRandomPvp");
            },
        },
    });
</script>
