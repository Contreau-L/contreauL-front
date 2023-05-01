<template>
  <router-view />
  <WaveLoader v-if="loading"/>
</template>

<script setup lang="ts">
import {useColors} from "vuestic-ui";
import WaveLoader from "./components/loader/WaveLoader.vue";
import {ref} from "@vue/reactivity";


useColors().applyPreset("original");
const loading = ref(false);

document.addEventListener('loading', () => loading.value = true);

document.addEventListener('stop-loading', () => loading.value = false);

</script>

<style lang="scss">
  @import 'scss/main.scss';

  #app {
    font-family: 'Source Sans Pro', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body {
    margin: 0;
  }
</style>
