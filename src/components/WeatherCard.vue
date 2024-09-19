<template>
  <div
    class="container mx-auto p-4 mt-4 rounded-md shadow-md bg-white dark:bg-gray-800"
  >
    <div
      v-if="weather && weather.sys"
      class="flex justify-between items-center"
    >
      <div class="flex-wrap">
        <h2 class="text-2xl font-bold dark:text-white mb-2">
          {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <p class="text-gray-600 dark:text-white mt-2 capitalize">
          {{ weather.weather[0].description }}
        </p>
      </div>
    </div>
    <div v-else class="flex items-center justify-center mt-4">
      <Spinner />
    </div>
    <div v-if="weather" class="flex items-center mt-4">
      <img
        :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        alt="Weather Icon"
      />
      <span class="text-4xl font-bold ml-2 dark:text-white"
        >{{ Math.round(weather.main.temp) }}°C</span
      >
    </div>
    <div v-if="weather" class="mt-2">
      <p class="dark:text-white">
        Feels Like: {{ Math.round(weather.main.feels_like) }}°C
      </p>
      <p class="dark:text-white">Humidity: {{ weather.main.humidity }}%</p>
      <p class="dark:text-white">Wind: {{ weather.wind.speed }} m/s</p>
    </div>
    <hr class="mt-4" />
    <div class="w-full flex justify-center mt-4">
      <button
        @click="addToFavorites"
        class=" h-10 font-bold flex items-center justify-center dark:text-white gap-4"
      > Add to Favorites
        <font-awesome-icon :icon="['fas', 'heart']" class="h-4 w-auto p-2 rounded-full bg-red-500 text-white hover:bg-red-600" />
      </button>
    </div>
  </div>
</template>

<script>
import { useWeatherStore } from "../stores/weather";
import Spinner from "./Spinner.vue";

export default {
  components: { Spinner },
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const weatherStore = useWeatherStore();

    const addToFavorites = () => {
      weatherStore.addToFavorites(props.weather.name);
    };

    return { addToFavorites };
  },
};
</script>
