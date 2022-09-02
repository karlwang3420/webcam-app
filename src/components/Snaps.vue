<script setup lang="ts">
import { watch } from "vue";
import { useSnapsStore } from "../stores/snaps";
// get snapStore to get snapshots
const snapStore = useSnapsStore();

watch(snapStore.snapshots, () => {
  // get last snapshot
  const lastSnapShot = snapStore.snapshots.pop();
  if (lastSnapShot == undefined) return;
  const snapshotsElement = document.getElementById("snapshots");
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  // draw snapshot onto canvas
  context.putImageData(lastSnapShot, 0, 0);
  // add canvas to the top
  snapshotsElement?.prepend(canvas);
});
</script>

<template>
  <!-- Container -->
  <div class="item-center">
    <div
      class="p-2 items-center max-h-full border-4 border-dotted border-red-400 rounded-3xl dark:bg-gray-800"
    >
      <!-- Title -->
      <div class="mb-4 flex justify-center text-5xl dark:text-white">
        Snapshots
      </div>

      <!-- div to add the canvases -->
      <div
        id="snapshots"
        class="min-w-[520px] p-2 max-h-[1000px] space-y-2 overflow-y-auto"
      ></div>
    </div>
  </div>
</template>
