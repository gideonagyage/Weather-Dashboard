<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500 grid grid-cols-1 md:grid-cols-2 gap-4 p-8"
  >
    <!-- First Column -->
    <div class="flex flex-col">
      <!-- Name of App & Theme toggler -->
      <header class="container mx-auto py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Weather App
        </h1>
        <DarkModeToggle />
      </header>

      <!-- Search Input & Button -->
      <SearchBar @search="fetchWeather" />

      <!-- Error Display -->
      <div
        v-if="weatherStore.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ weatherStore.error.message }}</span>
      </div>

      <!-- Weather Details -->
      <div>
        <WeatherCard v-if="currentWeather" :weather="currentWeather" />

        <!-- Spinner to indicate Loading state -->
        <span
          v-else-if="weatherStore.isLoading == true"
          class="flex justify-center items-center"
        >
          <Spinner />
        </span>

        <!-- Display message when Weather data is unavailable -->
        <p
          v-else
          class="text-xl font-bold dark:text-white flex justify-center items-center mt-4"
        >
          No weather data available.
        </p>
      </div>

      <!-- Forecast of 5 days -->
      <Forecast
        v-if="currentForecast"
        :forecast="currentForecast"
        @search="fetchWeather"
      />
    </div>

    <!-- Second Column -->
    <div class="flex flex-col">
      <!-- Temperature Chart -->
      <TemperatureChart />

      <!-- List of Favorite Cities -->
      <Favorites />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useWeatherStore } from "./stores/weather";
import Spinner from "./components/Spinner.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import Forecast from "./components/Forecast.vue";
import Favorites from "./components/Favorites.vue";
import TemperatureChart from "./components/TemperatureChart.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";

export default {
  components: {
    SearchBar,
    WeatherCard,
    Forecast,
    DarkModeToggle,
    Favorites,
    Spinner,
    TemperatureChart,
  },
  setup() {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const city = ref("");
    const weatherStore = useWeatherStore();
    const weatherData = ref(null);
    const forecastData = ref(null);
    const temperatureData = ref(null);
    const currentWeather = computed(() => weatherStore.weatherData);
    const currentForecast = computed(() => weatherStore.forecastData);

    // Getting Weather Info
    const fetchWeather = async (city) => {
      console.log("Search event received in App.vue:", city);
      // Set isLoading to true before fetching
      weatherStore.isLoading = true;

      // Fetch weather data for the given city
      weatherData.value = await weatherStore.fetchWeather(city, apiKey);
      forecastData.value = await weatherStore.fetchForecast(city, apiKey);
      temperatureData.value = await weatherStore.fetchTemperature(city, apiKey);

      // Set isLoading to false after fetching weather information is complete
      weatherStore.isLoading = false;
    };

    // Onmount display weather details for current user's location
    onMounted(() => {
      weatherData.value = weatherStore.getWeatherByLocation(apiKey);
      forecastData.value = weatherStore.getForecastByLocation(apiKey);
      temperatureData.value = weatherStore.getTemperatureByLocation(apiKey);
    });

    // Re-render the weather details every 60 seconds
    setInterval(() => {
      if (city.value) {
        console.log("Updating weather after 60s for city:", city);
        weatherData.value = weatherStore.fetchWeather(city, apiKey);
        forecastData.value = weatherStore.fetchForecast(city, apiKey);
        temperatureData.value = weatherStore.fetchTemperature(city, apiKey);
      } else {
        weatherData.value = weatherStore.getWeatherByLocation(apiKey);
        forecastData.value = weatherStore.getForecastByLocation(apiKey);
        temperatureData.value = weatherStore.getTemperatureByLocation(apiKey);
      }
    }, 60000);

    return {
      weatherData,
      forecastData,
      fetchWeather,
      weatherStore,
      currentWeather,
      currentForecast,
    };
  },
};
</script>
