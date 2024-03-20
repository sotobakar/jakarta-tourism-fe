<template>
  <div class="px-4 md:px-8 py-6">
    <div v-if="loading">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </div>
    <div v-else-if="showDetail">
      <button
        class="ml-auto rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        @click="back"
      >
        Kembali
      </button>
      <EventDetail :event="eventDetail" />
    </div>
    <div v-else>
      <h2 class="text-center text-3xl font-bold">Events</h2>
      <ul
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        <li v-for="event in events" :key="event.id" class="group relative">
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
          >
            <img
              :src="event.banner_url"
              :alt="event.title"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4">
            <h3 class="text-sm md:text-lg text-gray-700">
              <button
                @click="showEventDetail(event)"
                class="text-left font-semibold"
              >
                <span aria-hidden="true" class="absolute inset-0"></span>
                {{ event.title }}
              </button>
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ formatDate(event.start_date) }} -
              {{ formatDate(event.end_date) }}
            </p>
          </div>
        </li>
      </ul>
      <div class="mt-4 flex">
        <button
          v-if="currentPage > 1"
          @click="previousPage"
          type="button"
          class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          class="ml-auto rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEventStore } from "../stores/event";
import { computed, onMounted, ref, watch } from "vue";
import EventDetail from "../components/EventDetail.vue";
import { formatDate } from "../utils/date";

const eventStore = useEventStore();

const events = computed(() => eventStore.events);
const loading = computed(() => eventStore.loading);
const showDetail = ref(false);
const eventDetail = ref({});
const currentPage = ref(1);

onMounted(() => {
  eventStore.getEvents(currentPage.value);
});

watch(currentPage, () => {
  eventStore.getEvents(currentPage.value);
});

const showEventDetail = (event) => {
  showDetail.value = true;
  eventDetail.value = event;
};

const back = () => {
  showDetail.value = false;
};

const nextPage = () => {
  currentPage.value++;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
