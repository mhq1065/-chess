/* eslint-disable no-undef */
<template>
    <div>
        <!-- 顶栏 -->
        <navbar />
        <div class="container section">
            <div class="columns is-desktop">
                <!-- 左侧边栏 -->
                <div class="column is-3" v-show="!isPlaying">
                    <gameNav
                        class="column"
                        :gid="gid"
                        :gametype="gametype"
                        @JoinGame="joinGame"
                        @createGame="createGame"
                        @startPve="startPve"
                        @startRandomPvp="startRandomPvp"
                    />
                </div>
                <!-- 棋盘 -->
                <div class="column has-text-centered">
                    <div
                        id="myboard"
                        style="width: 400px;margin: 0 auto;"
                    ></div>
                </div>
                <!-- 右侧栏 -->
                <div class="column is-3">
                    <!-- 玩家信息card -->
                    <div class="card field">
                        step:{{ step }}
                        <br />
                        {{
                            isPlaying
                                ? vanguard
                                    ? "白方"
                                    : "黑方"
                                : "Waiting for Play"
                        }}
                        <br />
                        <button @click="reset">restart</button>
                    </div>
                    <!-- 聊天card -->
                    <chat :msgList="msgList" @sendMsg="sendMsg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as Chess from "chess.js";
    import Vue from "vue";
    import { create, join } from "@/utils/game";
    import { removeGreySquares, greySquare } from "@/utils/chess";
    import io from "socket.io-client";
    import store from "@/store/index";
    import navbar from "@/components/Navbar.vue";
    import gameNav from "@/components/GameNav.vue";
    import chat from "@/components/chat.vue";

    // import {Chessboard} from "@chrisoakman/chessboardjs/dist/chessboard-1.0.0"

    export default Vue.extend({
        name: "Game",
        data: function() {
            return {
                gidForJoin: "", //加入时候的gid
                gid: "", // 创建的gid
                guid: "", //随机匹配的gid
                chess: new Chess(), // 棋局
                board: null, //棋盘
                status: null,
                fen: null,
                png: null,
                io: null, // ws连接对象
                gData: null, //ascii 版本棋盘
                vanguard: true, // 先手
                step: 0, //已经走的步数
                playstep: "", //下的棋
                isPlaying: false, //判断是否开局
                gametype: "pvp",
                msgList: [], // 消息列表
                pvpInfo: {}, //对局双方信息
            };
        },
        components: {
            navbar,
            gameNav,
            chat,
        },
        mounted() {
            // eslint-disable-next-line no-undef
            this.board = Chessboard("myboard", {
                draggable: false,
                // position: "start",
            });
        },
        methods: {
            updateStep() {
                this.step = this.chess.history().length;
            },
            startPve: function() {
                console.log("开始PVE");
                this.isPlaying = true;
                this.chess = new Chess();
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                let game = this.chess;
                // eslint-disable-next-line no-undef
                let board = Chessboard("myboard", {
                    draggable: true,
                    onDragStart: (source, piece) => {
                        if (game.game_over()) return false;
                        console.log(game.turn(), source, piece);
                        // only pick up pieces for the side to move
                        if (game.turn() === "b" || piece.search(/^b/) !== -1) {
                            return false;
                        }
                    },
                    onDrop: (source, target) => {
                        removeGreySquares();
                        let move = game.move({
                            from: source,
                            to: target,
                            promotion: "q", // NOTE: always promote to a queen for example simplicity
                        });
                        that.updateStep();
                        if (move === null) return "snapback";
                        //人机下棋
                        setTimeout(() => {
                            var possibleMoves = game.moves();
                            if (possibleMoves.length === 0) return;
                            var randomIdx = Math.floor(
                                Math.random() * possibleMoves.length
                            );
                            // 更新棋盘和数据
                            game.move(possibleMoves[randomIdx]);
                            board.position(game.fen());
                            // 更新步数
                            that.updateStep();
                            console.log(game.fen());
                        }, 1000);
                    },
                    onMouseoverSquare: (square) => {
                        var moves = game.moves({
                            square: square,
                            verbose: true,
                        });

                        // exit if there are no moves available for this square
                        if (moves.length === 0) return;

                        // highlight the square they moused over
                        greySquare(square);

                        // highlight the possible squares for this piece
                        for (var i = 0; i < moves.length; i++) {
                            greySquare(moves[i].to);
                        }
                    },
                    onMouseoutSquare: () => {
                        removeGreySquares();
                    },
                    onSnapEnd: () => {
                        board.position(game.fen());
                    },
                });
                this.board = board;
                board.start();
            },

            startPvP(orientation) {
                this.chess = new Chess();
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                let that = this;
                let game = this.chess;
                // eslint-disable-next-line no-undef
                let board = Chessboard("myboard", {
                    draggable: true,
                    orientation: orientation,

                    onDragStart: (source, piece) => {
                        if (game.game_over()) return false;
                        console.log(game.turn(), source, piece);
                        // only pick up pieces for the side to move
                        if (orientation == "white") {
                            if (
                                game.turn() === "b" ||
                                piece.search(/^b/) !== -1
                            ) {
                                return false;
                            }
                        } else {
                            if (
                                game.turn() === "w" ||
                                piece.search(/^w/) !== -1
                            ) {
                                return false;
                            }
                        }
                    },
                    onDrop: (source, target) => {
                        removeGreySquares();
                        if (source === target) {
                            return;
                        }
                        let move = game.move({
                            from: source,
                            to: target,
                            promotion: "q", // NOTE: always promote to a queen for example simplicity
                        });
                        that.emitMove(`${source}-${target}`);
                        that.updateStep();
                        if (move === null) return "snapback";
                    },
                    onMouseoverSquare: (square) => {
                        if (orientation == "white") {
                            if (game.turn() === "b") {
                                return false;
                            }
                        } else {
                            if (game.turn() === "w") {
                                return false;
                            }
                        }
                        var moves = game.moves({
                            square: square,
                            verbose: true,
                        });
                        // exit if there are no moves available for this square
                        if (moves.length === 0) return;

                        // highlight the square they moused over
                        greySquare(square);

                        // highlight the possible squares for this piece
                        for (var i = 0; i < moves.length; i++) {
                            greySquare(moves[i].to);
                        }
                    },
                    onMouseoutSquare: () => {
                        removeGreySquares();
                    },
                    onSnapEnd: () => {
                        board.position(game.fen());
                    },
                });
                this.board = board;
                board.start();
            },
            // 发送move
            emitMove(step) {
                console.log("发送move", {
                    move: step,
                    board: this.chess.fen(),
                    state: this.getState(this.chess),
                });
                this.io.emit("step", {
                    move: step,
                    board: this.chess.fen(),
                    state: this.getState(this.chess),
                });
            },
            // 移动棋子
            move(data) {
                let step = data.move;
                this.chess.move({
                    from: step.split("-")[0],
                    to: step.split("-")[1],
                    promotion: "q", // NOTE: always promote to a queen for example simplicity
                });
                this.board.position(data.board);
                this.updateStep();
            },
            // 处理结束emit
            end(data) {
                this.board.position(data.board);
                this.isPlaying = false;
                // 游戏结束
                console.log(data.reason, data.state);
            },
            // 获取对局状态
            getState(game) {
                if (!game.game_over()) {
                    return 0;
                } else if (game.in_draw()) {
                    return 12;
                } else {
                    return 10;
                }
            },
            reset() {
                this.isPlaying = !this.isPlaying;
            },
            play() {
                this.move(this.playstep);
                this.io.emit("step", {
                    move: this.playstep,
                    board: this.chess.fen(),
                    state: 0,
                });
                console.log("play");
            },
            quit() {
                console.log("手动结束Game");
                this.io.emit("quit");
            },
            initWS(io) {
                io.on("connect", () => {
                    console.log(this.io.connected);
                    io.emit("ready");
                });
                // 开始
                io.on("start", (data) => {
                    this.isPlaying = true;
                    this.startPvP(this.vanguard ? "white" : "black");
                    this.pvpInfo = data;
                    console.log(data);
                });
                // 对手下棋
                io.on("opponent step", (data) => {
                    this.move(data);
                    console.log(data);
                });
                io.on("opponent message", (data) => {
                    this.msgList.push({
                        username: this.vanguard
                            ? this.pvpInfo.b_username
                            : this.pvpInfo.w_username,
                        msg: data.message,
                    });
                });
                // 游戏结束
                io.on("end", (data) => {
                    this.end(data);
                    console.log(data);
                });
            },
            // 创建游戏
            async createGame() {
                let data;
                try {
                    data = await create();
                    let gid = data.guid;
                    this.gid = gid;
                    this.io = io({
                        query: {
                            token: store.getters.getJWT,
                            guid: gid,
                        },
                    });
                    // 初始化websocket
                    this.initWS(this.io);
                    this.step = 0;
                    this.vanguard = true;
                    this.gData = this.chess.ascii();
                    console.log(data);
                } catch (e) {
                    console.log(e);
                }
            },
            // 加入游戏
            async joinGame(gidForJoin) {
                console.log(gidForJoin);
                let data;
                try {
                    let gid = gidForJoin;
                    data = await join(gid);
                    this.io = io({
                        query: {
                            token: store.getters.getJWT,
                            guid: gid,
                        },
                    });
                    this.initWS(this.io);
                    this.step = 0;
                    this.vanguard = false;
                    this.gData = this.chess.ascii();
                    console.log(data);
                } catch (e) {
                    console.log(e);
                }
            },
            startRandomPvp() {
                console.log("startRandoamPvp");
                let socket = io({
                    path: "match",
                    query: {
                        token: store.getters.getJWT,
                    },
                });
                socket.on("match success", (data) => {
                    this.guid = data.guid;
                    this.vanguard = data.bw === "w" ? true : false;
                });
            },
            sendMsg(data) {
                console.log("send:", data);
                // messege
                this.io.emit("message", {
                    message: data,
                });
                this.msgList.push({
                    username: this.vanguard
                        ? this.pvpInfo.w_username
                        : this.pvpInfo.b_username,
                    msg: data,
                });
            },
        },
    });
</script>
