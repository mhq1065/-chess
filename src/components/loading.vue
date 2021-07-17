<script>
    import Vue from "vue";

    import "loaders.css";
    export default Vue.extend({
        name: "loading",
        props: {
            msg: String,
        },
        methods: {
            closeWaiting() {
                this.$emit("closeWaiting");
                return;
            },
        },
    });
</script>
<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <button
            class="delete"
            aria-label="close"
            @click="closeWaiting"
        ></button>
        <div class="modal-content loading-container">
            <div class="vbox">
                <div class="ball-scale-multiple">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div style="color:white">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<style>
    button.delete {
        position: relative;
        left: 40px;
    }
    .loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .vbox {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70px;
        height: 70px;
        /* background-color: #56a0c0; */
    }
    .vbox > div {
        margin-top: 30px;
    }
</style>
