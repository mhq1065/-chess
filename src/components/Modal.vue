<template>
    <div>
        <div class="modal" :class="{ 'is-active': isShow }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">警告</p>
                    <button
                        class="delete"
                        aria-label="close"
                        @click="closeModal"
                    ></button>
                </header>
                <section class="modal-card-body">
                    <slot></slot>
                </section>
                <footer class="modal-card-foot">
                    <button class="button">Close</button>
                </footer>
                <!-- <div class="notification is-danger is-light">
                    <button class="delete"></button>
                    <slot></slot>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "modal",
        props: {
            isShow: Boolean,
        },
        methods: {
            closeModal: function() {
                this.$emit("closeModal");
            },
        },
    };
</script>
