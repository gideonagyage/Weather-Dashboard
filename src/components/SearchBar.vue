<template>
  <div class="container flex flex-row justify-center items-center mx-auto mb-8">
    <input
      type="text"
      id="city"
      name="city"
      v-model="city"
      @keyup.enter="searchCity"
      placeholder="Enter city..."
      class="w-full p-2 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="searchCity"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 h-12 w-12"
    >
      <font-awesome-icon :icon="['fas', 'search']" /> 
    </button>

    <div 
      v-if="showError" 
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center p-4 rounded-md shadow-md">
        <p class="dark:text-white">Please enter a valid city name.</p>
        <button @click="showError = false" class="mt-2 px-4 py-2 h-10 bg-blue-500 hover:bg-blue-700 text-white rounded">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const city = ref('');
    const showError = ref(false); // State for showing the error popup

    const searchCity = () => {
      if (city.value.trim() === '' || city.value.trim().length < 2) {
        showError.value = true; // Show the popup
        return;
      }

      emit('search', city.value);
    };

    return { city, searchCity, showError };
  },
};
</script>
