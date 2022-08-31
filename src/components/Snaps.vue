<script setup lang="ts">
import { useSnapsStore } from "../stores/snaps";
// get snapStore to get snapshots
const snapStore = useSnapsStore();
</script>

<template>
  <!-- Container -->
  <div class="item-center">
    <div
      class="p-2 items-center max-h-full border-4 border-dotted border-red-400 rounded-3xl"
    >
      <!-- Title -->
      <div class="mb-4 flex justify-center text-5xl dark:text-white">
        Snapshots
      </div>

      <!-- Showing snapshots in the store -->
      <div class="min-w-[520px] p-2 max-h-[1000px] space-y-2 overflow-y-auto">
        <img
          v-for="(snapshot, index) of snapStore.snapshots"
          :key="index"
          width="680"
          :src="snapshot"
        />
      </div>
    </div>
  </div>
</template>
