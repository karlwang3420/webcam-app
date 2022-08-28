<script setup lang="ts">
import VideoPreview from "./components/VideoPreview.vue";
import Snaps from "./components/Snaps.vue";
let a = 2;
a++;
</script>

<template>
  <div class="flex">
    <VideoPreview />
    <Snaps />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  margin: 3px;
}
</style>
