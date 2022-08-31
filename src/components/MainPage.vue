<script setup lang="ts">
import VideoPreview from "./VideoPreview.vue";
import Snaps from "./Snaps.vue";
import DarkModeButton from "./DarkModeButton.vue";
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-around">
      <VideoPreview class="mt-12" />
      <Snaps class="mt-12 max-h-screen" />
      <div>
        <DarkModeButton class="m-4" />
      </div>
    </div>
  </div>
</template>
