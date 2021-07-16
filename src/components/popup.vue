<script>
    export default {
        name: "popup",
        props: {
            isShow: Boolean,
        },
    };
</script>
<template>
    <div class="popup" :class="{ isShow_popup: isShow }">
        <div class="popup-container">
            <slot></slot>
        </div>
    </div>
</template>
<style>
    .popup.isShow_popup {
        /* display: inherit; */
        visibility: visible;
        opacity: 1;
        /* transform: translateY(0); */
    }
    .popup {
        /* display: none; */
        position: fixed;
        margin: auto;
        left: 50%; /* 定位父级的50% */
        top: 50%;
        transform: translate(-50%, -50%); /*自己的50% */
        visibility: hidden;
        opacity: 0;
        transition: 0.3s;
    }
    .popup-container {
        background-color: rgb(254, 240, 240);
        color: rgb(245, 123, 120);
        font-size: 1em;
        padding: 6px 10px;
        border-radius: 6px;
    }
</style>
