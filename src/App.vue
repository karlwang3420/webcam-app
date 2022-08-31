<script setup lang="ts">
import MainPage from "./components/MainPage.vue";
import { onMounted } from "vue";

onMounted(() => {
  // check localStorage or media for dark mode information
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <MainPage />
</template>

<style></style>
