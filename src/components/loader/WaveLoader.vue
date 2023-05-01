<template>
    <div class="white-blur"></div>
    <div class="music" >
        <div class="bar" :style="{background: '#6F92DA'}"></div>
        <div class="bar" :style="{background: '#A8AEBA'}"></div>
        <div class="bar" :style="{background: '#6F92DA'}"></div>
        <div class="bar" :style="{background: '#A8AEBA'}"></div>
        <div class="bar" :style="{background: '#6F92DA'}"></div>
        <div class="bar" :style="{background: '#A8AEBA'}"></div>
        <div class="bar" :style="{background: '#6F92DA'}"></div>
        <div class="bar" :style="{background: '#A8AEBA'}"></div>
        <div class="bar" :style="{background: '#6F92DA'}"></div>
        <div class="bar" :style="{background: '#A8AEBA'}"></div>
    </div>
</template>

<style scoped>
.music {
    width: 200px;
    height: 100px;
    position: fixed;
    top: 50%;
    left: calc(50% - 100px);
    z-index: 1000;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}
.music .bar {
    width: 10px;
    border-radius: 8px;
    background: white;
    animation: movement 1.5s ease-in-out infinite;
}
@keyframes movement {
    0%, 100% {
        height: 5%;
    }
    50%{
        height: 80%;
    }
}
.music .bar:nth-child(1) {
    animation-delay: 1s;
}
.music .bar:nth-child(2) {
    animation-delay: 0.8s;
}
.music .bar:nth-child(3) {
    animation-delay: 0.6s;
}
.music .bar:nth-child(4) {
    animation-delay: 0.4s;
}
.music .bar:nth-child(5) {
    animation-delay: 0.2s;
}
.music .bar:nth-child(6) {
    animation-delay: 0.2s;
}
.music .bar:nth-child(7) {
    animation-delay: 0.4s;
}
.music .bar:nth-child(8) {
    animation-delay: 0.6s;
}
.music .bar:nth-child(9) {
    animation-delay: 0.8s;
}
.music .bar:nth-child(10) {
    animation-delay: 1s;
}
.white-blur {
    background: white;
    opacity: 0.4;
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>