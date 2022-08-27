import { defineStore } from "pinia";

interface SnapsStore {
  snaps: any[];
}

export const useSnapsStore = defineStore("snaps", {
  state: (): SnapsStore => ({
    snaps: [],
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    addImage(dataURI: any) {
      this.snaps.unshift(dataURI);
      while (this.snaps.length >= 4) {
        this.snaps.pop();
      }
    },
  },
});
