<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSnapsStore } from "../stores/snaps";
const snapsStore = useSnapsStore();
// const context: any = ref(null);
let video: HTMLVideoElement | null = null;
// const camera: { value: null | MediaStream } = ref(null);
const textInput: { value: string } = ref("");
const showText = ref(false);
const canvasSize = { width: 640, height: 480 };
const textPosition = { left: 10, top: canvasSize.height - 40 };

onMounted(async () => {
  video = document.getElementById("video") as HTMLVideoElement;
  const camera = await navigator.mediaDevices.getUserMedia({ video: true });

  video.srcObject = camera;
  video.play();
});

function snap() {
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  const ctx = canvas.getContext("2d");
  if (ctx == null) throw Error("cannot find canvas context");
  if (video == null) throw Error("cannot find video element");
  //draw image to canvas. scale to target dimensions
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  if (showText.value) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    // ctx.textAlign = "center";
    ctx.fillText(textInput.value, textPosition.left, textPosition.top);
  }
  //convert to desired file format
  const dataURI = canvas.toDataURL(`image/jpeg`); // can also use 'image/png'
  snapsStore.addImage(dataURI);
  canvas.remove();
}
</script>

<template>
  <div class="flex justify-center">
    <div
      class="mx-12 mt-12 rounded-3xl border-4 border-blue-400 inline-flex flex-col border-dotted h-160"
    >
      <div class="pt-4 flex justify-center text-5xl">Video Preview</div>
      <div class="px-4 inline-block">
        <div class="mt-4 relative">
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
      </div>
      <div class="mt-4 flex justify-center align-center">
        <input
          v-model="textInput"
          class="ml-2 bg-grey-100 border-black border rounded"
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
