<template>
  <div
    class="container mx-auto p-4 mt-4 rounded-md shadow-md bg-white dark:bg-gray-800"
  >
    <h3 class="text-xl flex justify-center font-bold mb-4 dark:text-white">
      Favorite Cities
    </h3>
    <ul v-if="favorites.length > 0" class="divide-y divide-gray-500 dark:divide-white ">
      <li v-for="city in favorites" :key="city" class="flex items-center justify-between">
        <button
          @click="fetchWeatherForCity(city)"
          class="my-4 hover:underline font-semibold dark:text-white mr-4"
        >
          {{ city }}
        </button>
        <button
          @click="removeFromFavorites(city)"
          class="my-4 ml-2 text-red-500 hover:text-red-700"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </li>
    </ul>
    <p v-else class="dark:text-white flex justify-center items-center my-4">No favorite cities added yet.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWeatherStore } from "../stores/weather";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const weatherStore = useWeatherStore();
const favorites = computed(() => weatherStore.favorites);

const fetchWeatherForCity = (city) => {
  weatherStore.fetchWeather(city, apiKey);
  weatherStore.fetchForecast(city, apiKey);
};

const removeFromFavorites = (city) => {
  weatherStore.removeFromFavorites(city);
};
</script>
