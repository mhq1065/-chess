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
</style>
