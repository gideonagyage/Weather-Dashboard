<template>
  <div
    class="container mx-auto py-4 mt-4 rounded-md shadow-md bg-white dark:bg-gray-800"
  >
    <h3 class="text-xl font-bold mb-2 text-center dark:text-white">
      5-Day Forecast
    </h3>
    <div
      class="flex flex-row overflow-x-scroll px-4 gap-4"
    >
      <div v-for="day in dailyForecast" :key="day.date" class="border rounded-md mb-3 p-2 min-w-32">
        <p class="text-center font-medium dark:text-white">
          {{ day.date }}
        </p>
        <img
          :src="`http://openweathermap.org/img/wn/${day.icon}@2x.png`"
          alt="Weather Icon"
          class="mx-auto"
        />
        <p v-if="day.description" class="text-center dark:text-white capitalize">
          {{ day.description }}
        </p>
        <p class="text-center dark:text-white">
          High: {{ Math.round(day.maxTemp) }}°C
        </p>
        <p class="text-center dark:text-white">
          Low: {{ Math.round(day.minTemp) }}°C
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useWeatherStore } from "../stores/weather";

export default {
  setup() {
    const weatherStore = useWeatherStore();
    const forecastData = computed(() => weatherStore.forecastData?.list || []);

    const dailyForecast = computed(() => {
      const dailyData = {};

      // Group hourly data by day
      forecastData.value.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });

        if (!dailyData[date]) {
          dailyData[date] = {
            date,
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            icon: item.weather[0].icon,
            description: item.weather[0].description
          };
        } else {
          dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
          dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp_min);
        }
      });

      // Convert the object into an array
      return Object.values(dailyData).slice(1, 6); // Get data from tomorrow onwards
    });

    return { dailyForecast };
  },
};
</script>

<style scoped>
/* Scrollbar */
::-webkit-scrollbar {
  margin: 30px;
  height: 8px;
  border-radius: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  margin: 30px;
  background: #1118276d;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  margin: 30px;
  background: #111827ad;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  margin: 30px;
  background: #111827;
}
</style>