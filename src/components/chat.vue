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
                    <footer
                        class="card-footer"
                        style="position:absolute; bottom:0px; width:    %"
                    >
                        <input
                            class=""
                            placeholder="在这里输入消息"
                            v-model="msg"
                            @keyup.enter="sendMsg"
                            style="margin:5px;font-size:14px; border: none; resize:none; cursor: pointer; width:100%;outline:none; padding:5px"
                        />
                    </footer>
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
