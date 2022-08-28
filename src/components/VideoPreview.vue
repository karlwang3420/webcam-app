<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSnapsStore } from "../stores/snaps";
const snapsStore = useSnapsStore();
// const context: any = ref(null);
let video: HTMLVideoElement | null = null;
const camera: { value: null | MediaStream } = ref(null);
const textInput: { value: string } = ref("");
const showText = ref(false);

onMounted(async () => {
  // context.value = (
  //   document.getElementById("canvas") as HTMLCanvasElement
  // ).getContext("2d");
  video = document.getElementById("video") as HTMLVideoElement;
  camera.value = await navigator.mediaDevices.getUserMedia({ video: true });
  // console.log(camera);
  video.srcObject = camera.value;
  video.play();
});

function snap() {
  // let index = 0;
  const canvas = document.createElement("canvas");
  canvas.width = 480;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  if (ctx == null) throw Error("cannot find canvas context");
  if (video == null) throw Error("cannot find video element");
  //draw image to canvas. scale to target dimensions
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //convert to desired file format
  const dataURI = canvas.toDataURL(`image/jpeg`); // can also use 'image/png'
  snapsStore.addImage(dataURI);
  canvas.remove();
  // index++;
}
</script>

<template>
  <div>
    <div class="relative">
      <video id="video" width="640" height="480" autoplay></video>
      <div
        v-if="showText"
        class="absolute bottom-0 left-0 text-3xl text-red-600"
      >
        {{ textInput }}
      </div>
    </div>
    <div class="my-2 flex justify-center align-center">
      <div class="text-lg align-center">Text</div>
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
</template>
