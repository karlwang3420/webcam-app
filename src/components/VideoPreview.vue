<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSnapsStore } from "../stores/snaps";
// import store to save snapshots
const snapsStore = useSnapsStore();

// declare some constants
const canvasSize = { width: 640, height: 480 };
const textPosition = { left: 10, top: canvasSize.height - 40 };
// video HTML element linked to webcam
let video: HTMLVideoElement | null = null;
// some reactive states
const textInput: { value: string } = ref("");
const showText = ref(false);

// on mounted, get video HTML element from dom
onMounted(async () => {
  video = document.getElementById("video") as HTMLVideoElement;
  const camera = await navigator.mediaDevices.getUserMedia({ video: true });

  video.srcObject = camera;
  video.play();
});

/**
 * used to capture snapshots, then save snapshot in store
 */
function snap() {
  // create a canvas element to draw on
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  const ctx = canvas.getContext("2d");
  if (ctx == null) throw Error("cannot find canvas context");
  if (video == null) throw Error("cannot find video element");

  // draw image to canvas. scale to target dimensions
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // draw text
  if (showText.value) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(textInput.value, textPosition.left, textPosition.top);
  }
  //convert to desired file format
  const dataURI = canvas.toDataURL(`image/jpeg`); // can also use 'image/png'

  // save to store
  snapsStore.addImage(dataURI);

  // delete dynamic element
  canvas.remove();
}
</script>

<template>
  <!-- outside container -->
  <div class="item-center">
    <!-- container with border -->
    <div class="p-4 rounded-3xl border-4 border-blue-400 border-dotted">
      <div class="flex justify-center text-5xl dark:text-white">
        Video Preview
      </div>
      <!-- relative container for both video and text -->
      <div class="mt-4 relative px-4 inline-block">
        <video id="video" width="640" height="480" autoplay></video>
        <div
          v-if="showText"
          class="absolute text-6xl text-red-600"
          :style="`left: ${textPosition.left}px; top: ${
            textPosition.top - 30
          }px; font-size: 40px; font-family: Arial; `"
        >
          {{ textInput }}
        </div>
      </div>
      <!-- input and buttons -->
      <div class="mt-4 flex justify-center align-center">
        <input
          v-model="textInput"
          class="ml-2 p-1 focus:outline-none bg-grey-100 border-black border rounded"
          type="text"
        />
        <button class="ml-2 btn-primary" @click="showText = !showText">
          顯示文字
        </button>
        <button class="ml-2 btn-primary" @click="snap">截圖</button>
      </div>
    </div>
  </div>
</template>

<style></style>
