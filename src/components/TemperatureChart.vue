<template>
  <div
    class="container mx-auto p-4 rounded-md shadow-md bg-white dark:bg-gray-800"
  >
    <h3
      class="text-xl flex justify-center items-center font-bold mb-2 text-center dark:text-white"
    >
      Temperature Trends
    </h3>

    <div v-if="chart" class="mb-4">
    <canvas id="temperatureChart"></canvas>
    </div>
    <div v-else class="flex justify-center items-center">
      <Spinner />
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { useWeatherStore } from '../stores/weather';
import { onMounted, watch } from 'vue';
import Spinner from '../components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  setup() {
    const weatherStore = useWeatherStore();
    let chart;

    const createChart = () => {
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(weatherStore.temperatureData.length).fill('').map((_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'Temperature Trends',
            data: weatherStore.temperatureData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          }],
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 50,
            max: 0,
            beginAtZero: true,
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            grid: {
              color: "rgba(200, 200, 200, 0.2)",
              borderDash: [5, 5],
            },
            ticks: {
              color: "rgba(75, 192, 192, 1)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Time",
            },
            grid: {
              color: "rgba(200, 200, 200, 0.2)",
              borderDash: [5, 5],
            },
            ticks: {
              color: "rgba(75, 192, 192, 1)",
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(75, 192, 192, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
          },
          legend: {
            display: false,
          },
        },
        },
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(() => weatherStore.temperatureData, (newData) => {
      if (chart) {
        chart.data.datasets[0].data = newData;
        chart.update();
      }
    });

    return {};
  },
};

</script>

<style scoped></style>
