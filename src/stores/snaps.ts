import { defineStore } from "pinia";

interface SnapsStore {
  snapshots: ImageData[];
}

export const useSnapsStore = defineStore("snaps", {
  state: (): SnapsStore => ({
    snapshots: [],
  }),

  actions: {
    addImage(imageData: ImageData) {
      this.snapshots.push(imageData);
    },
  },
});
