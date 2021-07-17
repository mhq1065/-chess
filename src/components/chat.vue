<template>
    <div class="field">
        <article class="media">
            <div class="media-content">
                <div class="field card">
                    <header class="card-header">
                        <p class="card-header-title">
                            聊天
                        </p>
                    </header>

                    <div
                        class="card-content"
                        style="overflow-y:auto;height:300px"
                    >
                        <div
                            class="card-content"
                            v-for="(item, index) in msgList"
                            :key="index"
                        >
                            <p>
                                <strong>{{ item.username }}</strong>
                                <br />
                                {{ item.msg }}
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input is-info" v-model="msg" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary" @click="sendMsg">
                            发送
                        </button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    export default Vue.extend({
        name: "chat",
        props: ["msgList"],
        data() {
            return {
                msg: "",
            };
        },
        methods: {
            sendMsg() {
                if (this.msg == "") return;
                this.$emit("sendMsg", this.msg);
                this.msg = "";
            },
        },
    });
</script>
