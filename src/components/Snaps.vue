<script setup lang="ts">
import { ref } from "vue";
import { useSnapsStore } from "../stores/snaps";
const snapStore = useSnapsStore();
const snapshotHeight = ref(0);

window.addEventListener("resize", function (event) {
  console.log("screen height", window.innerHeight);
  // console.log("available screen height", screen.availHeight);
  snapshotHeight.value = window.innerHeight / 3 - 36;
});
</script>

<template>
  <div
    class="flex flex-col justify-center aligh-middle h-screen border-4 border-dotted border-red-400 rounded-3xl"
  >
    <div class="mb-4 flex justify-center text-5xl">Snapshots</div>
    <div class="flex flex-col p-2 space-y-2 overflow-y-auto">
      <!-- :style="`max-height: ${snapshotHeight}px;`" -->
      <img
        v-for="(snap, index) of snapStore.snaps"
        :key="index"
        width="640"
        :src="snap"
      />
    </div>
  </div>
</template>
