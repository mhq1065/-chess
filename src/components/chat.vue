<template>
    <div class="field">
        <article class="media">
            <div class="media-content">
                <div class="field card" style="height:200px;overflow-y:scroll">
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
                <div class="field">
                    <div class="control">
                        <textarea class="textarea" v-model="msg"></textarea>
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
