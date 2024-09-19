import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

const baseUrl = "https://api.openweathermap.org/data/2.5";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weatherData: null,
    forecastData: null,
    temperatureData: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    error: null,
    isLoading: true,
  }),
  actions: {
    // Get weather details
    async fetchWeather(city, apiKey) {
      try {
        console.log("Fetching weather for:", city);
        const response = await axios.get(
          `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        console.log("API Response:", response);

        //Update the store
        this.weatherData = response.data;
        this.error = null;
        return response.data;
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch weather data. Please check the city name and try again.",
          details: error.message,
        };
        console.error("Error fetching weather:", error);
        throw error; // Re-throw to handle in component
      }
    },

    // Get forecast details
    async fetchForecast(city, apiKey) {
      try {
        console.log("Fetching forecast for:", city);
        const response = await axios.get(
          `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        console.log("Forecast API Response:", response);

        // Update the store
        this.forecastData = response.data;
        this.error = null;
        return response.data;
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch forecast data. Please check the city name and try again.",
          details: error.message,
        };
        console.error("Error fetching forecast:", error);
        throw error;
      }
    },

    // Get temperature details
    async fetchTemperature(city, apiKey) {
      try {
        const response = await axios.get(
          `${baseUrl}/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        this.temperatureData = response.data.list.map((item) => item.main.temp);
        this.error = null;
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch temperature data. Please check the city name and try again.",
          details: error.message,
        };
        console.error("Error fetching temperature data:", error);
        throw error; // Re-throw to handle in component
      }
    },

    // Get weather details by location
    async getWeatherByLocation(apiKey) {
      try {
        // Attempt to get weather for user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Success: Fetch weather using coordinates
              const { latitude, longitude } = position.coords;
              console.log(
                "Fetching weather for current location:",
                latitude,
                longitude
              );
              const response = await axios.get(
                `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
              );
              console.log("Location API Response:", response);
              this.weatherData = response.data;
              this.error = null;
            },
            (error) => {
              this.error = {
                message:
                  "Failed to get location. Please allow location access or enter a city.",
                details: error.message,
              };
              console.error("Error getting location:", error);
            }
          );
        } else {
          // Geolocation not supported
          this.error = {
            message: "Geolocation is not supported by this browser.",
          };
        }
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch weather data for your location. Please try again later.",
          details: error.message,
        };
        console.error("Error fetching weather by location:", error);
      }
    },

    // Get forecast details by location
    async getForecastByLocation(apiKey) {
      try {
        // Attempt to get forecast for user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Success: Fetch Forecast using coordinates
              const { latitude, longitude } = position.coords;
              console.log(
                "Fetching forecast for current location:",
                latitude,
                longitude
              );
              const response = await axios.get(
                `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
              );
              console.log("Location API Response:", response);
              this.forecastData = response.data;
              this.error = null;
            },
            (error) => {
              this.error = {
                message:
                  "Failed to get location. Please allow location access or enter a city.",
                details: error.message,
              };
              console.error("Error getting location:", error);
            }
          );
        } else {
          // Geolocation not supported
          this.error = {
            message: "Geolocation is not supported by this browser.",
          };
        }
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch forecast data for your location. Please try again later.",
          details: error.message,
        };
        console.error("Error fetching forecast by location:", error);
      }
    },

    // Get temperature details by location
    async getTemperatureByLocation(apiKey) {
      try {
        // Attempt to get forecast for user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Success: Fetch Forecast using coordinates
              const { latitude, longitude } = position.coords;
              console.log(
                "Fetching temperature data for current location:",
                latitude,
                longitude
              );

              const response = await axios.get(
                `${baseUrl}/weather?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`
              );

        this.temperatureData = response.data.list.map((item) => item.main.temp);
              this.error = null;
            },
            (error) => {
              this.error = {
                message:
                  "Failed to get location. Please allow location access or enter a city.",
                details: error.message,
              };
              console.error("Error getting location:", error);
            }
          );
        } else {
          // Geolocation not supported
          this.error = {
            message: "Geolocation is not supported by this browser.",
          };
        }
      } catch (error) {
        this.error = {
          message:
            "Failed to fetch temperature data for your location. Please try again later.",
          details: error.message,
        };
        console.error("Error fetching temperature data by location:", error);
      }
    },

    // Add city name to favorite list
    addToFavorites(city) {
      if (!this.favorites.includes(city)) {
        this.favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },

    // Remove city name from favorite list
    removeFromFavorites(city) {
      const index = this.favorites.indexOf(city);
      if (index > -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
  },
});
