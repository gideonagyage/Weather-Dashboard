import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faMoon, faSun, faHeart, faTrash); 

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
