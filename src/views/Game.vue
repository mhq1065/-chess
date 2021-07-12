<template>
    <div>
        <div id="myBoard"></div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "Game",
        data: function() {
            return {
                username: "youguess",
                pwd: "",
            };
        },
    });
</script>
