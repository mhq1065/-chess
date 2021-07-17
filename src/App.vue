<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/game">Game</router-link>|
            <router-link to="/history">History</router-link>
        </div> -->
        <router-view />
    </div>
</template>

<style>
    * {
        margin: 0;
    }
    html,
    body {
        height: 100%;
    }
    #app {
        height: 100%;
    }
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        width: 6px;
        background: rgba(#101f1c, 0.1);
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.5);
        background-clip: padding-box;
        min-height: 28px;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
        transition: background-color 0.3s;
        cursor: pointer;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(144, 147, 153, 0.3);
    }
</style>
