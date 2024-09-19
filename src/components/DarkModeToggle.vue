<template>
  <div class="flex flex-row items-center justify-between">
    <font-awesome-icon
      :icon="['fas', 'sun']"
      class="mx-2 h-6 dark:text-white"
    />
    <label class="switch">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        name="dark-mode"
        v-model="isDarkMode"
        @change="toggleDarkMode"
      />
      <span class="slider round"> </span>
    </label>
    <font-awesome-icon
      :icon="['fas', 'moon']"
      class="mx-2 h-6 dark:text-white"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isDarkMode = ref(
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    const toggleDarkMode = () => {
      if (isDarkMode.value) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    };

    // Initial theme setup
    toggleDarkMode();

    return { isDarkMode, toggleDarkMode };
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
