import axios from "axios";
import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [],
    loading: false,
  }),
  actions: {
    async getEvents(page) {
      this.loading = true;
      const response = await axios.get(
        `https://jakarta-tourism.go.id/api/event?page=${page}`
      );
      try {
        this.events = await response.data.data;
        this.loading = false;
      } catch (err) {
        this.events = [];
        return err;
      }
    },
  },
});
