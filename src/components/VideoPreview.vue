<script setup lang="ts">
import { onMounted, ref, computed, Ref } from "vue";
import { useSnapsStore } from "../stores/snaps";
// import store to save snapshots
const snapsStore = useSnapsStore();

// declare some constants
const canvasSize = { width: 640, height: 480 };
const textPosition = ref({ left: 10, top: canvasSize.height - 20 });
// HTML elements
let canvas: HTMLCanvasElement | null = null;
let video: HTMLVideoElement | null = null;
let context: CanvasRenderingContext2D | null = null;
// some reactive states
const textInput = ref("");
const showText = ref(false);
const blur = ref(0);
const filter = computed(() => `blur(${blur.value}px)`);

onMounted(async () => {
  // on mounted, get canvas HTML element from dom
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas == null) throw Error("cannot find canvas element");
  // find camera
  const camera = await navigator.mediaDevices.getUserMedia({ video: true });

  // create video element dynamically
  video = document.createElement("video");
  video.width = canvasSize.width;
  video.height = canvasSize.height;
  video.srcObject = camera;
  video.play();
  // get 2D context
  context = canvas.getContext("2d");
  if (context == null) throw Error("cannot find context");

  /**
   * canvas update loop, ~30fps
   *
   * only applies filter for the image, not the text
   *
   * @param filter
   * @param textPosition
   */
  function loop(
    filter: Ref<string>,
    textPosition: Ref<{ left: number; top: number }>
  ) {
    if (context == null) throw Error("cannot find canvas context");
    if (video == null) throw Error("cannot find video element");
    // apply filter
    context.filter = (filter as { value: string }).value;
    // flip
    context.translate(canvasSize.width, 0);
    context.scale(-1, 1);
    // draw image
    context.drawImage(video, 0, 0, canvasSize.width, canvasSize.height);
    // save filtered image
    const filteredImage = context.getImageData(
      0,
      0,
      canvasSize.width,
      canvasSize.height
    );
    // remove filter
    context.filter = "blur(0px)";
    // put back saved filtered image
    context.putImageData(filteredImage, 0, 0);
    // add text
    if (showText.value) {
      context.font = "40px Arial";
      context.fillStyle = "red";
      context.fillText(
        textInput.value,
        textPosition.value.left,
        textPosition.value.top
      );
    }
    // flip again
    context.translate(canvasSize.width, 0);
    context.scale(-1, 1);
    // recursive, 30fps
    setTimeout(() => {
      loop(filter, textPosition);
    }, 1000 / 30);
  }
  // flip
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  // start loop
  loop(filter, textPosition);
});

/**
 * used to capture snapshots, then save snapshot in store
 */
function snap() {
  if (canvas == null) throw Error("cannot find canvas element");
  if (context == null) throw Error("cannot find canvas element");
  //convert to desired file format
  const ImageData = context.getImageData(0, 0, 640, 480);

  // save to store
  snapsStore.addImage(ImageData);
}
</script>

<template>
  <!-- outside container -->
  <div class="item-center">
    <!-- container with border -->
    <div
      class="p-4 rounded-3xl border-4 border-blue-400 border-dotted dark:bg-gray-800"
    >
      <div class="flex justify-center text-5xl mb-4 dark:text-white">
        Video Preview
      </div>
      <!-- relative container for both video and text -->
      <div class="mx-4 relative">
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
      <!-- input and buttons -->
      <div class="mt-4 flex justify-center align-center">
        <input
          v-model="textInput"
          class="ml-2 p-1 focus:outline-none bg-grey-100 border-black border rounded"
          type="text"
        />
        <button class="ml-2 btn-primary" @click="showText = !showText">
          {{ `${!showText ? "顯示文字" : "隱藏文字"}` }}
        </button>
        <button class="ml-2 btn-primary" @click="snap">截圖</button>
      </div>
      <div class="mt-4 flex justify-center item-center space-x-1">
        <label
          class="font-bold text-lg flex flex-col justify-center text-center dark:text-white"
          for="blur-slider"
        >
          Blur Slider
        </label>
        <div class="flex flex-col justify-center">
          <input
            id="blur-slider"
            v-model="blur"
            class="w-96 h-10"
            type="range"
            min="0"
            max="10"
          />
        </div>
        <div class="flex flex-col justify-center text-lg dark:text-white">
          {{ blur }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
