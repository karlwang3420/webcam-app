<script setup lang="ts">
import { useSnapsStore } from "../stores/snaps";
const snapStore = useSnapsStore();
</script>

<template>
  <div class="border-2 border-dotted border-red-400 rounded-2">
    <img v-for="(snap, index) of snapStore.snaps" :key="index" :src="snap" />
  </div>
</template>
