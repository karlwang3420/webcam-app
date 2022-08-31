import { defineStore } from "pinia";

interface SnapsStore {
  snapshots: string[];
}

export const useSnapsStore = defineStore("snaps", {
  state: (): SnapsStore => ({
    snapshots: [],
  }),

  actions: {
    addImage(dataURI: string) {
      this.snapshots.unshift(dataURI);
    },
  },
});
