<template>
    <div>
        <button @click="createGame">创建对局</button>
        <input type="text" v-model="guid" />
        <div>{{ guid }}</div>
        <button @click="joinGame">参与对局</button>
        <br />
        <br />
        <br />
        <input type="text" v-model="playstep" />
        <button @click="play">下棋</button>
        <button @click="quit">退出</button>

        <div id="myBoard" style="width: 400px"></div>
        <textarea v-model="gData"></textarea>
    </div>
</template>

<script>
    import * as Chess from "chess.js";
    import Vue from "vue";
    import { create, join } from "@/utils/game";
    import io from "socket.io-client";
    import store from "@/store/index";
    // import {Chessboard} from "@chrisoakman/chessboardjs/dist/chessboard-1.0.0"

    export default Vue.extend({
        name: "Game",
        data: function() {
            return {
                chess: new Chess(),
                board: null,
                status: null,
                fen: null,
                png: null,
                guid: 0,
                io: null,
                gData: null,
                vanguard: true,
                step: 0, //已经走的步数
                playstep: "", //下的棋
            };
        },
        methods: {
            async joinGame() {
                let data;
                try {
                    data = await join(this.guid);
                    this.io = io({
                        query: {
                            token: store.getters.getJWT,
                            guid: this.guid,
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
            // 移动棋子
            move(step) {
                this.step++;
                this.chess.move(step);
                this.gData = this.chess.ascii();
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
                });
                // 开始
                io.on("start", (data) => {
                    console.log(data);
                });
                // 对手下棋
                io.on("opponent step", (data) => {
                    this.move(data.move);
                    console.log(data);
                });
                // 游戏结束
                io.on("end", (data) => {
                    console.log(data);
                });
            },
            async createGame() {
                let data;
                try {
                    data = await create();
                    this.guid = data.guid;
                    this.io = io({
                        query: {
                            token: store.getters.getJWT,
                            guid: this.guid,
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
                // let game = this.chess;
                // let updateStatus = () => {
                //     var status = "";

                //     var moveColor = "White";
                //     if (game.turn() === "b") {
                //         moveColor = "Black";
                //     }

                //     // checkmate?
                //     if (game.in_checkmate()) {
                //         status =
                //             "Game over, " + moveColor + " is in checkmate.";
                //     }

                //     // draw?
                //     else if (game.in_draw()) {
                //         status = "Game over, drawn position";
                //     }

                //     // game still on
                //     else {
                //         status = moveColor + " to move";

                //         // check?
                //         if (game.in_check()) {
                //             status += ", " + moveColor + " is in check";
                //         }
                //     }

                //     this.status = status;
                //     this.fen = game.fen();
                //     this.pgn = game.pgn();
                // };

                // // eslint-disable-next-line no-undef
                // this.board = new Chessboard("myBoard", {
                //     draggable: true,
                //     position: "start",
                //     onDragStart: (source, piece) => {
                //         // do not pick up pieces if the game is over
                //         if (game.game_over()) return false;

                //         // or if it's not that side's turn
                //         if (
                //             (game.turn() === "w" &&
                //                 piece.search(/^b/) !== -1) ||
                //             (game.turn() === "b" && piece.search(/^w/) !== -1)
                //         ) {
                //             return false;
                //         }
                //     },
                //     onDrop: (source, target) => {
                //         var move = game.move({
                //             from: source,
                //             to: target,
                //             promotion: "q", // NOTE: always promote to a queen for example simplicity
                //         });

                //         // illegal move
                //         if (move === null) return "snapback";

                //         updateStatus();
                //     },
                // });
                // create().then(data=>{
                //     console.log(data);
                // }).catch(err=>{
                //     console.log(err);
                // })
            },
        },
    });
</script>
