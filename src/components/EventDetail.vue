<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
    >
      <!-- Product details -->
      <div class="lg:max-w-lg lg:self-end">
        <div class="mt-4">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ event.title }}
          </h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <div class="flex items-center">
            <p class="text-lg text-gray-900 sm:text-xl">
              {{ formatDate(event.start_date) }} -
              {{ formatDate(event.end_date) }}
            </p>
          </div>

          <div class="mt-4 space-y-6">
            <div class="text-base text-gray-500" v-html="event.content"></div>
          </div>

          <div class="mt-6 flex items-center">
            <h3 class="text-sm md:text-base font-semibold">Location:</h3>
            <p class="ml-2 text-sm md:text-base">
              {{ event.location_name }}
            </p>
          </div>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <img
            :src="event.banner_url"
            :alt="event.title"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "../utils/date";

const props = defineProps(["event"]);
</script>
